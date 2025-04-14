"use client";

import { useParams } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import {
  useReadTexasHoldemRoomStage,
  useReadTexasHoldemRoomIsPrivate,
  useReadTexasHoldemRoomSmallBlind,
  useWriteTexasHoldemRoomJoinGame,
  useReadTexasHoldemRoomBigBlind,
  useReadTexasHoldemRoomDealerPosition,
  useReadTexasHoldemRoomCurrentPlayerIndex,
  useReadTexasHoldemRoomLastRaiseIndex,
  useReadTexasHoldemRoomCommunityCards,
  useReadTexasHoldemRoomPot,
  useReadTexasHoldemRoomGetPlayerIndexFromAddr,
  useReadTexasHoldemRoomCurrentStageBet,
  useReadTexasHoldemRoomNumPlayers,
  useReadTexasHoldemRoomGetEncryptedDeck,
  useReadTexasHoldemRoomRoundNumber,
  useWatchTexasHoldemRoomEvent,
} from "../../../generated";
import { Button } from "../../../components/ui/button";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";
import { useGetPlayers } from "../../../wagmi/wrapper";
import { getCommunityCards } from "../../../lib/utils";
import { useRoundKeys } from "../../../hooks/localRoomState";

export default function Room() {
  const params = useParams();
  const { address } = useAccount();
  const roomId = params.roomId as string;
  const [txStatus, setTxStatus] = useState<string | null>(null);

  const { data: stage, refetch: refetchStage } = useReadTexasHoldemRoomStage({});
  const { data: isPrivate, refetch: refetchIsPrivate } = useReadTexasHoldemRoomIsPrivate(
    {},
  );
  const { data: smallBlind, refetch: refetchSmallBlind } =
    useReadTexasHoldemRoomSmallBlind({});
  const { data: bigBlind, refetch: refetchBigBlind } = useReadTexasHoldemRoomBigBlind({});
  const { data: pot, refetch: refetchPot } = useReadTexasHoldemRoomPot({});
  const { data: currentStageBet, refetch: refetchCurrentStageBet } =
    useReadTexasHoldemRoomCurrentStageBet({});
  const { data: dealerPosition, refetch: refetchDealerPosition } =
    useReadTexasHoldemRoomDealerPosition({});
  const { data: currentPlayerIndex, refetch: refetchCurrentPlayerIndex } =
    useReadTexasHoldemRoomCurrentPlayerIndex({});
  const { data: lastRaiseIndex, refetch: refetchLastRaiseIndex } =
    useReadTexasHoldemRoomLastRaiseIndex({});
  const { data: communityCards, refetch: refetchCommunityCards } =
    useReadTexasHoldemRoomCommunityCards({});
  const { data: encryptedDeck, refetch: refetchEncryptedDeck } =
    useReadTexasHoldemRoomGetEncryptedDeck({});
  const { data: roundNumber, refetch: refetchRoundNumber } =
    useReadTexasHoldemRoomRoundNumber({});
  const { data: getPlayerIndexFromAddr, refetch: refetchGetPlayerIndexFromAddr } =
    useReadTexasHoldemRoomGetPlayerIndexFromAddr({
      args: [address as `0x${string}`],
    });
  const { data: numPlayers, refetch: refetchNumPlayers } =
    useReadTexasHoldemRoomNumPlayers({});
  const { data: players, refetch: refetchPlayers } = useGetPlayers();
  console.log(
    "/room/[roomId] useReadTexasHoldemRoom all properties",
    stage,
    isPrivate,
    smallBlind,
    bigBlind,
    dealerPosition,
    currentPlayerIndex,
    lastRaiseIndex,
    communityCards,
    // encryptedDeck,
    players,
    getPlayerIndexFromAddr,
    currentStageBet,
    pot,
    roundNumber,
  );
  const { data: roundKeys } = useRoundKeys(roomId, Number(roundNumber));

  const { writeContractAsync: joinGame, isPending: isJoiningGame } =
    useWriteTexasHoldemRoomJoinGame();

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const {
    data: txResult,
    isLoading: isWaitingForTx,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useWatchTexasHoldemRoomEvent({
    onLogs: (logs) => {
      console.log("Texas Holdem Room event logs", logs);
      // refretch all contract data
      refetchNumPlayers();
      refetchStage();
      refetchIsPrivate();
      refetchSmallBlind();
      refetchBigBlind();
      refetchPot();
      refetchCurrentStageBet();
      refetchDealerPosition();
      refetchCurrentPlayerIndex();
      refetchLastRaiseIndex();
      refetchCommunityCards();
      refetchEncryptedDeck();
      refetchRoundNumber();
      refetchGetPlayerIndexFromAddr();
      refetchPlayers();
    },
  });

  // setTimeout(() => {
  //   console.log("refetching numPlayers", numPlayersUpdatedAt, numPlayers);
  //   refetchNumPlayers();
  // }, 5000);

  console.log("/room/[roomId] joinGame txResult", txResult); // txResult.status === "success", txResult.logs = []
  console.log("/room/[roomId] transaction error", txError);

  // Extract contract revert reason if available
  const revertReason = txError?.message
    ? txError.message.includes("reverted")
      ? txError.message.split("reverted:")[1]?.trim() || txError.message
      : txError.message
    : null;

  //     GameStage stage;
  //     uint256 pot;
  //     uint256 currentStageBet; // per player (to stay in the round)
  //     uint256 smallBlind;
  //     uint256 bigBlind;
  //     uint256 dealerPosition;
  //     uint256 currentPlayerIndex;
  //     uint256 lastRaiseIndex;
  //     string[5] communityCards;
  //     BigNumber[] encryptedDeck;

  const handleJoinGame = async () => {
    try {
      setTxStatus("Submitting transaction...");
      const hash = await joinGame({
        args: [],
      });
      setTxHash(hash);
      setTxStatus("Transaction submitted, waiting for confirmation...");
    } catch (error) {
      console.error("Error joining game:", error);
      setTxStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="absolute top-5 right-5 z-20">
        <ConnectButton />
      </div>
      <div className="w-full h-full relative">
        <>
          <div className="flex flex-col gap-2 mb-4">
            <Button onClick={handleJoinGame} disabled={isJoiningGame || isWaitingForTx}>
              {isJoiningGame
                ? "Submitting..."
                : isWaitingForTx
                  ? "Confirming..."
                  : "Join Game"}
            </Button>

            {txStatus && (
              <div className="text-sm p-2 bg-gray-100 rounded">Status: {txStatus}</div>
            )}

            {txHash && (
              <div className="text-sm p-2 bg-gray-100 rounded">
                Transaction Hash: {txHash}
              </div>
            )}

            {isTxSuccess && (
              <div className="text-sm p-2 bg-green-100 rounded">
                Transaction confirmed! You have joined the game.
              </div>
            )}
            {isTxError && (
              <div className="text-sm p-2 bg-red-100 rounded">
                Transaction failed: {revertReason || txError?.message}
              </div>
            )}
          </div>
          {/* Dev view: Display all the properties of the game state */}
          <div className="flex flex-row gap-2">
            <span>Small Blind: {smallBlind}</span>
            <span>Big Blind: {bigBlind}</span>
            <span>Pot: {pot}</span>
            <span>Current Stage Bet: {currentStageBet}</span>
            <span>Dealer Position: {dealerPosition}</span>
            <span>Current Player Index: {currentPlayerIndex}</span>
            <span>Last Raise Index: {lastRaiseIndex}</span>
            <span>Community Cards: {communityCards}</span>
            {/* <span>Encrypted Deck: {encryptedDeck}</span> */}
            <span>Logged in Player Index: {getPlayerIndexFromAddr}</span>
            {/* <span>Players: {JSON.stringify(players)}</span> */}
            <span>
              Round Keys. priv. r. pub.
              <br />
              {JSON.stringify(roundKeys.privateKey, (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              )}
              <br />
              {JSON.stringify(roundKeys.r, (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              )}
              <br />
              {JSON.stringify(roundKeys.publicKey, (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              )}
            </span>
          </div>
          <PokerTable
            room={{
              stage,
              isPrivate,
              roundNumber: Number(roundNumber),
              smallBlind: Number(smallBlind),
              bigBlind: Number(bigBlind),
              pot: Number(pot),
              currentStageBet: Number(currentStageBet),
              dealerPosition: Number(dealerPosition),
              currentPlayerIndex: Number(currentPlayerIndex),
              lastRaiseIndex: Number(lastRaiseIndex),
              communityCards: getCommunityCards({
                stage,
                numOfPlayers: Number(numPlayers),
                encryptedDeck,
              }),
              encryptedDeck,
            }}
            players={players || []}
            roomId={roomId || ""}
          />
          <GameControls
            room={{
              id: roomId,
              roundNumber: Number(roundNumber),
              stage,
              isPrivate,
              smallBlind: Number(smallBlind),
              bigBlind: Number(bigBlind),
              pot: Number(pot),
              numPlayers: Number(numPlayers),
              currentStageBet: Number(currentStageBet),
              dealerPosition: Number(dealerPosition),
              currentPlayerIndex: Number(currentPlayerIndex),
              lastRaiseIndex: Number(lastRaiseIndex),
            }}
            isPlayerTurn={
              Number(currentPlayerIndex) ===
              Number(players?.find((player) => player.addr === address)?.seatPosition)
            }
            player={players?.find((player) => player.addr === address)}
          />
        </>
      </div>
    </main>
  );
}

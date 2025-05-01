"use client";

import { useParams } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import {
  useWriteTexasHoldemRoomJoinGame,
  useReadTexasHoldemRoomGetPlayerIndexFromAddr,
  useWatchTexasHoldemRoomEvent,
  useWatchDeckHandlerEvent,
  useWriteTexasHoldemRoomResetRound,
} from "../../../generated";
import { Button } from "../../../components/ui/button";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useState } from "react";
import { useGetBulkRoomData, useGetPlayers } from "../../../wagmi/wrapper";
import { ADMIN_ADDRESSES, getCommunityCards } from "../../../lib/utils";
import {
  useInvalidCards,
  useRoundKeys,
  useSetInvalidCards,
  useSetPlayerCards,
} from "../../../hooks/localRoomState";
import { type Room as RoomType, type Card, GameStage } from "../../../lib/types";
import { toast } from "sonner";

// export function generateStaticParams() {
//   // should render for all /room/[roomIds]
//   return [];
// }

export default function Room() {
  const params = useParams();
  const { address } = useAccount();
  const roomId = params.roomId as string;
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const { data: invalidCards } = useInvalidCards();
  const { mutate: setInvalidCards } = useSetInvalidCards();
  const { mutate: setPlayerCards } = useSetPlayerCards();
  console.log("room page.tsx invalidCards", invalidCards);

  const { data: getPlayerIndexFromAddr, refetch: refetchGetPlayerIndexFromAddr } =
    useReadTexasHoldemRoomGetPlayerIndexFromAddr({
      args: [address as `0x${string}`],
    });
  const { data: players, refetch: refetchPlayers } = useGetPlayers();
  const { data: roomData, refetch: refetchRoomData } = useGetBulkRoomData();
  console.log(
    "/room/[roomId] useReadTexasHoldemRoom non-bulk properties",
    players,
    getPlayerIndexFromAddr,
  );
  console.log(
    "/room/[roomId] useReadDeckHandlerGetPublicVariables all properties",
    roomData,
  );
  const { data: roundKeys } = useRoundKeys(roomId, roomData?.roundNumber);

  const { writeContractAsync: joinGame, isPending: isJoiningGame } =
    useWriteTexasHoldemRoomJoinGame();

  const { writeContractAsync: resetRound, isPending: isResettingRound } =
    useWriteTexasHoldemRoomResetRound();

  const [txHashJoinGame, setTxHashJoinGame] = useState<`0x${string}` | undefined>(
    undefined,
  );
  const [txHashResetRound, setTxHashResetRound] = useState<`0x${string}` | undefined>(
    undefined,
  );

  useEffect(() => {
    // reset things when the round number changes
    console.log(
      "resetting invalid cards on new round: roomData?.roundNumber",
      roomData?.roundNumber,
    );
    setPlayerCards(["", ""]);
    setInvalidCards({
      areInvalid: false,
      playerOrCommunityCards: undefined,
      cardIndices: undefined,
    });
    refetchGetPlayerIndexFromAddr();
    refetchPlayers();
    refetchRoomData();
  }, [
    roomData?.roundNumber,
    setInvalidCards,
    setPlayerCards,
    refetchGetPlayerIndexFromAddr,
    refetchPlayers,
    refetchRoomData,
  ]);

  const {
    data: txResultJoinGame,
    isLoading: isWaitingForTxJoinGame,
    isSuccess: isTxSuccessJoinGame,
    isError: isTxErrorJoinGame,
    error: txErrorJoinGame,
  } = useWaitForTransactionReceipt({
    hash: txHashJoinGame,
  });

  const {
    data: txResultResetRound,
    isLoading: isWaitingForTxResetRound,
    isSuccess: isTxSuccessResetRound,
    isError: isTxErrorResetRound,
    error: txErrorResetRound,
  } = useWaitForTransactionReceipt({
    hash: txHashResetRound,
  });

  useWatchTexasHoldemRoomEvent({
    onLogs: (logs) => {
      console.log("Texas Holdem Room event logs", logs);
      // refretch all contract data
      refetchRoomData();
      refetchGetPlayerIndexFromAddr();
      refetchPlayers();

      for (const log of logs) {
        if (log.eventName === "InvalidCardsReported") {
          console.log("InvalidCardsReported event log", log);
          toast.info(
            `Invalid cards reported by player ${log.args.player}. Restarting round...`,
          );
        }
      }
    },
  });

  useWatchDeckHandlerEvent({
    onLogs: (logs) => {
      console.log("Deck Handler event logs", logs);
      // refretch all contract data
      refetchRoomData();
      refetchGetPlayerIndexFromAddr();
      refetchPlayers();
    },
  });

  useEffect(() => {
    console.log("txResultJoinGame", txResultJoinGame);
    console.log("isTxSuccessJoinGame", isTxSuccessJoinGame);
    console.log("isTxErrorJoinGame", isTxErrorJoinGame);
    console.log("txErrorJoinGame", txErrorJoinGame);
    if (isTxSuccessJoinGame) {
      toast.success("Joined room");
    } else if (isTxErrorJoinGame) {
      toast.error(`Failed to join room: ${txErrorJoinGame?.message}`);
    }
  }, [txResultJoinGame, isTxSuccessJoinGame, isTxErrorJoinGame, txErrorJoinGame]);

  useEffect(() => {
    console.log("txResultResetRound", txResultResetRound);
    console.log("isTxSuccessResetRound", isTxSuccessResetRound);
    console.log("isTxErrorResetRound", isTxErrorResetRound);
    console.log("txErrorResetRound", txErrorResetRound);
    if (isTxSuccessResetRound) {
      toast.success("Reset round");
    } else if (isTxErrorResetRound) {
      toast.error(`Failed to reset round: ${txErrorResetRound?.message}`);
    }
  }, [txResultResetRound, isTxSuccessResetRound, isTxErrorResetRound, txErrorResetRound]);

  // Destructure all properties except encryptedDeck to keep it mutable
  const {
    stage,
    isPrivate,
    smallBlind,
    bigBlind,
    pot,
    currentStageBet,
    dealerPosition,
    currentPlayerIndex,
    lastRaiseIndex,
    numPlayers,
    roundNumber,
  } = roomData ?? {
    stage: GameStage.Idle,
  };

  // Access encryptedDeck directly from roomData to keep it mutable
  const encryptedDeck = roomData?.encryptedDeck.concat() || [];

  // setTimeout(() => {
  //   console.log("refetching numPlayers", numPlayersUpdatedAt, numPlayers);
  //   refetchNumPlayers();
  // }, 5000);

  console.log("/room/[roomId] joinGame txResult", txResultJoinGame); // txResult.status === "success", txResult.logs = []
  console.log("/room/[roomId] transaction error", txErrorJoinGame);

  // Extract contract revert reason if available
  const revertReason = txErrorJoinGame?.message
    ? txErrorJoinGame.message.includes("reverted")
      ? txErrorJoinGame.message.split("reverted:")[1]?.trim() || txErrorJoinGame.message
      : txErrorJoinGame.message
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
      setTxHashJoinGame(hash);
      setTxStatus("Transaction submitted, waiting for confirmation...");
    } catch (error) {
      console.error("Error joining game:", error);
      setTxStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleResetRound = async () => {
    try {
      setTxStatus("Submitting reset round transaction...");
      const hash = await resetRound({
        args: [],
      });
      setTxHashResetRound(hash);
      setTxStatus("Transaction submitted, waiting for confirmation...");
    } catch (error) {
      console.error("Error joining game:", error);
      setTxStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  useEffect(() => {
    if (
      roomData &&
      roomData.stage !== undefined &&
      roomData.encryptedDeck !== undefined &&
      roomData.numPlayers !== undefined
    ) {
      if (roomData.stage >= GameStage.Flop) {
        try {
          const communityCards = getCommunityCards({
            stage: roomData.stage,
            numOfPlayers: roomData.numPlayers,
            encryptedDeck: roomData.encryptedDeck,
          });
          console.log("communityCards", communityCards);
          setCommunityCards(communityCards);

          // now that we have valid community cards,
          // reset invalid cards if there were previously invalid community ones
          if (invalidCards?.playerOrCommunityCards === "community") {
            setInvalidCards({
              areInvalid: false,
              playerOrCommunityCards: undefined,
              cardIndices: undefined,
            });
          }
        } catch (error) {
          console.error("Error getting community cards:", error);
          toast.error("Error decrypting table cards");
          // todo: show user a button to report invalid cards
          //  (or automatically call report function as a txn WAIT a couple seconds, refetch, and confirm?)
          setCommunityCards([]);
          setInvalidCards({
            areInvalid: true,
            playerOrCommunityCards: "community",
            cardIndices: undefined,
          });
        }

        return;
      }
    } else {
      console.log("roomData is not ready yet", roomData);
    }
    setCommunityCards([]);
  }, [roomData, setInvalidCards]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="absolute top-5 right-5 z-20">
        <ConnectButton />
      </div>
      <div className="w-full h-full relative">
        <>
          <div className="flex flex-col gap-2 mb-4">
            <Button
              onClick={handleJoinGame}
              disabled={isJoiningGame || isWaitingForTxJoinGame}
            >
              {isJoiningGame
                ? "Submitting..."
                : isWaitingForTxJoinGame
                  ? "Confirming..."
                  : "Join Game"}
            </Button>

            {address && ADMIN_ADDRESSES.includes(address) && (
              <Button
                onClick={handleResetRound}
                disabled={isResettingRound || isWaitingForTxResetRound}
              >
                {isResettingRound
                  ? "Submitting..."
                  : isWaitingForTxResetRound
                    ? "Resetting..."
                    : "Reset Round"}
              </Button>
            )}
          </div>
          {/* Dev view: Display all the properties of the game state */}
          <div className="flex flex-row gap-2 text-[8px]">
            <span>Small Blind: {smallBlind}</span>
            <span>Big Blind: {bigBlind}</span>
            <span>Pot: {pot}</span>
            <span>Current Stage Bet: {currentStageBet}</span>
            <span>Dealer Position: {dealerPosition}</span>
            <span>Current Player Index: {currentPlayerIndex}</span>
            <span>Last Raise Index: {lastRaiseIndex}</span>
            <span>Community Cards: {JSON.stringify(communityCards)}</span>
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
            room={
              {
                ...roomData,
                id: roomId,
                communityCards,
                encryptedDeck: encryptedDeck,
              } as RoomType
            }
            players={players || []}
            roomId={roomId || ""}
          />
          <GameControls
            room={{
              id: roomId,
              roundNumber: Number(roundNumber),
              stage,
              isPrivate: isPrivate ?? false,
              smallBlind: Number(smallBlind),
              bigBlind: Number(bigBlind),
              pot: Number(pot),
              numPlayers: Number(numPlayers),
              currentStageBet: Number(currentStageBet),
              dealerPosition: Number(dealerPosition),
              currentPlayerIndex: Number(currentPlayerIndex),
              lastRaiseIndex: Number(lastRaiseIndex),
              encryptedDeck: encryptedDeck,
              communityCards,
            }}
            player={players?.find((player) => player.addr === address)}
          />
        </>
      </div>
    </main>
  );
}

"use client";

import { useParams } from "next/navigation";
import { ErudaEnabler } from "../../../components/ErudaEnabler";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import {
  useWriteTexasHoldemRoomJoinGame,
  useWriteTexasHoldemRoomLeaveGame,
  useWatchTexasHoldemRoomEvent,
  useWatchDeckHandlerEvent,
} from "../../../generated";
import { Button } from "../../../components/ui/button";
import { zeroAddress } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useGetBulkRoomData, useGetPlayers } from "../../../wagmi/wrapper";
import { getCommunityCards, getMyCardsIndexes } from "../../../lib/utils";
import {
  useInvalidCards,
  usePlayerCards,
  useRoundKeys,
  useSetInvalidCards,
  useSetPlayerCards,
} from "../../../hooks/localRoomState";
import {
  type Room as RoomType,
  type Card,
  GameStage,
  MAX_PLAYERS,
  BETTING_STAGES,
  HandRank,
  stringCardsToCards,
} from "../../../lib/types";
import { p256 } from "../../../lib/elgamal-commutative-node-1chunk";
import { generateC1 } from "../../../lib/elgamal-commutative-node-1chunk";
import { g2048 } from "../../../lib/elgamal-commutative-node-1chunk";
import { decryptCard } from "../../../lib/encrypted-poker-1chunk";
import { toast } from "sonner";
import { Coins, LogOut, OctagonAlert } from "lucide-react";
import { bigintToString } from "../../../lib/elgamal-commutative-node-1chunk";
import { useSetEventLogEncryptedDeck } from "../../../hooks/eventLogEncryptedDeck";
import useInactive from "../../../hooks/useInactive";
import { useInterval } from "../../../hooks/useInterval";

// export function generateStaticParams() {
//   // should render for all /room/[roomIds]
//   return [];
// }

export default function Room() {
  const params = useParams();
  const { address } = useAccount();
  const isInactive = useInactive(10 * 60 * 1000); // after 10 minutes, stop polling the rpc for contract data

  const roomId = params.roomId as string;
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const { data: invalidCards } = useInvalidCards();
  const { mutate: setInvalidCards } = useSetInvalidCards();
  const { data: playerCards } = usePlayerCards();
  const { mutate: setPlayerCards } = useSetPlayerCards();
  const [hasToastedInactive, setHasToastedInactive] = useState(false);

  // const { data: eventLogEncryptedDeck } = useEventLogEncryptedDeck();
  const { mutate: setEventLogEncryptedDeck } = useSetEventLogEncryptedDeck();
  console.log("room page.tsx invalidCards", invalidCards);

  const { data: players, refetch: refetchPlayers } = useGetPlayers();
  const {
    data: roomData,
    error: roomDataError,
    refetch: refetchRoomData,
  } = useGetBulkRoomData();
  const { data: roundKeys } = useRoundKeys(roomId, Number(roomData?.roundNumber));

  console.log("/room/[roomId] useReadTexasHoldemRoom non-bulk properties", players);
  console.log(
    "/room/[roomId] useReadDeckHandlerGetPublicVariables all properties, roomDataError",
    roomData,
    JSON.stringify(roomDataError),
  );

  const { writeContractAsync: joinGame, isPending: isJoiningGame } =
    useWriteTexasHoldemRoomJoinGame();

  const { writeContractAsync: leaveGame } = useWriteTexasHoldemRoomLeaveGame();

  const [txHashJoinGame, setTxHashJoinGame] = useState<`0x${string}` | undefined>(
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
    setEventLogEncryptedDeck({
      encryptedDeck: [],
      lastUpdatedByPlayerAddress: zeroAddress,
      lastUpdatedByPlayerIndex: undefined,
      cardIndiciesUpdated: undefined,
    });
    refetchPlayers();
    refetchRoomData();
  }, [
    roomData?.roundNumber,
    setInvalidCards,
    setPlayerCards,
    refetchPlayers,
    refetchRoomData,
  ]);

  useInterval(async () => {
    if (!isInactive) {
      // console.log("10s polling for updates...");
      refetchRoomData();
      refetchPlayers();
      setHasToastedInactive(false);
    } else {
      if (!hasToastedInactive) {
        console.log(
          "10 minutes of inactivity detected, stopping polling contract data...",
        );
        toast.info(
          "You have been inactive for 10 minutes. Stopping some updates until you return.",
          { duration: 10000 }, // 10 seconds
        );
        setHasToastedInactive(true);
      }
    }
  }, 10000);

  const {
    data: txResultJoinGame,
    isLoading: isWaitingForTxJoinGame,
    isSuccess: isTxSuccessJoinGame,
    isError: isTxErrorJoinGame,
    error: txErrorJoinGame,
  } = useWaitForTransactionReceipt({
    hash: txHashJoinGame,
  });

  useWatchTexasHoldemRoomEvent({
    onError: (error) => {
      console.error("Texas Holdem Room event error", error);
      // ignore if the error contains "filter not found" because this occurs frequently with alchemy
      if (!error.message.includes("filter not found")) {
        toast.error(`useWatchTexasHoldemRoomEvent error: ${error.message}`);
      }
    },
    // onLogs: (logs: {
    //   eventName: string;
    //   args: {
    //     player?: `0x${string}` | undefined;
    //     amount?: bigint;
    //     winners?: `0x${string}`[];
    //     playerReported?: `0x${string}` | undefined;
    //   }[];
    // }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLogs: async (logs: any) => {
      console.log("Texas Holdem Room event logs", logs);
      // refretch all contract data
      refetchRoomData();
      refetchPlayers();

      for (const log of logs) {
        if (log.eventName === "InvalidCardsReported") {
          console.log("InvalidCardsReported event log", log);
          toast.info(
            `Invalid cards reported by player ${log.args.player as { player?: `0x${string}` | undefined }}. Restarting round...`,
          );
        }
        if (log.eventName === "PotWon") {
          console.log("PotWon event log", log);
          toast.info(
            `Pot ${log.args.amount} chips won by player ${log.args.winners.join(", ")}!`,
            { duration: 30000 }, // 30s
          );
        }
        if (log.eventName === "IdlePlayerKicked") {
          console.log("IdlePlayerKicked event log", log);
          toast.info(
            `Player ${log.args.playerReported} kicked for being idle. Restarting round...`,
          );
        }
        if (log.eventName === "PlayerJoined") {
          console.log("PlayerJoined event log", log);
          if (log.args.player !== address) {
            toast.info(`Player ${log.args.player} joined the room.`);
          }
        }
        if (log.eventName === "PlayerLeft") {
          console.log("PlayerLeft event log", log);
          toast.info(`Player ${log.args.player} left the room.`);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
      refetchRoomData();
      refetchPlayers();
    },
  });

  useWatchDeckHandlerEvent({
    onLogs: async (logs) => {
      console.log("Deck Handler event logs", logs);
      // refretch all contract data
      refetchRoomData();
      refetchPlayers();
      for (const log of logs) {
        if (log.eventName === "EncryptedShuffleSubmitted") {
          console.log("EncryptedShuffleSubmitted event log", log);
          // toast.info(
          //   `Encrypted shuffle submitted by player ${log.args.player}. Restarting round...`,
          // );
          const args = log.args as {
            player?: `0x${string}` | undefined;
            encryptedShuffle?: readonly `0x${string}`[] | undefined;
          };
          const newEncryptedDeck = args.encryptedShuffle as unknown as string[];
          const playerIndex = players?.findIndex((player) => player.addr === args.player);
          setEventLogEncryptedDeck({
            encryptedDeck: newEncryptedDeck,
            lastUpdatedByPlayerAddress: args.player || zeroAddress,
            lastUpdatedByPlayerIndex: playerIndex,
          });
        } else if (log.eventName === "DecryptionValuesSubmitted") {
          console.log("DecryptionValuesSubmitted event log", log);
          const decryptionArgs = log.args as {
            player?: `0x${string}` | undefined;
            cardIndexes?: readonly number[] | undefined;
            decryptionValues?: readonly `0x${string}`[] | undefined;
          };
          const playerIndex = players?.findIndex(
            (player) => player.addr === decryptionArgs.player,
          );
          setEventLogEncryptedDeck({
            encryptedDeck: decryptionArgs.decryptionValues as unknown as string[],
            lastUpdatedByPlayerAddress: decryptionArgs.player || zeroAddress,
            lastUpdatedByPlayerIndex: playerIndex,
            cardIndiciesUpdated: decryptionArgs.cardIndexes as number[],
          });
        } else if (log.eventName === "PlayerCardsRevealed") {
          console.log("PlayerCardsRevealed event log", log);
          const playerCardsRevealedArgs = log.args as {
            player?: `0x${string}` | undefined;
            card1?: string | undefined;
            card2?: string | undefined;
            rank?: number | undefined;
            handScore?: bigint | undefined;
          };
          toast.info(
            `Player ${playerCardsRevealedArgs.player} revealed their cards: 
              ${stringCardsToCards([
                playerCardsRevealedArgs.card1 || "",
                playerCardsRevealedArgs.card2 || "",
              ])
                .map((card) => card.rank + card.suit)
                .join(
                  ", ",
                )}, a ${HandRank[playerCardsRevealedArgs.rank || 0]}! Score: ${playerCardsRevealedArgs.handScore}`,
            { duration: 30000 }, // 30s
          );
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));
      refetchRoomData();
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
    const player = players?.find((player) => player.addr === address);
    if (
      playerCards[0] === "" &&
      playerCards[1] === "" &&
      roomData &&
      roomData.stage > GameStage.RevealDeal
    ) {
      if (
        roomData.encryptedDeck !== undefined &&
        player?.seatPosition !== undefined &&
        roundKeys.privateKey !== null &&
        roundKeys.publicKey !== null &&
        roundKeys.r !== null &&
        players !== undefined
      ) {
        console.log("revealing my cards, stage is past reveal deal");
        handleDecryptMyCardsLocally();
      }
    }
    //  else {
    //   setPlayerCards(["", ""]);
    // }
  }, [playerCards, roomData, roundKeys, players, address]);

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
    lastActionTimestamp,
  } = roomData ?? {
    stage: GameStage.Idle,
  };
  // Access encryptedDeck directly from roomData to keep it mutable
  const encryptedDeck = useMemo(() => roomData?.encryptedDeck.concat() || [], [roomData]);

  // const handleDecryptMyCardsLocally = useCallback(async () => {
  const handleDecryptMyCardsLocally = async () => {
    console.log("handleDecryptMyCardsLocally");

    if (encryptedDeck === undefined) {
      console.log("no encrypted deck");
      return;
    }
    const player = players?.find((player) => player.addr === address);

    if (player?.seatPosition === undefined) {
      console.error("handleDecryptMyCardsLocally: player seat position is undefined");
      return;
    }
    if (
      roundKeys.privateKey === null ||
      roundKeys.publicKey === null ||
      roundKeys.r === null
    ) {
      console.error("handleDecryptMyCardsLocally: null round key found");
      return;
    }
    if (players === undefined || players === null) {
      console.error("handleDecryptMyCardsLocally: players is undefined");
      return;
    }
    if (dealerPosition === undefined) {
      console.error("handleDecryptMyCardsLocally: dealer position is undefined");
      return;
    }
    const revealMyCardsIndexes = getMyCardsIndexes(
      player.seatPosition,
      dealerPosition,
      players,
    );
    console.log("revealMyCardsIndexes", revealMyCardsIndexes);
    const c1 = generateC1(g2048, roundKeys.r, p256); // todo: player should keep it from the original encrypted shuffle
    console.log("generated c1", c1.toString(16));
    const decryptedCards = revealMyCardsIndexes.map((index) => {
      const card = encryptedDeck[index];
      const decryptedCard = decryptCard({
        encryptedCard: {
          c1,
          c2: BigInt(card),
        },
        privateKey: roundKeys.privateKey as bigint,
      });
      console.log("decryptedCard", bigintToString(decryptedCard));
      return bigintToString(decryptedCard);
    });
    console.log("decryptedCards", decryptedCards);
    setPlayerCards(decryptedCards as [string, string]);
  };
  // }, [
  //   encryptedDeck,
  //   players,
  //   address,
  //   roundKeys,
  //   // setPlayerCards,
  //   dealerPosition,
  // ]);

  // setTimeout(() => {
  //   console.log("refetching numPlayers", numPlayersUpdatedAt, numPlayers);
  //   refetchNumPlayers();
  // }, 5000);

  console.log("/room/[roomId] joinGame txResult", txResultJoinGame); // txResult.status === "success", txResult.logs = []
  console.log("/room/[roomId] transaction error", txErrorJoinGame);

  // Extract contract revert reason if available
  // const revertReason = txErrorJoinGame?.message
  //   ? txErrorJoinGame.message.includes("reverted")
  //     ? txErrorJoinGame.message.split("reverted:")[1]?.trim() || txErrorJoinGame.message
  //     : txErrorJoinGame.message
  //   : null;

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
      const hash = await joinGame({
        args: [],
      });
      setTxHashJoinGame(hash);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error("Error joining game:", error);
      if (error?.shortMessage) {
        toast.error(`Error joining game: ${error.shortMessage}`);
      } else {
        toast.error(`Error joining game: ${error}`);
      }
    }
  };

  useEffect(() => {
    if (
      roomData &&
      roomData.stage !== undefined &&
      encryptedDeck !== undefined &&
      roomData.numPlayers !== undefined
    ) {
      if (roomData.stage >= GameStage.Flop) {
        try {
          const communityCards = getCommunityCards({
            stage: roomData.stage,
            numOfPlayers: roomData.numPlayers,
            encryptedDeck: encryptedDeck,
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
  }, [roomData, setInvalidCards, encryptedDeck]);

  // Handle leaving game (player leaves at the end of the round)
  const handleLeaveGame = async () => {
    // ask the user to confirm they want to leave
    // if they leave during a round, warn them:
    // that their hand will be folded and they will forfeit any of their chips in the pot
    // if they confirm, leave the game
    // if they cancel, do nothing
    if (
      confirm(
        "Are you sure you want to leave the game? Any chips in the pot will be forfeited.",
      )
    ) {
      console.log("calling leaveGame");
      const txHash = await leaveGame({
        args: [],
      });
      console.log("txHash", txHash);
      // Handle leaving logic here
      // router.push("/");
      console.log("leaving game confirmed");
    }
  };

  const loggedInPlayer = players?.find((player) => player.addr === address);
  const isPlayerLoggedInAndInTheRoom =
    address !== undefined && loggedInPlayer !== undefined;
  // console.log("isPlayerLoggedInAndInTheRoom", isPlayerLoggedInAndInTheRoom);
  // console.log("loggedInPlayer", loggedInPlayer);
  const countOfPlayers = players?.reduce(
    (acc, player) => acc + (player.addr !== zeroAddress ? 1 : 0),
    0,
  );
  // console.log("countOfPlayers", countOfPlayers);
  const isLoggedInAndIsTurn = loggedInPlayer?.playerIndex === currentPlayerIndex;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="absolute top-1 left-1 z-20 flex flex-row gap-2">
        {!isPlayerLoggedInAndInTheRoom &&
          countOfPlayers !== undefined &&
          countOfPlayers < MAX_PLAYERS && (
            <Button
              onClick={handleJoinGame}
              variant="default"
              size="lg"
              disabled={isJoiningGame || isWaitingForTxJoinGame}
            >
              <Coins className="w-8 h-8" />
              <span className="text-lg">
                {isJoiningGame
                  ? "Joining..."
                  : isWaitingForTxJoinGame
                    ? "Joining..."
                    : "Join Game"}
              </span>
            </Button>
          )}
        {/* {connectors
          .filter((connector) => connector.name === "Coinbase Wallet")
          .map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              Sign in with Smart Wallet
            </button>
          ))} */}
        {isPlayerLoggedInAndInTheRoom && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs px-2 text-white"
              onClick={handleLeaveGame}
            >
              {/* todo: confirmation dialog */}
              <LogOut size={16} strokeWidth={2} />
            </Button>
          </div>
        )}
      </div>
      <div className="absolute top-1 right-1 z-20 flex flex-row gap-2">
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "avatar",
          }}
          chainStatus={{
            smallScreen: "icon",
            largeScreen: "icon",
          }}
        />
      </div>
      <div className="absolute top-[15%] z-20 flex flex-row gap-2">
        {roomDataError && (
          <span className="text-red-500 bg-white/60 rounded-md p-2 flex flex-row gap-2">
            <OctagonAlert />
            {roomDataError.shortMessage}
          </span>
        )}
      </div>
      <div className="w-full h-full relative">
        <>
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
            player={players?.find((player) => player.addr === address)}
          />

          <div
            className={`${isLoggedInAndIsTurn && BETTING_STAGES.includes(stage) ? "block" : "hidden"}`}
          >
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
                lastActionTimestamp: Number(lastActionTimestamp),
                encryptedDeck: encryptedDeck,
                communityCards,
              }}
              player={players?.find((player) => player.addr === address)}
            />
          </div>
        </>
      </div>
      <ErudaEnabler />
    </main>
  );
}

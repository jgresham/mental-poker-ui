"use client";

import React, { useEffect, useState } from "react";
import {
  type Room,
  type Player,
  MAX_PLAYERS,
  GameStageToString,
  GameStage,
  REVEAL_COMMUNITY_CARDS_STAGES,
  ALL_REVEAL_CARDS_STAGES,
} from "@/lib/types";
import { PlayerUI } from "./PlayerUI";
import { Card } from "./Card";
import { useAccount, useConnections, useWaitForTransactionReceipt } from "wagmi";
import { useInvalidCards, useRoundKeys } from "../../hooks/localRoomState";
import { zeroAddress } from "viem";
import { Button } from "../ui/button";
import {
  useWriteDeckHandlerRevealMyCards,
  useWriteDeckHandlerSubmitDecryptionValues,
  useWriteDeckHandlerSubmitEncryptedShuffle,
  useWriteTexasHoldemRoomReportIdlePlayer,
  useWriteTexasHoldemRoomReportInvalidCards,
  useWriteTexasHoldemRoomResetRound,
} from "../../generated";
import { ActionClock, DEFAULT_TIME_LIMIT_SEC } from "./ActionClock";
import { DevModeToggle } from "../DevModeToggle";
import { useDevMode } from "../../hooks/devMode";
import {
  ADMIN_ADDRESSES,
  getCommunityCardIndexes,
  getCountOfPlayersCounterClockwiseToDealer,
  getMyCardsIndexes,
  getOtherPlayersCardsIndexes,
} from "../../lib/utils";
import { toast } from "sonner";
import { TimerReset } from "lucide-react";
import {
  bigintToHexString,
  g2048,
  generateC1,
  modInverse,
  p256,
} from "../../lib/elgamal-commutative-node-1chunk";
import {
  decryptCard,
  DECK,
  formatCardDeckForShuffleAndEncrypt,
  shuffleAndEncryptDeck,
} from "../../lib/encrypted-poker-1chunk";
import * as bigintModArith from "bigint-mod-arith";
import { useEventLogEncryptedDeck } from "../../hooks/eventLogEncryptedDeck";

interface PokerTableProps {
  room?: Room;
  players: Player[];
  player?: Player;
  roomId?: string;
}

export function PokerTable({ room, players, roomId, player }: PokerTableProps) {
  console.log("PokerTable player", player);

  const [copyOfRoomDeck, setCopyOfRoomDeck] = useState<`0x${string}`[] | undefined>();
  const { data: isDevMode } = useDevMode();
  const { address, connector } = useAccount();
  const { data: roundKeys } = useRoundKeys(room?.id, room?.roundNumber);
  const { data: eventLogEncryptedDeck } = useEventLogEncryptedDeck();
  const { data: invalidCards } = useInvalidCards();
  console.log("PokerTable invalidCards", invalidCards);
  const { writeContractAsync: reportInvalidCards } =
    useWriteTexasHoldemRoomReportInvalidCards();
  const {
    writeContractAsync: reportIdlePlayer,
    isPending: isSubmittingReportIdlePlayer,
  } = useWriteTexasHoldemRoomReportIdlePlayer();
  const { writeContractAsync: resetRound, isPending: isResettingRound } =
    useWriteTexasHoldemRoomResetRound();
  const [txHashResetRound, setTxHashResetRound] = useState<`0x${string}` | undefined>(
    undefined,
  );
  const {
    writeContractAsync: submitEncryptedDeck,
    isPending: isSubmittingEncryptedDeck,
    isSuccess: isSubmittingEncryptedDeckSuccess,
    isError: isSubmittingEncryptedDeckError,
    error: txError,
  } = useWriteDeckHandlerSubmitEncryptedShuffle();
  const {
    writeContractAsync: submitRevealMyCards,
    isPending: isSubmittingRevealMyCards,
    isSuccess: isSubmittingRevealMyCardsSuccess,
    isError: isSubmittingRevealMyCardsError,
    error: txErrorSubmittingRevealMyCards,
  } = useWriteDeckHandlerRevealMyCards();
  console.log(
    "isSubmittingRevealMyCards",
    isSubmittingRevealMyCards,
    isSubmittingRevealMyCardsSuccess,
    isSubmittingRevealMyCardsError,
    txErrorSubmittingRevealMyCards,
  );

  const {
    writeContractAsync: submitDecryptionValues,
    isPending: isSubmittingDecryptionValues,
    isSuccess: isSubmittingDecryptionValuesSuccess,
    isError: isSubmittingDecryptionValuesError,
    error: txErrorSubmittingDecryptionValues,
  } = useWriteDeckHandlerSubmitDecryptionValues();
  console.log(
    "isSubmittingDecryptionValues",
    isSubmittingDecryptionValues,
    isSubmittingDecryptionValuesSuccess,
    isSubmittingDecryptionValuesError,
    txErrorSubmittingDecryptionValues,
  );

  const [isCurrentPlayerIsIdle, setIsCurrentPlayerIsIdle] = useState(false);
  const [hasPromptedStageObligation, setHasPromptedStageObligation] =
    useState<GameStage | null>(null);
  const connections = useConnections();
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  console.log("PokerTable isPlayerTurn", isPlayerTurn);
  const [txHash2, setTxHash2] = useState<string | undefined>(undefined);
  const {
    data: txResult,
    isLoading: isWaitingForTx,
    // isSuccess: isTxSuccess,
    isError: isTxError2,
    error: txError2,
  } = useWaitForTransactionReceipt({
    hash: txHash2 as `0x${string}`,
  });
  console.log("txReceipt", txResult);
  // console.log("txReceipt2", isWaitingForTx);
  // console.log("isTxSuccess", isTxSuccess);
  // console.log("isTxError", isTxError);
  // console.log("txError2", txError2);
  // console.log("txError2.cause", txError2?.cause);
  // console.log("txError2 user message", txError2?.message.split("\n")[0]);
  if (txError2) {
    console.log("txError2 error message", txError2?.message);
    console.log("txError2.stack", txError2?.stack);
    // console.log("txError2.name", txError2?.name);
  }

  const {
    data: txResultResetRound,
    isLoading: isWaitingForTxResetRound,
    isSuccess: isTxSuccessResetRound,
    isError: isTxErrorResetRound,
    error: txErrorResetRound,
  } = useWaitForTransactionReceipt({
    hash: txHashResetRound,
  });

  useEffect(() => {
    if (txError2) {
      console.log("useEffecttxError2", txError2);
      // The 2nd part of this boolean is confusing because the tx can be submitted successfully,
      // but still the tx can later be reverted or fail. That shows up in the txReceipt ("txError2").
      const typeTxError2 = txError2 as { shortMessage?: string } | undefined;
      if (isSubmittingEncryptedDeckError || isSubmittingEncryptedDeckSuccess) {
        toast.error(`Failed to submit encrypted deck: ${typeTxError2?.shortMessage}`);
      }
      if (isSubmittingRevealMyCardsError || isSubmittingRevealMyCardsSuccess) {
        toast.error(`Failed to reveal my cards: ${typeTxError2?.shortMessage}`);
      }
      if (isSubmittingDecryptionValuesError || isSubmittingDecryptionValuesSuccess) {
        toast.error(`Failed to submit decryption values: ${typeTxError2?.shortMessage}`);
      }
    }
  }, [
    txError2,
    isSubmittingEncryptedDeckError,
    isSubmittingRevealMyCardsError,
    isSubmittingDecryptionValuesError,
    isSubmittingEncryptedDeckSuccess,
    isSubmittingRevealMyCardsSuccess,
    isSubmittingDecryptionValuesSuccess,
  ]);

  useEffect(() => {
    if (room?.stage !== hasPromptedStageObligation) {
      console.log("stage changed, resetting prompt for stage obligation to null");
      setHasPromptedStageObligation(null);
    }
  }, [room?.stage, hasPromptedStageObligation]);

  useEffect(() => {
    console.log(
      "PT: setIsPlayerTurn",
      room?.currentPlayerIndex,
      player?.playerIndex,
      room?.currentPlayerIndex === player?.playerIndex,
    );
    if (room?.currentPlayerIndex !== undefined && player?.playerIndex !== undefined) {
      setIsPlayerTurn(room?.currentPlayerIndex === player?.playerIndex);
    }
  }, [player?.playerIndex, room?.currentPlayerIndex]);

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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (room) {
      const { lastActionTimestamp } = room;

      // if the timestamp is new,
      // and a valid timestamp, set the state and start the timer
      if (lastActionTimestamp !== undefined && lastActionTimestamp > 0) {
        console.log("Action clock: setting 30s timer");
        const timeLeft = Math.floor(
          lastActionTimestamp + DEFAULT_TIME_LIMIT_SEC - Date.now() / 1000,
        );
        if (timeLeft <= 0) {
          console.log("Action clock: timeLeft <= 0! Buzz!");
          setIsCurrentPlayerIsIdle(true);
        } else {
          setIsCurrentPlayerIsIdle(false);
        }
        timeoutId = setTimeout(
          () => {
            console.log("Action clock: setTimeout timedout! Buzz!");
            setIsCurrentPlayerIsIdle(true);
          },
          (DEFAULT_TIME_LIMIT_SEC + 1) * 1000,
        );
      } else {
        setIsCurrentPlayerIsIdle(false);
      }
    }
    return () => {
      console.log("Action clock: clearing timeout");
      clearTimeout(timeoutId);
    };
  }, [room]);

  useEffect(() => {
    console.log(
      "waiting for vars to be ready to call handleObligation. isPlayerTurn",
      isPlayerTurn,
      "eventLogEncryptedDeck",
      eventLogEncryptedDeck,
    );
    if (connections.length === 0 && connector === undefined) {
      console.log("no wagmi connections yet. connector", connector);
      return;
    }
    // For showdown, any active player can submit reveal their cards in any order
    if (
      (!isPlayerTurn && room?.stage !== GameStage.Showdown) ||
      hasPromptedStageObligation !== null
    ) {
      return;
    }
    // First shuffler uses the unencrypted deck
    if (room?.encryptedDeck === undefined && room?.stage !== GameStage.Shuffle) {
      console.log("no encrypted deck");
      return;
    }
    if (player?.seatPosition === undefined) {
      console.log("handleRevealPlayerCards: player seat position is undefined");
      return;
    }
    if (
      roundKeys.privateKey === null ||
      roundKeys.publicKey === null ||
      roundKeys.r === null
    ) {
      console.log("handleRevealPlayerCards: null round key found");
      return;
    }
    if (
      room.stage !== GameStage.Shuffle &&
      !ALL_REVEAL_CARDS_STAGES.includes(room.stage) &&
      room.stage !== GameStage.Showdown
    ) {
      console.log("not a valid stage for obligation");
      return;
    }
    console.log("calling handleObligation");
    handleObligation();
  }, [
    room?.stage,
    room?.encryptedDeck,
    isPlayerTurn,
    hasPromptedStageObligation,
    player?.seatPosition,
    roundKeys,
    connections,
    connector,
    eventLogEncryptedDeck,
  ]);

  if (!room) {
    return <p>Loading...</p>;
  }
  const {
    communityCards,
    pot,
    stage,
    dealerPosition,
    currentPlayerIndex,
    roundNumber,
    lastActionTimestamp,
    encryptedDeck,
  } = room;

  useEffect(() => {
    console.log(
      "PT: useEffect encryptedDeck currentPlayerIndex",
      encryptedDeck,
      currentPlayerIndex,
    );
  }, [encryptedDeck, currentPlayerIndex]);

  // dont think this works
  const isEventLogDataAheadOfContractData = (
    eventLogEncryptedDeckLastUpdatedByPlayerIndex: number,
  ) => {
    const eventLogPlayerDistanceToDealer = getCountOfPlayersCounterClockwiseToDealer(
      eventLogEncryptedDeckLastUpdatedByPlayerIndex,
      dealerPosition,
      players,
    );
    const currentPlayerDistanceToDealer = getCountOfPlayersCounterClockwiseToDealer(
      currentPlayerIndex,
      dealerPosition,
      players,
    );
    if (eventLogPlayerDistanceToDealer > currentPlayerDistanceToDealer) {
      console.warn(
        "handleObligation: eventLogPlayerDistanceToDealer > currentPlayerDistanceToDealer. This means the event log data is 'ahead' of the contract data.",
      );
      console.warn("eventLogPlayerDistanceToDealer", eventLogPlayerDistanceToDealer);
      console.warn("currentPlayerDistanceToDealer", currentPlayerDistanceToDealer);
      return true;
    }
    return false;
  };

  const handleObligation = () => {
    console.log("handleObligation called. eventLogEncryptedDeck", eventLogEncryptedDeck);
    // if eventLogEncryptedDeck.encryptedDeck is set (whole deck in case of shuffle or card indicies from the deck
    // in case of reveal cards) and is not equal to the room.encryptedDeck,
    // then we should refetch the room.encrypted deck until they match
    // if the player index of the event log deck is "closer" to the dealer than the contract data,
    // then don't allow the user to submit the encrypted deck from the contract data
    // if (
    //   room.stage !== GameStage.Showdown && // going in a circle doing obligations
    //   eventLogEncryptedDeck.lastUpdatedByPlayerIndex !== undefined &&
    //   eventLogEncryptedDeck.encryptedDeck.length > 0
    // ) {
    //   console.log(
    //     "handleObligation: eventLogEncryptedDeck.lastUpdatedByPlayerIndex",
    //     eventLogEncryptedDeck.lastUpdatedByPlayerIndex,
    //   );
    //   console.log("handleObligation: currentPlayerIndex", currentPlayerIndex);
    //   console.log(
    //     "handleObligation: isEventLogDataAheadOfContractData",
    //     isEventLogDataAheadOfContractData(eventLogEncryptedDeck.lastUpdatedByPlayerIndex),
    //   );
    //   if (
    //     isEventLogDataAheadOfContractData(eventLogEncryptedDeck.lastUpdatedByPlayerIndex)
    //   ) {
    //     console.warn(
    //       "BACKGROUND OBLIGATION: handleObligation: eventLogDataAheadOfContractData",
    //     );
    //     return;
    //   }
    // }

    // if shuffle, call submitEncryptedDeck
    if (room.stage === GameStage.Shuffle && !isSubmittingEncryptedDeck) {
      console.log("BACKGROUND OBLIGATION: SHUFFLE");
      handleShuffle();
      // return submitEncryptedDeck({ args: [room.encryptedDeck] });
    }
    if (room.stage === GameStage.RevealDeal && !isSubmittingDecryptionValues) {
      console.log("BACKGROUND OBLIGATION: REVEAL PLAYER CARDS");
      handleRevealPlayerCards();
    }
    // if reveal cards, call submitDecryptionValues
    if (
      REVEAL_COMMUNITY_CARDS_STAGES.includes(room.stage) &&
      !isSubmittingDecryptionValues
    ) {
      console.log("BACKGROUND OBLIGATION: REVEAL COMMUNITY CARDS");
      handleRevealCommunityCards();
    }

    // if we enter showdown and are still active, then we need to reveal our cards on the smart contract
    if (
      !player?.hasFolded &&
      !player?.joinedAndWaitingForNextRound &&
      room.stage === GameStage.Showdown &&
      !isSubmittingRevealMyCards &&
      player?.handScore === 0 // > 0 if already revealed cards
    ) {
      console.log("BACKGROUND OBLIGATION: SHOWDOWN REVEAL MY CARDS");
      handleSubmitRevealMyCards();
    } else if (room.stage === GameStage.Showdown) {
      console.log(
        "showdown but not submitting my reveal",
        player,
        isSubmittingRevealMyCards,
      );
    }
  };

  const handleShuffle = async () => {
    console.log("handleShuffle", encryptedDeck);
    let deck: {
      c1: bigint;
      c2: bigint;
    }[] = [];
    if (!isPlayerTurn) {
      console.log("handleShuffle: not my turn");
      return;
    }
    if (
      roundKeys.privateKey === null ||
      roundKeys.publicKey === null ||
      roundKeys.r === null
    ) {
      console.error("handleShuffle: null round key found");
      return;
    }

    // if (
    //   eventLogEncryptedDeck.lastUpdatedByPlayerIndex !== undefined &&
    //   eventLogEncryptedDeck.encryptedDeck.length > 0
    // ) {
    //   if (
    //     isEventLogDataAheadOfContractData(eventLogEncryptedDeck.lastUpdatedByPlayerIndex)
    //   ) {
    //     console.warn("BACKGROUND OBLIGATION: SHUFFLE: eventLogDataAheadOfContractData");
    //     return;
    //   }
    //   // if (encryptedDeck[0] !== eventLogEncryptedDeck.encryptedDeck[0]) {
    //   //   console.warn(
    //   //     "BACKGROUND OBLIGATION: SHUFFLE: handleShuffle eventLogEncryptedDeck.encryptedDeck.length > 0 && encryptedDeck[0] !== eventLogEncryptedDeck.encryptedDeck[0]",
    //   //   );
    //   //   console.warn(
    //   //     "players[currentPlayerIndex]",
    //   //     players[currentPlayerIndex],
    //   //     currentPlayerIndex,
    //   //   );
    //   //   console.warn();
    //   //   return;
    //   // }
    // }

    if (player?.isDealer) {
      // new encrypted deck from unencrypted deck
      console.log("Deck before encrypted shuffle: ", DECK);
      // todo: variable prime
      deck = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r: roundKeys.r, p: p256 });
      console.log("Deck before encrypted shuffle, formatted deck: ", deck);
    } else {
      console.log("handleShuffle: encrypting and shuffling existing encrypted deck");
      if (!encryptedDeck) {
        console.error("handleShuffle: no encrypted deck");
        return;
      }
      deck = encryptedDeck.map((card) => ({
        c1: BigInt(0), // this c1 is not used in the encryption process
        c2: BigInt(card),
      }));
    }

    const encryptedDeckBlock = shuffleAndEncryptDeck({
      encryptedDeck: deck,
      publicKey: roundKeys.publicKey,
      r: roundKeys.r,
      p: p256,
    });
    console.log("Deck after encrypted shuffle: ", encryptedDeckBlock);

    const encryptedDeckArray = encryptedDeckBlock.map((card) => {
      // todo: variable prime
      const hexstring = `0x${card.c2.toString(16).padStart(64, "0")}` as `0x${string}`;
      if (hexstring.length % 2 !== 0) {
        console.log("hexstring not even", hexstring);
      }
      return hexstring;
    });
    console.log("submitEncryptedDeck encryptedDeckArray", encryptedDeckArray);
    // intentional bug: for testing invalid cards
    // encryptedDeckArray[0] = encryptedDeckArray[0].replace("2", "3") as `0x${string}`;
    if (hasPromptedStageObligation === null) {
      setHasPromptedStageObligation(GameStage.Shuffle);

      const txHash2 = await submitEncryptedDeck({
        args: [encryptedDeckArray],
      });
      console.log("txHash2", txHash2);
      setTxHash2(txHash2);
    }
  };

  async function handleSubmitRevealMyCards() {
    console.log("handleSubmitRevealMyCards", encryptedDeck);
    if (encryptedDeck === undefined) {
      console.log("no encrypted deck");
      return;
    }
    if (player?.seatPosition === undefined) {
      console.error("handleSubmitRevealMyCards: player seat position is undefined");
      return;
    }
    if (
      roundKeys.privateKey === null ||
      roundKeys.publicKey === null ||
      roundKeys.r === null
    ) {
      console.error("handleSubmitRevealMyCards: null round key found");
      return;
    }
    if (players === undefined || players === null) {
      console.error("handleSubmitRevealMyCards: players is undefined");
      return;
    }
    const dealerPosition = room?.dealerPosition;
    if (dealerPosition === undefined) {
      console.error("handleSubmitRevealMyCards: dealer position is undefined");
      return;
    }

    const revealMyCardsIndexes = getMyCardsIndexes(
      player.playerIndex,
      dealerPosition,
      players,
    );
    console.log("handleSubmitRevealMyCards revealMyCardsIndexes", revealMyCardsIndexes);

    const c1 = generateC1(g2048, roundKeys.r, p256); // todo: player should keep it from the original encrypted shuffle
    const c1InversePowPrivateKey = modInverse(
      bigintModArith.modPow(c1, roundKeys.privateKey, p256),
      p256,
    );
    const args = [
      bigintToHexString(c1),
      bigintToHexString(roundKeys.privateKey),
      bigintToHexString(c1InversePowPrivateKey),
    ] as const;
    console.log(
      "handleSubmitRevealMyCards args",
      args,
      c1,
      roundKeys.privateKey,
      c1InversePowPrivateKey,
    );
    if (hasPromptedStageObligation === null) {
      setHasPromptedStageObligation(stage);
      const txHash2 = await submitRevealMyCards({
        args,
        gas: BigInt(4000000), // 4 million, should only be ~2 million
      });
      console.log("txHash2", txHash2);
      setTxHash2(txHash2);
    }
  }

  async function handleRevealPlayerCards() {
    console.log("handleRevealPlayerCards", encryptedDeck);
    if (encryptedDeck === undefined) {
      console.log("no encrypted deck");
      return;
    }
    if (player?.seatPosition === undefined) {
      console.error("handleRevealPlayerCards: player seat position is undefined");
      return;
    }
    if (
      roundKeys.privateKey === null ||
      roundKeys.publicKey === null ||
      roundKeys.r === null
    ) {
      console.error("handleRevealPlayerCards: null round key found");
      return;
    }
    if (players === undefined || players === null) {
      console.error("handleRevealPlayerCards: players is undefined");
      return;
    }

    const dealerPosition = room?.dealerPosition;
    if (dealerPosition === undefined) {
      console.error("handleRevealPlayerCards: dealer position is undefined");
      return;
    }

    const revealOtherPlayersCardsIndexes = getOtherPlayersCardsIndexes(
      player.playerIndex,
      dealerPosition,
      players,
    );
    console.log(
      "handleRevealPlayerCards revealOtherPlayersCardsIndexes",
      revealOtherPlayersCardsIndexes,
    );

    // if (
    //   eventLogEncryptedDeck.lastUpdatedByPlayerIndex !== undefined &&
    //   eventLogEncryptedDeck.encryptedDeck.length > 0
    // ) {
    //   console.log(
    //     "handleRevealPlayerCards: eventLogEncryptedDeck.lastUpdatedByPlayerIndex",
    //     eventLogEncryptedDeck.lastUpdatedByPlayerIndex,
    //   );
    //   console.log("handleRevealPlayerCards: currentPlayerIndex", currentPlayerIndex);
    //   console.log(
    //     "handleRevealPlayerCards: isEventLogDataAheadOfContractData",
    //     isEventLogDataAheadOfContractData(eventLogEncryptedDeck.lastUpdatedByPlayerIndex),
    //   );
    //   if (
    //     isEventLogDataAheadOfContractData(eventLogEncryptedDeck.lastUpdatedByPlayerIndex)
    //   ) {
    //     console.warn(
    //       "BACKGROUND OBLIGATION: handleRevealPlayerCards: eventLogDataAheadOfContractData",
    //     );
    //     return;
    //   }
    // for (const index of revealOtherPlayersCardsIndexes) {
    //   // eventLog value may be undefined if the user was disconnected and/or refreshed after the log came in
    //   if (
    //     eventLogEncryptedDeck.encryptedDeck?.[index] !== undefined &&
    //     encryptedDeck[index] !== eventLogEncryptedDeck.encryptedDeck[index]
    //   ) {
    //     console.warn(
    //       "BACKGROUND OBLIGATION: handleRevealPlayerCards encryptedDeck[index] !== eventLogEncryptedDeck.encryptedDeck[index] for index: ",
    //       index,
    //       "Waiting for values to match",
    //     );
    //     console.log(
    //       "eventLogEncryptedDeck.encryptedDeck",
    //       eventLogEncryptedDeck.encryptedDeck,
    //     );
    //     console.log("encryptedDeck", encryptedDeck);
    //     return;
    //   }
    // }
    // }

    const c1 = generateC1(g2048, roundKeys.r, p256); // todo: player should keep it from the original encrypted shuffle
    console.log("generated c1", c1.toString(16));
    const decryptedCards = revealOtherPlayersCardsIndexes.map((index) => {
      const card = encryptedDeck[index];
      const decryptedCard = decryptCard({
        encryptedCard: {
          c1,
          c2: BigInt(card),
        },
        privateKey: roundKeys.privateKey as bigint,
      });
      console.log("decryptedCard", decryptedCard);
      return decryptedCard;
    });
    console.log("decryptedCards", decryptedCards);
    const partiallyDecryptedCardsHexStrings = decryptedCards.map((card) => {
      const hexstring = `0x${card.toString(16).padStart(64, "0")}` as `0x${string}`;
      if (hexstring.length % 2 !== 0) {
        console.log("hexstring not even", hexstring);
      }
      return hexstring;
    });
    console.log(
      "submitDecryptionValues partiallyDecryptedCardsHexStrings",
      partiallyDecryptedCardsHexStrings,
    );
    // intentional bug: for testing invalid cards
    // partiallyDecryptedCardsHexStrings[0] = partiallyDecryptedCardsHexStrings[0].replace(
    //   "2",
    //   "3",
    // ) as `0x${string}`;
    if (hasPromptedStageObligation === null) {
      setHasPromptedStageObligation(GameStage.RevealDeal);
      const txHash2 = await submitDecryptionValues({
        args: [revealOtherPlayersCardsIndexes, partiallyDecryptedCardsHexStrings],
      });
      console.log("txHash2", txHash2);
      setTxHash2(txHash2);
    }
  }

  async function handleRevealCommunityCards() {
    console.log("handleRevealCommunityCards", encryptedDeck);
    if (encryptedDeck === undefined) {
      console.log("no encrypted deck");
      return;
    }
    if (player?.seatPosition === undefined) {
      console.error("handleRevealPlayerCards: player seat position is undefined");
      return;
    }
    if (
      roundKeys.privateKey === null ||
      roundKeys.publicKey === null ||
      roundKeys.r === null
    ) {
      console.error("handleRevealPlayerCards: null round key found");
      return;
    }

    if (room?.numPlayers === undefined) {
      console.error("handleRevealCommunityCards: numPlayers is undefined");
      return;
    }

    const revealCommunityCardsIndexes = getCommunityCardIndexes(
      room.stage,
      room.numPlayers,
    );
    console.log(
      "handleRevealCommunityCards revealCommunityCardsIndexes",
      revealCommunityCardsIndexes,
    );

    // for (const index of revealCommunityCardsIndexes) {
    //   // eventLog value may be undefined if the user was disconnected and/or refreshed after the log came in
    //   if (
    //     eventLogEncryptedDeck.encryptedDeck?.[index] !== undefined &&
    //     encryptedDeck[index] !== eventLogEncryptedDeck.encryptedDeck[index]
    //   ) {
    //     console.warn(
    //       "BACKGROUND OBLIGATION: handleRevealCommunityCardsIndexes encryptedDeck[index] !== eventLogEncryptedDeck.encryptedDeck[index] for index: ",
    //       index,
    //       "Waiting for values to match",
    //     );
    //     console.log(
    //       "eventLogEncryptedDeck.encryptedDeck",
    //       eventLogEncryptedDeck.encryptedDeck,
    //     );
    //     console.log("encryptedDeck", encryptedDeck);
    //     return;
    //   }
    // }

    const c1 = generateC1(g2048, roundKeys.r, p256); // todo: player should keep it from the original encrypted shuffle
    console.log("generated c1", c1.toString(16));
    const decryptedCards = revealCommunityCardsIndexes.map((index) => {
      const card = room.encryptedDeck[index];
      const decryptedCard = decryptCard({
        encryptedCard: {
          c1,
          c2: BigInt(card),
        },
        privateKey: roundKeys.privateKey as bigint,
      });
      console.log("decryptedCard", decryptedCard);
      return decryptedCard;
    });
    console.log("decryptedCards", decryptedCards);
    const partiallyDecryptedCardsHexStrings = decryptedCards.map((card) => {
      const hexstring = `0x${card.toString(16).padStart(64, "0")}` as `0x${string}`;
      if (hexstring.length % 2 !== 0) {
        console.log("hexstring not even", hexstring);
      }
      return hexstring;
    });
    console.log(
      "submitDecryptionValues partiallyDecryptedCardsHexStrings",
      partiallyDecryptedCardsHexStrings,
    );
    if (hasPromptedStageObligation === null) {
      setHasPromptedStageObligation(room.stage);

      const txHash2 = await submitDecryptionValues({
        args: [revealCommunityCardsIndexes, partiallyDecryptedCardsHexStrings],
      });
      console.log("txHash2", txHash2);
      setTxHash2(txHash2);
    }
  }

  console.log("/components/game/PokerTable room, players", room, players);
  // Calculate positions for players around the table
  // const getPlayerPositions = (playerCount: number, currentPlayerIndex: number) => {
  const getPlayerPositions = (playerCount: number) => {
    // For mobile optimization, we'll arrange players in a circular pattern
    const positions = [];
    // Reduce the radius to bring players closer to the center
    const radius = 40; // % of container (reduced from 45%)
    const centerX = 53; // lower to shift players to the left
    const centerY = 50;

    // Find the current player's index
    // const currentIndex = currentPlayerIndex !== -1 ? currentPlayerIndex : 0;
    const currentIndex = 0;

    for (let i = 0; i < playerCount; i++) {
      // Calculate the position relative to the current player
      // This ensures the current player is always at the bottom
      const relativePosition = (i - currentIndex + playerCount) % playerCount;

      // Calculate angle based on relative position
      // Start at bottom (270 degrees) for the current player
      const angle = (relativePosition * (360 / playerCount) + 270) * (Math.PI / 180);

      // Calculate position using trigonometry
      const x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);

      // moves chip count just above table white line
      if (i === 0) {
        y -= 1.5;
      }

      positions.push({ x, y });
    }

    return positions;
  };

  const handleReportInvalidCards = async () => {
    console.log("report invalid cards");
    await reportInvalidCards({
      args: [],
    });
  };

  const handleReportIdlePlayer = async () => {
    console.log("report idle player");
    await reportIdlePlayer({
      args: [],
    });
  };

  const handleResetRound = async () => {
    try {
      const hash = await resetRound({
        args: [],
      });
      setTxHashResetRound(hash);
    } catch (error) {
      console.error("Error resetting round:", error);
    }
  };

  // Find the current player's index
  // const currentPlayerIndex = players.findIndex((player) => player.addr === address);

  // not using players.length here. We don't want players to move around
  // const positions = getPlayerPositions(MAX_PLAYERS, currentPlayerIndex);
  const positions = getPlayerPositions(MAX_PLAYERS);
  return (
    // h-[calc(100vh-4rem)] originally. h-full doesn't work.
    <div className="relative w-full h-[calc(100vh-0.01rem)] bg-green-800 overflow-hidden">
      {/* Poker table felt */}
      {isDevMode && (
        <div className="z-10 absolute top-2 left-2 text-[8px] text-gray-400">
          Room: {roomId}
          <br />
          Round: {roundNumber}
          <br />
          last action: {lastActionTimestamp}
          <br />
          <ActionClock lastActionTimestamp={lastActionTimestamp} />
          <br />
          Keys:
          <br />
          r: {roundKeys?.r?.toString(16).substring(0, 5)}
          <br />
          pub: {roundKeys?.publicKey?.toString(16).substring(0, 5)}
          <br />
          priv: {roundKeys?.privateKey?.toString(16).substring(0, 5)}
        </div>
      )}
      <div className="absolute z-10 bottom-25 right-0">
        {address && ADMIN_ADDRESSES.includes(address) && (
          <Button
            onClick={handleResetRound}
            variant="ghost"
            disabled={isResettingRound || isWaitingForTxResetRound}
          >
            {isResettingRound ? (
              "Submitting..."
            ) : isWaitingForTxResetRound ? (
              "Resetting..."
            ) : (
              <TimerReset />
            )}
          </Button>
        )}
        <DevModeToggle />
      </div>
      <div className="absolute inset-[5%] bg-green-700 rounded-[40%] border-8 border-brown-800 shadow-inner">
        {/* Pot amount */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 bg-black/30 text-white px-3 py-1 rounded-full text-sm">
          Pot: ${pot}
        </div>
        {/* If there is a txn error (revert) then show the button */}
        {/* hide the btn while the txn is submitting */}
        {((stage === GameStage.Showdown &&
          !player?.handScore && // on refresh, this is how we know if the player has revealed their cards
          (isSubmittingRevealMyCards !== true || txError2)) ||
          (stage === GameStage.Shuffle &&
            (isSubmittingEncryptedDeck !== true || txError2) &&
            isPlayerTurn) ||
          (ALL_REVEAL_CARDS_STAGES.includes(stage) &&
            (isSubmittingDecryptionValues !== true || txError2) &&
            isPlayerTurn)) && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute z-15 top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
            onClick={() => {
              setHasPromptedStageObligation(null);
              handleObligation();
            }}
          >
            Submit
            {stage === GameStage.Shuffle
              ? " Encrypted Deck"
              : stage === GameStage.Showdown
                ? " Reveal My Cards"
                : ALL_REVEAL_CARDS_STAGES.includes(stage)
                  ? " Decryption Values"
                  : ""}
            {isWaitingForTx && "..."}
          </Button>
        )}
        {/* {(invalidCards?.areInvalid || true) && ( */}
        {invalidCards?.areInvalid && (
          <Button
            onClick={handleReportInvalidCards}
            className="absolute z-15 top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            variant="destructive"
          >
            Report invalid cards!
          </Button>
        )}
        {/* {(isCurrentPlayerIsIdle || true) && ( */}
        {isCurrentPlayerIsIdle && (
          <Button
            onClick={handleReportIdlePlayer}
            variant="outline"
            className="absolute z-20 top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent border-white text-white"
          >
            Report idle player {isSubmittingReportIdlePlayer ? "..." : ""}
          </Button>
        )}

        {/* Community cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
          {communityCards?.map((card) => (
            <Card
              key={card.suit + card.rank}
              card={card}
              className="w-12 h-16 sm:w-14 sm:h-20"
            />
          ))}
          {/* Placeholder for missing community cards */}
          {Array.from({ length: 5 - communityCards?.length || 0 }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="w-12 h-16 sm:w-14 sm:h-20 rounded-md border-2 border-dashed border-white/20"
            />
          ))}
        </div>

        {/* Game stage indicator */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 bg-black/30 text-white px-3 py-1 rounded-full text-xs uppercase">
          {GameStageToString[stage]}
        </div>
      </div>

      {/* Players positioned around the table */}
      <div className="absolute inset-0">
        {players.map((player) => {
          if (player.addr === zeroAddress) {
            return null;
          }
          const position = positions[player.seatPosition];
          const isCurrentUser = player.addr === address;

          console.log("player.seatPosition", player.seatPosition);
          console.log("dealerPosition", dealerPosition);
          if (player.playerIndex === dealerPosition) {
            player.isDealer = true;
            console.log("player.isDealer", player);
          } else {
            player.isDealer = false;
          }
          if (player.playerIndex === currentPlayerIndex) {
            player.isTurn = true;
          } else {
            player.isTurn = false;
          }

          return (
            <div
              key={player.addr}
              className="z-10 absolute w-[110px] transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <PlayerUI player={player} isCurrentUser={isCurrentUser} stage={stage} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

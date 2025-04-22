import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Action,
  type Room,
  type Player,
  GameStage,
  REVEAL_COMMUNITY_CARDS_STAGE,
} from "@/lib/types";
// import { dealCommunityCards, getNextStage, nextPlayer } from "@/lib/poker-utils";
import { useRouter } from "next/navigation";
import { useAccount, useConnections, useWaitForTransactionReceipt } from "wagmi";
import {
  DECK,
  decryptCard,
  formatCardDeckForShuffleAndEncrypt,
  shuffleAndEncryptDeck,
} from "../../lib/encrypted-poker-1chunk";
import {
  useWriteTexasHoldemRoomSubmitAction,
  useWriteDeckHandlerSubmitDecryptionValues,
  useWriteDeckHandlerSubmitEncryptedShuffle,
  useWriteDeckHandlerRevealMyCards,
} from "../../generated";
import {
  bigintToHexString,
  bigintToString,
  g2048,
  generateC1,
  modInverse,
  p2048,
} from "../../lib/elgamal-commutative-node-1chunk";
import { toast } from "sonner";
import {
  usePlayerCards,
  useRoundKeys,
  useSetPlayerCards,
} from "../../hooks/localRoomState";
import {
  getCommunityCardIndexes,
  getMyCardsIndexes,
  getOtherPlayersCardsIndexes,
} from "../../lib/utils";
import * as bigintModArith from "bigint-mod-arith";
import { useGetPlayers } from "../../wagmi/wrapper";

interface GameControlsProps {
  room: Room;
  player?: Player;
  currentPlayerId?: string;
}

export function GameControls({ room, player }: GameControlsProps) {
  console.log("GameControls room", room);
  console.log("GameControls player", player);
  const connections = useConnections();
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  console.log("GameControls isPlayerTurn", isPlayerTurn);

  const [hasPromptedStageObligation, setHasPromptedStageObligation] =
    useState<GameStage | null>(null);
  const [betAmount, setBetAmount] = useState<number>(room?.currentStageBet || 0);
  const router = useRouter();
  const { address } = useAccount();
  const { data: roundKeys } = useRoundKeys(room.id, Number(room.roundNumber));
  const { data: players } = useGetPlayers();
  console.log("GameControls roundKeys", roundKeys);

  // const {
  //   data: encryptedDeck,
  //   refetch: refetchEncryptedDeck,
  //   dataUpdatedAt: encryptedDeckUpdatedAt,
  // } = useReadDeckHandlerGetEncryptedDeck({});
  // console.log("encryptedDeck", encryptedDeck);
  const {
    writeContractAsync: submitEncryptedDeck,
    isPending: isSubmittingEncryptedDeck,
    isSuccess: isSubmittingEncryptedDeckSuccess,
    isError: isSubmittingEncryptedDeckError,
    error: txError,
  } = useWriteDeckHandlerSubmitEncryptedShuffle();
  console.log("txError", txError);
  const [txHash2, setTxHash2] = useState<string | undefined>(undefined);
  const {
    data: txResult,
    isLoading: isWaitingForTx,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error: txError2,
  } = useWaitForTransactionReceipt({
    hash: txHash2 as `0x${string}`,
  });
  console.log("isSubmittingEncryptedDeck", isSubmittingEncryptedDeck);
  console.log("isSubmittingEncryptedDeckSuccess", isSubmittingEncryptedDeckSuccess);
  console.log("isSubmittingEncryptedDeckError", isSubmittingEncryptedDeckError);
  console.log("txReceipt", txResult);
  console.log("txReceipt2", isWaitingForTx);
  console.log("isTxSuccess", isTxSuccess);
  console.log("isTxError", isTxError);
  console.log("txError2", txError2);
  console.log("txError2.cause", txError2?.cause);
  console.log("txError2 user message", txError2?.message.split("\n")[0]);
  console.log("txError2.stack", txError2?.stack);
  console.log("txError2.name", txError2?.name);

  const {
    writeContractAsync: submitDecryptionValues,
    isPending: isSubmittingDecryptionValues,
    isSuccess: isSubmittingDecryptionValuesSuccess,
    isError: isSubmittingDecryptionValuesError,
    error: txErrorSubmittingDecryptionValues,
  } = useWriteDeckHandlerSubmitDecryptionValues();
  console.log("isSubmittingDecryptionValues", isSubmittingDecryptionValues);
  console.log("isSubmittingDecryptionValuesSuccess", isSubmittingDecryptionValuesSuccess);
  console.log("isSubmittingDecryptionValuesError", isSubmittingDecryptionValuesError);
  console.log("txErrorSubmittingDecryptionValues", txErrorSubmittingDecryptionValues);
  const { data: playerCards } = usePlayerCards();
  const { mutate: setPlayerCards } = useSetPlayerCards();
  const { writeContractAsync: submitAction } = useWriteTexasHoldemRoomSubmitAction();
  const {
    writeContractAsync: submitRevealMyCards,
    isPending: isSubmittingRevealMyCards,
    isSuccess: isSubmittingRevealMyCardsSuccess,
    isError: isSubmittingRevealMyCardsError,
    error: txErrorSubmittingRevealMyCards,
  } = useWriteDeckHandlerRevealMyCards();

  useEffect(() => {
    if (room?.currentStageBet) {
      setBetAmount(room?.currentStageBet * 2);
    } else {
      if (room.bigBlind) {
        setBetAmount(room.bigBlind);
      } else {
        setBetAmount(0);
      }
    }
  }, [room?.currentStageBet, room?.bigBlind]);
  useEffect(() => {
    if (txError2) {
      toast.error(txError2.message.split("\n")[0], {
        duration: 30000,
        closeButton: true,
      });
    }
  }, [txError2]);

  useEffect(() => {
    if (room.stage !== hasPromptedStageObligation) {
      console.log("stage changed, resetting prompt for stage obligation to null");
      setHasPromptedStageObligation(null);
    }
  }, [room.stage, hasPromptedStageObligation]);

  useEffect(() => {
    if (
      playerCards[0] === "" &&
      playerCards[1] === "" &&
      room &&
      room.stage > GameStage.RevealDeal
    ) {
      if (
        room.encryptedDeck !== undefined &&
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
  }, [
    playerCards,
    room.stage,
    room.encryptedDeck,
    player?.seatPosition,
    roundKeys,
    players,
  ]);

  useEffect(() => {
    console.log(
      "GC: setIsPlayerTurn",
      room.currentPlayerIndex,
      player?.playerIndex,
      room.currentPlayerIndex === player?.playerIndex,
    );
    if (room.currentPlayerIndex !== undefined && player?.playerIndex !== undefined) {
      setIsPlayerTurn(room.currentPlayerIndex === player?.playerIndex);
    }
  }, [player?.playerIndex, room.currentPlayerIndex]);

  useEffect(() => {
    if (connections.length === 0) {
      console.log("no wagmi connections yet");
      return;
    }
    // For showdown, any active player can submit reveal their cards in any order
    if (
      (!isPlayerTurn && room.stage !== GameStage.Showdown) ||
      hasPromptedStageObligation !== null
    ) {
      return;
    }
    // First shuffler uses the unencrypted deck
    if (room.encryptedDeck === undefined && room.stage !== GameStage.Shuffle) {
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
      room.stage !== GameStage.RevealDeal &&
      !REVEAL_COMMUNITY_CARDS_STAGE.includes(room.stage) &&
      room.stage !== GameStage.Showdown
    ) {
      console.log("not a valid stage for obligation");
      return;
    }
    console.log("calling handleObligation");
    handleObligation();
  }, [
    room.stage,
    room.encryptedDeck,
    isPlayerTurn,
    hasPromptedStageObligation,
    player?.seatPosition,
    roundKeys,
    connections,
  ]);

  const handleObligation = () => {
    console.log("handleObligation called");
    // if shuffle, call submitEncryptedDeck
    if (room.stage === GameStage.Shuffle && !isSubmittingEncryptedDeck) {
      console.log("BACKGROUND OBLIGATION: SHUFFLE");
      setHasPromptedStageObligation(GameStage.Shuffle);
      handleShuffle();
      // return submitEncryptedDeck({ args: [room.encryptedDeck] });
    }
    if (room.stage === GameStage.RevealDeal && !isSubmittingDecryptionValues) {
      console.log("BACKGROUND OBLIGATION: REVEAL PLAYER CARDS");
      setHasPromptedStageObligation(GameStage.RevealDeal);
      // submitDecryptionValues({ args: [[], []] });
      handleRevealPlayerCards();
    }
    // if reveal cards, call submitDecryptionValues
    if (
      REVEAL_COMMUNITY_CARDS_STAGE.includes(room.stage) &&
      !isSubmittingDecryptionValues
    ) {
      console.log("BACKGROUND OBLIGATION: REVEAL COMMUNITY CARDS");
      setHasPromptedStageObligation(room.stage);
      handleRevealCommunityCards();
    }

    // if we enter showdown and are still active, then we need to reveal our cards on the smart contract
    if (
      !player?.hasFolded &&
      !player?.joinedAndWaitingForNextRound &&
      room.stage === GameStage.Showdown &&
      !isSubmittingRevealMyCards
    ) {
      console.log("BACKGROUND OBLIGATION: SHOWDOWN REVEAL MY CARDS");
      setHasPromptedStageObligation(room.stage);
      handleSubmitRevealMyCards();
    } else if (room.stage === GameStage.Showdown) {
      console.log(
        "showdown but not submitting my reveal",
        player,
        isSubmittingRevealMyCards,
      );
    }
  };

  async function handleSubmitRevealMyCards() {
    console.log("handleSubmitRevealMyCards", room.encryptedDeck);
    if (room.encryptedDeck === undefined) {
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
    if (players === undefined) {
      console.error("handleRevealPlayerCards: players is undefined");
      return;
    }

    const revealMyCardsIndexes = getMyCardsIndexes(
      player.playerIndex,
      room.dealerPosition,
      players,
    );
    console.log("handleSubmitRevealMyCards revealMyCardsIndexes", revealMyCardsIndexes);

    const c1 = generateC1(g2048, roundKeys.r, p2048); // todo: player should keep it from the original encrypted shuffle
    const c1InversePowPrivateKey = modInverse(
      bigintModArith.modPow(c1, roundKeys.privateKey, p2048),
      p2048,
    );
    const args = [
      bigintToHexString(c1),
      bigintToHexString(roundKeys.privateKey),
      bigintToHexString(c1InversePowPrivateKey),
    ] as const;
    console.log("handleSubmitRevealMyCards args", args);
    const txHash2 = await submitRevealMyCards({
      args,
    });
    console.log("txHash2", txHash2);
    setTxHash2(txHash2);
  }

  // gen c1InversePowPrivateKey
  // const c1T = BigInt(
  //   "0xf2665a38a624f4842a01609269daac7f5551e117c56297acd911b173c9b9203e8b62e8f3eb936b4848011b7c229a9ff9b57d3f0373a0d3888e5488728568a920b2cd389e19fc1359b009f50951bafe9102433b334c30383fab880e082349182a3c2beef01f923a678d916413eafb730d4d65cdbe5edeec265cc36d12bfa096019aea81a423a94b514086a6c96d13492310d2d6681066b4e97ea0c9de988ef4546aa34a231e76debfab210de0b528d890a434ff656e73d6f6422c692e439b39f37dec20c354e8639f50319298e795e1cdae8aef6473b73704f17f9b5e03538a94f24993eab43dd806ad6baacbbcf51143f789b168a3a732d00e94570f9e42e91a",
  // );
  // const pT = BigInt(
  //   "0xab3bdb680cf7a5d81d32b1a3d6114c57803ef26b1a9451a24653f1b146560f423c35cdeb8ee4fcbd1df5cbf6643b9f544cdf2cc779fc6f9cc28929eaa38eb1a8742b84c24947e254f3c5434e34b2daf71efa1f6326128cc7d6d6500c8d963d4759189e4bae75e34d84945beb541a9b9cb441de2522066d057e0562a16d71b26a1406d054790885d3dbd8fda8f311b4c60c2e8fa7b73dbc288177925f16a98308448d58186500d21ab42c4a0678e7ec63c5a59aa30e2091363c21b09dee1740f6289a75917c29e9aeca8d835ad599fe8a21dd5c910302c6c25ce50b6d16f16799ca6552ee5148d92ee34a69e188dc4161df1237b28861810f05b43d13f47ba333",
  // );
  // const c1InversePowPrivateKey = modInverse(bigintModArith.modPow(c1T, pT, p2048), p2048);
  // console.log("c1InversePowPrivateKey", bigintToHexString(c1InversePowPrivateKey));
  // console.log("c1InversePowPrivateKey2", bigintToHexString(modInverse(c1T, p2048)));

  // Handle fold action
  const handleFold = () => {
    console.log("handleFold");
  };

  // Handle check action
  const handleCheck = async () => {
    console.log("handleCheck");
    if (!player) return;
    const txHash = await submitAction({
      args: [Action.Check, BigInt(0)],
    });
    console.log("txHash", txHash);
    setTxHash2(txHash);
  };

  // Handle call action
  const handleCall = async () => {
    console.log("handleCall");
    if (!player) return;
    const txHash = await submitAction({
      args: [Action.Call, BigInt(0)],
    });
    console.log("txHash", txHash);
    setTxHash2(txHash);
  };

  // Handle raise action
  const handleRaise = async () => {
    console.log("handleRaise");
    if (!player) return;
    const txHash = await submitAction({
      args: [Action.Raise, BigInt(betAmount)],
    });
    console.log("txHash", txHash);
    setTxHash2(txHash);
  };

  // Handle leaving game
  const handleLeaveGame = () => {
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
      // Handle leaving logic here
      router.push("/");
    }
  };

  // Determine which buttons should be enabled
  const canCheck = true;
  const canCall = true;
  const canRaise = true;
  //   gameState.currentStageBet === 0 ||
  //   (currentPlayer && currentPlayer.bet === gameState.currentStageBet);
  // const canCall =
  //   gameState.currentStageBet > 0 &&
  //   currentPlayer &&
  //   currentPlayer.bet < gameState.currentStageBet;
  // const canRaise = currentPlayer && currentPlayer.chips > 0;

  const handleShuffle = async () => {
    console.log("handleShuffle", room.encryptedDeck);
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
    if (player?.isDealer) {
      // new encrypted deck from unencrypted deck
      console.log("Deck before encrypted shuffle: ", DECK);
      deck = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r: roundKeys.r });
      console.log("Deck before encrypted shuffle, formatted deck: ", deck);
    } else {
      console.log("handleShuffle: encrypting and shuffling existing encrypted deck");
      if (!room.encryptedDeck) {
        console.error("handleShuffle: no encrypted deck");
        return;
      }
      deck = room.encryptedDeck.map((card) => ({
        c1: BigInt(0), // this c1 is not used in the encryption process
        c2: BigInt(card),
      }));
    }

    const encryptedDeckBlock = shuffleAndEncryptDeck({
      encryptedDeck: deck,
      publicKey: roundKeys.publicKey,
      r: roundKeys.r,
    });
    console.log("Deck after encrypted shuffle: ", encryptedDeckBlock);

    const encryptedDeckArray = encryptedDeckBlock.map((card) => {
      const hexstring = `0x${card.c2.toString(16).padStart(512, "0")}` as `0x${string}`;
      if (hexstring.length % 2 !== 0) {
        console.log("hexstring not even", hexstring);
      }
      return hexstring;
    });
    console.log("submitEncryptedDeck encryptedDeckArray", encryptedDeckArray);
    const txHash2 = await submitEncryptedDeck({
      args: [encryptedDeckArray],
    });
    console.log("txHash2", txHash2);
    setTxHash2(txHash2);
  };
  // , [encryptedDeck, isPlayerTurn, roundKeys, submitEncryptedDeck, player]);

  async function handleRevealPlayerCards() {
    console.log("handleRevealPlayerCards", room.encryptedDeck);
    if (room.encryptedDeck === undefined) {
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
    if (players === undefined) {
      console.error("handleRevealPlayerCards: players is undefined");
      return;
    }

    const revealOtherPlayersCardsIndexes = getOtherPlayersCardsIndexes(
      player.playerIndex,
      room.dealerPosition,
      players,
    );
    console.log(
      "handleRevealPlayerCards revealOtherPlayersCardsIndexes",
      revealOtherPlayersCardsIndexes,
    );

    const c1 = generateC1(g2048, roundKeys.r, p2048); // todo: player should keep it from the original encrypted shuffle
    console.log("generated c1", c1.toString(16));
    const decryptedCards = revealOtherPlayersCardsIndexes.map((index) => {
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
      const hexstring = `0x${card.toString(16).padStart(512, "0")}` as `0x${string}`;
      if (hexstring.length % 2 !== 0) {
        console.log("hexstring not even", hexstring);
      }
      return hexstring;
    });
    console.log(
      "submitDecryptionValues partiallyDecryptedCardsHexStrings",
      partiallyDecryptedCardsHexStrings,
    );
    const txHash2 = await submitDecryptionValues({
      args: [revealOtherPlayersCardsIndexes, partiallyDecryptedCardsHexStrings],
    });
    console.log("txHash2", txHash2);
    setTxHash2(txHash2);
  }

  async function handleDecryptMyCardsLocally() {
    console.log("handleDecryptMyCardsLocally", room.encryptedDeck);
    if (room.encryptedDeck === undefined) {
      console.log("no encrypted deck");
      return;
    }
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
    if (players === undefined) {
      console.error("handleDecryptMyCardsLocally: players is undefined");
      return;
    }
    const revealMyCardsIndexes = getMyCardsIndexes(
      player.seatPosition,
      room.dealerPosition,
      players,
    );
    console.log("revealMyCardsIndexes", revealMyCardsIndexes);
    const c1 = generateC1(g2048, roundKeys.r, p2048); // todo: player should keep it from the original encrypted shuffle
    console.log("generated c1", c1.toString(16));
    const decryptedCards = revealMyCardsIndexes.map((index) => {
      const card = room.encryptedDeck[index];
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
  }

  async function handleRevealCommunityCards() {
    console.log("handleRevealCommunityCards", room.encryptedDeck);
    if (room.encryptedDeck === undefined) {
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

    const revealCommunityCardsIndexes = getCommunityCardIndexes(
      room.stage,
      room.numPlayers,
    );
    console.log(
      "handleRevealCommunityCards revealCommunityCardsIndexes",
      revealCommunityCardsIndexes,
    );

    const c1 = generateC1(g2048, roundKeys.r, p2048); // todo: player should keep it from the original encrypted shuffle
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
      const hexstring = `0x${card.toString(16).padStart(512, "0")}` as `0x${string}`;
      if (hexstring.length % 2 !== 0) {
        console.log("hexstring not even", hexstring);
      }
      return hexstring;
    });
    console.log(
      "submitDecryptionValues partiallyDecryptedCardsHexStrings",
      partiallyDecryptedCardsHexStrings,
    );
    const txHash2 = await submitDecryptionValues({
      args: [revealCommunityCardsIndexes, partiallyDecryptedCardsHexStrings],
    });
    console.log("txHash2", txHash2);
    setTxHash2(txHash2);
  }

  if (!player) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2 flex flex-col gap-1 z-10">
      <div className="flex justify-between items-center mb-1">
        <div className="text-white">
          <span className="text-xs sm:text-sm">Bet: ${room?.currentStageBet}</span>
          <span className="text-xs sm:text-sm ml-2 sm:ml-4">Chips: ${player.chips}</span>
        </div>
      </div>
      {(isSubmittingEncryptedDeckError || isSubmittingDecryptionValuesError) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 text-xs sm:text-sm"
            disabled={!isPlayerTurn}
            onClick={handleObligation}
          >
            Submit
            {isSubmittingEncryptedDeckError ? "Encrypted Deck" : "Decryption Values"}
          </Button>
        </div>
      )}
      {/* Player actions */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleShuffle}
        >
          Submit Shuffle
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleRevealPlayerCards}
        >
          Reveal player cards
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleDecryptMyCardsLocally}
        >
          Reveal my cards
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleRevealCommunityCards}
        >
          Reveal community cards
        </Button>
      </div> */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
        <Button
          variant="destructive"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleFold}
        >
          Fold
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn || !canCheck}
          onClick={handleCheck}
        >
          Check
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 text-xs sm:text-sm bg-green-600"
          // disabled={!isPlayerTurn || !canCall}
          onClick={handleCall}
        >
          Call ${room?.currentStageBet !== undefined ? room.currentStageBet : 0}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 text-xs sm:text-sm bg-green-700"
          disabled={!isPlayerTurn || !canRaise}
          onClick={handleRaise}
        >
          Raise ${betAmount}
        </Button>
      </div>

      {/* Bet slider */}
      {isPlayerTurn && canRaise && player && (
        <div className="mt-1">
          <label htmlFor="betAmount" className="text-xs sm:text-sm text-white">
            Bet amount ${betAmount}
          </label>
          <input
            type="range"
            min={room?.currentStageBet ? room.currentStageBet * 2 : 0}
            max={
              player?.chips && player?.currentStageBet
                ? player.chips + player.currentStageBet
                : 1000
            }
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full h-4"
          />
        </div>
      )}

      <div>
        <Button
          variant="destructive"
          size="sm"
          className="h-7 text-xs px-2"
          onClick={handleLeaveGame}
        >
          Leave Game
        </Button>
      </div>

      {/* Dealer controls - only visible when it's time to advance the game */}
      {/* {allPlayersActed && gameState.stage !== "ended" && (
        <div className="mt-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs sm:text-sm"
            onClick={handleNextStage}
          >
            {gameState.stage === "river" ? "Show Cards" : "Next Round"}
          </Button>
        </div>
      )} */}
    </div>
  );
}

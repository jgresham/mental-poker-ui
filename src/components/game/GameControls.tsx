import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Action, type Room, type Player, GameStage } from "@/lib/types";
// import { dealCommunityCards, getNextStage, nextPlayer } from "@/lib/poker-utils";
import { useRouter } from "next/navigation";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  DECK,
  decryptCard,
  formatCardDeckForShuffleAndEncrypt,
  shuffleAndEncryptDeck,
} from "../../lib/encrypted-poker-1chunk";
import {
  useReadTexasHoldemRoomEncryptedDeck,
  useReadTexasHoldemRoomGetEncryptedDeck,
  useWriteTexasHoldemRoomSubmitAction,
  useWriteTexasHoldemRoomSubmitDecryptionValues,
  useWriteTexasHoldemRoomSubmitEncryptedShuffle,
} from "../../generated";
import {
  bigintToString,
  g2048,
  generateC1,
  p2048,
} from "../../lib/elgamal-commutative-node-1chunk";
import { toast } from "sonner";
import { useSetPlayerCards } from "../../hooks/localRoomState";
import { getCommunityCardIndexes } from "../../lib/utils";
interface GameControlsProps {
  room: Room;
  player?: Player;
  currentPlayerId?: string;
  isPlayerTurn?: boolean;
}

const PLAYER1_ADDRESS = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f";
const PLAYER2_ADDRESS = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";

export function GameControls({ room, isPlayerTurn, player }: GameControlsProps) {
  console.log("GameControls room", room);
  console.log("GameControls player", player);
  const [betAmount, setBetAmount] = useState<number>(room?.currentStageBet || 0);
  const router = useRouter();
  const { address } = useAccount();
  const { data: encryptedDeck } = useReadTexasHoldemRoomGetEncryptedDeck({});
  // console.log("encryptedDeck", encryptedDeck);
  const {
    writeContractAsync: submitEncryptedDeck,
    isPending: isSubmittingEncryptedDeck,
    isSuccess: isSubmittingEncryptedDeckSuccess,
    isError: isSubmittingEncryptedDeckError,
    error: txError,
  } = useWriteTexasHoldemRoomSubmitEncryptedShuffle();
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
  } = useWriteTexasHoldemRoomSubmitDecryptionValues();
  console.log("isSubmittingDecryptionValues", isSubmittingDecryptionValues);
  console.log("isSubmittingDecryptionValuesSuccess", isSubmittingDecryptionValuesSuccess);
  console.log("isSubmittingDecryptionValuesError", isSubmittingDecryptionValuesError);
  console.log("txErrorSubmittingDecryptionValues", txErrorSubmittingDecryptionValues);
  const { mutate: setPlayerCards } = useSetPlayerCards();
  const { writeContractAsync: submitAction } = useWriteTexasHoldemRoomSubmitAction();
  // const currentPlayer = currentPlayerId
  //   ? gameState.players.find((p) => p.id === currentPlayerId)
  //   : undefined;

  // const isPlayerTurn = currentPlayer?.isTurn || false;

  // Check if all active players have matched the current bet or are all-in
  // const allPlayersActed = gameState.players
  //   .filter((p) => p.isActive && !p.isAllIn)
  //   .every((p) => p.bet === gameState.currentStageBet || p.chips === 0);

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
  // Handle fold action
  const handleFold = () => {
    console.log("handleFold");
    // if (!isPlayerTurn || !currentPlayerId) return;

    // const updatedPlayers = gameState.players.map((player) =>
    //   player.id === currentPlayerId
    //     ? { ...player, isActive: false, isTurn: false }
    //     : player,
    // );

    // const newState = nextPlayer({
    //   ...gameState,
    //   players: updatedPlayers,
    // });
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
    // if (!isPlayerTurn || !currentPlayerId) return;

    // // Can only check if current bet is 0 or player has already matched it
    // if (gameState.currentStageBet > 0 && currentPlayer?.bet !== gameState.currentStageBet)
    //   return;

    // const newState = nextPlayer(gameState);
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
    // if (!isPlayerTurn || !currentPlayerId || !currentPlayer) return;

    // const amountToCall = gameState.currentStageBet - (currentPlayer.bet || 0);

    // // If player doesn't have enough chips, they go all-in
    // const isAllIn = currentPlayer.chips <= amountToCall;
    // const actualCallAmount = isAllIn ? currentPlayer.chips : amountToCall;

    // const updatedPlayers = gameState.players.map((player) =>
    //   player.id === currentPlayerId
    //     ? {
    //         ...player,
    //         chips: player.chips - actualCallAmount,
    //         bet: player.bet + actualCallAmount,
    //         isAllIn: isAllIn,
    //       }
    //     : player,
    // );

    // const newState = nextPlayer({
    //   ...gameState,
    //   players: updatedPlayers,
    //   pot: gameState.pot + actualCallAmount,
    // });
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
    // if (!isPlayerTurn || !currentPlayerId || !currentPlayer) return;

    // Calculate how much more the player needs to add
    // const currentPlayerBet = currentPlayer.bet || 0;
    // const amountToAdd = betAmount - currentPlayerBet;

    // // Check if player has enough chips
    // if (amountToAdd > currentPlayer.chips) return;

    // // Check if raise is at least the minimum (double the current bet)
    // if (betAmount < gameState.currentStageBet * 2) return;

    // const updatedPlayers = gameState.players.map((player) =>
    //   player.id === currentPlayerId
    //     ? {
    //         ...player,
    //         chips: player.chips - amountToAdd,
    //         bet: betAmount,
    //         isAllIn: player.chips - amountToAdd === 0,
    //       }
    //     : player,
    // );

    // const newState = nextPlayer({
    //   ...gameState,
    //   players: updatedPlayers,
    //   pot: gameState.pot + amountToAdd,
    //   currentStageBet: betAmount,
    // });
  };

  // Handle advancing to the next stage
  // const handleNextStage = () => {
  //   // if (!allPlayersActed) return;

  //   // Reset player bets for the new round
  //   const updatedPlayers = gameState.players.map((player) => ({
  //     ...player,
  //     bet: 0,
  //     isTurn: player.id === gameState.players[gameState.dealerIndex].id,
  //   }));

  //   // Move to the next stage and deal cards if needed
  //   const nextStage = getNextStage(gameState.stage);
  //   let newState: GameState = {
  //     ...gameState,
  //     players: updatedPlayers,
  //     stage: nextStage,
  //     currentStageBet: 0,
  //     currentPlayerIndex: gameState.dealerIndex,
  //   };

  //   // Deal community cards based on the new stage
  //   if (nextStage === "flop" || nextStage === "turn" || nextStage === "river") {
  //     newState = dealCommunityCards(newState);
  //   }
  // };

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

  async function handleShuffle() {
    console.log("handleShuffle", encryptedDeck);
    // if (encryptedDeck === undefined) {
    if (address === PLAYER1_ADDRESS) {
      // new encrypted deck from unencrypted deck
      const r = BigInt(
        "0x42487fec44e8ebebfae79a43ec4f15e29a5786ed7f560c14b1e063d1a665c26364c68ecb046fb187000fb48f5cf25cdbe5fe556040b8c501744ec352623fa6dde35cb29e971309bd5ffd2350336972a64e12fb38ba7470d08b5b05b065c42e82b48c97a3e4c577d7b78576cda00deb05caf92f56a7bb414a54262a399182ed8cf49954981886269ab273daa3da74e75541c5045f88dc57420e5d015e9f6cab562fa6580351410c31ed0401be6e6784641ffbd822fe65f0db9aed947d9eb8caf50ffa31c143492fc54aeda70c7ae710f4bd3b4fe3bb5801e38d72f47652f92db0d8f3cf2dd331a7786c887a6a176414289e76a7eb23c88bb87f05c01e21af7aac",
      );
      const publicKey = BigInt(
        "0x3604d113ebdc5af0d64c20b264ad9510bab5a5e30838e74f9166001957d57a4381053ea18cf365d4056c765553fd01701a16dc492b62b4aca50f4a7305f69d450c892d9fac8e5bb2262b85a8f5037a061a5f8374bf8d58172908c366a86a6768730a6e1b1f673d43c622b6bac660835af06f1d600193239c22461791f878dcccb5ba2d378eba454e0c35a2378d0389be911227e3fe82bd8071e5889feb8fe21696ff0170ba2c81b3ca734c07b2f3c1b3a698198151344f5cf4d473885b69d8ed97774ca246663e4dee223fb4379a86186e63ee49cf1a3afd07521d0d184db11155e116816e3e6432ca4cf577064e5e74359b2e70c4521b257dd2bfc4fad83ab3",
      );
      const privateKey = BigInt(
        "0x17961b1f461e2abcf70d0d2d6896ebc79602890102fbba7114bce0282452deb807b1cf193dddbe5330eec10abd9f35ca30cdf4c7a404bd5e7b8b493d6126361df60000f3ca12f630e95f4afdab15a7c264ee9c3df641ffaf008821a39c778fc163a8b54a6bb712437aa5bbf3a2c383362c69333bcc09f28804b61ca64012bb941ddbd7aa792416646504293e843e5f68805cca9a0817e23dbcff537f0b0929ccb6dd597ea3e63f888f70f954e71f59950b7a8dbcfe02128d7366499e5c7541910d4f050e9ee95bed9c045d5fdd6de504d080fccb6a06ba1f95a9de7fce9bca740028729c79ec352c32afb1f816708dcb997541ff8a281129588d54b31cc7203d",
      );
      console.log("Deck before encrypted shuffle: ", DECK);
      const deck: {
        c1: bigint;
        c2: bigint;
      }[] = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r });
      console.log("Deck before encrypted shuffle, formatted deck: ", deck);
      const encryptedDeckBlock = shuffleAndEncryptDeck({
        encryptedDeck: deck,
        publicKey,
        r,
        noShuffle: true,
      });
      console.log("Deck after encrypted shuffle: ", encryptedDeckBlock);

      // const encryptedDeckArray = encryptedDeckBlock.map((card) => ({
      //   val: `0x${card.c2.toString(16)}` as `0x${string}`,
      //   neg: false,
      //   bitlen: BigInt(256),
      // }));
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
    } else {
      console.log("handleShuffle: encrypting and shuffling existing encrypted deck");
      // encrypt and shuffle the existing encrypted deck
      const r = BigInt(
        "0x6f7374f6984a5cacf37ae19ba3c3ada7b4b8c5c6aa772bd32b359b1861d7161f11093300a6aca0e3615874369d89cd64f65dec586a272bf2e3ecf0ad0ef5059c4f42487901661f32c9f9abf5716505467fad3363888746e054ff93782c35320940ed140ebd4543b1b0ef2ea321b0de1351af33b47fc49c808eb07523eca5be7b09dfab97c8f2c8f413a3ab5390e62aff0fa333729f36179eaefbb69b8d2ca3b4e8179afdc5eeb021e92c42aea21f8179d76288870975bf05b9caa4e8219b6c61d8b7fc04109e2734f50bbbb470b70a0269177472c95dd26130d0f1133c760a146eafff567afa75588bdde14aeacd51680299ab32423c67d3723a195787accac7",
      );
      const publicKey = BigInt(
        "0xdb24a5cd01c51e96022355d1eefba6450bcb5e5eb7bf63e9cc65edb689c3767e1f385675d59642b4cab1b35899116715219de479814f8d968f2281d68205b11dc2cb5e27634c256feaabc81d5f8bacd734c42a6001517beed16a5c348a81ae372cb9637f54b496e28f04f7f20c852973888436053fa84e00cd512b477550beff3c1231b0fa2b505feca3d18ebf1dd3d70690558c179ae271e5b38ae06969b260962b2b008924e283b53ce8126509c0c19090621f960a3ce7cf5eb175246f08625854d438514c2a6842439f91fd693c6540b33f2a3d60907d201f97abeede6556f1ade44d2071ecb609857bbb65a8797d713f8c5e2097f2c9ead14e13037ed3cc",
      );
      const privateKey = BigInt(
        "0xab3bdb680cf7a5d81d32b1a3d6114c57803ef26b1a9451a24653f1b146560f423c35cdeb8ee4fcbd1df5cbf6643b9f544cdf2cc779fc6f9cc28929eaa38eb1a8742b84c24947e254f3c5434e34b2daf71efa1f6326128cc7d6d6500c8d963d4759189e4bae75e34d84945beb541a9b9cb441de2522066d057e0562a16d71b26a1406d054790885d3dbd8fda8f311b4c60c2e8fa7b73dbc288177925f16a98308448d58186500d21ab42c4a0678e7ec63c5a59aa30e2091363c21b09dee1740f6289a75917c29e9aeca8d835ad599fe8a21dd5c910302c6c25ce50b6d16f16799ca6552ee5148d92ee34a69e188dc4161df1237b28861810f05b43d13f47ba333",
      );
      const encryptedDeckBlock = shuffleAndEncryptDeck({
        encryptedDeck: encryptedDeck.map((card) => ({
          c1: BigInt(0),
          c2: BigInt(card),
        })),
        publicKey,
        r,
        noShuffle: true,
      });
      // const encryptedDeckArray = encryptedDeckBlock.map((card) => ({
      //   val: `0x${card.c2.toString(16)}` as `0x${string}`,
      //   neg: false,
      //   bitlen: BigInt(256),
      // }));
      // }));
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
    }
  }

  async function handleRevealPlayerCards() {
    console.log("handleRevealPlayerCards", encryptedDeck);
    if (encryptedDeck === undefined) {
      console.log("no encrypted deck");
      return;
    }
    if (address === "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720") {
      // player 2
      console.log("player 2 reveal player's cards");
      // new encrypted deck from unencrypted deck

      const r = BigInt(
        "0x42487fec44e8ebebfae79a43ec4f15e29a5786ed7f560c14b1e063d1a665c26364c68ecb046fb187000fb48f5cf25cdbe5fe556040b8c501744ec352623fa6dde35cb29e971309bd5ffd2350336972a64e12fb38ba7470d08b5b05b065c42e82b48c97a3e4c577d7b78576cda00deb05caf92f56a7bb414a54262a399182ed8cf49954981886269ab273daa3da74e75541c5045f88dc57420e5d015e9f6cab562fa6580351410c31ed0401be6e6784641ffbd822fe65f0db9aed947d9eb8caf50ffa31c143492fc54aeda70c7ae710f4bd3b4fe3bb5801e38d72f47652f92db0d8f3cf2dd331a7786c887a6a176414289e76a7eb23c88bb87f05c01e21af7aac",
      );
      const publicKey = BigInt(
        "0x3604d113ebdc5af0d64c20b264ad9510bab5a5e30838e74f9166001957d57a4381053ea18cf365d4056c765553fd01701a16dc492b62b4aca50f4a7305f69d450c892d9fac8e5bb2262b85a8f5037a061a5f8374bf8d58172908c366a86a6768730a6e1b1f673d43c622b6bac660835af06f1d600193239c22461791f878dcccb5ba2d378eba454e0c35a2378d0389be911227e3fe82bd8071e5889feb8fe21696ff0170ba2c81b3ca734c07b2f3c1b3a698198151344f5cf4d473885b69d8ed97774ca246663e4dee223fb4379a86186e63ee49cf1a3afd07521d0d184db11155e116816e3e6432ca4cf577064e5e74359b2e70c4521b257dd2bfc4fad83ab3",
      );
      const privateKey = BigInt(
        "0x17961b1f461e2abcf70d0d2d6896ebc79602890102fbba7114bce0282452deb807b1cf193dddbe5330eec10abd9f35ca30cdf4c7a404bd5e7b8b493d6126361df60000f3ca12f630e95f4afdab15a7c264ee9c3df641ffaf008821a39c778fc163a8b54a6bb712437aa5bbf3a2c383362c69333bcc09f28804b61ca64012bb941ddbd7aa792416646504293e843e5f68805cca9a0817e23dbcff537f0b0929ccb6dd597ea3e63f888f70f954e71f59950b7a8dbcfe02128d7366499e5c7541910d4f050e9ee95bed9c045d5fdd6de504d080fccb6a06ba1f95a9de7fce9bca740028729c79ec352c32afb1f816708dcb997541ff8a281129588d54b31cc7203d",
      );
      // all other player's cards are revealed
      // only
      const revealOtherPlayersCardsIndexes = [0, 2];
      // const revealOtherPlayersCardsIndexes = Array.from({ length: 52 }, (_, i) => i);

      const c1 = generateC1(g2048, r, p2048); // todo: player should keep it from the original encrypted shuffle
      console.log("generated c1", c1.toString(16));
      const decryptedCards = revealOtherPlayersCardsIndexes.map((index) => {
        const card = encryptedDeck[index];
        const decryptedCard = decryptCard({
          encryptedCard: {
            c1,
            c2: BigInt(card),
          },
          privateKey,
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
    } else {
      console.log("handleShuffle: encrypting and shuffling existing encrypted deck");
      // encrypt and shuffle the existing encrypted deck
      console.log("player 1 reveal player's cards");

      const r = BigInt(
        "0x6f7374f6984a5cacf37ae19ba3c3ada7b4b8c5c6aa772bd32b359b1861d7161f11093300a6aca0e3615874369d89cd64f65dec586a272bf2e3ecf0ad0ef5059c4f42487901661f32c9f9abf5716505467fad3363888746e054ff93782c35320940ed140ebd4543b1b0ef2ea321b0de1351af33b47fc49c808eb07523eca5be7b09dfab97c8f2c8f413a3ab5390e62aff0fa333729f36179eaefbb69b8d2ca3b4e8179afdc5eeb021e92c42aea21f8179d76288870975bf05b9caa4e8219b6c61d8b7fc04109e2734f50bbbb470b70a0269177472c95dd26130d0f1133c760a146eafff567afa75588bdde14aeacd51680299ab32423c67d3723a195787accac7",
      );
      const publicKey = BigInt(
        "0xdb24a5cd01c51e96022355d1eefba6450bcb5e5eb7bf63e9cc65edb689c3767e1f385675d59642b4cab1b35899116715219de479814f8d968f2281d68205b11dc2cb5e27634c256feaabc81d5f8bacd734c42a6001517beed16a5c348a81ae372cb9637f54b496e28f04f7f20c852973888436053fa84e00cd512b477550beff3c1231b0fa2b505feca3d18ebf1dd3d70690558c179ae271e5b38ae06969b260962b2b008924e283b53ce8126509c0c19090621f960a3ce7cf5eb175246f08625854d438514c2a6842439f91fd693c6540b33f2a3d60907d201f97abeede6556f1ade44d2071ecb609857bbb65a8797d713f8c5e2097f2c9ead14e13037ed3cc",
      );
      const privateKey = BigInt(
        "0xab3bdb680cf7a5d81d32b1a3d6114c57803ef26b1a9451a24653f1b146560f423c35cdeb8ee4fcbd1df5cbf6643b9f544cdf2cc779fc6f9cc28929eaa38eb1a8742b84c24947e254f3c5434e34b2daf71efa1f6326128cc7d6d6500c8d963d4759189e4bae75e34d84945beb541a9b9cb441de2522066d057e0562a16d71b26a1406d054790885d3dbd8fda8f311b4c60c2e8fa7b73dbc288177925f16a98308448d58186500d21ab42c4a0678e7ec63c5a59aa30e2091363c21b09dee1740f6289a75917c29e9aeca8d835ad599fe8a21dd5c910302c6c25ce50b6d16f16799ca6552ee5148d92ee34a69e188dc4161df1237b28861810f05b43d13f47ba333",
      );
      const revealOtherPlayersCardsIndexes = [1, 3];
      // const revealOtherPlayersCardsIndexes = Array.from({ length: 52 }, (_, i) => i);

      const c1 = generateC1(g2048, r, p2048); // todo: player should keep it from the original encrypted shuffle
      console.log("generated c1", c1.toString(16));
      const decryptedCards = revealOtherPlayersCardsIndexes.map((index) => {
        const card = encryptedDeck[index];
        const decryptedCard = decryptCard({
          encryptedCard: {
            c1,
            c2: BigInt(card),
          },
          privateKey,
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
  }

  async function handleRevealMyCards() {
    console.log("handleRevealMyCards", encryptedDeck);
    if (encryptedDeck === undefined) {
      console.log("no encrypted deck");
      return;
    }
    if (address === "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720") {
      // player 2
      console.log("player 2 reveal my cards");
      // new encrypted deck from unencrypted deck

      const r = BigInt(
        "0x42487fec44e8ebebfae79a43ec4f15e29a5786ed7f560c14b1e063d1a665c26364c68ecb046fb187000fb48f5cf25cdbe5fe556040b8c501744ec352623fa6dde35cb29e971309bd5ffd2350336972a64e12fb38ba7470d08b5b05b065c42e82b48c97a3e4c577d7b78576cda00deb05caf92f56a7bb414a54262a399182ed8cf49954981886269ab273daa3da74e75541c5045f88dc57420e5d015e9f6cab562fa6580351410c31ed0401be6e6784641ffbd822fe65f0db9aed947d9eb8caf50ffa31c143492fc54aeda70c7ae710f4bd3b4fe3bb5801e38d72f47652f92db0d8f3cf2dd331a7786c887a6a176414289e76a7eb23c88bb87f05c01e21af7aac",
      );
      const publicKey = BigInt(
        "0x3604d113ebdc5af0d64c20b264ad9510bab5a5e30838e74f9166001957d57a4381053ea18cf365d4056c765553fd01701a16dc492b62b4aca50f4a7305f69d450c892d9fac8e5bb2262b85a8f5037a061a5f8374bf8d58172908c366a86a6768730a6e1b1f673d43c622b6bac660835af06f1d600193239c22461791f878dcccb5ba2d378eba454e0c35a2378d0389be911227e3fe82bd8071e5889feb8fe21696ff0170ba2c81b3ca734c07b2f3c1b3a698198151344f5cf4d473885b69d8ed97774ca246663e4dee223fb4379a86186e63ee49cf1a3afd07521d0d184db11155e116816e3e6432ca4cf577064e5e74359b2e70c4521b257dd2bfc4fad83ab3",
      );
      const privateKey = BigInt(
        "0x17961b1f461e2abcf70d0d2d6896ebc79602890102fbba7114bce0282452deb807b1cf193dddbe5330eec10abd9f35ca30cdf4c7a404bd5e7b8b493d6126361df60000f3ca12f630e95f4afdab15a7c264ee9c3df641ffaf008821a39c778fc163a8b54a6bb712437aa5bbf3a2c383362c69333bcc09f28804b61ca64012bb941ddbd7aa792416646504293e843e5f68805cca9a0817e23dbcff537f0b0929ccb6dd597ea3e63f888f70f954e71f59950b7a8dbcfe02128d7366499e5c7541910d4f050e9ee95bed9c045d5fdd6de504d080fccb6a06ba1f95a9de7fce9bca740028729c79ec352c32afb1f816708dcb997541ff8a281129588d54b31cc7203d",
      );
      // all other player's cards are revealed
      // only
      const revealOtherPlayersCardsIndexes = [1, 3];
      // const revealOtherPlayersCardsIndexes = Array.from({ length: 52 }, (_, i) => i);

      const c1 = generateC1(g2048, r, p2048); // todo: player should keep it from the original encrypted shuffle
      console.log("generated c1", c1.toString(16));
      const decryptedCards = revealOtherPlayersCardsIndexes.map((index) => {
        const card = encryptedDeck[index];
        const decryptedCard = decryptCard({
          encryptedCard: {
            c1,
            c2: BigInt(card),
          },
          privateKey,
        });
        console.log("decryptedCard", bigintToString(decryptedCard));
        return bigintToString(decryptedCard);
      });
      console.log("decryptedCards", decryptedCards);
      setPlayerCards(decryptedCards as [string, string]);
      // convert from bigint to js numbers
    } else {
      console.log("handleShuffle: encrypting and shuffling existing encrypted deck");
      // encrypt and shuffle the existing encrypted deck
      console.log("player 1 reveal my cards");

      const r = BigInt(
        "0x6f7374f6984a5cacf37ae19ba3c3ada7b4b8c5c6aa772bd32b359b1861d7161f11093300a6aca0e3615874369d89cd64f65dec586a272bf2e3ecf0ad0ef5059c4f42487901661f32c9f9abf5716505467fad3363888746e054ff93782c35320940ed140ebd4543b1b0ef2ea321b0de1351af33b47fc49c808eb07523eca5be7b09dfab97c8f2c8f413a3ab5390e62aff0fa333729f36179eaefbb69b8d2ca3b4e8179afdc5eeb021e92c42aea21f8179d76288870975bf05b9caa4e8219b6c61d8b7fc04109e2734f50bbbb470b70a0269177472c95dd26130d0f1133c760a146eafff567afa75588bdde14aeacd51680299ab32423c67d3723a195787accac7",
      );
      const publicKey = BigInt(
        "0xdb24a5cd01c51e96022355d1eefba6450bcb5e5eb7bf63e9cc65edb689c3767e1f385675d59642b4cab1b35899116715219de479814f8d968f2281d68205b11dc2cb5e27634c256feaabc81d5f8bacd734c42a6001517beed16a5c348a81ae372cb9637f54b496e28f04f7f20c852973888436053fa84e00cd512b477550beff3c1231b0fa2b505feca3d18ebf1dd3d70690558c179ae271e5b38ae06969b260962b2b008924e283b53ce8126509c0c19090621f960a3ce7cf5eb175246f08625854d438514c2a6842439f91fd693c6540b33f2a3d60907d201f97abeede6556f1ade44d2071ecb609857bbb65a8797d713f8c5e2097f2c9ead14e13037ed3cc",
      );
      const privateKey = BigInt(
        "0xab3bdb680cf7a5d81d32b1a3d6114c57803ef26b1a9451a24653f1b146560f423c35cdeb8ee4fcbd1df5cbf6643b9f544cdf2cc779fc6f9cc28929eaa38eb1a8742b84c24947e254f3c5434e34b2daf71efa1f6326128cc7d6d6500c8d963d4759189e4bae75e34d84945beb541a9b9cb441de2522066d057e0562a16d71b26a1406d054790885d3dbd8fda8f311b4c60c2e8fa7b73dbc288177925f16a98308448d58186500d21ab42c4a0678e7ec63c5a59aa30e2091363c21b09dee1740f6289a75917c29e9aeca8d835ad599fe8a21dd5c910302c6c25ce50b6d16f16799ca6552ee5148d92ee34a69e188dc4161df1237b28861810f05b43d13f47ba333",
      );
      const revealOtherPlayersCardsIndexes = [0, 2];
      // const revealOtherPlayersCardsIndexes = Array.from({ length: 52 }, (_, i) => i);

      const c1 = generateC1(g2048, r, p2048); // todo: player should keep it from the original encrypted shuffle
      console.log("generated c1", c1.toString(16));
      const decryptedCards = revealOtherPlayersCardsIndexes.map((index) => {
        const card = encryptedDeck[index];
        const decryptedCard = decryptCard({
          encryptedCard: {
            c1,
            c2: BigInt(card),
          },
          privateKey,
        });
        console.log("decryptedCard", bigintToString(decryptedCard));
        return bigintToString(decryptedCard);
      });
      console.log("decryptedCards", decryptedCards);
      setPlayerCards(decryptedCards as [string, string]);
      // convert from bigint to js numbers
    }
  }

  async function handleRevealCommunityCards() {
    console.log("handleRevealCommunityCards", encryptedDeck);
    if (encryptedDeck === undefined) {
      console.log("no encrypted deck");
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
    if (address === "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720") {
      // player 2
      console.log("player 2 reveal community cards");
      // new encrypted deck from unencrypted deck

      const r = BigInt(
        "0x42487fec44e8ebebfae79a43ec4f15e29a5786ed7f560c14b1e063d1a665c26364c68ecb046fb187000fb48f5cf25cdbe5fe556040b8c501744ec352623fa6dde35cb29e971309bd5ffd2350336972a64e12fb38ba7470d08b5b05b065c42e82b48c97a3e4c577d7b78576cda00deb05caf92f56a7bb414a54262a399182ed8cf49954981886269ab273daa3da74e75541c5045f88dc57420e5d015e9f6cab562fa6580351410c31ed0401be6e6784641ffbd822fe65f0db9aed947d9eb8caf50ffa31c143492fc54aeda70c7ae710f4bd3b4fe3bb5801e38d72f47652f92db0d8f3cf2dd331a7786c887a6a176414289e76a7eb23c88bb87f05c01e21af7aac",
      );
      const publicKey = BigInt(
        "0x3604d113ebdc5af0d64c20b264ad9510bab5a5e30838e74f9166001957d57a4381053ea18cf365d4056c765553fd01701a16dc492b62b4aca50f4a7305f69d450c892d9fac8e5bb2262b85a8f5037a061a5f8374bf8d58172908c366a86a6768730a6e1b1f673d43c622b6bac660835af06f1d600193239c22461791f878dcccb5ba2d378eba454e0c35a2378d0389be911227e3fe82bd8071e5889feb8fe21696ff0170ba2c81b3ca734c07b2f3c1b3a698198151344f5cf4d473885b69d8ed97774ca246663e4dee223fb4379a86186e63ee49cf1a3afd07521d0d184db11155e116816e3e6432ca4cf577064e5e74359b2e70c4521b257dd2bfc4fad83ab3",
      );
      const privateKey = BigInt(
        "0x17961b1f461e2abcf70d0d2d6896ebc79602890102fbba7114bce0282452deb807b1cf193dddbe5330eec10abd9f35ca30cdf4c7a404bd5e7b8b493d6126361df60000f3ca12f630e95f4afdab15a7c264ee9c3df641ffaf008821a39c778fc163a8b54a6bb712437aa5bbf3a2c383362c69333bcc09f28804b61ca64012bb941ddbd7aa792416646504293e843e5f68805cca9a0817e23dbcff537f0b0929ccb6dd597ea3e63f888f70f954e71f59950b7a8dbcfe02128d7366499e5c7541910d4f050e9ee95bed9c045d5fdd6de504d080fccb6a06ba1f95a9de7fce9bca740028729c79ec352c32afb1f816708dcb997541ff8a281129588d54b31cc7203d",
      );
      // all other player's cards are revealed
      // only
      // const revealOtherPlayersCardsIndexes = Array.from({ length: 52 }, (_, i) => i);

      const c1 = generateC1(g2048, r, p2048); // todo: player should keep it from the original encrypted shuffle
      console.log("generated c1", c1.toString(16));
      const decryptedCards = revealCommunityCardsIndexes.map((index) => {
        const card = encryptedDeck[index];
        const decryptedCard = decryptCard({
          encryptedCard: {
            c1,
            c2: BigInt(card),
          },
          privateKey,
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
    } else {
      console.log("handleShuffle: encrypting and shuffling existing encrypted deck");
      // encrypt and shuffle the existing encrypted deck
      console.log("player 1 reveal player's cards");

      const r = BigInt(
        "0x6f7374f6984a5cacf37ae19ba3c3ada7b4b8c5c6aa772bd32b359b1861d7161f11093300a6aca0e3615874369d89cd64f65dec586a272bf2e3ecf0ad0ef5059c4f42487901661f32c9f9abf5716505467fad3363888746e054ff93782c35320940ed140ebd4543b1b0ef2ea321b0de1351af33b47fc49c808eb07523eca5be7b09dfab97c8f2c8f413a3ab5390e62aff0fa333729f36179eaefbb69b8d2ca3b4e8179afdc5eeb021e92c42aea21f8179d76288870975bf05b9caa4e8219b6c61d8b7fc04109e2734f50bbbb470b70a0269177472c95dd26130d0f1133c760a146eafff567afa75588bdde14aeacd51680299ab32423c67d3723a195787accac7",
      );
      const publicKey = BigInt(
        "0xdb24a5cd01c51e96022355d1eefba6450bcb5e5eb7bf63e9cc65edb689c3767e1f385675d59642b4cab1b35899116715219de479814f8d968f2281d68205b11dc2cb5e27634c256feaabc81d5f8bacd734c42a6001517beed16a5c348a81ae372cb9637f54b496e28f04f7f20c852973888436053fa84e00cd512b477550beff3c1231b0fa2b505feca3d18ebf1dd3d70690558c179ae271e5b38ae06969b260962b2b008924e283b53ce8126509c0c19090621f960a3ce7cf5eb175246f08625854d438514c2a6842439f91fd693c6540b33f2a3d60907d201f97abeede6556f1ade44d2071ecb609857bbb65a8797d713f8c5e2097f2c9ead14e13037ed3cc",
      );
      const privateKey = BigInt(
        "0xab3bdb680cf7a5d81d32b1a3d6114c57803ef26b1a9451a24653f1b146560f423c35cdeb8ee4fcbd1df5cbf6643b9f544cdf2cc779fc6f9cc28929eaa38eb1a8742b84c24947e254f3c5434e34b2daf71efa1f6326128cc7d6d6500c8d963d4759189e4bae75e34d84945beb541a9b9cb441de2522066d057e0562a16d71b26a1406d054790885d3dbd8fda8f311b4c60c2e8fa7b73dbc288177925f16a98308448d58186500d21ab42c4a0678e7ec63c5a59aa30e2091363c21b09dee1740f6289a75917c29e9aeca8d835ad599fe8a21dd5c910302c6c25ce50b6d16f16799ca6552ee5148d92ee34a69e188dc4161df1237b28861810f05b43d13f47ba333",
      );

      const c1 = generateC1(g2048, r, p2048); // todo: player should keep it from the original encrypted shuffle
      console.log("generated c1", c1.toString(16));
      const decryptedCards = revealCommunityCardsIndexes.map((index) => {
        const card = encryptedDeck[index];
        const decryptedCard = decryptCard({
          encryptedCard: {
            c1,
            c2: BigInt(card),
          },
          privateKey,
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

      {/* Player actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
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
          onClick={handleRevealMyCards}
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
      </div>
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
            min={room?.currentStageBet * 2}
            max={player.chips + player.currentStageBet}
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

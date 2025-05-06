import { p256 } from "./../src/lib/elgamal-commutative-node-1chunk";
import { expect, test, vi } from "vitest";
import {
  bigintToString,
  generatePermutations,
} from "../src/lib/elgamal-commutative-node-1chunk";
// import {
//   testMultiPartyCommutative,
//   testMultiPartyCommutativeFlipped,
// } from "../src/lib/elgamal-commutative-node";
import {
  decryptCard,
  shuffleAndEncryptDeck,
  DECK,
  formatCardDeckForShuffleAndEncrypt,
  modInverse,
} from "../src/lib/encrypted-poker-1chunk";
import * as bigintModArith from "bigint-mod-arith";
import {
  getAllRevealedCommunityCardsIndexes,
  getCommunityCardIndexes,
  getMyCardsIndexes,
  getOtherPlayersCardsIndexes,
} from "../src/lib/utils";
import { GameStage } from "../src/lib/types";

// vitest set timeout to 1 minute
// Set timeout for all tests in this file to 60 seconds
vi.setConfig({ testTimeout: 60000 });

test("test generate data, 3-player test, optional-shuffle", () => {
  const NUM_PLAYERS = 3;
  const SHUFFLE = true;
  console.log(`SHUFFLE?: ${SHUFFLE}`);

  const players: {
    publicKey: bigint;
    privateKey: bigint;
    r: bigint;
    encryptedDeck: { c1: bigint; c2: bigint }[];
    c1InversePowPrivateKey: bigint;
  }[] = [];

  // Generate keys and random values for all players
  for (let i = 0; i < NUM_PLAYERS; i++) {
    // const { publicKey, privateKey } = generateKeys();
    let publicKey = BigInt(0);
    let privateKey = BigInt(0);
    if (i === 0) {
      publicKey = BigInt(
        "0xe339067d976a1255b11d761d52d8ffd9a64c98903b2dbe78a03be5cd94cfb8d9",
      );
      privateKey = BigInt(
        "0x7f008f236006eede4a6e026e49cd1a7eeadac0e36088858e84545c16c1469e6e",
      );
    } else if (i === 1) {
      // const keys2 = generateKeys();
      // publicKey = keys2.publicKey;
      // privateKey = keys2.privateKey;
      publicKey = BigInt(
        "0xfcf8341cefd3f559b2f0f48935b5043e009c35a6dc13cc18b1173db3090b28a8",
      );
      privateKey = BigInt(
        "0xf87a3cbf05aab6ef9c94afdceb5a8af7317d5474587ce7ac4a1a836c2f3fb423",
      );
    } else {
      publicKey = BigInt(
        "0x684e23d6a2aaf120915743091e8d8bce49a10777fe17ff733f066f6da024e39d",
      );
      privateKey = BigInt(
        "0x666a6233679d309343e1b608f1fb411fe49b5e6ce2dce728deec912f90453188",
      );
    }
    // const r = randomBigIntInRange(BigInt(3), p2048);
    let r = BigInt(0);
    if (i === 0) {
      r = BigInt("0xef964d7bee8b0cdcaae8dbfdb5fc2b193a2f11c2da5e874979e89aae868a4014");
    } else if (i === 1) {
      r = BigInt("0x782ea8d386effebcae8fa1d390f26e6839864c6e56c01827e30071f6541efe7d");
    } else {
      r = BigInt("0x10c51fc72e0803cb9e161dc9ecb3cf0c0d0130bba7343dba7534c392db107512");
    }
    let deck: {
      c1: bigint;
      c2: bigint;
    }[];
    if (i > 0) {
      deck = players[i - 1].encryptedDeck;
    } else {
      deck = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r, p: p256 });
    }
    const encryptedDeck = shuffleAndEncryptDeck({
      encryptedDeck: deck,
      publicKey,
      r,
      noShuffle: !SHUFFLE,
    });
    console.log(
      `DEBUGGG: \npub: ${publicKey.toString(16).padStart(64, "0")}} \npriv: ${privateKey.toString(16).padStart(64, "0")}} \nr: ${r.toString(16).padStart(64, "0")}}, \nprevDeck: ${deck[0].c2.toString(16).padStart(64, "0")}} \n eDeck: ${encryptedDeck[0].c2.toString(16).padStart(64, "0")}}`,
    );
    const c1InversePowPrivateKey = modInverse(
      bigintModArith.modPow(encryptedDeck[0].c1, privateKey, p256),
      p256,
    );
    players.push({ publicKey, privateKey, r, encryptedDeck, c1InversePowPrivateKey });
  }
  // end player setup and shuffle loop

  const encryptedDeckAgain = shuffleAndEncryptDeck({
    encryptedDeck: players[0].encryptedDeck,
    publicKey: players[1].publicKey,
    r: players[1].r,
    noShuffle: !SHUFFLE,
  });
  console.log(
    `DEBUGGG: \npub: ${players[1].publicKey.toString(16).padStart(64, "0")}} \npriv: ${players[1].privateKey.toString(16).padStart(64, "0")}} \nr: ${players[1].r.toString(16).padStart(64, "0")}}, \nprevDeck: ${players[0].encryptedDeck[0].c2.toString(16).padStart(64, "0")}} \n eDeck: ${encryptedDeckAgain[0].c2.toString(16).padStart(64, "0")}}`,
  );

  // console.log(
  //   "TEEEEESSTTTT",
  //   encryptCard({
  //     card: bigintToString(BigInt(25)),
  //     publicKey: players[1].publicKey,
  //     r: players[1].r,
  //   })
  //     .c2.toString(16)
  //     .padStart(64, "0"),
  // );

  console.log("\n\n\n\n\n\n PLAYERS \n\n\n\n\n");
  console.log(
    JSON.stringify(
      players,
      (key, value) => (typeof value === "bigint" ? value.toString(16) : value),
      2,
    ),
  );
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    for (let j = 0; j < player.encryptedDeck.length; j++) {
      const card = player.encryptedDeck[j];
      console.log(
        `encryptedDeck${i + 1}bytes[${j}] = hex"${card.c2.toString(16).padStart(64, "0")}";`,
      );
    }
  }
  console.log("\n\n\n\n\n\n END PLAYERS \n\n\n\n\n");

  // Verify that all players' c1 values are consistent across all cards
  for (let playerIndex = 0; playerIndex < NUM_PLAYERS; playerIndex++) {
    const player = players[playerIndex];
    const playerC1Values = player.encryptedDeck.map((card) => card.c1);
    const uniquePlayerC1Values = new Set(playerC1Values);
    expect(
      uniquePlayerC1Values.size,
      `Player ${playerIndex + 1}'s c1 values are not the same for every card`,
    ).toBe(1);
  }

  // Test all possible decryption permutations for a single card
  const CARD_INDEX = 0;
  const allPermutations = generatePermutations([...Array(NUM_PLAYERS).keys()]).slice(
    0,
    3,
  );

  for (const permutation of allPermutations) {
    console.log(`Permutation: ${permutation.join("-")}`);
    let currentCard = players[NUM_PLAYERS - 1].encryptedDeck[CARD_INDEX].c2;
    // Apply decryption in the order specified by the permutation
    for (const playerIndex of permutation) {
      currentCard = decryptCard({
        encryptedCard: {
          c1: players[playerIndex].encryptedDeck[CARD_INDEX].c1,
          c2: currentCard,
        },
        privateKey: players[playerIndex].privateKey,
      });
    }

    // Verify the decrypted card is in the original deck
    const decryptedCardString = bigintToString(currentCard);
    expect(DECK).toContain(decryptedCardString);
    console.log(
      `Permutation ${permutation.join("-")} decrypted to: ${decryptedCardString}`,
    );
  }

  // Decrypt every card using a fixed permutation and validate the entire deck
  const fixedPermutation = [...Array(NUM_PLAYERS).keys()]; // 0, 1, 2, ..., 9
  let remainingCards = [...DECK];

  for (let cardIndex = 0; cardIndex < DECK.length; cardIndex++) {
    let currentCard = players[NUM_PLAYERS - 1].encryptedDeck[cardIndex].c2;

    // Apply decryption in the fixed order
    for (const playerIndex of fixedPermutation) {
      currentCard = decryptCard({
        encryptedCard: {
          c1: players[playerIndex].encryptedDeck[cardIndex].c1,
          c2: currentCard,
        },
        privateKey: players[playerIndex].privateKey,
      });
    }

    const decryptedCardString = bigintToString(currentCard);
    expect(DECK).toContain(decryptedCardString); // card in original deck
    expect(remainingCards).toContain(decryptedCardString); // card is not a duplicate
    remainingCards = remainingCards.filter((card) => card !== decryptedCardString);
  }
  // All cards were encrypted and decrypted without duplicates or extra cards
  expect(remainingCards.length).toBe(0);

  // Start reveal cards and validate

  console.log("\n\n\n\n\n\n DECRYPT CARDS \n\n\n\n\n");
  // for (let i = 0; i < players.length; i++) {
  //   const player = players[i];
  //   for (let j = 0; j < player.encryptedDeck.length; j++) {
  //     const card = player.encryptedDeck[j];
  //     console.log(`decryptedDeck[${j}] = hex"${card.c2.toString(16).padStart(64, "0")}}";`);
  //   }
  // }
  const contractPlayers = [
    {
      addr: "0x123",
      seatPosition: 0,
    },
    {
      addr: "0x456",
      seatPosition: 1,
    },
    {
      addr: "0x789",
      seatPosition: 2,
    },
  ];
  const dealerPosition = 0;
  const latestEncryptedDeck = players[NUM_PLAYERS - 1].encryptedDeck;
  for (let i = 0; i < NUM_PLAYERS; i++) {
    const currentPlayerIndex = i;
    const otherPlayersIndexes = getOtherPlayersCardsIndexes(
      currentPlayerIndex,
      dealerPosition,
      contractPlayers,
    );
    console.log(`otherPlayersIndexes: ${otherPlayersIndexes}`);

    const decryptedCards = otherPlayersIndexes.map((index) => {
      const card = latestEncryptedDeck[index];
      const decryptedCard = decryptCard({
        encryptedCard: {
          c1: players[i].encryptedDeck[i].c1, // always same
          c2: card.c2,
        },
        privateKey: players[i].privateKey as bigint,
      });
      console.log("decryptedCard", decryptedCard);
      // update the latest encrypted deck
      latestEncryptedDeck[index].c2 = decryptedCard;
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
      `NEW Player ${i} decrypted cards: \n${partiallyDecryptedCardsHexStrings.join("\n")}\n at indicies ${otherPlayersIndexes}`,
    );
    otherPlayersIndexes.forEach((playerIndex, index) => {
      console.log(`cardIndexes[${index}] = ${playerIndex};`);
    });
    decryptedCards.forEach((card, index) => {
      console.log(
        `decryptionValues[${index}] = BigNumbers.init(hex"${card.toString(16).padStart(64, "0")}", false);`,
      );
    });
  }

  // ======= Decrypt community cards =======
  // just have each player decrypt all the community cards
  const allCommunityCardIndexes = getAllRevealedCommunityCardsIndexes(
    GameStage.Showdown,
    NUM_PLAYERS,
  );
  console.log(`allCommunityCardIndexes: ${allCommunityCardIndexes}`);
  for (let i = 0; i < NUM_PLAYERS; i++) {
    const decryptedCards = allCommunityCardIndexes.map((index) => {
      const card = latestEncryptedDeck[index];
      const decryptedCard = decryptCard({
        encryptedCard: {
          c1: players[i].encryptedDeck[i].c1, // always same
          c2: card.c2,
        },
        privateKey: players[i].privateKey as bigint,
      });
      console.log("decryptedCard", decryptedCard);
      // update the latest encrypted deck
      latestEncryptedDeck[index].c2 = decryptedCard;
      return decryptedCard;
    });
    console.log("decryptedCards", decryptedCards);
    // const partiallyDecryptedCardsHexStrings = decryptedCards.map((card) => {
    //   const hexstring = `0x${card.toString(16).padStart(64, "0")}` as `0x${string}`;
    //   if (hexstring.length % 2 !== 0) {
    //     console.log("hexstring not even", hexstring);
    //   }
    //   return hexstring;
    // });
    // console.log(
    //   `NEW Player ${i} decrypted cards: \n${partiallyDecryptedCardsHexStrings.join("\n")}\n at indicies ${otherPlayersIndexes}`,
    // );
    allCommunityCardIndexes.forEach((cardIndex, index) => {
      console.log(`communityCardIndexes[${index}] = ${cardIndex};`);
    });
    decryptedCards.forEach((card, index) => {
      console.log(
        `decryptionValues[${index}] = BigNumbers.init(hex"${card.toString(16).padStart(64, "0")}", false);`,
      );
    });
    if (i === NUM_PLAYERS - 1) {
      const cardStrings: string[] = [];
      for (const card of decryptedCards) {
        cardStrings.push(bigintToString(card));
      }
      console.log(`=========== communityCards = [${cardStrings.join(", ")}];`);
    }
  }
  for (let i = 0; i < NUM_PLAYERS; i++) {
    const currentPlayerIndex = i;
    const myCardsIndexes = getMyCardsIndexes(
      currentPlayerIndex,
      dealerPosition,
      contractPlayers,
    );
    console.log(`myCardsIndexes: ${myCardsIndexes}`);

    const decryptedCards = myCardsIndexes.map((index) => {
      const card = latestEncryptedDeck[index];
      const decryptedCard = decryptCard({
        encryptedCard: {
          c1: players[i].encryptedDeck[i].c1, // always same
          c2: card.c2,
        },
        privateKey: players[i].privateKey as bigint,
      });
      console.log("decryptedCard", decryptedCard);
      // update the latest encrypted deck
      latestEncryptedDeck[index].c2 = decryptedCard;
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
      `NEW Player ${i} decrypted cards: \n${partiallyDecryptedCardsHexStrings.join("\n")}\n at indicies ${myCardsIndexes}`,
    );
    myCardsIndexes.forEach((cardIndex, index) => {
      console.log(`cardIndexes[${index}] = ${cardIndex};`);
    });
    decryptedCards.forEach((card, index) => {
      console.log(
        `decryptionValues[${index}] = BigNumbers.init(hex"${card.toString(16).padStart(64, "0")}", false);`,
      );
    });
    console.log(
      `====== player ${currentPlayerIndex} cards [${bigintToString(decryptedCards[0])}, ${bigintToString(decryptedCards[1])}] `,
    );
  }
  // ======= End decrypt community cards =======
  console.log("\n\n\n\n\n\n END DECRYPT CARDS \n\n\n\n\n");
});

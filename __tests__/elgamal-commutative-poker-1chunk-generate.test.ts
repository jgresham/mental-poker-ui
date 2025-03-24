import { expect, test, vi } from "vitest";
import {
  bigintToString,
  encryptMessageBigint,
  generateKeys,
  stringToBigint,
  p2048,
  generateC1,
  g2048,
  generatePermutations,
  getTimestamp,
  removeEncryptionLayer,
} from "../src/lib/elgamal-commutative-node-1chunk";
// import {
//   testMultiPartyCommutative,
//   testMultiPartyCommutativeFlipped,
// } from "../src/lib/elgamal-commutative-node";
import {
  decryptCard,
  encryptCard,
  encryptCardDeck,
  encryptEncryptedCard,
  encryptEncryptedDeck,
  shuffleAndEncryptCardDeck,
  shuffleAndEncryptDeck,
  shuffleAndEncryptEncryptedDeck,
  DECK,
  formatCardDeckForShuffleAndEncrypt,
} from "../src/lib/encrypted-poker-1chunk";
import { randomBigIntInRange } from "../src/lib/prime";
import * as bigintModArith from "bigint-mod-arith";

// vitest set timeout to 1 minute
// Set timeout for all tests in this file to 60 seconds
vi.setConfig({ testTimeout: 60000 });

test("test generate data, NUM_PLAYERS-player test, shuffle, decrypt every card with 3 permutations", () => {
  const NUM_PLAYERS = 2;

  const players: {
    publicKey: bigint;
    privateKey: bigint;
    r: bigint;
    encryptedDeck: { c1: bigint; c2: bigint }[];
  }[] = [];

  // Generate keys and random values for all players
  for (let i = 0; i < NUM_PLAYERS; i++) {
    const { publicKey, privateKey } = generateKeys();
    const r = randomBigIntInRange(BigInt(3), p2048);
    let deck: {
      c1: bigint;
      c2: bigint;
    }[];
    if (i > 0) {
      deck = players[i - 1].encryptedDeck;
    } else {
      deck = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r });
    }
    const encryptedDeck = shuffleAndEncryptDeck({
      encryptedDeck: deck,
      publicKey,
      r,
    });
    players.push({ publicKey, privateKey, r, encryptedDeck });
  }

  console.log("\n\n\n\n\n\n PLAYERS \n\n\n\n\n");
  console.log(
    JSON.stringify(
      players,
      (key, value) => (typeof value === "bigint" ? value.toString(16) : value),
      2,
    ),
  );
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
});

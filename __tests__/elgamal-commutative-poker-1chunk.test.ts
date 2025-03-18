import { expect, test, vi } from "vitest";
import {
  bigintToString,
  encryptMessageBigint,
  generateKeys,
  randomBigIntInRange,
  stringToBigint,
  testMultiPartyCommutative,
  testMultiPartyCommutativeFlipped,
  p2048,
  generateC1,
  g2048,
  generatePermutations,
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
} from "../src/lib/encrypted-poker-1chunk";
import {
  chunksToString,
  encryptMessageChunks,
} from "../src/lib/elgamal-commutative-node-fixedr";

// ['0'...'51']
const DECK = [...Array(52).keys()].map((i) => i.toString());

test("testMultiPartyCommutative_hello", () => {
  const result = testMultiPartyCommutative({ msg: "Hello, world!", parties: 3 });
  expect(result).toBe(true);
});

test("testMultiPartyCommutativeFlipped_hello", () => {
  const result = testMultiPartyCommutativeFlipped({ msg: "Hello, world!", parties: 3 });
  expect(result).toBe(true);
});

test("testMultiPartyCommutativeFlipped_51", () => {
  const result = testMultiPartyCommutativeFlipped({ msg: "51", parties: 3 });
  expect(result).toBe(true);
});

test("encrypted-poker.ts, single player test, single card", () => {
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const encryptedCard = encryptCard({
    card: DECK[0],
    publicKey: publicKey1,
    privateKey: privateKey1,
  });
  const decryptedCard = decryptCard({
    encryptedCard,
    privateKey: privateKey1,
  });
  const decryptedCardString = bigintToString(decryptedCard);
  expect(decryptedCardString).toBe(DECK[0]);

  const encryptedCard1 = encryptCard({
    card: DECK[1],
    publicKey: publicKey1,
    privateKey: privateKey1,
  });
  const decryptedCard1 = decryptCard({
    encryptedCard: encryptedCard1,
    privateKey: privateKey1,
  });
  const decryptedCard1String = bigintToString(decryptedCard1);
  expect(decryptedCard1String).toBe(DECK[1]);
});

test("encrypted-poker.ts, two player's test, single card", () => {
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
  const encryptedCardPlayer1 = encryptCard({
    card: DECK[29],
    publicKey: publicKey1,
    privateKey: privateKey1,
  });
  const encryptedCardPlayer2 = encryptEncryptedCard({
    encryptedCard: encryptedCardPlayer1.c2,
    publicKey: publicKey2,
    privateKey: privateKey2,
  });
  // first test order of decryption 2 -> 1, then 1 -> 2
  const decryptedCardPlayer2_Perm1 = decryptCard({
    encryptedCard: encryptedCardPlayer2,
    privateKey: privateKey2,
  });
  // here we want to use player 1's private key to decrypt the card AND player1'sc1s
  const decryptedCardPlayer1_Perm1 = decryptCard({
    encryptedCard: { c1: encryptedCardPlayer1.c1, c2: decryptedCardPlayer2_Perm1 },
    privateKey: privateKey1,
  });
  const decryptedCardString = bigintToString(decryptedCardPlayer1_Perm1);
  expect(decryptedCardString).toBe(DECK[29]);

  // now decryption order is player 1 -> 2
  const decryptedCardPlayer1_Perm2 = decryptCard({
    encryptedCard: { c1: encryptedCardPlayer1.c1, c2: encryptedCardPlayer2.c2 },
    privateKey: privateKey1,
  });
  // here we want to use player 1's private key to decrypt the card AND player1'sc1s
  const decryptedCardPlayer2_Perm2 = decryptCard({
    encryptedCard: { c1: encryptedCardPlayer2.c1, c2: decryptedCardPlayer1_Perm2 },
    privateKey: privateKey2,
  });
  const decryptedCardString_Perm2 = bigintToString(decryptedCardPlayer2_Perm2);
  expect(decryptedCardString_Perm2).toBe(DECK[29]);
});

// test("encrypted-poker.ts, three player's test, single card", () => {
//   const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
//   const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
//   const { publicKey: publicKey3, privateKey: privateKey3 } = generateKeys();
//   const encryptedCardPlayer1 = encryptCard({
//     card: DECK[29],
//     publicKey: publicKey1,
//     privateKey: privateKey1,
//   });
//   const encryptedCardPlayer2 = encryptEncryptedCard({
//     encryptedCard: encryptedCardPlayer1.map((e) => e.c2),
//     publicKey: publicKey2,
//     privateKey: privateKey2,
//   });
//   const permutations = generatePermutations([...Array(3).keys()]);
//   // first test order of decryption 2 -> 1, then 1 -> 2
//   const decryptedCardPlayer2_Perm1 = decryptCard({
//     encryptedCard: encryptedCardPlayer2,
//     privateKey: privateKey2,
//   });
//   // here we want to use player 1's private key to decrypt the card AND player1'sc1s
//   const decryptedCardPlayer1_Perm1 = decryptCard({
//     encryptedCard: decryptedCardPlayer2_Perm1.map((c2, i) => ({
//       c1: encryptedCardPlayer1[i].c1,
//       c2,
//     })),
//     privateKey: privateKey1,
//   });
//   const decryptedCardString = chunksToString(decryptedCardPlayer1_Perm1);
//   expect(decryptedCardString).toBe(DECK[29]);

//   // now decryption order is player 1 -> 2
//   const decryptedCardPlayer1_Perm2 = decryptCard({
//     encryptedCard: encryptedCardPlayer2.map((cardChunk, i) => ({
//       c1: encryptedCardPlayer1[i].c1,
//       c2: cardChunk.c2,
//     })), // the last encrypted c2 value
//     privateKey: privateKey1,
//   });
//   // here we want to use player 1's private key to decrypt the card AND player1'sc1s
//   const decryptedCardPlayer2_Perm2 = decryptCard({
//     encryptedCard: decryptedCardPlayer1_Perm2.map((c2, i) => ({
//       c1: encryptedCardPlayer2[i].c1,
//       c2,
//     })),
//     privateKey: privateKey2,
//   });
//   const decryptedCardString_Perm2 = chunksToString(decryptedCardPlayer2_Perm2);
//   expect(decryptedCardString_Perm2).toBe(DECK[29]);
// });

test("encrypted-poker.ts, single player test, no shuffle and shuffle", () => {
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const encryptedDeck1 = encryptCardDeck({
    deck: DECK,
    publicKey: publicKey1,
    privateKey: privateKey1,
  });
  const decryptedCard = decryptCard({
    encryptedCard: encryptedDeck1[0],
    privateKey: privateKey1,
  });
  const decryptedCardString = bigintToString(decryptedCard);
  expect(DECK).toContain(decryptedCardString);
  expect(decryptedCardString).toBe(DECK[0]);

  // Test shuffleAndEncryptCardDeck
  const encryptedDeck2 = shuffleAndEncryptCardDeck({
    deck: DECK,
    publicKey: publicKey1,
    privateKey: privateKey1,
  });
  const decryptedCard2 = decryptCard({
    encryptedCard: encryptedDeck2[0],
    privateKey: privateKey1,
  });
  const decryptedCard2String = bigintToString(decryptedCard2);
  expect(DECK).toContain(decryptedCard2String);
});

test("encrypted-poker.ts, two player test, no shuffle", () => {
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
  const r1 = randomBigIntInRange(BigInt(3), p2048);
  const r2 = randomBigIntInRange(BigInt(3), p2048);

  const encryptedDeck1 = encryptCardDeck({
    deck: DECK,
    publicKey: publicKey1,
    privateKey: privateKey1,
    r: r1,
  });
  expect(encryptedDeck1.length).toBe(DECK.length);

  const encryptedDeck2 = encryptEncryptedDeck({
    encryptedDeck: encryptedDeck1,
    publicKey: publicKey2,
    privateKey: privateKey2,
    r: r2,
  });
  expect(encryptedDeck2.length).toBe(DECK.length);

  // verify that all of a player's c1 values are the same for every card
  console.log(
    "Verifying player 1's c1 values are the same for every card",
    encryptedDeck1,
  );
  const p1c1Values = encryptedDeck1.map((card) => card.c1);
  const uniqueP1C1Values = new Set(p1c1Values);
  expect(
    uniqueP1C1Values.size,
    "Player 1's c1 values are not the same for every card",
  ).toBe(1);

  console.log(
    "Verifying player 2's c1 values are the same for every card",
    encryptedDeck2,
  );
  const p2c1Values = encryptedDeck2.map((card) => card.c1);
  const uniqueP2C1Values = new Set(p2c1Values);
  expect(
    uniqueP2C1Values.size,
    "Player 2's c1 values are not the same for every card",
  ).toBe(1);

  // First test order of decryption 2 -> 1
  const CARD_INDEX = 0;
  const partiallyDecryptedCard2_Perm1 = decryptCard({
    encryptedCard: encryptedDeck2[CARD_INDEX], // ok, uses player2's c1 and c2 values
    privateKey: privateKey2,
  });
  const decryptedCard1_Perm1 = decryptCard({
    encryptedCard: {
      c1: encryptedDeck1[CARD_INDEX].c1,
      c2: partiallyDecryptedCard2_Perm1,
    },
    privateKey: privateKey1,
  });
  const decryptedCardString_Perm1 = bigintToString(decryptedCard1_Perm1);
  expect(DECK).toContain(decryptedCardString_Perm1);
  expect(decryptedCardString_Perm1).toBe(DECK[0]);

  // Now test order of decryption 1 -> 2 for another card
  const CARD_INDEX_2 = 51;
  const partiallyDecryptedCard1_Perm2 = decryptCard({
    encryptedCard: {
      c1: encryptedDeck1[CARD_INDEX_2].c1,
      c2: encryptedDeck2[CARD_INDEX_2].c2,
    },
    privateKey: privateKey1,
  });
  const decryptedCard2_Perm2 = decryptCard({
    encryptedCard: {
      c1: encryptedDeck2[CARD_INDEX_2].c1,
      c2: partiallyDecryptedCard1_Perm2,
    },
    privateKey: privateKey2,
  });
  const decryptedCardString_Perm2 = bigintToString(decryptedCard2_Perm2);
  expect(DECK).toContain(decryptedCardString_Perm2);
  expect(decryptedCardString_Perm2).toBe(DECK[51]);
});

test("encrypted-poker.ts, two player test, shuffle, decrypt every card", () => {
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
  const r1 = randomBigIntInRange(BigInt(3), p2048);
  const r2 = randomBigIntInRange(BigInt(3), p2048);

  const encryptedDeck1 = shuffleAndEncryptCardDeck({
    deck: DECK,
    publicKey: publicKey1,
    privateKey: privateKey1,
    r: r1,
  });
  const encryptedDeck2 = shuffleAndEncryptEncryptedDeck({
    encryptedDeck: encryptedDeck1,
    publicKey: publicKey2,
    privateKey: privateKey2,
    r: r2,
  });

  // verify that all of a player's c1 values are the same for every card
  const p1c1Values = encryptedDeck1.map((card) => card.c1);
  const uniqueP1C1Values = new Set(p1c1Values);
  expect(
    uniqueP1C1Values.size,
    "Player 1's c1 values are not the same for every card",
  ).toBe(1);

  const p2c1Values = encryptedDeck2.map((card) => card.c1);
  const uniqueP2C1Values = new Set(p2c1Values);
  expect(
    uniqueP2C1Values.size,
    "Player 2's c1 values are not the same for every card",
  ).toBe(1);

  // First test order of decryption 2 -> 1
  const CARD_INDEX = 0;
  const partiallyDecryptedCard2_Perm1 = decryptCard({
    encryptedCard: encryptedDeck2[CARD_INDEX], // ok, uses player2's c1 and c2 values
    privateKey: privateKey2,
  });
  const decryptedCard1_Perm1 = decryptCard({
    encryptedCard: {
      c1: encryptedDeck1[CARD_INDEX].c1,
      c2: partiallyDecryptedCard2_Perm1,
    },
    privateKey: privateKey1,
  });
  const decryptedCardString_Perm1 = bigintToString(decryptedCard1_Perm1);
  console.log(
    "encrypted-poker.ts, two player test, shuffle() decryptedCardString_Perm1: ",
    decryptedCardString_Perm1,
  );
  expect(DECK).toContain(decryptedCardString_Perm1);
  // expect(decryptedCardString_Perm1).toBe(DECK[0]);

  // Now test order of decryption 1 -> 2 for another card
  const CARD_INDEX_2 = 51;
  const partiallyDecryptedCard1_Perm2 = decryptCard({
    encryptedCard: {
      c1: encryptedDeck1[CARD_INDEX_2].c1,
      c2: encryptedDeck2[CARD_INDEX_2].c2,
    },
    privateKey: privateKey1,
  });
  const decryptedCard2_Perm2 = decryptCard({
    encryptedCard: {
      c1: encryptedDeck2[CARD_INDEX_2].c1,
      c2: partiallyDecryptedCard1_Perm2,
    },
    privateKey: privateKey2,
  });
  const decryptedCardString_Perm2 = bigintToString(decryptedCard2_Perm2);
  expect(DECK).toContain(decryptedCardString_Perm2);
  console.log(
    "encrypted-poker.ts, two player test, shuffle() decryptedCardString_Perm2: ",
    decryptedCardString_Perm2,
  );

  // decrypt every card and validate that every card in the deck was found
  let remainingCards = [...DECK];
  for (let i = 0; i < DECK.length; i++) {
    const cardIndex = i;
    const partiallyDecryptedCardLoop_Perm1_1 = decryptCard({
      encryptedCard: {
        c1: encryptedDeck1[cardIndex].c1,
        c2: encryptedDeck2[cardIndex].c2,
      }, // !! use player1's c1 and PLAYER2's c2 values
      privateKey: privateKey1,
    });
    const decryptedCardLoop_Perm1_2 = decryptCard({
      encryptedCard: {
        c1: encryptedDeck2[cardIndex].c1,
        c2: partiallyDecryptedCardLoop_Perm1_1,
      },
      privateKey: privateKey2,
    });
    const decryptedCardStringLoop_Perm1 = bigintToString(decryptedCardLoop_Perm1_2);
    expect(DECK).toContain(decryptedCardStringLoop_Perm1); // card in original deck
    expect(remainingCards).toContain(decryptedCardStringLoop_Perm1); // card is not a duplicate
    remainingCards = remainingCards.filter(
      (card) => card !== decryptedCardStringLoop_Perm1,
    );
  }
  // all cards were encrypted and decrypted without duplicates or extra cards
  expect(remainingCards.length).toBe(0);
});

// vitest set timeout to 1 minute
// Set timeout for all tests in this file to 60 seconds
vi.setConfig({ testTimeout: 60000 });

test("encrypted-poker.ts, 10-player test, shuffle, decrypt every card with 3 permutations", () => {
  const NUM_PLAYERS = 10;

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
      const c1 = generateC1(r, g2048, p2048);
      deck = DECK.map((card) => {
        const c2 = stringToBigint(card);
        return { c1, c2 };
      });
    }
    const encryptedDeck = shuffleAndEncryptDeck({
      encryptedDeck: deck,
      publicKey,
      privateKey,
      r,
    });
    players.push({ publicKey, privateKey, r, encryptedDeck });
  }

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

test("encrypted-poker.ts, 10/multi-player test, shuffle, decrypt every card with all permutations", () => {
  const NUM_PLAYERS = 3;

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
      const c1 = generateC1(r, g2048, p2048);
      deck = DECK.map((card) => {
        const c2 = stringToBigint(card);
        return { c1, c2 };
      });
    }
    const encryptedDeck = shuffleAndEncryptDeck({
      encryptedDeck: deck,
      publicKey,
      privateKey,
      r,
    });
    players.push({ publicKey, privateKey, r, encryptedDeck });
  }

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
  const allPermutations = generatePermutations([...Array(NUM_PLAYERS).keys()]);

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

test("encrypted-poker.ts, single player test shuffle", () => {
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const encryptedDeck1 = shuffleAndEncryptCardDeck({
    deck: DECK,
    publicKey: publicKey1,
    privateKey: privateKey1,
  });
  const decryptedCard = decryptCard({
    encryptedCard: encryptedDeck1[0],
    privateKey: privateKey1,
  });
  expect(DECK).toContain(bigintToString(decryptedCard));
});

// api ->

// Test a poker game
// n players
// each player takes a turn shuffling and encrypting each item in the deck then passing it to the next player
// then all players decrypt the first two cards and send it to the first player
test("encrypted-poker.ts, 3 players, 1 card", () => {
  // generate keys
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
  const { publicKey: publicKey3, privateKey: privateKey3 } = generateKeys();
  const r1 = randomBigIntInRange(BigInt(3), p2048);
  const r2 = randomBigIntInRange(BigInt(3), p2048);
  const r3 = randomBigIntInRange(BigInt(3), p2048);
  // The issue is in the encryption/decryption flow. Let's fix it to match the testMultiPartyCommutative pattern

  // First, let's encrypt a single card to test the flow
  const testCard = DECK[0];

  // Convert to chunks like in testMultiPartyCommutative
  const chunks = stringToBigint(testCard);

  // Player 1 encrypts
  const encrypted1 = encryptMessageBigint({
    messageBigint: chunks,
    publicKey: publicKey1,
    privateKey: privateKey1,
    r: r1,
  });

  // Player 2 encrypts
  const encrypted2 = encryptMessageBigint({
    messageBigint: encrypted1.c2,
    publicKey: publicKey2,
    privateKey: privateKey2,
    r: r2,
  });

  // Player 3 encrypts
  const encrypted3 = encryptMessageBigint({
    messageBigint: encrypted2.c2,
    publicKey: publicKey3,
    privateKey: privateKey3,
    r: r3,
  });

  // Now decrypt in reverse order
  // Player 3 decrypts
  const decrypted3 = decryptCard({
    encryptedCard: encrypted3,
    privateKey: privateKey3,
  });

  // Player 2 decrypts
  const decrypted2 = decryptCard({
    encryptedCard: { c1: encrypted2.c1, c2: decrypted3 },
    privateKey: privateKey2,
  });

  // Player 1 decrypts
  const decrypted1 = decryptCard({
    encryptedCard: { c1: encrypted1.c1, c2: decrypted2 },
    privateKey: privateKey1,
  });

  // Convert back to string
  const decryptedCard = bigintToString(decrypted1);
  expect(decryptedCard).toBe(testCard);

  // // Now test the full deck encryption/decryption flow
  // const encryptedDeck1 = shuffleAndEncryptCardDeck({
  //   deck: DECK,
  //   publicKey: publicKey1,
  //   privateKey: privateKey1,
  // });

  // const encryptedDeck2 = shuffleAndEncryptEncryptedDeck({
  //   encryptedDeck: encryptedDeck1,
  //   publicKey: publicKey2,
  //   privateKey: privateKey2,
  // });

  // const encryptedDeck3 = shuffleAndEncryptEncryptedDeck({
  //   encryptedDeck: encryptedDeck2,
  //   publicKey: publicKey3,
  //   privateKey: privateKey3,
  // });

  // // Decrypt the first card
  // // Player 3 decrypts first
  // const partiallyDecryptedCard3 = decryptCard({
  //   encryptedCard: encryptedDeck3[0],
  //   privateKey: privateKey3,
  // });

  // // Player 2 decrypts next
  // const partiallyDecryptedCard2 = decryptCard({
  //   encryptedCard: encryptedDeck2[0].map((chunk, i) => ({
  //     c1: chunk.c1,
  //     c2: partiallyDecryptedCard3[i],
  //   })),
  //   privateKey: privateKey2,
  // });

  // // Player 1 decrypts last
  // const partiallyDecryptedCard1 = decryptCard({
  //   encryptedCard: encryptedDeck1[0].map((chunk, i) => ({
  //     c1: chunk.c1,
  //     c2: partiallyDecryptedCard2[i],
  //   })),
  //   privateKey: privateKey1,
  // });

  // // Convert the bigint[] to a string
  // const fullyDecryptedCard = chunksToString(partiallyDecryptedCard1);
  // expect(DECK).toContain(fullyDecryptedCard);
});

// backup, dont delete
// import { expect, test } from "vitest";
// import {
//   chunksToString,
//   encryptMessage,
//   encryptMessageChunks,
//   generateKeys,
//   stringToChunks,
//   testMultiPartyCommutative,
// } from "../src/lib/elgamal-commutative-node";
// import {
//   decryptCard,
//   shuffleAndEncryptCardDeck,
//   shuffleAndEncryptEncryptedDeck,
// } from "../src/lib/encrypted-poker";

// // ['0'...'51']
// const DECK = [...Array(52).keys()].map((i) => i.toString());
// test("testMultiPartyCommutative", () => {
//   const result = testMultiPartyCommutative({ msg: "Hello, world!", parties: 3 });
//   expect(result).toBe(true);
// });

// // api ->

// // Test a poker game
// // n players
// // each player takes a turn shuffling and encrypting each item in the deck then passing it to the next player
// // then all players decrypt the first two cards and send it to the first player
// test("encrypted-poker.ts", () => {
//   // generate keys
//   const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
//   const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
//   const { publicKey: publicKey3, privateKey: privateKey3 } = generateKeys();

//   // The issue is in the encryption/decryption flow. Let's fix it to match the testMultiPartyCommutative pattern

//   // First, let's encrypt a single card to test the flow
//   const testCard = DECK[0];

//   // Convert to chunks like in testMultiPartyCommutative
//   const chunks = stringToChunks(testCard);

//   // Player 1 encrypts
//   const encrypted1 = encryptMessageChunks({
//     messageChunks: chunks,
//     publicKey: publicKey1,
//     privateKey: privateKey1,
//   });

//   // Player 2 encrypts
//   const encrypted2 = encryptMessageChunks({
//     messageChunks: encrypted1.map(e => e.c2),
//     publicKey: publicKey2,
//     privateKey: privateKey2,
//   });

//   // Player 3 encrypts
//   const encrypted3 = encryptMessageChunks({
//     messageChunks: encrypted2.map(e => e.c2),
//     publicKey: publicKey3,
//     privateKey: privateKey3,
//   });

//   // Now decrypt in reverse order
//   // Player 3 decrypts
//   const decrypted3 = decryptCard({
//     encryptedCard: encrypted3,
//     privateKey: privateKey3,
//   });

//   // Player 2 decrypts
//   const decrypted2 = decryptCard({
//     encryptedCard: encrypted2.map((chunk, i) => ({ c1: chunk.c1, c2: decrypted3[i] })),
//     privateKey: privateKey2,
//   });

//   // Player 1 decrypts
//   const decrypted1 = decryptCard({
//     encryptedCard: encrypted1.map((chunk, i) => ({ c1: chunk.c1, c2: decrypted2[i] })),
//     privateKey: privateKey1,
//   });

//   // Convert back to string
//   const decryptedCard = chunksToString(decrypted1);
//   expect(decryptedCard).toBe(testCard);

//   // Now test the full deck encryption/decryption flow
//   const encryptedDeck1 = shuffleAndEncryptCardDeck({
//     deck: DECK,
//     publicKey: publicKey1,
//     privateKey: privateKey1,
//   });

//   const encryptedDeck2 = shuffleAndEncryptEncryptedDeck({
//     encryptedDeck: encryptedDeck1,
//     publicKey: publicKey2,
//     privateKey: privateKey2,
//   });

//   const encryptedDeck3 = shuffleAndEncryptEncryptedDeck({
//     encryptedDeck: encryptedDeck2,
//     publicKey: publicKey3,
//     privateKey: privateKey3,
//   });

//   // Decrypt the first card
//   // Player 3 decrypts first
//   const partiallyDecryptedCard3 = decryptCard({
//     encryptedCard: encryptedDeck3[0],
//     privateKey: privateKey3,
//   });

//   // Player 2 decrypts next
//   const partiallyDecryptedCard2 = decryptCard({
//     encryptedCard: encryptedDeck2[0].map((chunk, i) => ({ c1: chunk.c1, c2: partiallyDecryptedCard3[i] })),
//     privateKey: privateKey2,
//   });

//   // Player 1 decrypts last
//   const partiallyDecryptedCard1 = decryptCard({
//     encryptedCard: encryptedDeck1[0].map((chunk, i) => ({ c1: chunk.c1, c2: partiallyDecryptedCard2[i] })),
//     privateKey: privateKey1,
//   });

//   // Convert the bigint[] to a string
//   const fullyDecryptedCard = chunksToString(partiallyDecryptedCard1);
//   expect(DECK).toContain(fullyDecryptedCard);
// });

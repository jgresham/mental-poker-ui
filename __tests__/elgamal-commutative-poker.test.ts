import { expect, test } from "vitest";
import {
  chunksToString,
  encryptMessage,
  encryptMessageChunks,
  generateKeys,
  generatePermutations,
  stringToChunks,
  testMultiPartyCommutative,
  testMultiPartyCommutativeFlipped,
} from "../src/lib/elgamal-commutative-node";
import {
  decryptCard,
  encryptCard,
  encryptCardDeck,
  encryptEncryptedCard,
  encryptEncryptedDeck,
  shuffleAndEncryptCardDeck,
  shuffleAndEncryptEncryptedDeck,
} from "../src/lib/encrypted-poker";

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
  const decryptedCardString = chunksToString(decryptedCard);
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
  const decryptedCard1String = chunksToString(decryptedCard1);
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
    encryptedCard: encryptedCardPlayer1.map((e) => e.c2),
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
    encryptedCard: decryptedCardPlayer2_Perm1.map((c2, i) => ({
      c1: encryptedCardPlayer1[i].c1,
      c2,
    })),
    privateKey: privateKey1,
  });
  const decryptedCardString = chunksToString(decryptedCardPlayer1_Perm1);
  expect(decryptedCardString).toBe(DECK[29]);

  // now decryption order is player 1 -> 2
  const decryptedCardPlayer1_Perm2 = decryptCard({
    encryptedCard: encryptedCardPlayer2.map((cardChunk, i) => ({
      c1: encryptedCardPlayer1[i].c1,
      c2: cardChunk.c2,
    })), // the last encrypted c2 value
    privateKey: privateKey1,
  });
  // here we want to use player 1's private key to decrypt the card AND player1'sc1s
  const decryptedCardPlayer2_Perm2 = decryptCard({
    encryptedCard: decryptedCardPlayer1_Perm2.map((c2, i) => ({
      c1: encryptedCardPlayer2[i].c1,
      c2,
    })),
    privateKey: privateKey2,
  });
  const decryptedCardString_Perm2 = chunksToString(decryptedCardPlayer2_Perm2);
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
  const decryptedCardString = chunksToString(decryptedCard);
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
  const decryptedCard2String = chunksToString(decryptedCard2);
  expect(DECK).toContain(decryptedCard2String);
});

test("encrypted-poker.ts, two player test, no shuffle", () => {
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
  const encryptedDeck1 = encryptCardDeck({
    deck: DECK,
    publicKey: publicKey1,
    privateKey: privateKey1,
  });
  const encryptedDeck2 = encryptEncryptedDeck({
    encryptedDeck: encryptedDeck1,
    publicKey: publicKey2,
    privateKey: privateKey2,
  });

  // First test order of decryption 2 -> 1
  const CARD_INDEX = 0;
  const partiallyDecryptedCard2_Perm1 = decryptCard({
    encryptedCard: encryptedDeck2[CARD_INDEX], // ok, uses player2's c1 and c2 values
    privateKey: privateKey2,
  });
  const decryptedCard1_Perm1 = decryptCard({
    encryptedCard: partiallyDecryptedCard2_Perm1.map((c2, i) => ({
      c1: encryptedDeck1[CARD_INDEX][i].c1,
      c2,
    })),
    privateKey: privateKey1,
  });
  const decryptedCardString_Perm1 = chunksToString(decryptedCard1_Perm1);
  expect(DECK).toContain(decryptedCardString_Perm1);
  expect(decryptedCardString_Perm1).toBe(DECK[0]);

  // Now test order of decryption 1 -> 2 for another card
  const CARD_INDEX_2 = 51;
  const partiallyDecryptedCard1_Perm2 = decryptCard({
    encryptedCard: encryptedDeck1[CARD_INDEX_2].map(({ c1 }, i) => ({
      c1,
      c2: encryptedDeck2[CARD_INDEX_2][i].c2,
    })), // !! use player1's c1 and PLAYER2's c2 values
    privateKey: privateKey1,
  });
  const decryptedCard2_Perm2 = decryptCard({
    encryptedCard: partiallyDecryptedCard1_Perm2.map((c2, i) => ({
      c1: encryptedDeck2[CARD_INDEX_2][i].c1,
      c2,
    })),
    privateKey: privateKey2,
  });
  const decryptedCardString_Perm2 = chunksToString(decryptedCard2_Perm2);
  expect(DECK).toContain(decryptedCardString_Perm2);
  expect(decryptedCardString_Perm2).toBe(DECK[51]);
});

test("encrypted-poker.ts, single player test", () => {
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
  expect(DECK).toContain(chunksToString(decryptedCard));
});

// api ->

// Test a poker game
// n players
// each player takes a turn shuffling and encrypting each item in the deck then passing it to the next player
// then all players decrypt the first two cards and send it to the first player
test("encrypted-poker.ts", () => {
  // generate keys
  const { publicKey: publicKey1, privateKey: privateKey1 } = generateKeys();
  const { publicKey: publicKey2, privateKey: privateKey2 } = generateKeys();
  const { publicKey: publicKey3, privateKey: privateKey3 } = generateKeys();

  // The issue is in the encryption/decryption flow. Let's fix it to match the testMultiPartyCommutative pattern

  // First, let's encrypt a single card to test the flow
  const testCard = DECK[0];

  // Convert to chunks like in testMultiPartyCommutative
  const chunks = stringToChunks(testCard);

  // Player 1 encrypts
  const encrypted1 = encryptMessageChunks({
    messageChunks: chunks,
    publicKey: publicKey1,
    privateKey: privateKey1,
  });

  // Player 2 encrypts
  const encrypted2 = encryptMessageChunks({
    messageChunks: encrypted1.map((e) => e.c2),
    publicKey: publicKey2,
    privateKey: privateKey2,
  });

  // Player 3 encrypts
  const encrypted3 = encryptMessageChunks({
    messageChunks: encrypted2.map((e) => e.c2),
    publicKey: publicKey3,
    privateKey: privateKey3,
  });

  // Now decrypt in reverse order
  // Player 3 decrypts
  const decrypted3 = decryptCard({
    encryptedCard: encrypted3,
    privateKey: privateKey3,
  });

  // Player 2 decrypts
  const decrypted2 = decryptCard({
    encryptedCard: encrypted2.map((chunk, i) => ({ c1: chunk.c1, c2: decrypted3[i] })),
    privateKey: privateKey2,
  });

  // Player 1 decrypts
  const decrypted1 = decryptCard({
    encryptedCard: encrypted1.map((chunk, i) => ({ c1: chunk.c1, c2: decrypted2[i] })),
    privateKey: privateKey1,
  });

  // Convert back to string
  const decryptedCard = chunksToString(decrypted1);
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

import { expect, test } from "vitest";
import {
  chunksToString,
  encryptMessage,
  encryptMessageChunks,
  generateKeys,
  stringToChunks,
  testMultiPartyCommutative,
  testMultiPartyCommutativeFlipped,
} from "../src/lib/elgamal-commutative-node";
import {
  decryptCard,
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

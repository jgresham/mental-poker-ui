import * as bigintModArith from "bigint-mod-arith";

// calls an encryption library of functions to create an encrypted poker game
// shuffle and encrypt a deck
// each player takes a turn shuffling and encrypting each item in the deck then passing it to the next player
// then all players decrypt the first two cards and send it to the first player

import {
  encryptMessage,
  generateC1,
  stringToBigint,
} from "./elgamal-commutative-node-1chunk";
import { shuffleArray } from "./utils";
import { randomBigIntInRange } from "./prime";

// Start Minimal necessary functions

// ['0'...'51']
export const DECK = [...Array(52).keys()].map((i) => i.toString());

const p2048str =
  "0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF695581718399549CCEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF";
export const p2048 = BigInt(p2048str);
export const g2048 = BigInt(2);

// Modular multiplicative inverse
export function modInverse(a: bigint, m: bigint): bigint {
  // console.log(
  //   `Computing modular inverse of ${a} or hex: ${a.toString(16)} % mod ${m} or hex: ${m.toString(16)}`,
  // );
  const result = bigintModArith.modInv(a, m);
  // console.log(`Modular inverse result: ${result} or hex: ${result.toString(16)}`);
  return result;
}

// There are two cases for decrypting a card
// 1. When a player decrypts a doubly or more encrypted card
// 2. When a player decrypts the final, single encrypted card (only the players own encryption)
// This result is different for the last decrypt call which should return a string
/**
 * Decrypts a card
 * @param encryptedCard - The encrypted card to decrypt (c1, c2).
 * Only the last encrypted c2 value is used for the first decryption.
 * After that, the c2 value is the result of the previous decryption.
 * The c1 value is always the individual party's encryption.
 * @param privateKey - The private key of the player decrypting the card
 * @returns The decrypted card
 */
export function decryptCard({
  encryptedCard,
  privateKey,
}: {
  encryptedCard: { c1: bigint; c2: bigint };
  privateKey: bigint;
}): bigint {
  // constant 2048 bit prime
  const p = p2048;
  // For every chunk in the encrypted card, decrypt it
  // console.log(`decryptCard encryptedCard.c1: ${encryptedCard.c1.toString(16)}`);
  // console.log(`decryptCard encryptedCard.c2: ${encryptedCard.c2.toString(16)}`);
  // console.log(`decryptCard privateKey: ${privateKey.toString(16)}`);
  // console.log(`decryptCard p: ${p.toString(16)}`);
  const modInverseResult = modInverse(
    bigintModArith.modPow(encryptedCard.c1, privateKey, p),
    p,
  );
  // console.log(`decryptCard modInverseResult: ${modInverseResult.toString(16)}`);
  const result = (encryptedCard.c2 * modInverseResult) % p;
  console.log(
    `decryptCard result (hex) (dec): ${result.toString(16)} ${result.toString(10)}`,
  );
  return result;
}

// Called by each party encrypting the already encrypted message
/**
 * messageChunks is really just an array of c2 values
 */
export function encryptMessageBigint({
  messageBigint,
  publicKey,
  g = g2048,
  p = p2048,
  r,
}: {
  messageBigint: bigint;
  publicKey: bigint;
  g?: bigint;
  p?: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint } {
  // console.log(`Encrypting messageBigint: ${messageBigint}`);

  // Generate a random value r if not provided
  const rToUse = r ?? randomBigIntInRange(BigInt(3), p);
  // console.log(`Random value r: ${rToUse}`);

  // Compute c1 = g^r mod p
  const c1 = bigintModArith.modPow(g, rToUse, p);
  // console.log(`c1 = g^r mod p = ${c1}`);

  const c2 = (bigintModArith.modPow(publicKey, rToUse, p) * messageBigint) % p;
  // console.log(`c2 = (Y^r * m) mod p = ${c2}`);

  return { c1, c2 };
}

export function formatCardDeckForShuffleAndEncrypt({
  deck,
  r,
}: { deck: string[]; r: bigint }) {
  const c1 = generateC1(g2048, r, p2048);
  const formattedDeck = deck.map((card) => {
    const c2 = stringToBigint(card);
    return { c1, c2 };
  });
  return formattedDeck;
}

/**
 * Shuffle and encrypt a deck (This should be used over the other shuffleAndEncrypt functions)
 * c1 is not used in the encryption process ... hmm
 * @param encryptedDeck - The encrypted deck to shuffle
 * @param publicKey - The public key of the player encrypting the deck
 * @param r - The random value used to encrypt the deck
 * @returns The shuffled and encrypted deck
 */
export function shuffleAndEncryptDeck({
  encryptedDeck,
  publicKey,
  r,
  noShuffle,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[];
  publicKey: bigint;
  r?: bigint;
  noShuffle?: boolean;
}): { c1: bigint; c2: bigint }[] {
  const startTime = performance.now();

  // shuffle the deck
  let shuffledEncryptedDeck = shuffleArray([
    ...encryptedDeck,
  ] as unknown[]) as typeof encryptedDeck;
  if (noShuffle) {
    shuffledEncryptedDeck = [...encryptedDeck];
  }
  // encrypt each card in the deck
  const doubleOrMoreEncryptedDeck = shuffledEncryptedDeck.map(
    (encryptedMessageBigint: { c1: bigint; c2: bigint }) =>
      encryptMessageBigint({
        messageBigint: encryptedMessageBigint.c2,
        publicKey,
        r,
      }),
  );

  const endTime = performance.now();
  console.log(`shuffleAndEncryptDeck execution time: ${endTime - startTime}ms`);

  return doubleOrMoreEncryptedDeck;
}

// End Minimal necessary functions

// consumer will want apis:
// shuffleAndEncryptDeck(deck: string[] | bigint[], privateKey: bigint) -> encryptedDeck: bigint[]
// decryptCard(encryptedCard: bigint, privateKey: bigint) -> card: string | bigint
export function shuffleAndEncryptCardDeck({
  deck,
  publicKey,
  r,
}: {
  deck: string[];
  publicKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint }[] {
  // shuffle the deck
  // Type assertion to handle both string[] and bigint[] cases
  const shuffledDeck = shuffleArray([...deck] as unknown[]) as typeof deck;
  // encrypt each card in the deck
  const encryptedDeck = shuffledDeck.map((card) =>
    encryptMessage({ message: card, publicKey, r }),
  );
  return encryptedDeck;
}

export function encryptCardDeck({
  deck,
  publicKey,
  r,
}: {
  deck: string[];
  publicKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint }[] {
  const encryptedDeck = deck.map((card) =>
    encryptMessage({ message: card, publicKey, r }),
  );
  return encryptedDeck;
}

export function encryptCard({
  card,
  publicKey,
  r,
}: {
  card: string;
  publicKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint } {
  return encryptMessage({ message: card, publicKey, r });
}

export function encryptEncryptedCard({
  encryptedCard,
  publicKey,
  r,
}: {
  encryptedCard: bigint; // c2 value
  publicKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint } {
  return encryptMessageBigint({
    messageBigint: encryptedCard,
    publicKey,
    r,
  });
}

export function encryptEncryptedDeck({
  encryptedDeck,
  publicKey,
  r,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[];
  publicKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint }[] {
  // encrypt each card in the deck
  const doubleOrMoreEncryptedDeck = encryptedDeck.map(
    (encryptedMessageBigint: { c1: bigint; c2: bigint }) => {
      return encryptMessageBigint({
        messageBigint: encryptedMessageBigint.c2,
        publicKey,
        r,
      });
    },
  );
  return doubleOrMoreEncryptedDeck;
}

export function shuffleAndEncryptEncryptedDeck({
  encryptedDeck,
  publicKey,
  r,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[];
  publicKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint }[] {
  // shuffle the deck
  // Type assertion to handle both string[] and bigint[] cases
  const shuffledEncryptedDeck = shuffleArray([
    ...encryptedDeck,
  ] as unknown[]) as typeof encryptedDeck;
  // encrypt each card in the deck
  const doubleOrMoreEncryptedDeck = shuffledEncryptedDeck.map(
    (encryptedMessageBigint: { c1: bigint; c2: bigint }) =>
      encryptMessageBigint({
        messageBigint: encryptedMessageBigint.c2,
        publicKey,
        r,
      }),
  );
  return doubleOrMoreEncryptedDeck;
}

// calls an encryption library of functions to create an encrypted poker game
// shuffle and encrypt a deck
// each player takes a turn shuffling and encrypting each item in the deck then passing it to the next player
// then all players decrypt the first two cards and send it to the first player

import {
  encryptChunk,
  encryptMessage,
  encryptMessageChunks,
  generatePermutations,
  getSafeChunkSize,
  getTimestamp,
  removeEncryptionLayer,
  testMultiPartyCommutative,
} from "./elgamal-commutative-node";
import { shuffleArray } from "./utils";

// consumer will want apis:
// shuffleAndEncryptDeck(deck: string[] | bigint[], privateKey: bigint) -> encryptedDeck: bigint[]
// decryptCard(encryptedCard: bigint, privateKey: bigint) -> card: string | bigint

export function shuffleAndEncryptCardDeck({
  deck,
  publicKey,
  privateKey,
}: {
  deck: string[];
  publicKey: bigint;
  privateKey: bigint;
}): { c1: bigint; c2: bigint }[][] {
  // shuffle the deck
  // Type assertion to handle both string[] and bigint[] cases
  // const shuffledDeck = shuffleArray([...deck] as unknown[]) as typeof deck;
  const shuffledDeck = [...deck];
  // encrypt each card in the deck
  const encryptedDeck = shuffledDeck.map((card) =>
    encryptMessage({ message: card, publicKey, privateKey }),
  );
  return encryptedDeck;
}

export function shuffleAndEncryptEncryptedDeck({
  encryptedDeck,
  publicKey,
  privateKey,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[][];
  publicKey: bigint;
  privateKey: bigint;
}): { c1: bigint; c2: bigint }[][] {
  // shuffle the deck
  // Type assertion to handle both string[] and bigint[] cases
  const shuffledEncryptedDeck = shuffleArray([
    ...encryptedDeck,
  ] as unknown[]) as typeof encryptedDeck;
  // encrypt each card in the deck
  const doubleOrMoreEncryptedDeck = shuffledEncryptedDeck.map(
    (messageChunks: { c1: bigint; c2: bigint }[]) =>
      encryptMessageChunks({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        messageChunks: messageChunks.map(({ c1: _c1, c2 }) => c2),
        publicKey,
        privateKey,
      }),
  );
  return doubleOrMoreEncryptedDeck;
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
  encryptedCard: { c1: bigint; c2: bigint }[];
  privateKey: bigint;
}): bigint[] {
  // For every chunk in the encrypted card, decrypt it
  const decryptedCard = encryptedCard.map((chunk) =>
    removeEncryptionLayer(chunk.c1, chunk.c2, privateKey),
  );
  return decryptedCard;
}

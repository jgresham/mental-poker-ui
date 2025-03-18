// calls an encryption library of functions to create an encrypted poker game
// shuffle and encrypt a deck
// each player takes a turn shuffling and encrypting each item in the deck then passing it to the next player
// then all players decrypt the first two cards and send it to the first player

import {
  encryptMessage,
  encryptMessageBigint,
  removeEncryptionLayer,
} from "./elgamal-commutative-node-1chunk";
import { shuffleArray } from "./utils";

// consumer will want apis:
// shuffleAndEncryptDeck(deck: string[] | bigint[], privateKey: bigint) -> encryptedDeck: bigint[]
// decryptCard(encryptedCard: bigint, privateKey: bigint) -> card: string | bigint
export function shuffleAndEncryptCardDeck({
  deck,
  publicKey,
  privateKey,
  r,
}: {
  deck: string[];
  publicKey: bigint;
  privateKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint }[] {
  // shuffle the deck
  // Type assertion to handle both string[] and bigint[] cases
  const shuffledDeck = shuffleArray([...deck] as unknown[]) as typeof deck;
  // encrypt each card in the deck
  const encryptedDeck = shuffledDeck.map((card) =>
    encryptMessage({ message: card, publicKey, privateKey, r }),
  );
  return encryptedDeck;
}

export function encryptCardDeck({
  deck,
  publicKey,
  privateKey,
  r,
}: {
  deck: string[];
  publicKey: bigint;
  privateKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint }[] {
  const encryptedDeck = deck.map((card) =>
    encryptMessage({ message: card, publicKey, privateKey, r }),
  );
  return encryptedDeck;
}

export function encryptCard({
  card,
  publicKey,
  privateKey,
  r,
}: {
  card: string;
  publicKey: bigint;
  privateKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint } {
  return encryptMessage({ message: card, publicKey, privateKey, r });
}

export function encryptEncryptedCard({
  encryptedCard,
  publicKey,
  privateKey,
  r,
}: {
  encryptedCard: bigint; // c2 value
  publicKey: bigint;
  privateKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint } {
  const encryptedMessageChunks = encryptMessageChunks({
    messageBigint: encryptedCard,
    publicKey,
    privateKey,
    r,
  });
  return encryptedMessageChunks;
}

export function encryptEncryptedDeck({
  encryptedDeck,
  publicKey,
  privateKey,
  r,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[];
  publicKey: bigint;
  privateKey: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint }[] {
  // encrypt each card in the deck
  const doubleOrMoreEncryptedDeck = encryptedDeck.map(
    (encryptedMessageBigint: { c1: bigint; c2: bigint }) => {
      return encryptMessageBigint({
        messageBigint: encryptedMessageBigint.c2,
        publicKey,
        privateKey,
        r,
      });
    },
  );
  return doubleOrMoreEncryptedDeck;
}
// same as shuffleAndEncryptEncryptedDeck
export function shuffleAndEncryptDeck({
  encryptedDeck,
  publicKey,
  privateKey,
  r,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[];
  publicKey: bigint;
  privateKey: bigint;
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
        privateKey,
        r,
      }),
  );
  return doubleOrMoreEncryptedDeck;
}

export function shuffleAndEncryptEncryptedDeck({
  encryptedDeck,
  publicKey,
  privateKey,
  r,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[];
  publicKey: bigint;
  privateKey: bigint;
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
        privateKey,
        r,
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
  encryptedCard: { c1: bigint; c2: bigint };
  privateKey: bigint;
}): bigint {
  // For every chunk in the encrypted card, decrypt it
  return removeEncryptionLayer(encryptedCard.c1, encryptedCard.c2, privateKey);
}

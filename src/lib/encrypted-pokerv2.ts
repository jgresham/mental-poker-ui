import {
  encryptChunk,
  encryptMessage,
  encryptMessageChunks,
  generatePermutations,
  getSafeChunkSize,
  getTimestamp,
  removeEncryptionLayer,
} from "./elgamal-commutative-node";
import { shuffleArray } from "./utils";

// Initial deck encryption (by first player)
export function shuffleAndEncryptCardDeck({
  deck,
  publicKey,
  privateKey,
}: {
  deck: string[];
  publicKey: bigint;
  privateKey: bigint;
}): { c1: bigint; c2: bigint }[][] {
  // Shuffle the deck
  const shuffledDeck = shuffleArray([...deck]);

  // Encrypt each card in the deck
  const encryptedDeck = shuffledDeck.map((card) =>
    encryptMessage({ message: card, publicKey, privateKey }),
  );

  return encryptedDeck;
}

// Subsequent encryption by other players
export function shuffleAndEncryptEncryptedDeck({
  encryptedDeck,
  publicKey,
  privateKey,
}: {
  encryptedDeck: { c1: bigint; c2: bigint }[][];
  publicKey: bigint;
  privateKey: bigint;
}): { c1: bigint; c2: bigint }[][] {
  // Shuffle the deck
  const shuffledEncryptedDeck = shuffleArray([...encryptedDeck]);

  // Encrypt each card in the deck
  // Important: Keep track of original c1 values for decryption
  return shuffledEncryptedDeck.map((card) => {
    // Extract the c2 values for encryption
    const c2Values = card.map((chunk) => chunk.c2);

    // Encrypt these c2 values
    const newEncryption = encryptMessageChunks({
      messageChunks: c2Values,
      publicKey,
      privateKey,
    });

    // Return the new encryption (important for decryption later)
    return newEncryption;
  });
}

/**
 * Decrypts a card using player's private key
 *
 * @param encryptedCard - The encrypted card chunks
 * @param privateKey - The private key of the player decrypting the card
 * @returns The decrypted c2 values (to be used in next decryption or as final result)
 */
export function decryptCard({
  encryptedCard,
  privateKey,
}: {
  encryptedCard: { c1: bigint; c2: bigint }[];
  privateKey: bigint;
}): bigint[] {
  // For every chunk in the encrypted card, decrypt it
  return encryptedCard.map((chunk) =>
    removeEncryptionLayer(chunk.c1, chunk.c2, privateKey),
  );
}

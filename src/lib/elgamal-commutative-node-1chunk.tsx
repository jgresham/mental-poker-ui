// An n player and 1 chunk message implementation of https://asecuritysite.com/elgamal/el_comm

// Uses Web Crypto API window.crypto
import * as bigintModArith from "bigint-mod-arith";
import { randomBigIntInRange } from "./prime";

// A 2048-bit safe prime from RFC 3526 (Group 14), widely used in Diffie-Hellman
// primes and generators chosen from https://www.ietf.org/rfc/rfc3526.txt
// 2048 bit prime
// const p2048str = `0xFFFFFFFF FFFFFFFF C90FDAA2 2168C234 C4C6628B 80DC1CD1\
// 29024E08 8A67CC74 020BBEA6 3B139B22 514A0879 8E3404DD\
// EF9519B3 CD3A431B 302B0A6D F25F1437 4FE1356D 6D51C245\
// E485B576 625E7EC6 F44C42E9 A637ED6B 0BFF5CB6 F406B7ED\
// EE386BFB 5A899FA5 AE9F2411 7C4B1FE6 49286651 ECE45B3D\
// C2007CB8 A163BF05 98DA4836 1C55D39A 69163FA8 FD24CF5F\
// 83655D23 DCA3AD96 1C62F356 208552BB 9ED52907 7096966D\
// 670C354E 4ABC9804 F1746C08 CA18217C 32905E46 2E36CE3B\
// E39E772C 180E8603 9B2783A2 EC07A28F B5C55DF0 6F4C52C9\
// DE2BCBF6 95581718 3995497C EA956AE5 15D22618 98FA0510\
// 15728E5A 8AACAA68 FFFFFFFF FFFFFFFF`
export const p2048str =
  "0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF695581718399549CCEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF";
export const p2048 = BigInt(p2048str);
export const g2048 = BigInt(2);

export const p1024str =
  "0xB10B8F96A080E01DDE92DE5EAE5D54EC52C99FBCFB06A3C69A6A9DCA52D23B616073E28675A23D189838EF1E2EE652C013ECB4AEA90611231EE6A7083A8D6EBAA7FDF64B8A94B1BE24983A5CF7A0C4BD5C72C5B6630C7495C3B9CAC2FC6325517F6B6B643F1C59099BEBFBB6939A2D4C4B7D16C06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF";
export const p1024 = BigInt(p1024str);
export const g1024 = BigInt(2);

export const p512str =
  "0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD";
export const p512 = BigInt(p512str);
export const g512 = BigInt(2);

export const p256str =
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD1";
export const p256 = BigInt(p256str);
export const g256 = BigInt(2);

export const p128str = "0xFFFFFFFFFFFFFFFFC90FDAA22168C234";
export const p128 = BigInt(p128str);
export const g128 = BigInt(2);

// Function to get timestamp for logging
export function getTimestamp(): string {
  return `[${new Date().toISOString()}]`;
}

// Generate a private and public key pair
export function generateKeys(): { publicKey: bigint; privateKey: bigint } {
  const privateKey = randomBigIntInRange(BigInt(3), p256);
  const publicKey = bigintModArith.modPow(g2048, privateKey, p256);
  return { publicKey, privateKey };
}

export function generateKeysAndR(): { publicKey: bigint; privateKey: bigint; r: bigint } {
  const privateKey = randomBigIntInRange(BigInt(3), p256);
  const publicKey = bigintModArith.modPow(g2048, privateKey, p256);
  const r = randomBigIntInRange(BigInt(3), p256);
  return { publicKey, privateKey, r };
}

/**
 * Maximum size in bytes of a message that can be encrypted with the given prime
 */
export function getSafeChunkSize(p: bigint): number {
  // Get bit length of p
  const bitLength = p.toString(2).length;
  // Calculate safe byte size (allow some room for overhead)
  // Reduce by 1 byte for safety
  const safeByteSize = Math.floor((bitLength - 16) / 8);
  console.log(`${getTimestamp()} Safe chunk size calculated: ${safeByteSize} bytes`);
  return safeByteSize;
}

// Convert string to a single BigInt
export function stringToBigint(str: string, p: bigint): bigint {
  console.log(
    `${getTimestamp()} Converting string "${str}" to a single BigInt hex encoding`,
  );

  // Use TextEncoder for browser compatibility
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str);

  // Check if the string is too large
  if (buffer.length > getSafeChunkSize(p)) {
    console.error(
      `String is too large to convert to a single BigInt. Maximum size is ${getSafeChunkSize(p)} bytes, but got ${buffer.length} bytes.`,
    );
  }

  console.log(
    `${getTimestamp()} String as buffer: ${Array.from(buffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")}`,
  );

  // Convert the entire buffer to a single BigInt
  // The padStart(2, "0") ensures each byte is represented as two hex digits
  // For example, 0x5 becomes 0x05, ensuring consistent byte representation
  const bigint = BigInt(
    `0x${Array.from(buffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")}`,
  );

  console.log(`${getTimestamp()} Converted to BigInt: ${bigint}`);
  return bigint;
}

// Convert a single BigInt to string
/**
 * @param chunk - The bigint to convert to a human readable string (card string)
 * @returns The string representation of the bigint
 */
export function bigintToString(chunk: bigint): string {
  console.log(`${getTimestamp()} Converting bigint to string: ${chunk}`);

  // Use TextDecoder for browser compatibility
  const decoder = new TextDecoder();

  // Convert BigInt to hex and ensure even length
  let hexStr = chunk.toString(16);
  if (hexStr.length % 2 !== 0) hexStr = `0${hexStr}`;

  // Create array from hex
  const byteArray: number[] = [];
  for (let j = 0; j < hexStr.length; j += 2) {
    byteArray.push(Number.parseInt(hexStr.substring(j, j + 2), 16));
  }

  console.log(`${getTimestamp()} Bigint as array: [${byteArray.join(", ")}]`);

  const result = decoder.decode(new Uint8Array(byteArray));
  console.log(`${getTimestamp()} Converted to string: "${result}"`);
  return result;
}

/**
 * @param chunk - The bigint to convert to a hex string (512 length)
 * @returns The hex string representation of the bigint
 */
export function bigintToHexString(chunk: bigint): `0x${string}` {
  const strippedPrefix = chunk.toString(16).startsWith("0x")
    ? chunk.toString(16).slice(2)
    : chunk.toString(16);
  return `0x${strippedPrefix.padStart(64, "0")}` as `0x${string}`;
}

// Modular multiplicative inverse
export function modInverse(a: bigint, m: bigint): bigint {
  // console.log(
  //   `${getTimestamp()} Computing modular inverse of ${a} or hex: ${a.toString(16)} % mod ${m} or hex: ${m.toString(16)}`,
  // );
  const result = bigintModArith.modInv(a, m);
  // console.log(
  //   `${getTimestamp()} Modular inverse result: ${result} or hex: ${result.toString(16)}`,
  // );
  return result;
}

export function generateC1(g: bigint, r: bigint, p: bigint): bigint {
  return bigintModArith.modPow(g, r, p);
}

// Decrypt a BigInt chunk (remove one layer of encryption)
export function removeEncryptionLayer(
  c1: bigint,
  c2: bigint,
  privateKey: bigint,
  p = p256,
): bigint {
  console.log(
    `${getTimestamp()} Removing encryption layer with private key: ${privateKey} p=${p}`,
  );

  // Compute m = c2 * (c1^x)^-1 mod p
  const decrypted = (c2 * modInverse(bigintModArith.modPow(c1, privateKey, p), p)) % p;
  console.log(`${getTimestamp()} Removed layer: ${decrypted}`);

  return decrypted;
}

// Called by the first party encrypting the message
export function encryptMessage({
  message,
  publicKey,
  g = g2048,
  p = p256,
  r,
}: {
  message: string;
  publicKey: bigint;
  g?: bigint;
  p?: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint } {
  const bigintMessage = stringToBigint(message, p);
  return encryptMessageBigint({ messageBigint: bigintMessage, publicKey, g, p, r });
}

// Called by each party encrypting the already encrypted message
/**
 * messageChunks is really just an array of c2 values
 */
export function encryptMessageBigint({
  messageBigint,
  publicKey,
  g = g2048,
  p = p256,
  r,
}: {
  messageBigint: bigint;
  publicKey: bigint;
  g?: bigint;
  p?: bigint;
  r?: bigint;
}): { c1: bigint; c2: bigint } {
  // console.log(`${getTimestamp()} Encrypting messageBigint: ${messageBigint}`);

  // Generate a random value r if not provided
  const rToUse = r ?? randomBigIntInRange(BigInt(3), p);
  // console.log(`${getTimestamp()} Random value r: ${rToUse}`);

  // Compute c1 = g^r mod p
  const c1 = generateC1(g, rToUse, p);
  // console.log(`${getTimestamp()} c1 = g^r mod p = ${c1}`);

  const c2 = (bigintModArith.modPow(publicKey, rToUse, p) * messageBigint) % p;
  // console.log(`${getTimestamp()} c2 = (Y^r * m) mod p = ${c2}`);

  return { c1, c2 };
}

// Helper function to generate all permutations of an array
export function generatePermutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];

  const result: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const permutationsOfRemaining = generatePermutations(remaining);

    for (const perm of permutationsOfRemaining) {
      result.push([current, ...perm]);
    }
  }

  return result;
}

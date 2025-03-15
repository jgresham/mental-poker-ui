// A n player and large message implementation of https://asecuritysite.com/elgamal/el_comm

// Uses Web Crypto API window.crypto
import * as bigintModArith from "bigint-mod-arith";

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
const p2048str =
  "0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF695581718399549CCEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF";
const p2048 = BigInt(p2048str);
const g2048 = BigInt(`0x02`);

// Function to get timestamp for logging
export function getTimestamp(): string {
  return `[${new Date().toISOString()}]`;
}

// Utility function to generate a random BigInt within a range
export function randomBigIntInRange(min: bigint, max: bigint): bigint {
  console.log(`${getTimestamp()} Generating random BigInt between ${min} and ${max}`);
  const range = max - min;
  console.log(`${getTimestamp()} Range calculated: ${range}`);
  const bytesNeeded = Math.ceil(range.toString(2).length / 8);
  console.log(`${getTimestamp()} Bytes needed: ${bytesNeeded}`);

  // Use Web Crypto API instead of Node.js crypto
  const randomBytes = new Uint8Array(bytesNeeded);
  window.crypto.getRandomValues(randomBytes);

  console.log(
    `${getTimestamp()} Random bytes generated: ${Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")}`,
  );
  const randomValue = BigInt(
    "0x" +
      Array.from(randomBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
  );
  console.log(`${getTimestamp()} Random value as BigInt: ${randomValue}`);
  const result = (randomValue % range) + min;
  console.log(`${getTimestamp()} Final random BigInt: ${result}`);
  return result;
}

// Function to check if a number is prime (simplified for demonstration)
export function isPrime(n: bigint): boolean {
  console.log(`${getTimestamp()} Checking if ${n} is prime`);
  if (n <= BigInt(1)) {
    console.log(`${getTimestamp()} ${n} <= 1, returning false`);
    return false;
  }
  if (n <= BigInt(3)) {
    console.log(`${getTimestamp()} ${n} <= 3, returning true`);
    return true;
  }
  if (n % BigInt(2) === BigInt(0) || n % BigInt(3) === BigInt(0)) {
    console.log(`${getTimestamp()} ${n} is divisible by 2 or 3, returning false`);
    return false;
  }

  let i = BigInt(5);
  console.log(`${getTimestamp()} Starting primality test with i = ${i}`);
  while (i * i <= n) {
    console.log(`${getTimestamp()} Testing divisibility by ${i} and ${i + BigInt(2)}`);
    if (n % i === BigInt(0) || n % (i + BigInt(2)) === BigInt(0)) {
      console.log(
        `${getTimestamp()} ${n} is divisible by ${i} or ${i + BigInt(2)}, returning false`,
      );
      return false;
    }
    i += BigInt(6);
    console.log(`${getTimestamp()} Incremented i to ${i}`);
  }
  console.log(`${getTimestamp()} ${n} is prime, returning true`);
  return true;
}

// Function to generate a large prime number
async function generatePrime(bits: number): Promise<bigint> {
  console.log(`${getTimestamp()} Generating prime of ${bits} bits`);

  while (true) {
    console.log(`${getTimestamp()} Attempting to generate a prime number`);

    // Use Web Crypto API instead of Node.js crypto
    const bytes = new Uint8Array(Math.ceil(bits / 8));
    window.crypto.getRandomValues(bytes);

    console.log(
      `${getTimestamp()} Generated random bytes: ${Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")}`,
    );
    const num = BigInt(
      "0x" +
        Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
    );
    console.log(`${getTimestamp()} Converted to BigInt: ${num}`);
    const candidate = num | (BigInt(1) << BigInt(bits - 1)) | BigInt(1); // Ensure it's odd and has the right bit length
    console.log(`${getTimestamp()} Prime candidate: ${candidate}`);

    if (isPrime(candidate)) {
      console.log(`${getTimestamp()} Found prime number: ${candidate}`);
      return candidate;
    }
    console.log(`${getTimestamp()} Candidate was not prime, trying again`);
  }
}

// Generate a private and public key pair
export function generateKeys(): { publicKey: bigint; privateKey: bigint } {
  const privateKey = randomBigIntInRange(BigInt(3), p2048);
  const publicKey = bigintModArith.modPow(g2048, privateKey, p2048);
  return { publicKey, privateKey };
}

// Function to find a primitive root modulo p
export function primitiveRoot(p: bigint): bigint {
  console.log(`${getTimestamp()} Finding primitive root for p=${p}`);
  while (true) {
    console.log(`${getTimestamp()} Generating a random value for g`);
    const g = randomBigIntInRange(BigInt(3), p);
    console.log(`${getTimestamp()} Testing g=${g}`);

    console.log(`${getTimestamp()} Checking if g^2 mod p = 1`);
    if (bigintModArith.modPow(g, BigInt(2), p) === BigInt(1)) {
      console.log(`${getTimestamp()} g^2 mod p = 1, skipping`);
      continue;
    }

    console.log(`${getTimestamp()} Checking if g^p mod p = 1`);
    if (bigintModArith.modPow(g, p, p) === BigInt(1)) {
      console.log(`${getTimestamp()} g^p mod p = 1, skipping`);
      continue;
    }

    console.log(`${getTimestamp()} Found primitive root g=${g}`);
    return g;
  }
}

// Get safe chunk size based on prime size
export function getSafeChunkSize(p: bigint): number {
  // Get bit length of p
  const bitLength = p.toString(2).length;
  // Calculate safe byte size (allow some room for overhead)
  // Reduce by 1 byte for safety
  const safeByteSize = Math.floor((bitLength - 16) / 8);
  console.log(`${getTimestamp()} Safe chunk size calculated: ${safeByteSize} bytes`);
  return safeByteSize;
}

// Improved function to convert string to BigInt chunks
export function stringToChunks(str: string, chunkSize?: number): bigint[] {
  console.log(
    `${getTimestamp()} Converting string "${str}" to chunks with size ${chunkSize}`,
  );
  let chunkSizeToUse = chunkSize;
  if (!chunkSizeToUse) {
    chunkSizeToUse = getSafeChunkSize(p2048);
  }

  // Use TextEncoder for browser compatibility
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str);

  console.log(
    `${getTimestamp()} String as buffer: ${Array.from(buffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")}`,
  );

  const chunks: bigint[] = [];
  for (let i = 0; i < buffer.length; i += chunkSizeToUse) {
    const chunkBuffer = buffer.slice(i, i + chunkSizeToUse);
    console.log(
      `${getTimestamp()} Processing chunk ${chunks.length + 1}: ${Array.from(chunkBuffer)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")}`,
    );
    const chunk = BigInt(
      "0x" +
        Array.from(chunkBuffer)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
    );
    console.log(`${getTimestamp()} Chunk as BigInt: ${chunk}`);
    chunks.push(chunk);
  }

  console.log(`${getTimestamp()} Created ${chunks.length} chunks`);
  return chunks;
}

// Improved function to convert BigInt chunks back to string
export function chunksToString(chunks: bigint[]): string {
  console.log(`${getTimestamp()} Converting ${chunks.length} chunks back to string`);

  // Use TextDecoder for browser compatibility
  const decoder = new TextDecoder();
  let resultArray: number[] = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`${getTimestamp()} Processing chunk ${i + 1}: ${chunks[i]}`);

    // Convert BigInt to hex and ensure even length
    let hexStr = chunks[i].toString(16);
    if (hexStr.length % 2 !== 0) hexStr = `0${hexStr}`;

    // Create array from hex
    const byteArray: number[] = [];
    for (let j = 0; j < hexStr.length; j += 2) {
      byteArray.push(Number.parseInt(hexStr.substring(j, j + 2), 16));
    }

    console.log(`${getTimestamp()} Chunk ${i + 1} as array: [${byteArray.join(", ")}]`);

    // Concatenate arrays
    resultArray = resultArray.concat(byteArray);
  }

  const result = decoder.decode(new Uint8Array(resultArray));
  console.log(`${getTimestamp()} Converted to string: "${result}"`);
  return result;
}

// Modular multiplicative inverse
export function modInverse(a: bigint, m: bigint): bigint {
  console.log(`${getTimestamp()} Computing modular inverse of ${a} mod ${m}`);
  const result = bigintModArith.modInv(a, m);
  console.log(`${getTimestamp()} Modular inverse result: ${result}`);
  return result;
}

// Encrypt a BigInt chunk in the commutative scheme (for multi-party use)
export function encryptChunk(
  chunk: bigint,
  publicKey: bigint,
  privateKey: bigint,
  g: bigint,
  p: bigint,
): { c1: bigint; c2: bigint } {
  console.log(`${getTimestamp()} Encrypting chunk: ${chunk}`);

  // Generate a random value r
  // This should be done in a secure way and forgotten after use
  // It is not required in decryption
  const r = randomBigIntInRange(BigInt(3), p);
  console.log(`${getTimestamp()} Random value r: ${r}`);

  // Compute c1 = g^r mod p
  const c1 = bigintModArith.modPow(g, r, p);
  console.log(`${getTimestamp()} c1 = g^r mod p = ${c1}`);

  // Compute c2 = (Y^r * m) mod p
  const c2 = (bigintModArith.modPow(publicKey, r, p) * chunk) % p;
  console.log(`${getTimestamp()} c2 = (Y^r * m) mod p = ${c2}`);

  return { c1, c2 };
}

// Decrypt a BigInt chunk (remove one layer of encryption)
export function removeEncryptionLayer(
  c1: bigint,
  c2: bigint,
  privateKey: bigint,
  p = p2048,
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
  privateKey,
  g = g2048,
  p = p2048,
}: {
  message: string;
  publicKey: bigint;
  privateKey: bigint;
  g?: bigint;
  p?: bigint;
}): { c1: bigint; c2: bigint }[] {
  const chunks = stringToChunks(message, getSafeChunkSize(p));
  return chunks.map((chunk) => encryptChunk(chunk, publicKey, privateKey, g, p));
}

// Called by each party encrypting the already encrypted message
/**
 * messageChunks is really just an array of c2 values
 */
export function encryptMessageChunks({
  messageChunks,
  publicKey,
  privateKey,
  g = g2048,
  p = p2048,
}: {
  messageChunks: bigint[];
  publicKey: bigint;
  privateKey: bigint;
  g?: bigint;
  p?: bigint;
}): { c1: bigint; c2: bigint }[] {
  return messageChunks.map((chunk) => {
    const encrypted = encryptChunk(chunk, publicKey, privateKey, g, p);
    // encryptedResults[chunkIndex].c1Values.push(encrypted.c1);
    // encryptedResults[chunkIndex].c2 = encrypted.c2;
    return {
      c1: encrypted.c1,
      c2: encrypted.c2,
    };
  });
}

// Test multi-party commutative encryption with chunking support
// @param msg - The message to encrypt
// @param p - The prime number (defaults to 2048-bit prime)
// @param g - The generator (defaults to 2)
// @param parties - The number of parties
export function testMultiPartyCommutative({
  msg,
  p = p2048,
  g = g2048,
  parties,
}: {
  msg: string;
  p?: bigint;
  g?: bigint;
  parties: number;
}) {
  console.log(`${getTimestamp()} Testing ${parties}-party commutative message: "${msg}"`);

  // Calculate safe chunk size
  const chunkSize = getSafeChunkSize(p);
  console.log(`${getTimestamp()} Using chunk size: ${chunkSize} bytes`);

  // Convert message to chunks
  const messageChunks = stringToChunks(msg, chunkSize);
  console.log(`${getTimestamp()} Message split into ${messageChunks.length} chunks`);

  // Generate keys for each party
  const privateKeys: bigint[] = [];
  const publicKeys: bigint[] = [];

  for (let i = 0; i < parties; i++) {
    console.log(`${getTimestamp()} Generating keys for party ${i + 1}`);
    const privateKey = randomBigIntInRange(BigInt(3), p);
    privateKeys.push(privateKey);

    const publicKey = bigintModArith.modPow(g, privateKey, p);
    publicKeys.push(publicKey);

    console.log(
      `${getTimestamp()} Party ${i + 1} - Private key: ${privateKey}, Public key: ${publicKey}`,
    );
  }

  console.log(`\nMessage: "${msg}"`);

  // Display keys for all parties
  for (let i = 0; i < parties; i++) {
    console.log(`Party ${i + 1}'s Public key: g=${g}, Y=${publicKeys[i]}, p=${p}`);
    console.log(`Party ${i + 1}'s Private key: x=${privateKeys[i]}`);
  }

  // Process each chunk
  // An array of encrypted chunks (single encrypted message)
  // is an array of c1[] and the last c2 value
  const encryptedResults = messageChunks.map((chunk, chunkIndex) => {
    console.log(`\n${getTimestamp()} Processing chunk ${chunkIndex + 1}: ${chunk}`);

    // Initial ciphertext values
    const c1Values: bigint[] = [];
    let currentC2 = chunk;

    // Each party adds their encryption layer
    for (let i = 0; i < parties; i++) {
      console.log(`${getTimestamp()} Party ${i + 1} adding encryption layer`);
      const encrypted = encryptChunk(currentC2, publicKeys[i], privateKeys[i], g, p);
      c1Values.push(encrypted.c1);
      currentC2 = encrypted.c2;

      console.log(
        `${getTimestamp()} After Party ${i + 1}'s encryption: c1=${encrypted.c1}, c2=${currentC2}`,
      );
    }

    console.log(`${getTimestamp()} Final encrypted chunk: c2=${currentC2}`);

    return {
      c1Values,
      c2: currentC2,
    };
  });

  // Decryption in different orders
  const decryptResults: string[] = [];

  // Try different decryption orders
  const permutations = generatePermutations([...Array(parties).keys()]);

  for (const perm of permutations) {
    console.log(
      `\n${getTimestamp()} Trying decryption order: ${perm.map((i) => i + 1).join(" -> ")}`,
    );

    const decryptedChunks = encryptedResults.map((encryptedChunk, chunkIndex) => {
      console.log(`${getTimestamp()} Decrypting chunk ${chunkIndex + 1}`);

      // Always start with the last c2 value
      let currentC2 = encryptedChunk.c2;

      // Remove encryption layers in the order specified by perm
      for (const partyIndex of perm) {
        console.log(
          `${getTimestamp()} Party ${partyIndex + 1} removing encryption layer`,
        );
        // Use the specific party's c1 value and private key
        currentC2 = removeEncryptionLayer(
          encryptedChunk.c1Values[partyIndex],
          currentC2,
          privateKeys[partyIndex],
          p,
        );
        console.log(
          `${getTimestamp()} After Party ${partyIndex + 1}'s decryption: ${currentC2}`,
        );
      }

      return currentC2;
    });

    // Convert decrypted chunks back to string
    const decryptedMessage = chunksToString(decryptedChunks);
    console.log(`${getTimestamp()} Decrypted message: "${decryptedMessage}"`);

    decryptResults.push(decryptedMessage);
    console.log(
      `\nResult for order ${perm.map((i) => i + 1).join(" -> ")}: "${decryptedMessage}"`,
    );
  }

  // Check if all decryption orders yielded the original message
  const allCorrect = decryptResults.every((result) => result === msg);
  console.log(`\n${getTimestamp()} All decryption orders correct: ${allCorrect}`);

  return allCorrect;
}

// Modified version of testMultiPartyCommutative with flipped loops
export function testMultiPartyCommutativeFlipped({
  msg,
  p = p2048,
  g = g2048,
  parties,
}: {
  msg: string;
  p?: bigint;
  g?: bigint;
  parties: number;
}) {
  console.log(`${getTimestamp()} Testing ${parties}-party commutative message: "${msg}"`);

  // Calculate safe chunk size
  const chunkSize = getSafeChunkSize(p);
  console.log(`${getTimestamp()} Using chunk size: ${chunkSize} bytes`);

  // Convert message to chunks
  const messageChunks = stringToChunks(msg, chunkSize);
  console.log(`${getTimestamp()} Message split into ${messageChunks.length} chunks`);

  // Generate keys for each party
  const privateKeys: bigint[] = [];
  const publicKeys: bigint[] = [];

  for (let i = 0; i < parties; i++) {
    console.log(`${getTimestamp()} Generating keys for party ${i + 1}`);
    const privateKey = randomBigIntInRange(BigInt(3), p);
    privateKeys.push(privateKey);

    const publicKey = bigintModArith.modPow(g, privateKey, p);
    publicKeys.push(publicKey);

    console.log(
      `${getTimestamp()} Party ${i + 1} - Private key: ${privateKey}, Public key: ${publicKey}`,
    );
  }

  console.log(`\nMessage: "${msg}"`);

  // Display keys for all parties
  for (let i = 0; i < parties; i++) {
    console.log(`Party ${i + 1}'s Public key: g=${g}, Y=${publicKeys[i]}, p=${p}`);
    console.log(`Party ${i + 1}'s Private key: x=${privateKeys[i]}`);
  }

  // Initialize arrays to store encryption data for each chunk
  const encryptedResults = messageChunks.map(() => ({
    c1Values: [] as bigint[],
    c2: BigInt(0),
  }));

  // Set initial c2 values to the original message chunks
  for (let chunkIndex = 0; chunkIndex < messageChunks.length; chunkIndex++) {
    encryptedResults[chunkIndex].c2 = messageChunks[chunkIndex];
  }

  // FLIPPED LOOP ORDER: Each party processes all chunks before moving to next party
  for (let i = 0; i < parties; i++) {
    console.log(
      `\n${getTimestamp()} Party ${i + 1} adding encryption layer to all chunks`,
    );

    for (let chunkIndex = 0; chunkIndex < messageChunks.length; chunkIndex++) {
      console.log(
        `${getTimestamp()} Party ${i + 1} processing chunk ${chunkIndex + 1}: current c2=${encryptedResults[chunkIndex].c2}`,
      );

      const encrypted = encryptChunk(
        encryptedResults[chunkIndex].c2,
        publicKeys[i],
        privateKeys[i],
        g,
        p,
      );

      encryptedResults[chunkIndex].c1Values.push(encrypted.c1);
      encryptedResults[chunkIndex].c2 = encrypted.c2;

      console.log(
        `${getTimestamp()} After Party ${i + 1}'s encryption of chunk ${chunkIndex + 1}: c1=${encrypted.c1}, c2=${encrypted.c2}`,
      );
    }
  }

  // Log final encrypted state
  for (let chunkIndex = 0; chunkIndex < messageChunks.length; chunkIndex++) {
    console.log(
      `${getTimestamp()} Final encrypted chunk ${chunkIndex + 1}: c2=${encryptedResults[chunkIndex].c2}`,
    );
  }

  // Decryption in different orders
  const decryptResults: string[] = [];

  // Try different decryption orders
  const permutations = generatePermutations([...Array(parties).keys()]);

  for (const perm of permutations) {
    console.log(
      `\n${getTimestamp()} Trying decryption order: ${perm.map((i) => i + 1).join(" -> ")}`,
    );

    // Deep copy the encrypted results for this permutation
    const decryptedChunks = encryptedResults.map((chunk) => ({
      c1Values: [...chunk.c1Values],
      c2: chunk.c2,
    }));

    // KEEP DECRYPTION LOOP ORDER THE SAME:
    // For each chunk, apply all decryption layers in the order of the permutation
    const finalDecryptedChunks = decryptedChunks.map((encryptedChunk, chunkIndex) => {
      console.log(`${getTimestamp()} Decrypting chunk ${chunkIndex + 1}`);

      let currentC2 = encryptedChunk.c2;

      // Remove encryption layers in the order specified by perm
      for (const partyIndex of perm) {
        console.log(
          `${getTimestamp()} Party ${partyIndex + 1} removing encryption layer from chunk ${chunkIndex + 1}`,
        );
        currentC2 = removeEncryptionLayer(
          encryptedChunk.c1Values[partyIndex],
          currentC2,
          privateKeys[partyIndex],
          p,
        );
        console.log(
          `${getTimestamp()} After Party ${partyIndex + 1}'s decryption of chunk ${chunkIndex + 1}: ${currentC2}`,
        );
      }

      return currentC2;
    });

    // Convert decrypted chunks back to string
    const decryptedMessage = chunksToString(finalDecryptedChunks);
    console.log(`${getTimestamp()} Decrypted message: "${decryptedMessage}"`);

    decryptResults.push(decryptedMessage);
    console.log(
      `\nResult for order ${perm.map((i) => i + 1).join(" -> ")}: "${decryptedMessage}"`,
    );
  }

  // Check if all decryption orders yielded the original message
  const allCorrect = decryptResults.every((result) => result === msg);
  console.log(`\n${getTimestamp()} All decryption orders correct: ${allCorrect}`);

  return allCorrect;
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

// Browser-compatible version of main function
export async function runElGamalDemo(
  message: string = "This is a test message",
  parties: number = 3,
) {
  console.log(`${getTimestamp()} Starting ElGamal demo`);

  // Use the 512-bit prime from the original code
  const p = BigInt(
    "13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006083527",
  );
  console.log(`${getTimestamp()} Using prime p: ${p}`);

  // Find primitive root
  console.log(`${getTimestamp()} Finding primitive root`);
  const g = primitiveRoot(p);
  console.log(`${getTimestamp()} Found primitive root g: ${g}`);

  // Test with the provided message
  console.log(`\n${getTimestamp()} Testing with message: "${message}"`);
  const result = testMultiPartyCommutative(message, p, g, parties);
  console.log(`${getTimestamp()} Test result: ${result}`);

  return result;
}

// Remove Node.js specific code
// console.log(`${getTimestamp()} Starting program`);
// main().catch(error => {
//   console.error(`${getTimestamp()} Error in main function:`, error);
// });

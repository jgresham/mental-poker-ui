import * as crypto from 'crypto';
import * as bigintModArith from 'bigint-mod-arith';
import { promisify } from 'util';

// Function to get timestamp for logging
function getTimestamp(): string {
  return `[${new Date().toISOString()}]`;
}

// Utility function to generate a random BigInt within a range
function randomBigIntInRange(min: bigint, max: bigint): bigint {
  console.log(`${getTimestamp()} Generating random BigInt between ${min} and ${max}`);
  const range = max - min;
  console.log(`${getTimestamp()} Range calculated: ${range}`);
  const bytesNeeded = Math.ceil(range.toString(2).length / 8);
  console.log(`${getTimestamp()} Bytes needed: ${bytesNeeded}`);
  const randomBytes = crypto.randomBytes(bytesNeeded);
  console.log(`${getTimestamp()} Random bytes generated: ${randomBytes.toString('hex')}`);
  const randomValue = BigInt('0x' + randomBytes.toString('hex'));
  console.log(`${getTimestamp()} Random value as BigInt: ${randomValue}`);
  const result = (randomValue % range) + min;
  console.log(`${getTimestamp()} Final random BigInt: ${result}`);
  return result;
}

// Function to check if a number is prime (simplified for demonstration)
function isPrime(n: bigint): boolean {
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
      console.log(`${getTimestamp()} ${n} is divisible by ${i} or ${i + BigInt(2)}, returning false`);
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
  const randomBytesAsync = promisify(crypto.randomBytes);
  console.log(`${getTimestamp()} Promisified randomBytes function`);

  while (true) {
    console.log(`${getTimestamp()} Attempting to generate a prime number`);
    const bytes = await randomBytesAsync(Math.ceil(bits / 8));
    console.log(`${getTimestamp()} Generated random bytes: ${bytes.toString('hex')}`);
    const num = BigInt('0x' + bytes.toString('hex'));
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

// Function to find a primitive root modulo p
function primitiveRoot(p: bigint): bigint {
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
function getSafeChunkSize(p: bigint): number {
  // Get bit length of p
  const bitLength = p.toString(2).length;
  // Calculate safe byte size (allow some room for overhead)
  // Reduce by 1 byte for safety
  const safeByteSize = Math.floor((bitLength - 16) / 8);
  console.log(`${getTimestamp()} Safe chunk size calculated: ${safeByteSize} bytes`);
  return safeByteSize;
}

// Improved function to convert string to BigInt chunks
function stringToChunks(str: string, chunkSize: number): bigint[] {
  console.log(`${getTimestamp()} Converting string "${str}" to chunks with size ${chunkSize}`);
  const buffer = Buffer.from(str, 'utf8');
  console.log(`${getTimestamp()} String as buffer: ${buffer.toString('hex')}`);

  const chunks: bigint[] = [];
  for (let i = 0; i < buffer.length; i += chunkSize) {
    const chunkBuffer = buffer.slice(i, i + chunkSize);
    console.log(`${getTimestamp()} Processing chunk ${chunks.length + 1}: ${chunkBuffer.toString('hex')}`);
    const chunk = BigInt('0x' + chunkBuffer.toString('hex'));
    console.log(`${getTimestamp()} Chunk as BigInt: ${chunk}`);
    chunks.push(chunk);
  }

  console.log(`${getTimestamp()} Created ${chunks.length} chunks`);
  return chunks;
}

// Improved function to convert BigInt chunks back to string
function chunksToString(chunks: bigint[], chunkSize: number): string {
  console.log(`${getTimestamp()} Converting ${chunks.length} chunks back to string`);

  let resultBuffer = Buffer.alloc(0);

  for (let i = 0; i < chunks.length; i++) {
    console.log(`${getTimestamp()} Processing chunk ${i + 1}: ${chunks[i]}`);

    // Convert BigInt to hex and ensure even length
    let hexStr = chunks[i].toString(16);
    if (hexStr.length % 2 !== 0) hexStr = '0' + hexStr;

    // Create buffer from hex
    const chunkBuffer = Buffer.from(hexStr, 'hex');
    console.log(`${getTimestamp()} Chunk ${i + 1} as buffer: ${chunkBuffer.toString('hex')}`);

    // Concatenate buffers
    resultBuffer = Buffer.concat([resultBuffer, chunkBuffer]);
  }

  const result = resultBuffer.toString('utf8');
  console.log(`${getTimestamp()} Converted to string: "${result}"`);
  return result;
}

// Modular multiplicative inverse
function modInverse(a: bigint, m: bigint): bigint {
  console.log(`${getTimestamp()} Computing modular inverse of ${a} mod ${m}`);
  const result = bigintModArith.modInv(a, m);
  console.log(`${getTimestamp()} Modular inverse result: ${result}`);
  return result;
}

// Encrypt a BigInt chunk in the commutative scheme (for multi-party use)
function encryptChunk(chunk: bigint, publicKey: bigint, privateKey: bigint, g: bigint, p: bigint): { c1: bigint, c2: bigint } {
  console.log(`${getTimestamp()} Encrypting chunk: ${chunk}`);

  // Generate a random value r
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
function removeEncryptionLayer(c1: bigint, c2: bigint, privateKey: bigint, p: bigint): bigint {
  console.log(`${getTimestamp()} Removing encryption layer with private key: ${privateKey}`);

  // Compute m = c2 * (c1^x)^-1 mod p
  const decrypted = (c2 * modInverse(bigintModArith.modPow(c1, privateKey, p), p)) % p;
  console.log(`${getTimestamp()} Removed layer: ${decrypted}`);

  return decrypted;
}

// Test multi-party commutative encryption with chunking support
function testMultiPartyCommutative(msg: string, p: bigint, g: bigint, parties: number = 3) {
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

    console.log(`${getTimestamp()} Party ${i + 1} - Private key: ${privateKey}, Public key: ${publicKey}`);
  }

  console.log(`\nMessage: "${msg}"`);

  // Display keys for all parties
  for (let i = 0; i < parties; i++) {
    console.log(`Party ${i + 1}'s Public key: g=${g}, Y=${publicKeys[i]}, p=${p}`);
    console.log(`Party ${i + 1}'s Private key: x=${privateKeys[i]}`);
  }

  // Process each chunk
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

      console.log(`${getTimestamp()} After Party ${i + 1}'s encryption: c1=${encrypted.c1}, c2=${currentC2}`);
    }

    console.log(`${getTimestamp()} Final encrypted chunk: c2=${currentC2}`);

    return { c1Values, c2: currentC2 };
  });

  // Decryption in different orders
  const decryptResults: string[] = [];

  // Try different decryption orders
  const permutations = generatePermutations([...Array(parties).keys()]);

  for (const perm of permutations) {
    console.log(`\n${getTimestamp()} Trying decryption order: ${perm.map(i => i + 1).join(' -> ')}`);

    const decryptedChunks = encryptedResults.map((encryptedChunk, chunkIndex) => {
      console.log(`${getTimestamp()} Decrypting chunk ${chunkIndex + 1}`);

      let currentC2 = encryptedChunk.c2;

      // Remove encryption layers in the order specified by perm
      for (const partyIndex of perm) {
        console.log(`${getTimestamp()} Party ${partyIndex + 1} removing encryption layer`);
        currentC2 = removeEncryptionLayer(
          encryptedChunk.c1Values[partyIndex],
          currentC2,
          privateKeys[partyIndex],
          p
        );
        console.log(`${getTimestamp()} After Party ${partyIndex + 1}'s decryption: ${currentC2}`);
      }

      return currentC2;
    });

    // Convert decrypted chunks back to string
    const decryptedMessage = chunksToString(decryptedChunks, chunkSize);
    console.log(`${getTimestamp()} Decrypted message: "${decryptedMessage}"`);

    decryptResults.push(decryptedMessage);
    console.log(`\nResult for order ${perm.map(i => i + 1).join(' -> ')}: "${decryptedMessage}"`);
  }

  // Check if all decryption orders yielded the original message
  const allCorrect = decryptResults.every(result => result === msg);
  console.log(`\n${getTimestamp()} All decryption orders correct: ${allCorrect}`);

  return allCorrect;
}

// Helper function to generate all permutations of an array
function generatePermutations<T>(arr: T[]): T[][] {
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

async function main() {
  console.log(`${getTimestamp()} Starting main function`);
  // Default values
  let bits = 512;
  let M = "This is a much longer message that should work with the improved version of the commutative encryption algorithm. The implementation now supports messages of arbitrary length!";
  console.log(`${getTimestamp()} Default values: bits=${bits}, M="${M}"`);

  // Process command line arguments
  console.log(`${getTimestamp()} Processing command line arguments`);
  const args = process.argv.slice(2);
  console.log(`${getTimestamp()} Arguments: ${JSON.stringify(args)}`);
  if (args.length > 0) {
    M = args[0];
    console.log(`${getTimestamp()} Set message to: "${M}"`);
  }
  if (args.length > 1) {
    bits = parseInt(args[1]);
    console.log(`${getTimestamp()} Set bits to: ${bits}`);
  }

  // Generate prime p or use a known one
  console.log(`${getTimestamp()} Generating prime p`);
  // Use the 512-bit prime from the original code
  const p = BigInt("13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006083527");
  console.log(`${getTimestamp()} Using prime p: ${p}`);

  // Find primitive root
  console.log(`${getTimestamp()} Finding primitive root`);
  const g = primitiveRoot(p);
  console.log(`${getTimestamp()} Found primitive root g: ${g}`);

  // Test with a short message first
  const shortMessage = "Short test";
  console.log(`\n${getTimestamp()} Testing with short message: "${shortMessage}"`);
  const shortResult = testMultiPartyCommutative(shortMessage, p, g, 3);
  console.log(`${getTimestamp()} Short message test result: ${shortResult}`);

  // Test with the longer message
  console.log(`\n${getTimestamp()} Testing with longer message: "${M}"`);
  const longResult = testMultiPartyCommutative(M, p, g, 3);
  console.log(`${getTimestamp()} Longer message test result: ${longResult}`);

  console.log(`${getTimestamp()} Main function completed`);
}

console.log(`${getTimestamp()} Starting program`);
main().catch(error => {
  console.error(`${getTimestamp()} Error in main function:`, error);
});
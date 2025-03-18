// Function to check if a number is prime (simplified for demonstration)
export function isPrime(n: bigint): boolean {
  console.log(`Checking if ${n} is prime`);
  if (n <= BigInt(1)) {
    console.log(`${n} <= 1, returning false`);
    return false;
  }
  if (n <= BigInt(3)) {
    console.log(`${n} <= 3, returning true`);
    return true;
  }
  if (n % BigInt(2) === BigInt(0) || n % BigInt(3) === BigInt(0)) {
    console.log(`${n} is divisible by 2 or 3, returning false`);
    return false;
  }

  let i = BigInt(5);
  console.log(`Starting primality test with i = ${i}`);
  while (i * i <= n) {
    console.log(`Testing divisibility by ${i} and ${i + BigInt(2)}`);
    if (n % i === BigInt(0) || n % (i + BigInt(2)) === BigInt(0)) {
      console.log(`${n} is divisible by ${i} or ${i + BigInt(2)}, returning false`);
      return false;
    }
    i += BigInt(6);
    console.log(`Incremented i to ${i}`);
  }
  console.log(`${n} is prime, returning true`);
  return true;
}

// Function to generate a large prime number
export async function generatePrime(bits: number): Promise<bigint> {
  console.log(`Generating prime of ${bits} bits`);

  while (true) {
    console.log("Attempting to generate a prime number");

    // Use Web Crypto API instead of Node.js crypto
    const bytes = new Uint8Array(Math.ceil(bits / 8));
    window.crypto.getRandomValues(bytes);

    console.log(
      `Generated random bytes: ${Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")}`,
    );
    // const num = BigInt(
    //   `0x${Array.from(bytes)
    //     .map((b) => b.toString(16).padStart(2, "0"))
    //     .join("")}`,
    // );
    const num = BigInt(
      `0x${Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")}`,
    );
    console.log(`Converted to BigInt: ${num}`);
    const candidate = num | (BigInt(1) << BigInt(bits - 1)) | BigInt(1); // Ensure it's odd and has the right bit length
    console.log(`Prime candidate: ${candidate}`);

    if (isPrime(candidate)) {
      console.log(`Found prime number: ${candidate}`);
      return candidate;
    }
    console.log("Candidate was not prime, trying again");
  }
}

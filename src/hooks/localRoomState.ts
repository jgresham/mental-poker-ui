import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateKeysAndR } from "../lib/elgamal-commutative-node-1chunk";

// Define a unique key for the query
const PLAYER_CARDS_KEY = ["playerCards"];
const ROUND_KEYS_KEY = "roundKeys";

/**
 * A custom hook that retrieves player cards using TanStack Query.
 * These cards are only known to the local current player.
 * They differ from player.cards which are publically known if the player
 * is required to reveal their cards.
 * @returns The current player cards
 */
export function usePlayerCards() {
  // Initialize the query with default value
  return useQuery<[string, string]>({
    queryKey: PLAYER_CARDS_KEY,
    initialData: ["", ""] as [string, string],
    queryFn: () => Promise.resolve(["", ""]),
  });
}

/**
 * A custom hook that provides a function to set player cards
 * @returns A function to update player cards
 */
export function useSetPlayerCards() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCards: [string, string]) => {
      return Promise.resolve(newCards);
    },
    onSuccess: (newCards) => {
      queryClient.setQueryData(PLAYER_CARDS_KEY, newCards);
    },
  });
}

/**
 * A custom hook that provides a function to get (or create) round keys
 * @param roundNumber - The round number
 * @returns private key, public key, and r
 */
export function useRoundKeys(roomId?: string, roundNumber?: number) {
  return useQuery<{
    privateKey: bigint | null;
    publicKey: bigint | null;
    r: bigint | null;
  }>({
    queryKey: [ROUND_KEYS_KEY, roomId, roundNumber],
    initialData: { privateKey: null, publicKey: null, r: null },
    queryFn: () => {
      if (
        roomId === undefined ||
        roomId === "" ||
        roundNumber === undefined ||
        Number.isNaN(roundNumber)
      ) {
        return Promise.resolve({ privateKey: null, publicKey: null, r: null });
      }
      // try to get the round keys from local storage
      console.log("getting round keys for round", roundNumber, "in room", roomId);
      const roundKeys = localStorage.getItem(
        `${ROUND_KEYS_KEY}-${roomId}-${roundNumber}`,
      );
      if (roundKeys) {
        console.log(
          "found round keys in local storage for round",
          roundNumber,
          "in room",
          roomId,
        );
        // parse the bigint values from the kv string
        const [privateKey, publicKey, r] = JSON.parse(roundKeys);
        return Promise.resolve({
          privateKey: BigInt(privateKey),
          publicKey: BigInt(publicKey),
          r: BigInt(r),
        });
      }
      // otherwise, generate new keys and store them in local storage
      const { privateKey, publicKey, r } = generateKeysAndR();
      localStorage.setItem(
        `${ROUND_KEYS_KEY}-${roomId}-${roundNumber}`,
        JSON.stringify([privateKey.toString(), publicKey.toString(), r.toString()]),
      );
      console.log(
        "generated and stored round keys for round",
        roundNumber,
        "in room",
        roomId,
      );
      return Promise.resolve({ privateKey, publicKey, r });
    },
  });
}

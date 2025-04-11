import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define a unique key for the query
const PLAYER_CARDS_KEY = ["playerCards"];

/**
 * A custom hook that retrieves player cards using TanStack Query
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

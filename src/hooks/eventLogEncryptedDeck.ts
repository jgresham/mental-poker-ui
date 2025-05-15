import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const EVENT_LOG_ENCRYPTED_DECK_KEY = ["eventLogEncryptedDeck"];

/**
 * A custom hook that retrieves the saved event log encrypted deck using TanStack Query.
 * @returns The event log encrypted deck
 */
export function useEventLogEncryptedDeck() {
  // Initialize the query with default value
  return useQuery<{
    encryptedDeck: string[];
    lastUpdatedByPlayerAddress: string;
    lastUpdatedByPlayerIndex?: number;
  }>({
    queryKey: EVENT_LOG_ENCRYPTED_DECK_KEY,
    initialData: {
      encryptedDeck: [],
      lastUpdatedByPlayerAddress: "",
      lastUpdatedByPlayerIndex: undefined,
    } as {
      encryptedDeck: string[];
      lastUpdatedByPlayerAddress: string;
      lastUpdatedByPlayerIndex?: number;
    },
    queryFn: () =>
      Promise.resolve({
        encryptedDeck: [],
        lastUpdatedByPlayerAddress: "",
        lastUpdatedByPlayerIndex: undefined,
      }),
  });
}

/**
 * A custom hook that provides a function to set event log encrypted deck
 * @returns A function to update event log encrypted deck
 */
export function useSetEventLogEncryptedDeck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEventLogEncryptedDeck: {
      encryptedDeck: string[];
      lastUpdatedByPlayerAddress: string;
      lastUpdatedByPlayerIndex?: number;
      cardIndiciesUpdated?: number[];
    }) => {
      console.log("useSetEventLogEncryptedDeck called", newEventLogEncryptedDeck);
      // only update specific indicies of previous deck
      if (newEventLogEncryptedDeck.cardIndiciesUpdated) {
        // get previous deck
        const previousData = queryClient.getQueryData(EVENT_LOG_ENCRYPTED_DECK_KEY) as {
          encryptedDeck: string[];
          lastUpdatedByPlayerAddress: string;
        };
        // copy entire previous deck
        const newDeck: string[] = [...previousData.encryptedDeck];
        // update specific indicies
        newEventLogEncryptedDeck.cardIndiciesUpdated.forEach((cardIndex, arrayIndex) => {
          newDeck[cardIndex] = newEventLogEncryptedDeck.encryptedDeck[arrayIndex];
        });
        console.log("useSetEventLogEncryptedDeck newDeck", newDeck);
        newEventLogEncryptedDeck.encryptedDeck = newDeck;
      }
      return Promise.resolve(newEventLogEncryptedDeck);
    },
    onSuccess: (newEventLogEncryptedDeck) => {
      queryClient.setQueryData(EVENT_LOG_ENCRYPTED_DECK_KEY, newEventLogEncryptedDeck);
    },
  });
}

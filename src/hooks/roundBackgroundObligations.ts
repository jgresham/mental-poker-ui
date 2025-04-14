// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { generateKeysAndR } from "../lib/elgamal-commutative-node-1chunk";
// import { REVEAL_COMMUNITY_CARDS_STAGE } from "../lib/types";
// import { GameStage } from "../lib/types";

// // Define a unique key for the query
// const BACKGROUND_OBLIGATIONS_KEY = "backgroundObligations";

// /**
//  * A custom hook that retrieves player cards using TanStack Query
//  * @returns The current player cards
//  */
// export function useRoundBackgroundObligations({
//   roomId,
//   roundNumber,
//   stage,
//   isMyTurn,
//   encryptedDeck,
//   submitEncryptedDeck,
//   submitDecryptionValues,
// }: {
//   roomId: string;
//   roundNumber: number;
//   stage: GameStage;
//   isMyTurn: boolean;
//   encryptedDeck: string[];
//   submitEncryptedDeck: (args: { args: [string[]] }) => Promise<`0x${string}`>;
//   submitDecryptionValues: (args: {
//     args: [number[], string[]];
//   }) => Promise<`0x${string}` | undefined>;
// }) {
//   // Initialize the query with default value
//   return useQuery<[`0x${string}` | undefined]>({
//     queryKey: [BACKGROUND_OBLIGATIONS_KEY],
//     initialData: undefined,
//     queryFn: () => {
//       if (!isMyTurn) {
//         return Promise.resolve(undefined);
//       }
//       // if shuffle, call submitEncryptedDeck
//       if (stage === GameStage.Shuffle) {
//         return submitEncryptedDeck({ args: [encryptedDeck] });
//       }
//       if (stage === GameStage.RevealDeal) {
//         return submitDecryptionValues({ args: [[], []] });
//       }
//       // if reveal cards, call submitDecryptionValues
//       if (REVEAL_COMMUNITY_CARDS_STAGE.includes(stage)) {
//         return submitDecryptionValues({ args: [[], []] });
//       }
//     },
//   });
// }

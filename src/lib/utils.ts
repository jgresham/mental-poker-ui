import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameStage } from "./types";
import { stringCardsToCards } from "./types";
import { bigintToString } from "./elgamal-commutative-node-1chunk";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Get the indexes of the community cards for the given stage
 * Just returns the individual stage indexes for the reveal stages
 * @param stage - The stage of the game
 * @param numOfPlayers - The number of players in the game
 * @returns The indexes of the community cards
 */
export const getCommunityCardIndexes = (stage: GameStage, numOfPlayers: number) => {
  const lastPlayerCardIndex = numOfPlayers * 2;
  const burnCard = 1;
  const numOfCardsInFlop = 3;
  const numOfCardsInTurn = 1;
  const numOfCardsInRiver = 1;
  const lastFlopCardIndex = lastPlayerCardIndex + burnCard + numOfCardsInFlop;
  const turnCardIndex = lastFlopCardIndex + burnCard + numOfCardsInTurn;
  if (stage === GameStage.RevealFlop || stage === GameStage.Flop) {
    return Array.from(
      { length: numOfCardsInFlop },
      (_, i) => lastPlayerCardIndex + burnCard + i,
    );
  }
  if (stage === GameStage.RevealTurn) {
    return Array.from(
      { length: numOfCardsInTurn },
      (_, i) => lastFlopCardIndex + burnCard + i,
    );
  }
  if (stage === GameStage.RevealRiver) {
    return Array.from(
      { length: numOfCardsInRiver },
      (_, i) => turnCardIndex + burnCard + i,
    );
  }
  return [];
};

/**
 * If we are at the turn, then return the flop and turn indexes. If at the river, then return the flop, turn and river indexes.
 * @param stage
 * @param numOfPlayers
 * @returns
 */
export const getAllRevealedCommunityCardsIndexes = (
  stage: GameStage,
  numOfPlayers: number,
) => {
  if (stage >= GameStage.River) {
    return getCommunityCardIndexes(GameStage.RevealFlop, numOfPlayers).concat(
      getCommunityCardIndexes(GameStage.RevealTurn, numOfPlayers),
      getCommunityCardIndexes(GameStage.RevealRiver, numOfPlayers),
    );
  }
  if (stage >= GameStage.Turn) {
    return getCommunityCardIndexes(GameStage.RevealFlop, numOfPlayers).concat(
      getCommunityCardIndexes(GameStage.RevealTurn, numOfPlayers),
    );
  }
  if (stage >= GameStage.Flop) {
    return getCommunityCardIndexes(GameStage.RevealFlop, numOfPlayers);
  }
  return [];
};

export const getCommunityCards = ({
  stage,
  numOfPlayers,
  encryptedDeck,
}: {
  stage?: GameStage;
  numOfPlayers?: number;
  encryptedDeck?: `0x${string}`[];
}) => {
  if (!stage || !numOfPlayers || !encryptedDeck) {
    return [];
  }
  console.log("getCommunityCards stage", stage);
  console.log("getCommunityCards numOfPlayers", numOfPlayers);
  console.log("getCommunityCards encryptedDeck", encryptedDeck);
  const revealCommunityCardsIndexes = getAllRevealedCommunityCardsIndexes(
    stage,
    numOfPlayers,
  );
  console.log(
    "getCommunityCards revealCommunityCardsIndexes",
    revealCommunityCardsIndexes,
  );
  if (stage === GameStage.Flop) {
    return stringCardsToCards([
      bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[0]])),
      bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[1]])),
      bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[2]])),
    ]);
  }
  if (stage === GameStage.Turn) {
    return stringCardsToCards([
      bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[0]])),
    ]);
  }
  if (stage === GameStage.River) {
    return stringCardsToCards([
      bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[0]])),
    ]);
  }
};

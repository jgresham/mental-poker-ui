import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameStage, MAX_PLAYERS, type Player } from "./types";
import { stringCardsToCards } from "./types";
import { bigintToString } from "./elgamal-commutative-node-1chunk";
import { zeroAddress } from "viem";

export const ADMIN_ADDRESSES = [
  "0x2a99EC82d658F7a77DdEbFd83D0f8F591769cB64",
  "0x101a25d0FDC4E9ACa9fA65584A28781046f1BeEe",
  "0x7D20fd2BD3D13B03571A36568cfCc2A4EB3c749e",
  "0x3797A1F60C46D2D6F02c3568366712D8A8A69a73",
];

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
 * Get the indexes of the other players' cards
 * Examples: myindex = 0, numOfPlayers = 2
 * Returns: [0 - 4] without [0, 2]
 * Examples: myindex = 1, numOfPlayers = 2
 * Returns: [0 thru 4] without [1, 3]
 * Examples: myindex = 0, numOfPlayers = 10
 * Returns: [0 thru 19] without [0, 10]
 * Examples: myindex = 9, numOfPlayers = 10
 * Returns: [0 thru 19] without [9, 19]
 * @param myIndex - The index of the player
 * @param numOfPlayers - The number of players
 * @returns The indexes of the other players' cards
 */
export function getOtherPlayersCardsIndexes(
  myPlayerIndex: number,
  dealerPosition: number,
  players: Player[],
) {
  if (players === undefined) {
    console.error("getOtherPlayersCardsIndexes: players is undefined");
    return [];
  }
  console.log("getOtherPlayersCardsIndexes players dealerPosition", dealerPosition);
  const countOfPlayersCounterClockwiseToDealer =
    getCountOfPlayersCounterClockwiseToDealer(myPlayerIndex, dealerPosition, players);
  console.log(
    "getOtherPlayersCardsIndexes countOfPlayersCounterClockwiseToDealer",
    countOfPlayersCounterClockwiseToDealer,
  );
  const numPlayersAtRoundStart = players.filter(
    (player) =>
      player.addr !== zeroAddress && player.joinedAndWaitingForNextRound !== true,
  ).length;
  console.log(
    "getOtherPlayersCardsIndexes numPlayersAtRoundStart",
    numPlayersAtRoundStart,
  );
  const otherPlayersIndexes = Array.from(
    { length: numPlayersAtRoundStart * 2 },
    (_, i) => i,
  );
  console.log("getOtherPlayersCardsIndexes otherPlayersIndexes", otherPlayersIndexes);
  otherPlayersIndexes.splice(
    countOfPlayersCounterClockwiseToDealer + numPlayersAtRoundStart,
    1,
  ); // remove my 2nd card
  otherPlayersIndexes.splice(countOfPlayersCounterClockwiseToDealer, 1); // remove my 1st card
  console.log("getOtherPlayersCardsIndexes otherPlayersIndexes", otherPlayersIndexes);
  return otherPlayersIndexes;
}

/**
 * Useful for determining which cards are for a specific player.
 * Does not count empty seats or players who joined (sat down) after
 * the round started.
 * @param playerIndex - The index of the player
 * @param dealerPosition - The position of the dealer
 * @param players - The players in the game
 * @returns The count of players counter clockwise to the dealer
 */
function getCountOfPlayersCounterClockwiseToDealer(
  playerIndex: number,
  dealerPosition: number,
  players: Player[],
) {
  let countOfPlayersCounterClockwiseToDealer = 0;
  if (
    playerIndex !== undefined &&
    dealerPosition !== undefined &&
    Array.isArray(players)
  ) {
    console.log("players", players);
    const playerSeatPosition = players[playerIndex].seatPosition;
    const dealerSeatPosition = players[dealerPosition].seatPosition;
    console.log("playerSeatPosition dealerPosition", dealerPosition);
    console.log("playerSeatPosition players[dealerPosition]", players[dealerPosition]);
    console.log("playerSeatPosition dealerSeatPosition", dealerSeatPosition);
    let iteratePlayerSeatPosition = playerSeatPosition;
    while (iteratePlayerSeatPosition !== dealerSeatPosition) {
      console.log("playerSeatPosition playerSeatPosition", iteratePlayerSeatPosition);
      console.log("playerSeatPosition playerIndex", playerIndex);
      iteratePlayerSeatPosition =
        (iteratePlayerSeatPosition - 1 + MAX_PLAYERS) % MAX_PLAYERS;
      console.log(
        "playerSeatPosition iteratePlayerSeatPosition",
        iteratePlayerSeatPosition,
      );
      if (
        players[iteratePlayerSeatPosition] !== undefined &&
        players[iteratePlayerSeatPosition].addr !== zeroAddress &&
        players[iteratePlayerSeatPosition].joinedAndWaitingForNextRound !== true
      ) {
        countOfPlayersCounterClockwiseToDealer++;
      }
    }
  }
  return countOfPlayersCounterClockwiseToDealer;
}

/**
 * Get the indexes of my cards
 * Examples: playerCClockwiseDistanceFromDealer = 0, numOfPlayers = 2
 * Returns: [0, 2]
 * Examples: playerCClockwiseDistanceFromDealer = 1, numOfPlayers = 2
 * Returns: [1, 3]
 * Examples: playerCClockwiseDistanceFromDealer = 0, numOfPlayers = 10
 * Returns: [0, 10]
 * Examples: playerCClockwiseDistanceFromDealer = 9, numOfPlayers = 10
 * Returns: [9, 19]
 * @param playerCClockwiseDistanceFromDealer - The distance from the dealer
 * @param numOfPlayers - The number of players
 * @returns The indexes of the other players' cards
 */
export function getMyCardsIndexes(
  playerIndex: number,
  dealerPosition: number,
  players: Player[],
) {
  console.log("getMyCardsIndexes players dealerPosition", dealerPosition);
  if (players[playerIndex].addr === zeroAddress) {
    return [];
  }
  const countOfPlayersCounterClockwiseToDealer =
    getCountOfPlayersCounterClockwiseToDealer(playerIndex, dealerPosition, players);
  const numPlayersAtRoundStart = players.filter(
    (player) =>
      player.addr !== zeroAddress && player.joinedAndWaitingForNextRound !== true,
  ).length;
  if (countOfPlayersCounterClockwiseToDealer >= numPlayersAtRoundStart) {
    throw new Error(
      "countOfPlayersCounterClockwiseToDealer must be less than playersAtRoundStart",
    );
  }
  const playerCardIndexes = [
    countOfPlayersCounterClockwiseToDealer,
    countOfPlayersCounterClockwiseToDealer + numPlayersAtRoundStart,
  ];
  return playerCardIndexes;
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
  encryptedDeck?: Readonly<`0x${string}`[]>;
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
  try {
    return stringCardsToCards(
      revealCommunityCardsIndexes.map((communityCardIndex) =>
        bigintToString(BigInt(encryptedDeck[communityCardIndex])),
      ),
    );
    // if (stage === GameStage.Flop) {
    //   return stringCardsToCards([
    //     bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[0]])),
    //     bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[1]])),
    //     bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[2]])),
    //   ]);
    // }
    // if (stage === GameStage.Turn) {
    //   return stringCardsToCards([
    //     bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[0]])),
    //   ]);
    // }
    // if (stage === GameStage.River) {
    //   return stringCardsToCards([
    //     bigintToString(BigInt(encryptedDeck[revealCommunityCardsIndexes[0]])),
    //   ]);
    // }
    // return [];
  } catch (error) {
    console.error("Error getting community cards", error);
    throw error;
  }
};

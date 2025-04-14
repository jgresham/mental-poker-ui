import { Card, Rank, Suit, Player, GameState, GameStage, Room } from "./types";

// Create a new deck of cards
export function createDeck(): Card[] {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
  const ranks: Rank[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, faceUp: false });
    }
  }

  return shuffleDeck(deck);
}

// Shuffle the deck using Fisher-Yates algorithm
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

// Initialize a new game state
// export function initializeGame(
//   playerCount: number,
//   initialChips: number = 1000,
//   smallBlind: number = 5,
//   bigBlind: number = 10,
// ): GameState {
//   // Ensure player count is between 2 and 10
//   const count = Math.min(Math.max(playerCount, 2), 10);

//   // Create players
//   const players: Player[] = Array.from({ length: count }, (_, i) => ({
//     id: `player-${i}`,
//     name: `Player ${i + 1}`,
//     chips: initialChips,
//     cards: [],
//     isActive: true,
//     isDealer: i === 0,
//     isSmallBlind: i === 1,
//     isBigBlind: i === 2 || (count === 2 && i === 1),
//     isTurn: i === 3 || (count === 2 && i === 0) || (count === 3 && i === 0),
//     isAllIn: false,
//     bet: 0,
//     avatarUrl: undefined,
//   }));

//   // Set initial bets for small and big blinds
//   const smallBlindIndex = 1 % count;
//   const bigBlindIndex = 2 % count;

//   players[smallBlindIndex].bet = smallBlind;
//   players[smallBlindIndex].chips -= smallBlind;

//   players[bigBlindIndex].bet = bigBlind;
//   players[bigBlindIndex].chips -= bigBlind;

//   return {
//     players,
//     communityCards: [],
//     deck: createDeck(),
//     pot: smallBlind + bigBlind,
//     currentBet: bigBlind,
//     stage: "preflop",
//     currentPlayerIndex: 3 % count,
//     dealerIndex: 0,
//     smallBlindAmount: smallBlind,
//     bigBlindAmount: bigBlind,
//   };
// }

// Move to the next active player
// export function nextPlayer(gameState: GameState): GameState {
//   const { players, currentPlayerIndex } = gameState;
//   let nextIndex = (currentPlayerIndex + 1) % players.length;

//   // Find the next active player
//   while (!players[nextIndex].isActive && nextIndex !== currentPlayerIndex) {
//     nextIndex = (nextIndex + 1) % players.length;
//   }

//   // Update player turns
//   const updatedPlayers = players.map((player, index) => ({
//     ...player,
//     isTurn: index === nextIndex,
//   }));

//   return {
//     ...gameState,
//     players: updatedPlayers,
//     currentPlayerIndex: nextIndex,
//   };
// }

// Get card image filename
export function getCardImage(card: Card): string {
  if (!card.faceUp) {
    return "/images/cards/back.svg";
  }

  const suitSymbol = card.suit.charAt(0);
  return `/images/cards/${card.rank}${suitSymbol}.svg`;
}

/**
 * Gets the first available seat position in the room by finding the lowest index
 * seat that is not occupied by a player.
 * @param room - The room to get the first available seat position from
 * @returns The first available seat position
 */
export const getFirstAvailableSeatPosition = (room: Room) => {
  // if all seats are taken, return the next seat position
  for (let i = 0; i <= room.players.length; i++) {
    if (!room.players.some((player) => player.seatPosition === i)) {
      return i;
    }
  }
  return room.players.length;
};

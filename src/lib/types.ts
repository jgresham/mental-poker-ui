export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

export interface Player {
  id: string;
  address: string;
  seatPosition: number;
  chips: number;
  currentBet: number;
  cards: Card[];
  isActive: boolean;
  isDealer: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
  isTurn: boolean;
  isAllIn: boolean;
  hasFolded: boolean;
  bet: number;
  name?: string;
  avatarUrl?: string;
}

export type Room = {
  id: string;
  isPrivate: boolean;
  players: Player[];
  maxPlayers: number;
  stage: GameStage;
  gameState: GameState;
};

export type GameStage =
  | "waiting to start"
  | "waiting for players"
  | "preflop"
  | "flop"
  | "turn"
  | "river"
  | "showdown"
  | "ended";

// Solidity contract GameState
// struct GameState {
//   GameStage stage;
//   uint256 pot;
//   uint256 currentStageBet;
//   uint256 smallBlind;
//   uint256 bigBlind;
//   uint256 dealerPosition;
//   uint256 currentPlayerIndex;
//   uint256 lastRaiseIndex;
//   bytes32[5] communityCards;
//   uint256 revealedCommunityCards;
//   BigNumber[] encryptedDeck;
// }

export interface GameState {
  players: Player[];
  communityCards: Card[];
  deck: Card[];
  pot: number;
  currentBet: number;
  stage: GameStage;
  currentPlayerIndex: number;
  dealerIndex: number;
  smallBlindAmount: number;
  bigBlindAmount: number;
  lastRaiseIndex: number;
  revealedCommunityCards: number;
  encryptedDeck: bigint[];
}

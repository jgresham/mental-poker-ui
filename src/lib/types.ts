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
  chips: number;
  cards: Card[];
  isActive: boolean;
  isDealer: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
  isTurn: boolean;
  isAllIn: boolean;
  bet: number;
  name?: string;
  avatarUrl?: string;
}

export type GameStage =
  | "waiting to start"
  | "waiting for players"
  | "preflop"
  | "flop"
  | "turn"
  | "river"
  | "showdown"
  | "ended";

export interface GameState {
  players: Player[];
  communityCards: Card[];
  deck: Card[];
  pot: number;
  currentBet: number;
  stage: GameStage;
  activePlayerIndex: number;
  dealerIndex: number;
  smallBlindAmount: number;
  bigBlindAmount: number;
}

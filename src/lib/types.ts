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

// Solidity contract Player
// struct Player {
//   address addr;
//   uint256 chips;
//   uint256 currentStageBet;
//   uint256 totalRoundBet;
//   bool hasFolded;
//   bool isAllIn;
//   string[2] cards;
//   uint8 seatPosition;
// }
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

// Solidity Room contract constants
// uint256 public constant MAX_PLAYERS = 10;
// uint256 public constant MIN_PLAYERS = 2;
// uint8 public constant EMPTY_SEAT = 255;

// Solidity contract Room
// Player[MAX_PLAYERS] public players;
// uint8[MAX_PLAYERS] public seatPositionToPlayerIndex;
// uint256 public numPlayers;
// GameState public gameState;
// bool public isPrivate;

export interface Room {
  id: string;
  players: Player[];
  seatPositionToPlayerIndex: number[];
  numPlayers: number;
  gameState: GameState;
  isPrivate: boolean;
}

// Solidity contract GameStage
// enum GameStage {
//   Idle, // 0
//   Shuffle, // 1
//   RevealDeal, // 2
//   Preflop, // 3
//   RevealFlop, // 4
//   Flop, // 5
//   RevealTurn, // 6
//   Turn, // 7
//   RevealRiver, // 8
//   River, // 9
//   Showdown // 10
// }

// Solidity contract Action
export enum Action {
  None = 0, // 0
  Call = 1, // 1
  Raise = 2, // 2
  Check = 3, // 3
  Fold = 4, // 4
}

export enum GameStage {
  Idle = 0,
  Shuffle = 1,
  RevealDeal = 2,
  Preflop = 3,
  RevealFlop = 4,
  Flop = 5,
  RevealTurn = 6,
  Turn = 7,
  RevealRiver = 8,
  River = 9,
  Showdown = 10,
  Break = 11,
  Ended = 12,
}

export const GameStageToString = {
  [GameStage.Idle]: "waiting to start",
  [GameStage.Shuffle]: "encypting shuffle",
  [GameStage.RevealDeal]: "revealing deal",
  [GameStage.Preflop]: "preflop betting",
  [GameStage.RevealFlop]: "revealing flop",
  [GameStage.Flop]: "flop betting",
  [GameStage.RevealTurn]: "revealing turn",
  [GameStage.Turn]: "turn betting",
  [GameStage.RevealRiver]: "revealing river",
  [GameStage.River]: "river betting",
  [GameStage.Showdown]: "showdown",
  [GameStage.Break]: "break",
  [GameStage.Ended]: "ended",
};

// export type GameStage =
//   | "waiting to start"
//   | "waiting for players"
//   | "preflop"
//   | "flop"
//   | "turn"
//   | "river"
//   | "showdown"
//   | "ended";

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
  stage: GameStage;
  pot: number;
  currentStageBet: number;
  smallBlind: number;
  bigBlind: number;
  dealerPosition: number;
  currentPlayerIndex: number;
  lastRaiseIndex: number;
  communityCards: Card[];
  encryptedDeck: bigint[];
}

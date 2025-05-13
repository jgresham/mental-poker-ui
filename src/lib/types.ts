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

export function stringCardsToCards(cards: string[]): Card[] {
  return cards.map((cardStr) => {
    const cardNum = Number.parseInt(cardStr);
    if (Number.isNaN(cardNum) || cardNum >= 52 || cardNum < 0) {
      console.error("Invalid card number:", cardStr);
      throw new Error(`Invalid card number: ${cardStr}`);
    }

    const suitNum = Math.floor(cardNum / 13);
    const rankNum = (cardNum % 13) + 2; // Add 2 because ranks start at 2

    let suit: Suit;
    if (suitNum === 0) {
      suit = "hearts";
    } else if (suitNum === 1) {
      suit = "diamonds";
    } else if (suitNum === 2) {
      suit = "clubs";
    } else {
      suit = "spades";
    }

    let rank: Rank;
    if (rankNum <= 10) {
      rank = rankNum.toString() as Rank;
    } else if (rankNum === 11) {
      rank = "J";
    } else if (rankNum === 12) {
      rank = "Q";
    } else if (rankNum === 13) {
      rank = "K";
    } else {
      rank = "A";
    }

    return {
      suit,
      rank,
      faceUp: true,
    };
  });
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
  addr: string;
  playerIndex: number;
  seatPosition: number;
  chips: number;
  currentStageBet: number;
  totalRoundBet: number;
  cards: string[];
  isDealer?: boolean;
  isSmallBlind?: boolean;
  isBigBlind?: boolean;
  isTurn?: boolean;
  isAllIn: boolean;
  hasFolded: boolean;
  joinedAndWaitingForNextRound: boolean;
  leavingAfterRoundEnds: boolean;
  handScore: number;
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

export const MAX_PLAYERS = 10;
export const MIN_PLAYERS = 2;
export const EMPTY_SEAT = 255;

export interface Room {
  id: string;
  roundNumber?: number;
  // players: Player[];
  // seatPositionToPlayerIndex: number[];
  numPlayers?: number;
  isPrivate: boolean;
  stage: GameStage;
  pot: number;
  currentStageBet: number;
  smallBlind: number;
  bigBlind: number;
  dealerPosition: number;
  currentPlayerIndex: number;
  lastRaiseIndex: number;
  communityCards: Card[];
  encryptedDeck: `0x${string}`[];
  lastActionTimestamp: number;
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

export const REVEAL_COMMUNITY_CARDS_STAGES = [
  GameStage.RevealFlop,
  GameStage.RevealTurn,
  GameStage.RevealRiver,
];

export const ALL_REVEAL_CARDS_STAGES = [
  GameStage.RevealDeal,
  ...REVEAL_COMMUNITY_CARDS_STAGES
];

export const BETTING_STAGES = [
  GameStage.Preflop,
  GameStage.Flop,
  GameStage.Turn,
  GameStage.River,
];

export const GameStageToString = {
  [GameStage.Idle]: "waiting to start",
  [GameStage.Shuffle]: "encrypting shuffle",
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

// struct BigNumber {
//   bytes val;
//   bool neg;
//   uint256 bitlen;
// }

// struct EncryptedCard {
//   BigNumber c1; // 2048-bit number
//   BigNumber c2; // 2048-bit number
// }

// function revealMyCards(
//   CryptoUtils.EncryptedCard memory encryptedCard1,
//   CryptoUtils.EncryptedCard memory encryptedCard2,
//   BigNumber memory privateKey,
//   BigNumber memory c1Inverse
// ) external returns (string memory card1, string memory card2) {

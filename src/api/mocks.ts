import type { Card, GameStage } from "../lib/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Player = {
  id: string;
  address: string;
  chips: number;
  currentBet: number;
  hasFolded: boolean;
  isAllIn: boolean;
  holeCards: Card[];
};

type Room = {
  id: string;
  isPrivate: boolean;
  players: Player[];
  maxPlayers: number;
  stage: GameStage;
};

const rooms: Room[] = [];

export const createRoom = async ({ isPrivate = false }: { isPrivate?: boolean }) => {
  await sleep(3000);
  const room = {
    id: rooms.length.toString(),
    isPrivate,
    players: [],
    maxPlayers: 8,
    stage: "waitingToStart",
  };
  rooms.push(room);
  return room;
};

export const joinRoom = async ({
  roomId,
  playerId,
}: { roomId: string; playerId: string }) => {
  await sleep(3000);

  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    throw new Error("Room not found");
  }
  if (room.players.length >= room.maxPlayers) {
    throw new Error("Room is full");
  }
  room.players.push({
    id: playerId,
    address: `0x${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
    chips: 1000,
    currentBet: 0,
    hasFolded: false,
    isAllIn: false,
    holeCards: [],
  });
  return room;
};

export const startGame = async ({ roomId }: { roomId: string }) => {
  await sleep(3000);
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    throw new Error("Room not found");
  }
  if (room.players.length < 2) {
    throw new Error("Not enough players to start game");
  }
  room.stage = "preflop";
  return true;
};

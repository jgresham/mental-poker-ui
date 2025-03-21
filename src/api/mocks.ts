import type { Card, GameStage, GameState } from "../lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const FAKE_LOADING_TIME = 1500;
const TO_FAKE_DATA = true;

const rooms: Room[] = [];

if (TO_FAKE_DATA) {
  rooms.push({
    id: "0",
    isPrivate: false,
    players: [
      {
        id: "player-0",
        address: "0x1234567890abcdef",
        chips: 1000,
        currentBet: 0,
        hasFolded: false,
        isAllIn: false,
        holeCards: [],
      },
      {
        id: "player-2",
        address: "0x3434567890abcdef2",
        chips: 1000,
        currentBet: 0,
        hasFolded: false,
        isAllIn: false,
        holeCards: [],
      },
      {
        id: "player-3",
        address: "0x5634567890abcdef3",
        chips: 1000,
        currentBet: 0,
        hasFolded: false,
        isAllIn: false,
        holeCards: [],
      },
    ],
    maxPlayers: 8,
    stage: "preflop",
  });
}

export const createRoom = async ({ isPrivate = false }: { isPrivate?: boolean }) => {
  await sleep(FAKE_LOADING_TIME);
  const room = {
    id: rooms.length.toString(),
    isPrivate,
    players: [],
    maxPlayers: 8,
    stage: "waiting for players" as GameStage,
  };
  rooms.push(room);
  return room;
};

export const joinRoom = async ({
  roomId,
  playerId,
}: { roomId: string; playerId: string }) => {
  await sleep(FAKE_LOADING_TIME);

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
  if (room.players.length >= 2) {
    room.stage = "preflop";
  }
  return room;
};

// TanStack Query Hooks
export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      console.log("createRoom onSuccess", data);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.setQueryData(["room", data.id], data);
    },
  });
};

export const startGame = async ({ roomId }: { roomId: string }) => {
  await sleep(FAKE_LOADING_TIME);
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

// export const useCreateRoom = () => {
//   return useQuery({
//     queryKey: ["rooms"],
//     queryFn: async () => {
//       return await createRoom({});
//     },
//   });
// };

// export const useJoinRoom = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: joinRoom,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["rooms"] });
//       queryClient.setQueryData(["room", data.id], data);
//     },
//   });
// };

export const useStartGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startGame,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["room", variables.roomId] });
    },
  });
};

export const useGetRoom = (roomId: string) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => {
      await sleep(FAKE_LOADING_TIME);
      const room = rooms.find((room) => room.id === roomId);
      if (!room) {
        throw new Error("Room not found");
      }
      // TODO: convert & parse types backend Room to frontend GameState
      const gameState: GameState = {
        players: room.players.map((player) => ({
          id: player.id,
          address: player.address,
          chips: player.chips,
          cards: [],
          isActive: false,
          isDealer: false,
          isSmallBlind: false,
          isBigBlind: false,
          isTurn: false,
          isAllIn: false,
          bet: 0,
        })),
        communityCards: [],
        pot: 0,
        stage: room.stage,
        deck: [],
        currentBet: 0,
        activePlayerIndex: 0,
        dealerIndex: 0,
        smallBlindAmount: 0,
        bigBlindAmount: 0,
      };
      return gameState;
    },
    refetchInterval: 2000, // Poll for updates every 2 seconds
  });
};

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      await sleep(FAKE_LOADING_TIME);
      return rooms.filter((room) => !room.isPrivate);
    },
    refetchInterval: 5000, // Poll for updates every 5 seconds
  });
};

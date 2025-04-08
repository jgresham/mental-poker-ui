import {
  type Card,
  type GameStage,
  type GameState,
  type Room,
  type Player,
  MAX_PLAYERS,
} from "../lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
        cards: [],
        seatPosition: 0,
        isActive: true,
        isDealer: false,
        isSmallBlind: false,
        isBigBlind: false,
        isTurn: false,
        bet: 0,
      },
      {
        id: "player-2",
        address: "0x3434567890abcdef2",
        chips: 1000,
        currentBet: 0,
        hasFolded: false,
        isAllIn: false,
        cards: [],
        seatPosition: 1,
        isActive: true,
        isDealer: false,
        isSmallBlind: false,
        isBigBlind: false,
        isTurn: false,
        bet: 0,
      },
      {
        id: "player-3",
        address: "0x5634567890abcdef3",
        chips: 1000,
        currentBet: 0,
        hasFolded: false,
        isAllIn: false,
        cards: [],
        seatPosition: 2,
        isActive: true,
        isDealer: false,
        isSmallBlind: false,
        isBigBlind: false,
        isTurn: false,
        bet: 0,
      },
    ],
    seatPositionToPlayerIndex: [0, 1, 2],
    numPlayers: 0,
    gameState: {
      communityCards: [],
      pot: 0,
      currentStageBet: 0,
      smallBlind: 0,
      bigBlind: 0,
      dealerPosition: 0,
      currentPlayerIndex: 0,
      lastRaiseIndex: 0,
      encryptedDeck: [],
      stage: 1 as GameStage.Shuffle,
    },
  });
}

export const createRoom = async ({ isPrivate = false }: { isPrivate?: boolean }) => {
  await sleep(FAKE_LOADING_TIME);
  const room = {
    id: rooms.length.toString(),
    isPrivate,
    players: [],
    seatPositionToPlayerIndex: [],
    numPlayers: 0,
    gameState: {
      communityCards: [],
      pot: 0,
      currentStageBet: 0,
      smallBlind: 0,
      bigBlind: 0,
      dealerPosition: 0,
      currentPlayerIndex: 0,
      lastRaiseIndex: 0,
      encryptedDeck: [],
      stage: 1 as GameStage.Shuffle,
    },
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
  if (room.players.length >= MAX_PLAYERS) {
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
    cards: [],
    isActive: true,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
    isTurn: false,
    bet: 0,
    seatPosition: room.players.length,
  });
  if (room.players.length >= 2) {
    room.gameState.stage = 3 as GameStage.Preflop;
  }
  return room;
};

export const submitEncryptedShuffle = async ({
  roomId,
  deck,
}: { roomId: string; deck: bigint[] }) => {
  await sleep(FAKE_LOADING_TIME);
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    throw new Error("Room not found");
  }
  if (room.gameState.stage !== (3 as GameStage.Preflop)) {
    throw new Error("Cannot submit encrypted shuffle at this stage");
  }
  // TODO: ensure it is the player's turn to submit the shuffle
  room.gameState.encryptedDeck = deck;
  room.gameState.currentPlayerIndex =
    (room.gameState.currentPlayerIndex + 1) % room.players.length;
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
  room.gameState.stage = 3 as GameStage.Preflop;
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
      // const matchedRoom: Room = {
      //   ...room,
      //   players: room.players.map((player) => ({
      //     id: player.id,
      //     address: player.address,
      //     chips: player.chips,
      //     cards: [],
      //     isActive: false,
      //     isDealer: false,
      //     isSmallBlind: false,
      //     isBigBlind: false,
      //     isTurn: false,
      //     isAllIn: false,
      //     bet: 0,
      //     hasFolded: false,
      //     currentBet: 0,
      //   })),
      //   communityCards: [],
      //   pot: 0,
      //   stage: room.gameState.stage,
      //   deck: [],
      //   currentBet: 0,
      //   currentPlayerIndex: 0,
      //   dealerIndex: 0,
      //   smallBlindAmount: 0,
      //   bigBlindAmount: 0,
      //   lastRaiseIndex: 0,
      //   revealedCommunityCards: 0,
      //   encryptedDeck: [],
      // };
      return room;
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

import { expect, test, vi } from "vitest";
import { getFirstAvailableSeatPosition } from "../src/lib/poker-utils";

const roomEmpty = {
  players: [],
  maxPlayers: 3,
};

const roomSequential3 = {
  players: [
    { id: "player-0", seatPosition: 0 },
    { id: "player-1", seatPosition: 1 },
    { id: "player-2", seatPosition: 2 },
  ],
};

const roomRandom3 = {
  players: [
    { id: "player-0", seatPosition: 0 },
    { id: "player-1", seatPosition: 4 },
    { id: "player-2", seatPosition: 9 },
  ],
};

test("testGetFirstAvailableSeatPosition_emptyRoom", () => {
  const nextSeatPosition = getFirstAvailableSeatPosition(roomEmpty);
  expect(nextSeatPosition).toBe(0);
});

test("testGetFirstAvailableSeatPosition_roomWith3PlayersInSeats012", () => {
  const nextSeatPosition = getFirstAvailableSeatPosition(roomSequential3);
  expect(nextSeatPosition).toBe(3);
});

test("testGetFirstAvailableSeatPosition_roomWith3PlayersInRandomSeats", () => {
  const nextSeatPosition = getFirstAvailableSeatPosition(roomRandom3);
  expect(nextSeatPosition).toBe(1);
});

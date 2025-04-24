import { zeroAddress } from "viem";
import { GameStage, type Player } from "../src/lib/types";
import {
  getCommunityCardIndexes,
  getMyCardsIndexes,
  getOtherPlayersCardsIndexes,
} from "./../src/lib/utils";
import { expect, test } from "vitest";

test("testGetCommunityCardIndexes_3Players", () => {
  const flopIndexes = getCommunityCardIndexes(GameStage.RevealFlop, 3);
  // 6 player cards (index 5) + 1 burn card (index 6) + 3 flop cards at indexes 7, 8, 9,
  // burn at 10, turn at 11, burn at 12, river at 13
  expect(flopIndexes).toEqual([7, 8, 9]);
  const turnIndexes = getCommunityCardIndexes(GameStage.RevealTurn, 3);
  expect(turnIndexes).toEqual([11]);
  const riverIndexes = getCommunityCardIndexes(GameStage.RevealRiver, 3);
  expect(riverIndexes).toEqual([13]);
});

test("testGetCommunityCardIndexes_2Players", () => {
  const flopIndexes = getCommunityCardIndexes(GameStage.RevealFlop, 2);
  // 4 player cards (index 3) + 1 burn card (index 4) + 3 flop cards at indexes 5,6, 7,
  // burn at 8, turn at 9, burn at 10, river at 11
  expect(flopIndexes).toEqual([5, 6, 7]);
  const turnIndexes = getCommunityCardIndexes(GameStage.RevealTurn, 2);
  expect(turnIndexes).toEqual([9]);
  const riverIndexes = getCommunityCardIndexes(GameStage.RevealRiver, 2);
  expect(riverIndexes).toEqual([11]);
});

test("testGetCommunityCardIndexes_10Players", () => {
  const flopIndexes = getCommunityCardIndexes(GameStage.RevealFlop, 10);
  // 20 player cards (index 19) + 1 burn card (index 20) + 3 flop cards at indexes 21, 22, 23,
  // burn at 24, turn at 25, burn at 26, river at 27
  expect(flopIndexes).toEqual([21, 22, 23]);
  const turnIndexes = getCommunityCardIndexes(GameStage.RevealTurn, 10);
  expect(turnIndexes).toEqual([25]);
  const riverIndexes = getCommunityCardIndexes(GameStage.RevealRiver, 10);
  expect(riverIndexes).toEqual([27]);
});

test("testGetOtherPlayersCardsIndexes_2Players", () => {
  let myPlayerIndex = 0;
  let dealerPlayerIndex = 0;
  const players = [
    {
      addr: "0x123",
      joinedAndWaitingForNextRound: false,
      seatPosition: 0,
    },
    {
      addr: "0x1234",
      joinedAndWaitingForNextRound: false,
      seatPosition: 1,
    },
  ];
  let indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([1, 3]);
  myPlayerIndex = 1;
  indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([0, 2]);

  // dealer is now in seat position 1 (before was 0)
  myPlayerIndex = 1;
  dealerPlayerIndex = 1;
  indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([1, 3]);
  myPlayerIndex = 0;
  indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([0, 2]);
});

test("testGetOtherPlayersCardsIndexes_3Players", () => {
  let myPlayerIndex = 0;
  const dealerPlayerIndex = 0;
  const players = [
    {
      addr: "0x123",
      joinedAndWaitingForNextRound: false,
      seatPosition: 0,
    },
    {
      addr: "0x1234",
      joinedAndWaitingForNextRound: false,
      seatPosition: 1,
    },
    {
      addr: "0x12345",
      joinedAndWaitingForNextRound: false,
      seatPosition: 2,
    },
  ];
  let indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([1, 2, 4, 5]);
  myPlayerIndex = 1;
  indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([0, 2, 3, 5]);
  myPlayerIndex = 2;
  indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([0, 1, 3, 4]);
});

test("testGetOtherPlayersCardsIndexes_10Players", () => {
  let myPlayerIndex = 0;
  const dealerPlayerIndex = 0;
  const players = [
    {
      addr: "0x1",
      joinedAndWaitingForNextRound: false,
      seatPosition: 0,
    },
    {
      addr: "0x2",
      joinedAndWaitingForNextRound: false,
      seatPosition: 1,
    },
    {
      addr: "0x3",
      joinedAndWaitingForNextRound: false,
      seatPosition: 2,
    },
    {
      addr: "0x4",
      joinedAndWaitingForNextRound: false,
      seatPosition: 2,
    },
    {
      addr: "0x5",
      joinedAndWaitingForNextRound: false,
      seatPosition: 4,
    },
    {
      addr: "0x6",
      joinedAndWaitingForNextRound: false,
      seatPosition: 5,
    },
    {
      addr: "0x7",
      joinedAndWaitingForNextRound: false,
      seatPosition: 6,
    },
    {
      addr: "0x8",
      joinedAndWaitingForNextRound: false,
      seatPosition: 7,
    },
    {
      addr: "0x9",
      joinedAndWaitingForNextRound: false,
      seatPosition: 8,
    },
    {
      addr: "0xa",
      joinedAndWaitingForNextRound: false,
      seatPosition: 9,
    },
  ];
  let indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);
  // position "5"
  myPlayerIndex = 4;
  indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([
    0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19,
  ]);
  // position "10"
  myPlayerIndex = 9;
  indexes = getOtherPlayersCardsIndexes(
    myPlayerIndex,
    dealerPlayerIndex,
    players as Player[],
  );
  expect(indexes).toEqual([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ]);
});

test("testGetMyCardsIndexes_2Players", () => {
  let myPlayerIndex = 0;
  const dealerPlayerIndex = 0;
  const players = [
    {
      addr: "0x123",
      joinedAndWaitingForNextRound: false,
      seatPosition: 0,
    },
    {
      addr: "0x1234",
      joinedAndWaitingForNextRound: false,
      seatPosition: 1,
    },
  ];
  let indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 2]);
  myPlayerIndex = 1;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([1, 3]);
});

test("testGetMyCardsIndexes_3Players_InFirst3Seats", () => {
  let myPlayerIndex = 0;
  let dealerPlayerIndex = 0;
  const players = [
    {
      addr: "0x123",
      joinedAndWaitingForNextRound: false,
      seatPosition: 0,
    },
    {
      addr: "0x1234",
      joinedAndWaitingForNextRound: false,
      seatPosition: 1,
    },
    {
      addr: "0x12345",
      joinedAndWaitingForNextRound: false,
      seatPosition: 2,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 3,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 4,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 5,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 6,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 7,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 8,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 9,
    },
  ];
  let indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 3]);
  myPlayerIndex = 1;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([1, 4]);
  myPlayerIndex = 2;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([2, 5]);

  // dealer is now in seat position 1 (before was 0)
  myPlayerIndex = 0;
  dealerPlayerIndex = 1;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([2, 5]);
  myPlayerIndex = 1;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 3]);
  myPlayerIndex = 2;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([1, 4]);

  // dealer is now in seat position 2 (before was 1)
  myPlayerIndex = 0;
  dealerPlayerIndex = 2;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([1, 4]);
  myPlayerIndex = 1;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([2, 5]);
  myPlayerIndex = 2;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 3]);
});

test("testGetMyCardsIndexes_10Players", () => {
  let myPlayerIndex = 0;
  const dealerPlayerIndex = 0;
  const players = [
    {
      addr: "0x1",
      joinedAndWaitingForNextRound: false,
      seatPosition: 0,
    },
    {
      addr: "0x2",
      joinedAndWaitingForNextRound: false,
      seatPosition: 1,
    },
    {
      addr: "0x3",
      joinedAndWaitingForNextRound: false,
      seatPosition: 2,
    },
    {
      addr: "0x4",
      joinedAndWaitingForNextRound: false,
      seatPosition: 2,
    },
    {
      addr: "0x5",
      joinedAndWaitingForNextRound: false,
      seatPosition: 4,
    },
    {
      addr: "0x6",
      joinedAndWaitingForNextRound: false,
      seatPosition: 5,
    },
    {
      addr: "0x7",
      joinedAndWaitingForNextRound: false,
      seatPosition: 6,
    },
    {
      addr: "0x8",
      joinedAndWaitingForNextRound: false,
      seatPosition: 7,
    },
    {
      addr: "0x9",
      joinedAndWaitingForNextRound: false,
      seatPosition: 8,
    },
    {
      addr: "0xa",
      joinedAndWaitingForNextRound: false,
      seatPosition: 9,
    },
  ];
  let indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 10]);
  // position "5"
  myPlayerIndex = 4;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([4, 14]);
  // position "10"
  myPlayerIndex = 9;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([9, 19]);
});

// this can happen after many players leave and join the table in various orders
test("testGetMyCardsIndexes_3Players_InUnorderlyPlayerIndexAndSeatPositionWithSeatAndPlayerGaps", () => {
  let myPlayerIndex = 0;
  let dealerPlayerIndex = 0;
  const players = [
    {
      addr: "0x1",
      joinedAndWaitingForNextRound: false,
      seatPosition: 7,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 3,
    },
    {
      addr: "0x2",
      joinedAndWaitingForNextRound: false,
      seatPosition: 4,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 2,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 0,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 6,
    },
    {
      addr: "0x3",
      joinedAndWaitingForNextRound: false,
      seatPosition: 1,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 5,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 9,
    },
    {
      addr: zeroAddress,
      joinedAndWaitingForNextRound: false,
      seatPosition: 8,
    },
  ];
  // playerIndex 0 is in seat position 7
  // playerIndex 2 is in seat position 4
  // playerIndex 6 is in seat position 1
  myPlayerIndex = 0;
  dealerPlayerIndex = 0;
  let indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 3]);
  // empty/null player should have no cards?
  myPlayerIndex = 1;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([]);
  myPlayerIndex = 2;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([2, 5]);
  myPlayerIndex = 6; // first player left of the dealer
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([1, 4]);

  // dealer is now in seat position 4
  myPlayerIndex = 2;
  dealerPlayerIndex = 2;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 3]);
  myPlayerIndex = 6;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([2, 5]);
  myPlayerIndex = 0;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([1, 4]);

  // playerIndex 0 is in seat position 7
  // playerIndex 2 is in seat position 4
  // playerIndex 6 is in seat position 1
  // dealer is now in seat position 1
  myPlayerIndex = 6;
  dealerPlayerIndex = 6;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([0, 3]);
  myPlayerIndex = 0;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([2, 5]);
  myPlayerIndex = 2;
  indexes = getMyCardsIndexes(myPlayerIndex, dealerPlayerIndex, players as Player[]);
  expect(indexes).toEqual([1, 4]);
});

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
  let indexes = getOtherPlayersCardsIndexes(0, 10);
  expect(indexes).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);
  // position "5"
  indexes = getOtherPlayersCardsIndexes(4, 10);
  expect(indexes).toEqual([
    0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19,
  ]);
  // position "10"
  indexes = getOtherPlayersCardsIndexes(9, 10);
  expect(indexes).toEqual([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ]);
});

test("testGetMyCardsIndexes_2Players", () => {
  let indexes = getMyCardsIndexes(0, 2);
  expect(indexes).toEqual([0, 2]);
  indexes = getMyCardsIndexes(1, 2);
  expect(indexes).toEqual([1, 3]);
});

test("testGetMyCardsIndexes_3Players", () => {
  let indexes = getMyCardsIndexes(0, 3);
  expect(indexes).toEqual([0, 3]);
  indexes = getMyCardsIndexes(1, 3);
  expect(indexes).toEqual([1, 4]);
  indexes = getMyCardsIndexes(2, 3);
  expect(indexes).toEqual([2, 5]);
});

test("testGetMyCardsIndexes_10Players", () => {
  let indexes = getMyCardsIndexes(0, 10);
  expect(indexes).toEqual([0, 10]);
  // position "5"
  indexes = getMyCardsIndexes(4, 10);
  expect(indexes).toEqual([4, 14]);
  // position "10"
  indexes = getMyCardsIndexes(9, 10);
  expect(indexes).toEqual([9, 19]);
});

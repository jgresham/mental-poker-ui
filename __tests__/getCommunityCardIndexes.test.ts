import { GameStage } from "../src/lib/types";
import { getCommunityCardIndexes } from "./../src/lib/utils";
import { expect, test, vi } from "vitest";

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

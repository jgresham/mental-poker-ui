import { expect, test, vi } from "vitest";
import { p2048, stringToChunks } from "../src/lib/elgamal-commutative-node-fixedr";
import { getSafeChunkSize } from "../src/lib/elgamal-commutative-node";

const DECK = [...Array(52).keys()].map((i) => i.toString());

test("testSafeChunkSize2048bitPrime_254bytes", () => {
  const result = getSafeChunkSize(p2048);
  expect(result).toBe(254);
});

test("testHelloWorldChunkSize", () => {
  const result = stringToChunks("Hello, world!");
  expect(result.length).toBe(1);
});

test("testCardChunkSize_card0", () => {
  const result = stringToChunks(DECK[0]);
  expect(result.length).toBe(1);
});

test("testCardChunkSize_card1", () => {
  const result = stringToChunks(DECK[1]);
  expect(result.length).toBe(1);
});

test("testCardChunkSize_card51", () => {
  const result = stringToChunks(DECK[51]);
  expect(result.length).toBe(1);
});

test("testMaximallyPaddedCardMessageInOne_252byteStringPlusColonPlusCard0", () => {
  const a256byteString = "a".repeat(252);
  const maximallyPaddedMessage = `${a256byteString}:${DECK[0]}`;
  const result = stringToChunks(maximallyPaddedMessage);
  expect(result.length).toBe(1);
});

test("testMaximallyPaddedCardMessageInOne_251byteStringPlusColonPlusCard51", () => {
  const a256byteString = "a".repeat(251);
  const maximallyPaddedMessage = `${a256byteString}:${DECK[51]}`;
  const result = stringToChunks(maximallyPaddedMessage);
  expect(result.length).toBe(1);
});

test("test254byteString", () => {
  const a256byteString = "a".repeat(254);
  const result = stringToChunks(a256byteString);
  expect(result.length).toBe(1);
});

test("test255byteString", () => {
  const a255byteString = "a".repeat(255);
  const result = stringToChunks(a255byteString);
  expect(result.length).toBe(2);
});

test("test256byteString", () => {
  const a256byteString = "a".repeat(256);
  const result = stringToChunks(a256byteString);
  expect(result.length).toBe(2);
});

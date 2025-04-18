import { useMemo } from "react";
import {
  useReadTexasHoldemRoomGetPlayers,
  useReadDeckHandlerGetBulkRoomData,
} from "../generated";

export function useGetPlayers() {
  // Get raw data from wagmi hook
  const {
    data: rawData,
    isLoading,
    error,
    refetch,
  } = useReadTexasHoldemRoomGetPlayers({});

  // Format data when it's available
  const formattedData = useMemo(() => {
    if (!rawData) return null;
    return rawData.map((player, playerIndex) => ({
      ...player,
      chips: Number(player.chips),
      currentStageBet: Number(player.currentStageBet),
      totalRoundBet: Number(player.totalRoundBet),
      handScore: Number(player.handScore),
      playerIndex,
    }));
  }, [rawData]);

  return { data: formattedData, isLoading, error, refetch };
}

/**
 * Formats bulk room data from contract response
 * @returns bulk room data
 */
export function useGetBulkRoomData() {
  // Get raw data from wagmi hook
  const {
    data: rawData,
    isLoading,
    error,
    refetch,
  } = useReadDeckHandlerGetBulkRoomData({});

  // Format data when it's available
  const formattedData = useMemo(() => {
    if (!rawData) return null;
    console.log("useReadDeckHandlerGetBulkRoomData rawData", rawData);
    return {
      ...rawData,
      pot: Number(rawData.pot),
      currentStageBet: Number(rawData.currentStageBet),
      smallBlind: Number(rawData.smallBlind),
      bigBlind: Number(rawData.bigBlind),
      dealerPosition: Number(rawData.dealerPosition),
      currentPlayerIndex: Number(rawData.currentPlayerIndex),
      lastRaiseIndex: Number(rawData.lastRaiseIndex),
      numPlayers: Number(rawData.numPlayers),
      roundNumber: Number(rawData.roundNumber),
    };
  }, [rawData]);

  return { data: formattedData, isLoading, error, refetch };
}

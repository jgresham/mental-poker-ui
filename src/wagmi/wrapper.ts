import { useMemo } from "react";
import { useReadTexasHoldemRoomGetPlayers } from "../generated";

export function useGetPlayers() {
  // Get raw data from wagmi hook
  const { data: rawData, isLoading, error } = useReadTexasHoldemRoomGetPlayers({});

  // Format data when it's available
  const formattedData = useMemo(() => {
    if (!rawData) return null;
    return rawData.map((player) => ({
      ...player,
      chips: Number(player.chips),
      currentStageBet: Number(player.currentStageBet),
      totalRoundBet: Number(player.totalRoundBet),
    }));
  }, [rawData]);

  return { data: formattedData, isLoading, error };
}

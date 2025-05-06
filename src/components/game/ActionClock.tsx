import { useEffect, useState } from "react";

export const DEFAULT_TIME_LIMIT_SEC = 30;
export function ActionClock({
  lastActionTimestamp,
  timeLimit = DEFAULT_TIME_LIMIT_SEC,
  isActive = true,
}: { lastActionTimestamp: number; timeLimit?: number; isActive?: boolean }) {
  const [seconds, setSeconds] = useState<number | undefined>(undefined);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive) {
      if (lastActionTimestamp !== undefined && lastActionTimestamp > 0) {
        intervalId = setInterval(() => {
          const timeLeft = Math.floor(
            lastActionTimestamp + timeLimit - Date.now() / 1000,
          );
          setSeconds(timeLeft);
        }, 1000);
      } else {
        setSeconds(undefined);
      }
    }

    return () => clearInterval(intervalId);
  }, [timeLimit, isActive, lastActionTimestamp]);

  return <span>action clock: {seconds !== undefined ? `${seconds}s` : "..."}</span>;
}

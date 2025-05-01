import React, { useEffect, useState } from "react";
import {
  type Card as CardType,
  stringCardsToCards,
  type Player,
  GameStage,
} from "@/lib/types";
import { Card } from "./Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEnsAvatar } from "wagmi";
import { useEnsName } from "wagmi";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import {
  usePlayerCards,
  useInvalidCards,
  useSetInvalidCards,
} from "../../hooks/localRoomState";

interface PlayerProps {
  player: Player;
  isCurrentUser?: boolean;
  stage?: GameStage;
}

export function PlayerUI({ player, isCurrentUser = false, stage }: PlayerProps) {
  const {
    name,
    addr,
    chips,
    // cards,
    hasFolded,
    isDealer,
    isSmallBlind,
    isBigBlind,
    isTurn,
    isAllIn,
    currentStageBet,
    // totalRoundBet,
    avatarUrl,
  } = player;

  const { data: ensName } = useEnsName({ address: addr as `0x${string}` });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? "" });
  const [cards, setCards] = useState<CardType[]>([]);
  const { data: playerCards } = usePlayerCards();
  const { data: invalidCards } = useInvalidCards();
  const { mutate: setInvalidCards } = useSetInvalidCards();
  console.log("playerUI.tsx invalidCards", invalidCards);

  useEffect(() => {
    if (
      playerCards[0] !== undefined &&
      playerCards[1] !== undefined &&
      playerCards[0] !== "" &&
      playerCards[1] !== "" &&
      isCurrentUser
    ) {
      try {
        setCards(stringCardsToCards(playerCards));
        if (invalidCards?.playerOrCommunityCards === "player") {
          setInvalidCards({
            areInvalid: false,
            playerOrCommunityCards: undefined,
            cardIndices: undefined,
          });
        }
      } catch (error) {
        console.error("Error converting player cards to cards", error);
        toast.error("Error decrypting player cards");
        // todo: show user a button to report invalid cards (or automatically call report function as a txn)
        setInvalidCards({
          areInvalid: true,
          playerOrCommunityCards: "player",
          cardIndices: undefined,
        });
      }
    }
    // including invalidCards and setInvalidCards in the dependency array causes this to be run twice
  }, [playerCards, isCurrentUser]);

  // Get initials for avatar fallback
  const displayName = ensName ?? name;
  const initials = displayName
    ? displayName
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : addr?.slice(2, 4);

  return (
    <div
      className={cn(
        "flex flex-col items-center p-1 rounded-lg transition-all max-w-[110px] mx-auto",
        isTurn
          ? "bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500"
          : "bg-gray-100 dark:bg-gray-800/30",
        // isActive && "opacity-50",
        isCurrentUser && "bg-green-100 dark:bg-green-900/30",
      )}
    >
      {isTurn && (
        <div className="fixed bottom-[-10px] right-[-10px]">
          <span className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full ring-1 ring-blue-500">
            <Clock size={16} />
          </span>
        </div>
      )}
      <div className="flex items-center gap-1 mb-1 w-full">
        <Avatar className="h-8 w-8 border-2 border-white">
          <AvatarImage src={avatarUrl ?? ensAvatar ?? undefined} alt={name} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          {isCurrentUser && <span className="text-xs font-medium truncate">ME</span>}
          <span className="text-xs font-medium truncate">{name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">${chips}</span>
        </div>
      </div>

      <div className="flex gap-1 mb-1 justify-center">
        {[0, 1].map((index) => (
          <div key={index} className="w-9 h-12">
            {cards[index] ? (
              <Card
                card={{
                  ...cards[index],
                  faceUp: isCurrentUser ? true : cards[index].faceUp,
                }}
                className="w-full h-full"
              />
            ) : (
              <>
                {stage !== undefined &&
                stage >= GameStage.Shuffle &&
                !player.hasFolded ? (
                  <Card
                    card={{
                      faceUp: false,
                      suit: "hearts",
                      rank: "A",
                    }}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full rounded border border-black/10" />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {isDealer && (
          <Badge variant="outline" className="text-xs py-0 px-1 h-5">
            D
          </Badge>
        )}
        {isSmallBlind && (
          <Badge variant="outline" className="text-xs py-0 px-1 h-5">
            SB
          </Badge>
        )}
        {isBigBlind && (
          <Badge variant="outline" className="text-xs py-0 px-1 h-5">
            BB
          </Badge>
        )}
        {isAllIn && (
          <Badge variant="destructive" className="text-xs py-0 px-1 h-5">
            All-In
          </Badge>
        )}
        {currentStageBet > 0 && (
          <Badge variant="secondary" className="text-xs py-0 px-1 h-5">
            Bet: ${currentStageBet}
          </Badge>
        )}
        {hasFolded && (
          <Badge variant="outline" className="text-xs py-0 px-1 h-5">
            F
          </Badge>
        )}
      </div>
    </div>
  );
}

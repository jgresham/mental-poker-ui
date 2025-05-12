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
import { useEnsAvatar, useEnsName } from "wagmi";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import {
  usePlayerCards,
  useInvalidCards,
  useSetInvalidCards,
} from "../../hooks/localRoomState";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PlayerProps {
  player: Player;
  isCurrentUser?: boolean;
  stage?: GameStage;
  layout?: "small";
}

export function PlayerUI({
  player,
  isCurrentUser = false,
  stage,
  layout = "small",
}: PlayerProps) {
  const {
    name,
    addr,
    chips,
    hasFolded,
    isDealer,
    isSmallBlind,
    isBigBlind,
    isTurn,
    isAllIn,
    currentStageBet,
    avatarUrl,
  } = player;

  const { data: ensName } = useEnsName({ address: addr as `0x${string}` });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined });
  const [cards, setCards] = useState<CardType[]>([]);
  const { data: playerCards } = usePlayerCards();
  const { data: invalidCardsData } = useInvalidCards();
  const { mutate: setInvalidCards } = useSetInvalidCards();
  console.log("playerUI.tsx invalidCards", invalidCardsData);

  useEffect(() => {
    console.log("player ui setCards useEffect");
    if (
      playerCards[0] !== undefined &&
      playerCards[1] !== undefined &&
      playerCards[0] !== "" &&
      playerCards[1] !== "" &&
      isCurrentUser
    ) {
      try {
        console.log("player ui setCards useEffect try");
        setCards(stringCardsToCards(playerCards));
        if (invalidCardsData?.playerOrCommunityCards === "player") {
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

    let avatarSrc = avatarUrl;
    if(avatarUrl === undefined) {
      avatarSrc = ensAvatar ?? undefined;
    }

  const PlayerInfoSection = () => (
    <div className="flex items-center gap-1 mb-1 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-2" align="center" side="top">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatarSrc} alt={name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{displayName}</span>
                <span className="text-xs text-gray-500 truncate">{addr}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div>Chips:</div>
              <div className="font-medium">${chips}</div>
              <div>Status:</div>
              <div className="font-medium">
                {hasFolded ? "Folded" : isAllIn ? "All-In" : "Active"}
              </div>
              {(isDealer || isSmallBlind || isBigBlind) && (
                <>
                  <div>Position:</div>
                  <div className="font-medium">
                    {isDealer ? "Dealer" : isSmallBlind ? "Small Blind" : "Big Blind"}
                  </div>
                </>
              )}
              {currentStageBet > 0 && (
                <>
                  <div>Current Bet:</div>
                  <div className="font-medium">${currentStageBet}</div>
                </>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex flex-col overflow-hidden">
        {isCurrentUser && <span className="text-xs font-medium truncate">ME</span>}
        {/* <span className="text-xs font-medium truncate">{displayName}</span> */}
        <span className="text-xs font-bold">${chips}</span>
      </div>
    </div>
  );

  const BadgesSection = () => (
    <div className="flex flex-wrap gap-0.5 sm:gap-1 justify-center">
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
  );

  const renderCardContent = (cardIndex: number) =>
    (cards[cardIndex] && stage !== undefined && stage >= GameStage.Preflop) ? (
      <Card
        card={{
          ...cards[cardIndex],
          faceUp: isCurrentUser ? true : cards[cardIndex].faceUp,
        }}
        className="w-full h-full shadow-sm"
      />
    ) : (
      <>
        {
          !player.hasFolded &&
            !player.joinedAndWaitingForNextRound &&
            (stage !== undefined && stage >= GameStage.RevealDeal ? (
              <Card
                card={{ faceUp: false, suit: "hearts", rank: "A" }} // Placeholder for face-down card
                className="w-full h-full shadow-sm"
              />
            ) : (
              <div className="w-full h-full rounded" />
            ))
          // show nothing if player has folded
        }
      </>
    );

  if (layout === "small") {
    return (
      <div
        className={cn(
          "flex flex-col items-center relative p-0.5",
          isCurrentUser && " rounded-lg bg-green-50/30 dark:bg-green-900/20",
        )}
      >
        {isTurn && (
          <div className="absolute bottom-[-2px] left-[-2px] z-20">
            <span className="flex items-center justify-center w-5 h-5 bg-yellow-100 dark:bg-yellow-800 rounded-full ring-1 ring-yellow-500 shadow-md animate-pulse">
              <Clock size={10} />
            </span>
          </div>
        )}
        {/* {isCurrentUser && (
          <div className="absolute inset-0 rounded-lg pointer-events-none animate-pulse ring-2 ring-green-400/50"></div>
        )} */}
        <PlayerInfoSection />
        {/* {player.joinedAndWaitingForNextRound && <div className="text-xs">idle</div>} */}
        <div className="relative h-12 w-[3rem] mb-1">
          {" "}
          {/* Container: card width (2.25rem) + offset (0.75rem) = 3rem */}
          {[0, 1].map((index) => (
            <div
              key={index}
              className={cn(
                `absolute top-0 w-9 h-12`, // w-9 is 2.25rem
                index === 0 && "left-[-0.5rem] z-10 transform -rotate-[8deg]",
                index === 1 && "left-[1rem] transform rotate-[15deg]", // 0.75rem (12px) offset
              )}
            >
              {renderCardContent(index)}
            </div>
          ))}
        </div>
        <BadgesSection />
      </div>
    );
  }
}

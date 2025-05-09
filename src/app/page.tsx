"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  // const [gameState, setGameState] = useState<GameState | null>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<number>(8);
  const [showSetup, setShowSetup] = useState<boolean>(false);
  // const [currentPlayerId, setCurrentPlayerId] = useState<string>("player-0");
  const [isPublic, setIsPublic] = useState<boolean>(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      if (context) {
        console.log("Farcaster miniapp context found", context);
        try {
          console.log("Calling sdk.actions.ready()");
          sdk.actions.ready();
          sdk.actions.addFrame();
        } catch (error) {
          console.error("Error frame ready or calling add frame", error);
        }
      } else {
        console.log("No Farcaster context found");
      }
    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, []);

  // Initialize game when player count changes
  // useEffect(() => {
  //   if (!showSetup && !gameState) {
  //     const initialState = initializeGame(playerCount);
  //     const stateWithCards = dealCards(initialState);
  //     setGameState(stateWithCards);
  //   }
  // }, [showSetup, gameState, playerCount]);

  // Handle starting a new game
  const handleStartGame = () => {
    // createRoom(
    //   { isPrivate: !isPublic },
    //   {
    //     onSuccess: (createdRoom) => {
    //       router.push(`/room/${createdRoom.id}`);
    //     },
    //   },
    // );
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between overflow-hidden">
      <div className="w-full h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Card pattern background */}
        <div className="absolute inset-0 opacity-5 p-2">
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 64 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={i} className="aspect-[2/3] bg-white rounded-md" />
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="z-10 w-full flex flex-col items-center text-center overflow-y-auto pt-10 px-4">
          <div className="max-w-3xl text-center space-y-8 ">
            {/* <div> */}
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              Mental Poker
            </h1>

            <p className="text-xl md:text-2xl text-green-100">
              {"Secure, open poker with no house fees"}
            </p>
            {/* </div> */}

            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl text-white">
              <h2 className="text-2xl font-semibold mb-4">Texas Hold&apos;em style</h2>
              <p className="mb-6">
                {/* Mental Poker uses cryptographic protocols to ensure fair play without
                requiring a trusted dealer. The deck is encrypted and shuffled by each
                player and your cards remain private to you until you reveal them, just
                like real poker - all with no house fees. */}
                Your cards remain private to you until they are revealed, just like real
                poker - all with no house fees.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Button
                  onClick={() => setShowSetup(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                >
                  Start Playing
                </Button> */}

                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  onClick={() => router.push("/room/0")}
                >
                  Start Playing
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Secure</h3>
                <p>Commutative discrete logarithm encryption ensures no one can cheat.</p>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">No House</h3>
                <p>
                  Play directly with other players without a central server controlling
                  the game nor a trusted dealer, and no house fees.
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Public & open</h3>
                <p>
                  All actions are recorded onchain, so anyone can verify and build on top
                  of your history.
                </p>
              </div>
            </div>

            <div className="pt-8 row-start-3 flex gap-6 flex-wrap items-center justify-center pb-8">
              <Link
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/jgresham/mental-poker-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  className="dark:invert"
                  src="/github.svg"
                  alt="Github icon"
                  width={16}
                  height={16}
                />
                Github
              </Link>
              <Link
                className="flex items-center gap-2 hover:underline hover:underline-offset-4 fill-black"
                href="https://basescan.org/address/0xf34890f942220f48391BA33Ff053f64Aa8979956#code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  className="dark:invert"
                  src="/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
                />
                Mainnet Smart Contract
              </Link>
              <Link
                className="flex items-center gap-2 hover:underline hover:underline-offset-4 fill-black"
                href="https://sepolia.basescan.org/address/0xfd95b63455287facf0eed16a4dd922813a98ecf1#code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  className="dark:invert"
                  src="/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
                />
                Testnet Smart Contract
              </Link>
            </div>
          </div>

          {/* Decorative cards */}
          <div className="absolute -bottom-10 -left-10 transform rotate-12 opacity-30">
            <div className="w-32 h-44 bg-white rounded-lg shadow-lg" />
          </div>
          <div className="absolute -top-10 -right-10 transform -rotate-12 opacity-30">
            <div className="w-32 h-44 bg-white rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
      {/* Game setup dialog */}
      <Dialog open={showSetup} onOpenChange={setShowSetup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Texas Hold&apos;em Poker</DialogTitle>
            <DialogDescription>
              Set up your poker game. You can have between 2 and 10 players.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="player-count" className="text-sm font-medium">
                Max number of players: {playerCount}
              </label>
              <input
                id="player-count"
                type="range"
                min={2}
                max={10}
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="room-type" className="text-sm font-medium">
                Room Type
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  variant={isPublic ? "default" : "outline"}
                  onClick={() => setIsPublic(true)}
                  className="flex-1"
                >
                  Public
                </Button>
                <Button
                  variant={isPublic ? "outline" : "default"}
                  onClick={() => setIsPublic(false)}
                  className="flex-1"
                  disabled={true}
                  title="Coming soon"
                >
                  Private (coming soon)
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                {isPublic
                  ? "Anyone with the link can join this room."
                  : "Only invited players can join this room."}
              </p>
            </div>
          </div>

          <DialogFooter>
            {/* <Button onClick={handleStartGame} disabled={isCreatingRoom}>
              Start Game {isCreatingRoom && "loading..."}
            </Button> */}
            <Button onClick={handleStartGame} disabled={true}>
              {"Start Game (Coming soon)"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

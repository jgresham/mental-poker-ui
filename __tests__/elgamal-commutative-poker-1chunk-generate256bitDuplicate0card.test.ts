// import { p256 } from "./../src/lib/elgamal-commutative-node-1chunk";
// import { expect, test, vi } from "vitest";
// import {
//   bigintToString,
//   generatePermutations,
// } from "../src/lib/elgamal-commutative-node-1chunk";
// // import {
// //   testMultiPartyCommutative,
// //   testMultiPartyCommutativeFlipped,
// // } from "../src/lib/elgamal-commutative-node";
// import {
//   decryptCard,
//   shuffleAndEncryptDeck,
//   DECK,
//   formatCardDeckForShuffleAndEncrypt,
//   modInverse,
// } from "../src/lib/encrypted-poker-1chunk";
// import * as bigintModArith from "bigint-mod-arith";

// // vitest set timeout to 1 minute
// // Set timeout for all tests in this file to 60 seconds
// vi.setConfig({ testTimeout: 60000 });

// test("test generate data, 2-player test, optional-shuffle", () => {
//   const NUM_PLAYERS = 2;
//   const SHUFFLE = true;
//   console.log(`SHUFFLE?: ${SHUFFLE}`);

//   const players: {
//     publicKey: bigint;
//     privateKey: bigint;
//     r: bigint;
//     encryptedDeck: { c1: bigint; c2: bigint }[];
//     c1InversePowPrivateKey: bigint;
//   }[] = [];

//   // Generate keys and random values for all players
//   for (let i = 0; i < NUM_PLAYERS; i++) {
//     // const { publicKey, privateKey } = generateKeys();
//     let publicKey = BigInt(0);
//     let privateKey = BigInt(0);
//     if (i === 0) {
//       publicKey = BigInt(
//         "0x974b5948c8b5e352268bae8dcf84c2b344f70c81d3b10bbf05479503048cf97b",
//       );
//       privateKey = BigInt(
//         "0xaf7d8a9599ef4219ee11357f3322cd65e174d4af38a819fb6ab5ed7adc602584",
//       );
//     } else {
//       // const keys2 = generateKeys();
//       // publicKey = keys2.publicKey;
//       // privateKey = keys2.privateKey;
//       publicKey = BigInt(
//         "0xca1b30a69816116985f58d8df073cfa27ff0fca865db54e5e2db8e54c8a0292c",
//       );
//       privateKey = BigInt(
//         "0xa33fec6160f3a3beecd0a71efcd0cf9c39d6c3820035b521a723cdc943c26a6a",
//       );
//     }
//     // const r = randomBigIntInRange(BigInt(3), p2048);
//     let r = BigInt(0);
//     if (i === 0) {
//       r = BigInt("0xac51ef534d98842a108553489d87602721fa0e5490f6042ab2418e8b58e0b690");
//     } else {
//       r = BigInt("0xfe4e96171fbaea7c1a03195f21d157cc1922e8cbceb37678973cc6a9b39f5c20");
//     }
//     let deck: {
//       c1: bigint;
//       c2: bigint;
//     }[];
//     if (i > 0) {
//       deck = players[i - 1].encryptedDeck;
//     } else {
//       deck = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r, p: p256 });
//     }
//     const encryptedDeck = shuffleAndEncryptDeck({
//       encryptedDeck: deck,
//       publicKey,
//       r,
//       noShuffle: !SHUFFLE,
//     });
//     console.log(
//       `DEBUGGG: \npub: ${publicKey.toString(16)} \npriv: ${privateKey.toString(16)} \nr: ${r.toString(16)}, \nprevDeck: ${deck[0].c2.toString(16)} \n eDeck: ${encryptedDeck[0].c2.toString(16)}`,
//     );
//     const c1InversePowPrivateKey = modInverse(
//       bigintModArith.modPow(encryptedDeck[0].c1, privateKey, p256),
//       p256,
//     );
//     players.push({ publicKey, privateKey, r, encryptedDeck, c1InversePowPrivateKey });
//   }

//   const encryptedDeckAgain = shuffleAndEncryptDeck({
//     encryptedDeck: players[0].encryptedDeck,
//     publicKey: players[1].publicKey,
//     r: players[1].r,
//     noShuffle: !SHUFFLE,
//   });
//   console.log(
//     `DEBUGGG: \npub: ${players[1].publicKey.toString(16)} \npriv: ${players[1].privateKey.toString(16)} \nr: ${players[1].r.toString(16)}, \nprevDeck: ${players[0].encryptedDeck[0].c2.toString(16)} \n eDeck: ${encryptedDeckAgain[0].c2.toString(16)}`,
//   );

//   console.log("\n\n\n\n\n\n PLAYERS \n\n\n\n\n");
//   console.log(
//     JSON.stringify(
//       players,
//       (key, value) => (typeof value === "bigint" ? value.toString(16) : value),
//       2,
//     ),
//   );
//   for (let i = 0; i < players.length; i++) {
//     const player = players[i];
//     for (let j = 0; j < player.encryptedDeck.length; j++) {
//       const card = player.encryptedDeck[j];
//       console.log(
//         `encryptedDeck${i + 1}bytes[${j}] = hex"${card.c2.toString(16).padStart(64, "0")}";`,
//       );
//     }
//   }
//   console.log("\n\n\n\n\n\n END PLAYERS \n\n\n\n\n");

//   // Verify that all players' c1 values are consistent across all cards
//   for (let playerIndex = 0; playerIndex < NUM_PLAYERS; playerIndex++) {
//     const player = players[playerIndex];
//     const playerC1Values = player.encryptedDeck.map((card) => card.c1);
//     const uniquePlayerC1Values = new Set(playerC1Values);
//     expect(
//       uniquePlayerC1Values.size,
//       `Player ${playerIndex + 1}'s c1 values are not the same for every card`,
//     ).toBe(1);
//   }

//   // Test all possible decryption permutations for a single card
//   const CARD_INDEX = 0;
//   const allPermutations = generatePermutations([...Array(NUM_PLAYERS).keys()]).slice(
//     0,
//     3,
//   );

//   for (const permutation of allPermutations) {
//     console.log(`Permutation: ${permutation.join("-")}`);
//     let currentCard = players[NUM_PLAYERS - 1].encryptedDeck[CARD_INDEX].c2;
//     // Apply decryption in the order specified by the permutation
//     for (const playerIndex of permutation) {
//       currentCard = decryptCard({
//         encryptedCard: {
//           c1: players[playerIndex].encryptedDeck[CARD_INDEX].c1,
//           c2: currentCard,
//         },
//         privateKey: players[playerIndex].privateKey,
//       });
//     }

//     // Verify the decrypted card is in the original deck
//     const decryptedCardString = bigintToString(currentCard);
//     expect(DECK).toContain(decryptedCardString);
//     console.log(
//       `Permutation ${permutation.join("-")} decrypted to: ${decryptedCardString}`,
//     );
//   }

//   // Decrypt every card using a fixed permutation and validate the entire deck
//   const fixedPermutation = [...Array(NUM_PLAYERS).keys()]; // 0, 1, 2, ..., 9
//   let remainingCards = [...DECK];

//   for (let cardIndex = 0; cardIndex < DECK.length; cardIndex++) {
//     let currentCard = players[NUM_PLAYERS - 1].encryptedDeck[cardIndex].c2;

//     // Apply decryption in the fixed order
//     for (const playerIndex of fixedPermutation) {
//       currentCard = decryptCard({
//         encryptedCard: {
//           c1: players[playerIndex].encryptedDeck[cardIndex].c1,
//           c2: currentCard,
//         },
//         privateKey: players[playerIndex].privateKey,
//       });
//     }

//     const decryptedCardString = bigintToString(currentCard);
//     expect(DECK).toContain(decryptedCardString); // card in original deck
//     expect(remainingCards).toContain(decryptedCardString); // card is not a duplicate
//     remainingCards = remainingCards.filter((card) => card !== decryptedCardString);
//   }
//   // All cards were encrypted and decrypted without duplicates or extra cards
//   expect(remainingCards.length).toBe(0);

//   // Start reveal cards and validate

//   console.log("\n\n\n\n\n\n DECRYPT CARDS \n\n\n\n\n");
//   // for (let i = 0; i < players.length; i++) {
//   //   const player = players[i];
//   //   for (let j = 0; j < player.encryptedDeck.length; j++) {
//   //     const card = player.encryptedDeck[j];
//   //     console.log(`decryptedDeck[${j}] = hex"${card.c2.toString(16)}";`);
//   //   }
//   // }
//   console.log(`P1 decryptes P2's cards at index 1 and 3`);
//   const card1 = players[1].encryptedDeck[1].c2;
//   const card3 = players[1].encryptedDeck[3].c2;
//   const decryptedCard1 = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[1].c1,
//       c2: card1,
//     },
//     privateKey: players[0].privateKey,
//   });
//   const decryptedCard3 = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[3].c1,
//       c2: card3,
//     },
//     privateKey: players[0].privateKey,
//   });
//   console.log(`player1: Decrypted card 1: ${decryptedCard1}`);
//   console.log(`player1: Decrypted card 3: ${decryptedCard3}`);

//   console.log(`P2 decryptes P2's cards at index 1 and 3`);
//   const decryptedCard1final = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[1].c1,
//       c2: decryptedCard1,
//     },
//     privateKey: players[1].privateKey,
//   });
//   const decryptedCard3final = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[3].c1,
//       c2: decryptedCard3,
//     },
//     privateKey: players[1].privateKey,
//   });
//   console.log(`player2: Decrypted card 1: ${decryptedCard1final}`);
//   console.log(`player2: Decrypted card 3: ${decryptedCard3final}`);
//   console.log(
//     `player2: decrypted card string card 1: ${bigintToString(decryptedCard1final)}`,
//   );
//   console.log(
//     `player2: decrypted card string card 3: ${bigintToString(decryptedCard3final)}`,
//   );

//   console.log(`P2 decryptes P1's cards at index 0 and 2`);
//   const card0 = players[1].encryptedDeck[0].c2;
//   const card2 = players[1].encryptedDeck[2].c2;
//   const decryptedCard0 = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[0].c1,
//       c2: card0,
//     },
//     privateKey: players[1].privateKey,
//   });
//   const decryptedCard2 = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[2].c1,
//       c2: card2,
//     },
//     privateKey: players[1].privateKey,
//   });
//   console.log(`player2: Decrypted card 0: ${decryptedCard0}`);
//   console.log(`player2: Decrypted card 2: ${decryptedCard2}`);

//   console.log(`P1 decryptes P1's cards at index 0 and 2`);
//   const decryptedCard0final = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[0].c1,
//       c2: decryptedCard0,
//     },
//     privateKey: players[0].privateKey,
//   });
//   const decryptedCard2final = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[2].c1,
//       c2: decryptedCard2,
//     },
//     privateKey: players[0].privateKey,
//   });
//   console.log(`player1: Decrypted card 0: ${decryptedCard0final}`);
//   console.log(`player1: Decrypted card 2: ${decryptedCard2final}`);
//   console.log(
//     `player1: decrypted card string card 0: ${bigintToString(decryptedCard0final)}`,
//   );
//   console.log(
//     `player1: decrypted card string card 2: ${bigintToString(decryptedCard2final)}`,
//   );

//   console.log("Both players decrypt the flop, turn, and river. p1 first");
//   const flop1i = 5;
//   const flop2i = 6;
//   const flop3i = 7;
//   const turni = 9;
//   const riveri = 11;
//   const flop1 = players[1].encryptedDeck[flop1i].c2;
//   const flop2 = players[1].encryptedDeck[flop2i].c2;
//   const flop3 = players[1].encryptedDeck[flop3i].c2;
//   const turn = players[1].encryptedDeck[turni].c2;
//   const river = players[1].encryptedDeck[riveri].c2;

//   const decryptedFlop1 = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[flop1i].c1,
//       c2: flop1,
//     },
//     privateKey: players[0].privateKey,
//   });
//   const decryptedFlop2 = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[flop2i].c1,
//       c2: flop2,
//     },
//     privateKey: players[0].privateKey,
//   });
//   const decryptedFlop3 = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[flop3i].c1,
//       c2: flop3,
//     },
//     privateKey: players[0].privateKey,
//   });
//   const decryptedTurn = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[turni].c1,
//       c2: turn,
//     },
//     privateKey: players[0].privateKey,
//   });
//   const decryptedRiver = decryptCard({
//     encryptedCard: {
//       c1: players[0].encryptedDeck[riveri].c1,
//       c2: river,
//     },
//     privateKey: players[0].privateKey,
//   });

//   console.log(`player1: Decrypted card flop1: ${decryptedFlop1}`);
//   console.log(`player1: Decrypted card flop2: ${decryptedFlop2}`);
//   console.log(`player1: Decrypted card flop3: ${decryptedFlop3}`);
//   console.log(`player1: Decrypted card turn: ${decryptedTurn}`);
//   console.log(`player1: Decrypted card river: ${decryptedRiver}`);
//   // p2 now
//   const decryptedFlop1final = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[flop1i].c1,
//       c2: decryptedFlop1,
//     },
//     privateKey: players[1].privateKey,
//   });
//   const decryptedFlop2final = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[flop2i].c1,
//       c2: decryptedFlop2,
//     },
//     privateKey: players[1].privateKey,
//   });
//   const decryptedFlop3final = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[flop3i].c1,
//       c2: decryptedFlop3,
//     },
//     privateKey: players[1].privateKey,
//   });
//   const decryptedTurnfinal = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[turni].c1,
//       c2: decryptedTurn,
//     },
//     privateKey: players[1].privateKey,
//   });
//   const decryptedRiverfinal = decryptCard({
//     encryptedCard: {
//       c1: players[1].encryptedDeck[riveri].c1,
//       c2: decryptedRiver,
//     },
//     privateKey: players[1].privateKey,
//   });
//   // p2's cards
//   console.log(`player1: Decrypted card 1:`);
//   console.log(`hex"${decryptedCard1.toString(16)}"`);
//   console.log(`player1: Decrypted card 3:`);
//   console.log(`hex"${decryptedCard3.toString(16)}"`);
//   console.log(`player2: Decrypted card 1:`);
//   console.log(`hex"${decryptedCard1final.toString(16)}"`);
//   console.log(
//     `bigintToString(decryptedCard1final): ${bigintToString(decryptedCard1final)}`,
//   );
//   console.log(`player2: Decrypted card 3:`);
//   console.log(`hex"${decryptedCard3final.toString(16)}"`);
//   console.log(
//     `bigintToString(decryptedCard3final): ${bigintToString(decryptedCard3final)}`,
//   );
//   // p1's cards
//   console.log(`player2: Decrypted card 0:`);
//   console.log(`hex"${decryptedCard0.toString(16)}"`);
//   console.log(`player2: Decrypted card 2:`);
//   console.log(`hex"${decryptedCard2.toString(16)}"`);
//   console.log(`player1: Decrypted card 0:`);
//   console.log(`hex"${decryptedCard0final.toString(16)}"`);
//   console.log(
//     `bigintToString(decryptedCard0final): ${bigintToString(decryptedCard0final)}`,
//   );
//   console.log(`player1: Decrypted card 2:`);
//   console.log(`hex"${decryptedCard2final.toString(16)}"`);
//   console.log(
//     `bigintToString(decryptedCard2final): ${bigintToString(decryptedCard2final)}`,
//   );

//   console.log(`player1: Decrypted card flop1:`);
//   console.log(`hex"${decryptedFlop1.toString(16)}"`);
//   console.log(`player1: Decrypted card flop2:`);
//   console.log(`hex"${decryptedFlop2.toString(16)}"`);
//   console.log(`player1: Decrypted card flop3:`);
//   console.log(`hex"${decryptedFlop3.toString(16)}"`);
//   console.log(`player1: Decrypted card turn:`);
//   console.log(`hex"${decryptedTurn.toString(16)}"`);
//   console.log(`player1: Decrypted card river:`);
//   console.log(`hex"${decryptedRiver.toString(16)}"`);

//   // PLAYER 2'S table cards in hex
//   console.log(`player2: decrypted card string card flop123turnriver:`);
//   console.log(`hex"${decryptedFlop1final.toString(16)}"`);
//   console.log(`hex"${decryptedFlop2final.toString(16)}"`);
//   console.log(`hex"${decryptedFlop3final.toString(16)}"`);
//   console.log(`hex"${decryptedTurnfinal.toString(16)}"`);
//   console.log(`hex"${decryptedRiverfinal.toString(16)}"`);

//   console.log(
//     `player2: decrypted card string card flop1: ${bigintToString(decryptedFlop1final)}`,
//   );
//   console.log(
//     `player2: decrypted card string card flop2: ${bigintToString(decryptedFlop2final)}`,
//   );
//   console.log(
//     `player2: decrypted card string card flop3: ${bigintToString(decryptedFlop3final)}`,
//   );
//   console.log(
//     `player2: decrypted card string card turn: ${bigintToString(decryptedTurnfinal)}`,
//   );
//   console.log(
//     `player2: decrypted card string card river: ${bigintToString(decryptedRiverfinal)}`,
//   );
//   console.log("\n\n\n\n\n\n END DECRYPT CARDS \n\n\n\n\n");
// });

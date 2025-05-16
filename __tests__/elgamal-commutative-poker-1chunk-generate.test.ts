import { expect, test, vi } from "vitest";
import {
  bigintToString,
  generatePermutations,
} from "../src/lib/elgamal-commutative-node-1chunk";
// import {
//   testMultiPartyCommutative,
//   testMultiPartyCommutativeFlipped,
// } from "../src/lib/elgamal-commutative-node";
import {
  decryptCard,
  shuffleAndEncryptDeck,
  DECK,
  formatCardDeckForShuffleAndEncrypt,
} from "../src/lib/encrypted-poker-1chunk";

// vitest set timeout to 1 minute
// Set timeout for all tests in this file to 60 seconds
vi.setConfig({ testTimeout: 60000 });

test("test generate data, 2-player test, optional-shuffle", () => {
  const NUM_PLAYERS = 2;
  const SHUFFLE = true;
  console.log(`SHUFFLE?: ${SHUFFLE}`);

  const players: {
    publicKey: bigint;
    privateKey: bigint;
    r: bigint;
    encryptedDeck: { c1: bigint; c2: bigint }[];
  }[] = [];

  // Generate keys and random values for all players
  for (let i = 0; i < NUM_PLAYERS; i++) {
    // const { publicKey, privateKey } = generateKeys();
    let publicKey = BigInt(0);
    let privateKey = BigInt(0);
    if (i === 0) {
      publicKey = BigInt(
        "0x3604d113ebdc5af0d64c20b264ad9510bab5a5e30838e74f9166001957d57a4381053ea18cf365d4056c765553fd01701a16dc492b62b4aca50f4a7305f69d450c892d9fac8e5bb2262b85a8f5037a061a5f8374bf8d58172908c366a86a6768730a6e1b1f673d43c622b6bac660835af06f1d600193239c22461791f878dcccb5ba2d378eba454e0c35a2378d0389be911227e3fe82bd8071e5889feb8fe21696ff0170ba2c81b3ca734c07b2f3c1b3a698198151344f5cf4d473885b69d8ed97774ca246663e4dee223fb4379a86186e63ee49cf1a3afd07521d0d184db11155e116816e3e6432ca4cf577064e5e74359b2e70c4521b257dd2bfc4fad83ab3",
      );
      privateKey = BigInt(
        "0x17961b1f461e2abcf70d0d2d6896ebc79602890102fbba7114bce0282452deb807b1cf193dddbe5330eec10abd9f35ca30cdf4c7a404bd5e7b8b493d6126361df60000f3ca12f630e95f4afdab15a7c264ee9c3df641ffaf008821a39c778fc163a8b54a6bb712437aa5bbf3a2c383362c69333bcc09f28804b61ca64012bb941ddbd7aa792416646504293e843e5f68805cca9a0817e23dbcff537f0b0929ccb6dd597ea3e63f888f70f954e71f59950b7a8dbcfe02128d7366499e5c7541910d4f050e9ee95bed9c045d5fdd6de504d080fccb6a06ba1f95a9de7fce9bca740028729c79ec352c32afb1f816708dcb997541ff8a281129588d54b31cc7203d",
      );
    } else {
      // const keys2 = generateKeys();
      // publicKey = keys2.publicKey;
      // privateKey = keys2.privateKey;
      publicKey = BigInt(
        "0xdb24a5cd01c51e96022355d1eefba6450bcb5e5eb7bf63e9cc65edb689c3767e1f385675d59642b4cab1b35899116715219de479814f8d968f2281d68205b11dc2cb5e27634c256feaabc81d5f8bacd734c42a6001517beed16a5c348a81ae372cb9637f54b496e28f04f7f20c852973888436053fa84e00cd512b477550beff3c1231b0fa2b505feca3d18ebf1dd3d70690558c179ae271e5b38ae06969b260962b2b008924e283b53ce8126509c0c19090621f960a3ce7cf5eb175246f08625854d438514c2a6842439f91fd693c6540b33f2a3d60907d201f97abeede6556f1ade44d2071ecb609857bbb65a8797d713f8c5e2097f2c9ead14e13037ed3cc",
      );
      privateKey = BigInt(
        "0xab3bdb680cf7a5d81d32b1a3d6114c57803ef26b1a9451a24653f1b146560f423c35cdeb8ee4fcbd1df5cbf6643b9f544cdf2cc779fc6f9cc28929eaa38eb1a8742b84c24947e254f3c5434e34b2daf71efa1f6326128cc7d6d6500c8d963d4759189e4bae75e34d84945beb541a9b9cb441de2522066d057e0562a16d71b26a1406d054790885d3dbd8fda8f311b4c60c2e8fa7b73dbc288177925f16a98308448d58186500d21ab42c4a0678e7ec63c5a59aa30e2091363c21b09dee1740f6289a75917c29e9aeca8d835ad599fe8a21dd5c910302c6c25ce50b6d16f16799ca6552ee5148d92ee34a69e188dc4161df1237b28861810f05b43d13f47ba333",
      );
    }
    // const r = randomBigIntInRange(BigInt(3), p2048);
    let r = BigInt(0);
    if (i === 0) {
      r = BigInt(
        "0x42487fec44e8ebebfae79a43ec4f15e29a5786ed7f560c14b1e063d1a665c26364c68ecb046fb187000fb48f5cf25cdbe5fe556040b8c501744ec352623fa6dde35cb29e971309bd5ffd2350336972a64e12fb38ba7470d08b5b05b065c42e82b48c97a3e4c577d7b78576cda00deb05caf92f56a7bb414a54262a399182ed8cf49954981886269ab273daa3da74e75541c5045f88dc57420e5d015e9f6cab562fa6580351410c31ed0401be6e6784641ffbd822fe65f0db9aed947d9eb8caf50ffa31c143492fc54aeda70c7ae710f4bd3b4fe3bb5801e38d72f47652f92db0d8f3cf2dd331a7786c887a6a176414289e76a7eb23c88bb87f05c01e21af7aac",
      );
    } else {
      r = BigInt(
        "0x6f7374f6984a5cacf37ae19ba3c3ada7b4b8c5c6aa772bd32b359b1861d7161f11093300a6aca0e3615874369d89cd64f65dec586a272bf2e3ecf0ad0ef5059c4f42487901661f32c9f9abf5716505467fad3363888746e054ff93782c35320940ed140ebd4543b1b0ef2ea321b0de1351af33b47fc49c808eb07523eca5be7b09dfab97c8f2c8f413a3ab5390e62aff0fa333729f36179eaefbb69b8d2ca3b4e8179afdc5eeb021e92c42aea21f8179d76288870975bf05b9caa4e8219b6c61d8b7fc04109e2734f50bbbb470b70a0269177472c95dd26130d0f1133c760a146eafff567afa75588bdde14aeacd51680299ab32423c67d3723a195787accac7",
      );
    }
    let deck: {
      c1: bigint;
      c2: bigint;
    }[];
    if (i > 0) {
      deck = players[i - 1].encryptedDeck;
    } else {
      deck = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r });
    }
    const encryptedDeck = shuffleAndEncryptDeck({
      encryptedDeck: deck,
      publicKey,
      r,
      noShuffle: !SHUFFLE,
    });
    console.log(
      `DEBUGGG: \npub: ${publicKey.toString(16)} \npriv: ${privateKey.toString(16)} \nr: ${r.toString(16)}, \nprevDeck: ${deck[0].c2.toString(16)} \n eDeck: ${encryptedDeck[0].c2.toString(16)}`,
    );
    players.push({ publicKey, privateKey, r, encryptedDeck });
  }

  const encryptedDeckAgain = shuffleAndEncryptDeck({
    encryptedDeck: players[0].encryptedDeck,
    publicKey: players[1].publicKey,
    r: players[1].r,
    noShuffle: !SHUFFLE,
  });
  console.log(
    `DEBUGGG: \npub: ${players[1].publicKey.toString(16)} \npriv: ${players[1].privateKey.toString(16)} \nr: ${players[1].r.toString(16)}, \nprevDeck: ${players[0].encryptedDeck[0].c2.toString(16)} \n eDeck: ${encryptedDeckAgain[0].c2.toString(16)}`,
  );

  console.log("\n\n\n\n\n\n PLAYERS \n\n\n\n\n");
  console.log(
    JSON.stringify(
      players,
      (key, value) => (typeof value === "bigint" ? value.toString(16) : value),
      2,
    ),
  );
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    for (let j = 0; j < player.encryptedDeck.length; j++) {
      const card = player.encryptedDeck[j];
      console.log(
        `encryptedDeck${i + 1}bytes[${j}] = hex"${card.c2.toString(16).padStart(64, "0")}";`,
      );
    }
  }
  console.log("\n\n\n\n\n\n END PLAYERS \n\n\n\n\n");

  // Verify that all players' c1 values are consistent across all cards
  for (let playerIndex = 0; playerIndex < NUM_PLAYERS; playerIndex++) {
    const player = players[playerIndex];
    const playerC1Values = player.encryptedDeck.map((card) => card.c1);
    const uniquePlayerC1Values = new Set(playerC1Values);
    expect(
      uniquePlayerC1Values.size,
      `Player ${playerIndex + 1}'s c1 values are not the same for every card`,
    ).toBe(1);
  }

  // Test all possible decryption permutations for a single card
  const CARD_INDEX = 0;
  const allPermutations = generatePermutations([...Array(NUM_PLAYERS).keys()]).slice(
    0,
    3,
  );

  for (const permutation of allPermutations) {
    console.log(`Permutation: ${permutation.join("-")}`);
    let currentCard = players[NUM_PLAYERS - 1].encryptedDeck[CARD_INDEX].c2;
    // Apply decryption in the order specified by the permutation
    for (const playerIndex of permutation) {
      currentCard = decryptCard({
        encryptedCard: {
          c1: players[playerIndex].encryptedDeck[CARD_INDEX].c1,
          c2: currentCard,
        },
        privateKey: players[playerIndex].privateKey,
      });
    }

    // Verify the decrypted card is in the original deck
    const decryptedCardString = bigintToString(currentCard);
    expect(DECK).toContain(decryptedCardString);
    console.log(
      `Permutation ${permutation.join("-")} decrypted to: ${decryptedCardString}`,
    );
  }

  // Decrypt every card using a fixed permutation and validate the entire deck
  const fixedPermutation = [...Array(NUM_PLAYERS).keys()]; // 0, 1, 2, ..., 9
  let remainingCards = [...DECK];

  for (let cardIndex = 0; cardIndex < DECK.length; cardIndex++) {
    let currentCard = players[NUM_PLAYERS - 1].encryptedDeck[cardIndex].c2;

    // Apply decryption in the fixed order
    for (const playerIndex of fixedPermutation) {
      currentCard = decryptCard({
        encryptedCard: {
          c1: players[playerIndex].encryptedDeck[cardIndex].c1,
          c2: currentCard,
        },
        privateKey: players[playerIndex].privateKey,
      });
    }

    const decryptedCardString = bigintToString(currentCard);
    expect(DECK).toContain(decryptedCardString); // card in original deck
    expect(remainingCards).toContain(decryptedCardString); // card is not a duplicate
    remainingCards = remainingCards.filter((card) => card !== decryptedCardString);
  }
  // All cards were encrypted and decrypted without duplicates or extra cards
  expect(remainingCards.length).toBe(0);

  // Start reveal cards and validate

  console.log("\n\n\n\n\n\n DECRYPT CARDS \n\n\n\n\n");
  // for (let i = 0; i < players.length; i++) {
  //   const player = players[i];
  //   for (let j = 0; j < player.encryptedDeck.length; j++) {
  //     const card = player.encryptedDeck[j];
  //     console.log(`decryptedDeck[${j}] = hex"${card.c2.toString(16)}";`);
  //   }
  // }
  console.log(`P1 decryptes P2's cards at index 1 and 3`);
  const card1 = players[1].encryptedDeck[1].c2;
  const card3 = players[1].encryptedDeck[3].c2;
  const decryptedCard1 = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[1].c1,
      c2: card1,
    },
    privateKey: players[0].privateKey,
  });
  const decryptedCard3 = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[3].c1,
      c2: card3,
    },
    privateKey: players[0].privateKey,
  });
  console.log(`player1: Decrypted card 1: ${decryptedCard1}`);
  console.log(`player1: Decrypted card 3: ${decryptedCard3}`);

  console.log(`P2 decryptes P2's cards at index 1 and 3`);
  const decryptedCard1final = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[1].c1,
      c2: decryptedCard1,
    },
    privateKey: players[1].privateKey,
  });
  const decryptedCard3final = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[3].c1,
      c2: decryptedCard3,
    },
    privateKey: players[1].privateKey,
  });
  console.log(`player2: Decrypted card 1: ${decryptedCard1final}`);
  console.log(`player2: Decrypted card 3: ${decryptedCard3final}`);
  console.log(
    `player2: decrypted card string card 1: ${bigintToString(decryptedCard1final)}`,
  );
  console.log(
    `player2: decrypted card string card 3: ${bigintToString(decryptedCard3final)}`,
  );

  console.log(`P2 decryptes P1's cards at index 0 and 2`);
  const card0 = players[1].encryptedDeck[0].c2;
  const card2 = players[1].encryptedDeck[2].c2;
  const decryptedCard0 = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[0].c1,
      c2: card0,
    },
    privateKey: players[1].privateKey,
  });
  const decryptedCard2 = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[2].c1,
      c2: card2,
    },
    privateKey: players[1].privateKey,
  });
  console.log(`player2: Decrypted card 0: ${decryptedCard0}`);
  console.log(`player2: Decrypted card 2: ${decryptedCard2}`);

  console.log(`P1 decryptes P1's cards at index 0 and 2`);
  const decryptedCard0final = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[0].c1,
      c2: decryptedCard0,
    },
    privateKey: players[0].privateKey,
  });
  const decryptedCard2final = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[2].c1,
      c2: decryptedCard2,
    },
    privateKey: players[0].privateKey,
  });
  console.log(`player1: Decrypted card 0: ${decryptedCard0final}`);
  console.log(`player1: Decrypted card 2: ${decryptedCard2final}`);
  console.log(
    `player1: decrypted card string card 0: ${bigintToString(decryptedCard0final)}`,
  );
  console.log(
    `player1: decrypted card string card 2: ${bigintToString(decryptedCard2final)}`,
  );

  console.log("Both players decrypt the flop, turn, and river. p1 first");
  const flop1i = 5;
  const flop2i = 6;
  const flop3i = 7;
  const turni = 9;
  const riveri = 11;
  const flop1 = players[1].encryptedDeck[flop1i].c2;
  const flop2 = players[1].encryptedDeck[flop2i].c2;
  const flop3 = players[1].encryptedDeck[flop3i].c2;
  const turn = players[1].encryptedDeck[turni].c2;
  const river = players[1].encryptedDeck[riveri].c2;

  const decryptedFlop1 = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[flop1i].c1,
      c2: flop1,
    },
    privateKey: players[0].privateKey,
  });
  const decryptedFlop2 = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[flop2i].c1,
      c2: flop2,
    },
    privateKey: players[0].privateKey,
  });
  const decryptedFlop3 = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[flop3i].c1,
      c2: flop3,
    },
    privateKey: players[0].privateKey,
  });
  const decryptedTurn = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[turni].c1,
      c2: turn,
    },
    privateKey: players[0].privateKey,
  });
  const decryptedRiver = decryptCard({
    encryptedCard: {
      c1: players[0].encryptedDeck[riveri].c1,
      c2: river,
    },
    privateKey: players[0].privateKey,
  });

  console.log(`player1: Decrypted card flop1: ${decryptedFlop1}`);
  console.log(`player1: Decrypted card flop2: ${decryptedFlop2}`);
  console.log(`player1: Decrypted card flop3: ${decryptedFlop3}`);
  console.log(`player1: Decrypted card turn: ${decryptedTurn}`);
  console.log(`player1: Decrypted card river: ${decryptedRiver}`);
  // p2 now
  const decryptedFlop1final = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[flop1i].c1,
      c2: decryptedFlop1,
    },
    privateKey: players[1].privateKey,
  });
  const decryptedFlop2final = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[flop2i].c1,
      c2: decryptedFlop2,
    },
    privateKey: players[1].privateKey,
  });
  const decryptedFlop3final = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[flop3i].c1,
      c2: decryptedFlop3,
    },
    privateKey: players[1].privateKey,
  });
  const decryptedTurnfinal = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[turni].c1,
      c2: decryptedTurn,
    },
    privateKey: players[1].privateKey,
  });
  const decryptedRiverfinal = decryptCard({
    encryptedCard: {
      c1: players[1].encryptedDeck[riveri].c1,
      c2: decryptedRiver,
    },
    privateKey: players[1].privateKey,
  });
  // p2's cards
  console.log(`player1: Decrypted card 1:`);
  console.log(`hex"${decryptedCard1.toString(16)}"`);
  console.log(`player1: Decrypted card 3:`);
  console.log(`hex"${decryptedCard3.toString(16)}"`);
  console.log(`player2: Decrypted card 1:`);
  console.log(`hex"${decryptedCard1final.toString(16)}"`);
  console.log(
    `bigintToString(decryptedCard1final): ${bigintToString(decryptedCard1final)}`,
  );
  console.log(`player2: Decrypted card 3:`);
  console.log(`hex"${decryptedCard3final.toString(16)}"`);
  console.log(
    `bigintToString(decryptedCard3final): ${bigintToString(decryptedCard3final)}`,
  );
  // p1's cards
  console.log(`player2: Decrypted card 0:`);
  console.log(`hex"${decryptedCard0.toString(16)}"`);
  console.log(`player2: Decrypted card 2:`);
  console.log(`hex"${decryptedCard2.toString(16)}"`);
  console.log(`player1: Decrypted card 0:`);
  console.log(`hex"${decryptedCard0final.toString(16)}"`);
  console.log(
    `bigintToString(decryptedCard0final): ${bigintToString(decryptedCard0final)}`,
  );
  console.log(`player1: Decrypted card 2:`);
  console.log(`hex"${decryptedCard2final.toString(16)}"`);
  console.log(
    `bigintToString(decryptedCard2final): ${bigintToString(decryptedCard2final)}`,
  );

  console.log(`player1: Decrypted card flop1:`);
  console.log(`hex"${decryptedFlop1.toString(16)}"`);
  console.log(`player1: Decrypted card flop2:`);
  console.log(`hex"${decryptedFlop2.toString(16)}"`);
  console.log(`player1: Decrypted card flop3:`);
  console.log(`hex"${decryptedFlop3.toString(16)}"`);
  console.log(`player1: Decrypted card turn:`);
  console.log(`hex"${decryptedTurn.toString(16)}"`);
  console.log(`player1: Decrypted card river:`);
  console.log(`hex"${decryptedRiver.toString(16)}"`);

  // PLAYER 2'S table cards in hex
  console.log(`player2: decrypted card string card flop123turnriver:`);
  console.log(`hex"${decryptedFlop1final.toString(16)}"`);
  console.log(`hex"${decryptedFlop2final.toString(16)}"`);
  console.log(`hex"${decryptedFlop3final.toString(16)}"`);
  console.log(`hex"${decryptedTurnfinal.toString(16)}"`);
  console.log(`hex"${decryptedRiverfinal.toString(16)}"`);

  console.log(
    `player2: decrypted card string card flop1: ${bigintToString(decryptedFlop1final)}`,
  );
  console.log(
    `player2: decrypted card string card flop2: ${bigintToString(decryptedFlop2final)}`,
  );
  console.log(
    `player2: decrypted card string card flop3: ${bigintToString(decryptedFlop3final)}`,
  );
  console.log(
    `player2: decrypted card string card turn: ${bigintToString(decryptedTurnfinal)}`,
  );
  console.log(
    `player2: decrypted card string card river: ${bigintToString(decryptedRiverfinal)}`,
  );
  console.log("\n\n\n\n\n\n END DECRYPT CARDS \n\n\n\n\n");
});

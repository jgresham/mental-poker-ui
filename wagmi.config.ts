import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
// import { texasHoldemRoomAbi } from "./src/generated";

export default defineConfig({
  out: "src/generated.ts",
  // contracts: [
  //   {
  //     name: "TexasHoldemRoom",
  //     abi: texasHoldemRoomAbi,
  //   },
  // ],
  plugins: [
    foundry({
      project: "../mental-poker-contracts",
      deployments: {
        // chain id to address
        TexasHoldemRoom: {
          31337: "0x82e01223d51Eb87e16A03E24687EDF0F294da6f1",
        },
        DeckHandler: {
          31337: "0x2bdCC0de6bE1f7D2ee689a0342D76F52E8EFABa3",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

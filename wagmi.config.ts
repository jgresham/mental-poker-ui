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
          31337: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
        },
        DeckHandler: {
          31337: "0x9A676e781A523b5d0C0e43731313A708CB607508",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

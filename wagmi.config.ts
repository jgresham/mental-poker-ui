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
          31337: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
        },
        DeckHandler: {
          31337: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

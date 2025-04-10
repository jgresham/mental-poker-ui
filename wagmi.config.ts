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
          31337: "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

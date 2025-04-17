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
          31337: "0xc5a5C42992dECbae36851359345FE25997F5C42d",
        },
        DeckHandler: {
          31337: "0x67d269191c92Caf3cD7723F116c85e6E9bf55933",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

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
          // Foundry Anvil local
          31337: "0xFD471836031dc5108809D173A067e8486B9047A3",
          // Base Sepolia
          84532: "0xfD95b63455287faCf0eeD16a4DD922813a98EcF1",
          // Base Mainnet
          8453: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
        },
        DeckHandler: {
          // Foundry Anvil local
          31337: "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc",
          // Base Sepolia
          84532: "0x1571227335029664aD1a65Ab6BE083F4Bf85d4f1",
          // Base Mainnet
          8453: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

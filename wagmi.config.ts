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
          31337: "0x0E801D84Fa97b50751Dbf25036d067dCf18858bF",
          // Base Sepolia
          84532: "0xfD95b63455287faCf0eeD16a4DD922813a98EcF1",
          // Base Mainnet
          8453: "0xf34890f942220f48391BA33Ff053f64Aa8979956",
        },
        DeckHandler: {
          // Foundry Anvil local
          31337: "0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf",
          // Base Sepolia
          84532: "0x1571227335029664aD1a65Ab6BE083F4Bf85d4f1",
          // Base Mainnet
          8453: "0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

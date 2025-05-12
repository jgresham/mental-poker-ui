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
          31337: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
          // Base Sepolia
          84532: "0xb1d348bbf62A46EDE1bafC6647947c89632120d8",
          // Base Mainnet
          8453: "0x0B377624bd9BFDeB5fA6d0C4621EdBD9B2E7C1F9",
          // Optimism Mainnet
          10: "0xf34890f942220f48391BA33Ff053f64Aa8979956",
          // Arbitrum One Mainnet
          42161: "0x5868ED6AaE7fed0bfD7176A87F80c2F93A2bc03D",
        },
        DeckHandler: {
          // Foundry Anvil local
          31337: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
          // Base Sepolia
          84532: "0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6",
          // Base Mainnet
          8453: "0xaa988C3d6D05C957AE01fB38f69271eDd44FB7A6",
          // Optimism Mainnet
          10: "0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9",
          // Arbitrum One Mainnet
          42161: "0x9a9258504184b53F91a2C6614F34Cd1CB873ccE9",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

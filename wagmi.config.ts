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
          31337: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          // Base Sepolia
          84532: "0x3B6d3862901Fe4b7FA6fB584F8851C0dC5ae0367",
          // Base Mainnet
          8453: "0xAF54254f9c0da161F22eBCFC5Ff569Bb305f18e1",
          // Optimism Mainnet
          10: "0x0B377624bd9BFDeB5fA6d0C4621EdBD9B2E7C1F9",
          // Arbitrum One Mainnet
          // 42161: "0x5868ED6AaE7fed0bfD7176A87F80c2F93A2bc03D",
        },
        DeckHandler: {
          // Foundry Anvil local
          31337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          // Base Sepolia
          84532: "0x577A57868513382203e8739e3e7f8056b13987DD",
          // Base Mainnet
          8453: "0x3f9b9c2577d8277805ea7587D598E39965a2C7C7",
          // Optimism Mainnet
          10: "0xaa988C3d6D05C957AE01fB38f69271eDd44FB7A6",
          // Arbitrum One Mainnet
          // 42161: "0x9a9258504184b53F91a2C6614F34Cd1CB873ccE9",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

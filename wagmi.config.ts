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
          84532: "0x51A68322005F44d6Db90f844B68e960Eb1D6A909",
          // Base Mainnet
          8453: "0x97B60973647dD10393fAE9E4deF62373F4BEE117",
          // Optimism Mainnet
          10: "0xf34890f942220f48391BA33Ff053f64Aa8979956",
          // Arbitrum One Mainnet
          42161: "0x5868ED6AaE7fed0bfD7176A87F80c2F93A2bc03D",
        },
        DeckHandler: {
          // Foundry Anvil local
          31337: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          // Base Sepolia
          84532: "0x9A00377FE9373aFaD041cEb497728fc1958c90B8",
          // Base Mainnet
          8453: "0x5B4e312D30D042a3B06C1f9446Fe821d36875afe",
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

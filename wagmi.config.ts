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
          31337: "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
          // Base Sepolia
          84532: "0xb1d348bbf62A46EDE1bafC6647947c89632120d8",
          // Base Mainnet
          8453: "0xf34890f942220f48391BA33Ff053f64Aa8979956",
        },
        DeckHandler: {
          // Foundry Anvil local
          31337: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
          // Base Sepolia
          84532: "0x8088B7394EDb2A0a15539EF5e63FD3cf03549AB6",
          // Base Mainnet
          8453: "0x8ad3D9cf837117d44Ec08e77a3C38420f92243E9",
        },
      },
    }),
    react(), // generate react hooks for contract functions
  ],
});

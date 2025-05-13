import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http, createConfig, webSocket } from "@wagmi/core";
import {
  arbitrum,
  base,
  baseSepolia,
  type Chain,
  foundry,
  optimism,
} from "@wagmi/core/chains";
// import { coinbaseWallet } from "wagmi/connectors";
// import { parseEther, toHex } from "viem";
// import { cookieStorage, createStorage } from "wagmi";

const walletConnectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet, walletConnectWallet],
    },
  ],
  {
    appName: "Mental Poker",
    projectId: "a815842691b86a9283207242ab753402",
  },
);

const chains: Chain[] = [baseSepolia, base];
// chains.push(baseSepolia);
chains.push(optimism);
chains.push(arbitrum);
if (
  process.env.NEXT_PUBLIC_WORKER_DOMAIN?.includes("staging") ||
  process.env.NEXT_PUBLIC_WORKER_DOMAIN?.includes("localhost") ||
  process.env.NODE_ENV === "development"
) {
  // chains.push(baseSepolia);
  chains.push(foundry);
}

export const frameWagmiConfig = createConfig({
  chains: chains as [Chain, ...Chain[]],
  transports: {
    [base.id]: http(
      "https://base-mainnet.g.alchemy.com/v2/xFjQGD9_D32OdWAY-iyViQ7xHYHIUF-i",
    ),
    [baseSepolia.id]: http(
      "https://base-sepolia.g.alchemy.com/v2/xFjQGD9_D32OdWAY-iyViQ7xHYHIUF-i",
    ),
    [foundry.id]: http("http://localhost:8545"),
    [optimism.id]: http(
      "https://opt-mainnet.g.alchemy.com/v2/cIUEeDRaumsVFcSQ_960UNHREYME1hNC",
    ),
    //   ,
    //   webSocket("wss://opt-mainnet.g.alchemy.com/v2/cIUEeDRaumsVFcSQ_960UNHREYME1hNC")
    // ]
    [arbitrum.id]: http(
      "https://arb-mainnet.g.alchemy.com/v2/cIUEeDRaumsVFcSQ_960UNHREYME1hNC",
    ),
  },
  connectors: [
    ...walletConnectors,
    farcasterFrame(),
    // coinbaseWallet({
    //   appName: "Mental Poker Sub Account Demo",
    //   preference: {
    //     keysUrl: "https://keys-dev.coinbase.com/connect",
    //     options: "smartWalletOnly",
    //   },
    //   subAccounts: {
    //     enableAutoSubAccounts: true,
    //     defaultSpendLimits: {
    //       84532: [
    //         // Base Sepolia Chain ID
    //         {
    //           token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    //           allowance: toHex(parseEther("0.01")), // 0.01 ETH
    //           period: 86400, // 24h
    //         },
    //       ],
    //     },
    //   },
    // }),
    // walletConnect({
    //   projectId: "a815842691b86a9283207242ab753402",
    //   metadata: {
    //     name: "Mental Poker",
    //     description: "Own your wins",
    //     url: "https://mentalpoker.xyz",
    //     icons: ["https://mentalpoker.xyz/mental-poker-logo.jpg"],
    //   },
    // }),
  ],
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
  // ssr: true,
});

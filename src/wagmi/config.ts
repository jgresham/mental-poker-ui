import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http, createConfig } from "@wagmi/core";
import { base, baseSepolia, type Chain, foundry } from "@wagmi/core/chains";

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

const chains: Chain[] = [base];
if (
  process.env.NEXT_PUBLIC_WORKER_DOMAIN?.includes("staging") ||
  process.env.NEXT_PUBLIC_WORKER_DOMAIN?.includes("localhost") ||
  process.env.NODE_ENV === "development"
) {
  chains.push(baseSepolia);
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
    [foundry.id]: http(),
  },
  connectors: [
    farcasterFrame(),
    // walletConnect({
    //   projectId: "a815842691b86a9283207242ab753402",
    //   metadata: {
    //     name: "Mental Poker",
    //     description: "Own your wins",
    //     url: "https://mentalpoker.xyz",
    //     icons: ["https://mentalpoker.xyz/mental-poker-logo.jpg"],
    //   },
    // }),
    ...walletConnectors,
  ],
});

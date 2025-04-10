"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { frameWagmiConfig } from "../wagmi/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={frameWagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

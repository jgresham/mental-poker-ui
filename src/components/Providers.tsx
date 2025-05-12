"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { frameWagmiConfig } from "../wagmi/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { datadogRum } from '@datadog/browser-rum';
import { ErrorBoundary, reactPlugin } from '@datadog/browser-rum-react';

if(process.env.NODE_ENV === 'production') {
  datadogRum.init({
      applicationId: 'ebc08400-bdb9-4f37-9979-d9acce686423',
      clientToken: 'pub6a9762baf20a8858e5183fbf0cbd386c',
      site: 'us5.datadoghq.com',
      service:'mentalpoker-prod',
      env: 'prod-1',
      
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate:  100,
      sessionReplaySampleRate: 100,
      defaultPrivacyLevel: 'mask-user-input',
      plugins: [reactPlugin({ router: false })],
  });
}

function ErrorFallback({ resetError, error }: { resetError: () => void, error: Error }) {
  return (
    <p>
      Oops, something went wrong! <strong>{String(error)}</strong> <button onClick={resetError}>Retry</button>
    </p>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary fallback={ErrorFallback}>
    <WagmiProvider config={frameWagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </ErrorBoundary>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../node_modules/@rainbow-me/rainbowkit/dist/index.css";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poker",
  description: "Mental Poker - Onchain Poker",
  openGraph: {
    title: "Mental Poker",
    description:
      "Mental Poker is onchain poker that is a secure and no fee poker game using commutative encryption",
    images: [
      {
        url: "https://mentalpoker.xyz/heroimage.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "1",
      imageUrl: "https://mentalpoker.xyz/heroimage.png",
      button: {
        title: "Play Poker",
        action: {
          type: "launch_frame",
          name: "Mental Poker",
          url: "https://mentalpoker.xyz",
          splashImageUrl: "https://mentalpoker.xyz/MentalPokerLogo200.jpg",
          splashBackgroundColor: "#0d542b",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

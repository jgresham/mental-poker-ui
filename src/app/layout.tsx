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
  title: "Texas Hold'em Poker",
  description: "A mobile-friendly Texas Hold'em Poker web app",
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

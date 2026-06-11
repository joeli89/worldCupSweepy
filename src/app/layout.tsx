import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const bebasCondensed = Bebas_Neue({
  variable: "--font-condensed",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Cup Sweepy 2026",
  description:
    "The premium World Cup Sweepy that brings the world together.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "World Cup Sweepy 2026",
    description:
      "The premium World Cup Sweepy that brings the world together.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${bebasCondensed.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

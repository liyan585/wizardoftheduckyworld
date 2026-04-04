import type { Metadata } from "next";
import { Geist, Geist_Mono, Irish_Grover } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "../components/BackgroundMusic";
import RotateOverlay from "../components/RotateOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const irishGrover = Irish_Grover({
  variable: "--font-irish-grover",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Ducky Oracle",
  description: "A wizardly audit of your digital habits. Reveal your ducky archetype, share and download your fate with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${irishGrover.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <BackgroundMusic />
        <RotateOverlay />
        {children}
        <a
          href="https://ente.com/?utm_source=wizardoftheduckyworld"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-2 right-2 z-40 tracking-wide no-underline opacity-50 hover:opacity-90 transition-opacity px-2 py-1"
          style={{ fontFamily: "var(--font-irish-grover)", color: "#FFEBD4", textShadow: "0 0 4px #462901", fontSize: "clamp(10px, 1vw, 18px)" }}
        >
          by ente
        </a>
      </body>
    </html>
  );
}

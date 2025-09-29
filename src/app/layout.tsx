import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Quicksand({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Quicksand({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mood Scale",
  description: "Mood Scale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

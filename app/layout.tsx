import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
// Components Importer :
import Navbar from "@/components/Navbar";

// Fonts-util :
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
// Meta-data :
export const metadata: Metadata = {
  title: "Price Pulse",
  description: "Generated by create next app",
};
// Over-all root layout :
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max max-w-12xl">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}

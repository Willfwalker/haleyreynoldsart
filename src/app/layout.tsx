import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Haley Reynolds Art - Rustic Artwork & Custom Commissions",
  description: "Discover beautiful rustic artwork by Haley Reynolds. Shop stickers, bookmarks, and paintings. Custom commissions available.",
  keywords: "rustic art, paintings, stickers, bookmarks, custom commissions, Haley Reynolds",
  authors: [{ name: "Haley Reynolds" }],
  openGraph: {
    title: "Haley Reynolds Art",
    description: "Beautiful rustic artwork and custom commissions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased rustic-gradient min-h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

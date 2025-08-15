import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qendresa Hoti",
  description:
    "Qendresa Hoti's personal blog and portfolio featuring articles, projects, and insights",
};

// This is needed to handle Grammarly extension attributes
// See: https://github.com/vercel/next.js/discussions/53542
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={inter.className}
        // Explicitly allow Grammarly attributes to prevent React hydration warnings
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

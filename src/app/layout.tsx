import type { Metadata } from "next";
import { Inter, Figtree, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-figtree",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

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
    <html
      lang="en"
      className={`${figtree.variable} ${plexMono.variable} h-full`}
    >
      <body
        className={`${inter.className} h-full`}
        // Explicitly allow Grammarly attributes to prevent React hydration warnings
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

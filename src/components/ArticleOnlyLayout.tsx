"use client";

import { ReactNode, useEffect, useState } from "react";

type ArticleOnlyLayoutProps = {
  children: ReactNode;
};

export default function ArticleOnlyLayout({
  children,
}: ArticleOnlyLayoutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Cleanup function for exit animation
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div className="font-mono bg-[#282a36] flex flex-col min-h-screen h-screen overflow-auto">
      <main className="flex-grow flex flex-col h-full">
        <div
          className={`transition-opacity duration-500 flex flex-col h-full pt-8 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

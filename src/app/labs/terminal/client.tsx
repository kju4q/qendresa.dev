"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
// No need for xterm.css anymore

// Dynamically import the SimpleTerminal component
const SimpleTerminalUI = dynamic(
  () => import('@/components/SimpleTerminal'),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse flex items-center justify-center w-full h-full rounded-xl border border-[var(--q-border)] p-4" style={{ backgroundColor: 'rgb(40 42 54)' }}>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--q-accent)] animate-ping"></div>
          <p className="text-[var(--q-muted)]">Initializing q//os terminal...</p>
        </div>
      </div>
    )
  }
);

export default function TerminalClientWrapper() {
  const [mounted, setMounted] = useState(false);
  const [renderKey, setRenderKey] = useState(0); // Force re-render when needed

  // Wait until after client-side hydration to show terminal
  useEffect(() => {
    // Give the browser more time to initialize everything
    const timer = setTimeout(() => {
      setMounted(true);
    }, 500); // We can use a shorter delay with the simpler terminal
    
    return () => clearTimeout(timer);
  }, []);

  // Handle any errors by re-mounting the terminal
  const handleTerminalError = () => {
    setMounted(false);
    
    setTimeout(() => {
      setRenderKey(prev => prev + 1);
      setMounted(true);
    }, 1000);
  };

  return (
    <div className="w-full h-full">
      {mounted ? (
        <SimpleTerminalUI key={renderKey} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-6 h-6 border-2 border-[var(--q-accent)] border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-6 h-6 border-2 border-[var(--q-accent-alt)] border-b-transparent rounded-full animate-spin animate-delay-500"></div>
            </div>
            <p className="text-[var(--q-muted)]">Initializing q//os terminal...</p>
          </div>
        </div>
      )}
    </div>
  );
}



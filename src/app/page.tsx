"use client";

import TerminalClientWrapper from "./labs/terminal/client";
import PageTransition from "@/components/PageTransition";
import "./labs/terminal/terminal-styles.css";

export default function Home() {
  return (
    <div
      className="terminal-page flex flex-col min-h-screen justify-center"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="terminal-window rounded-t-lg overflow-hidden shadow-xl transform rotate-0.5 mx-auto max-w-4xl"
        style={{ border: "2px solid var(--q-accent)" }}
      >
        <header
          className="terminal-titlebar p-2 flex items-center justify-between"
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            borderBottom: "1px solid var(--q-accent)",
          }}
        >
          <div className="flex items-center gap-2 ml-1">
            <span className="terminal-icon text-[var(--q-accent)]">❯</span>
            <span className="text-sm font-mono font-semibold">q//os</span>
          </div>
          <div className="text-sm font-medium text-center flex items-center gap-1">
            <span className="text-[var(--q-accent)]">terminal@</span>
            <span>qendresa.dev</span>
          </div>
          <div className="text-xs text-[var(--q-muted)] mr-1 font-mono">
            v1.0.0
          </div>
        </header>
        <main
          className="terminal-body"
          style={{ backgroundColor: "rgb(40 42 54)" }}
        >
          <div className="h-[450px]">
            <TerminalClientWrapper />
          </div>
        </main>
      </div>
      <footer className="mt-6 text-sm text-[var(--q-muted)] text-center mx-auto">
        <p className="flex items-center justify-center gap-2">
          <span className="text-[var(--q-accent)]">❯</span>
          <span>© {new Date().getFullYear()} Qendresa Hoti</span>
          <PageTransition
            href="/home"
            className="ml-1 text-[var(--q-accent)] hover:underline flex items-center"
          >
            <span className="mr-1">cd /home</span>
            <span className="text-xs">↩</span>
          </PageTransition>
        </p>
      </footer>
    </div>
  );
}

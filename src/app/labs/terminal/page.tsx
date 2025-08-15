import type { Metadata } from "next";
import TerminalClientWrapper from './client';
import './terminal-styles.css';

export const metadata: Metadata = {
  title: "q//os terminal - Qendresa Hoti",
  description: "Interact with the q//os terminal experience",
};

export default function TerminalPage() {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 rounded-full bg-[var(--q-accent)]"></div>
          <h1 className="text-2xl md:text-3xl font-bold">
            q//os terminal
          </h1>
        </div>
        <p className="text-[var(--q-muted)] pl-5">
          Type commands to interact or <span className="font-mono text-[var(--q-accent)]">help</span> to see available options
        </p>
      </header>

      <main className="flex-grow">
        {/* Terminal will be loaded client-side */}
        <TerminalClientWrapper />
      </main>
      
      <footer className="mt-8 text-sm text-[var(--q-muted)] text-center">
        <p>
          © {new Date().getFullYear()} Qendresa Hoti. 
          <a href="/" className="ml-2 text-[var(--q-accent)] hover:underline">
            Return to Main Site
          </a>
        </p>
      </footer>
    </div>
  );
}

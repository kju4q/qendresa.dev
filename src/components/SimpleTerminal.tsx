"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import {
  CommandHistory,
  parseCommandLine,
  getCommandCompletions,
} from "@/lib/cli/parser";
import { processCommand } from "@/lib/cli/commands";
import { terminalConfig } from "@/lib/config/terminal";
import {
  getWeatherAccentColor,
  getTimeAccentColor,
} from "@/lib/helpers/weather";

// Simple DOM-based terminal
export default function SimpleTerminal() {
  const router = useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null); // For auto-scroll
  const commandHistoryRef = useRef(
    new CommandHistory(terminalConfig.maxHistorySize)
  );

  const [input, setInput] = useState("");
  const [outputLines, setOutputLines] = useState<
    Array<{
      content: string;
      type: "system" | "input" | "output" | "error" | "command" | "success";
    }>
  >([]); // Start empty
  const [accentColor, setAccentColor] = useState("var(--q-accent)");
  const [mode, setMode] = useState<"landing" | "guess" | "hotboard">("landing");
  const [guessCount, setGuessCount] = useState(0);
  const [anonId, setAnonId] = useState<string | null>(null);
  const [hotTakes, setHotTakes] = useState<
    Array<{
      id: string;
      text: string;
      created_at: string;
      vote_count: number;
      isOwn: boolean;
      canVote: boolean;
    }>
  >([]);
  const [hotBoardStatus, setHotBoardStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [hotBoardMessage, setHotBoardMessage] = useState<string | null>(null);

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const ensureAnonId = () => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("q_hot_take_anon_id");
    if (stored) return stored;
    const generated =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("q_hot_take_anon_id", generated);
    return generated;
  };

  // Start guess city mode
  const startGuessMode = () => {
    setMode("guess");
    setGuessCount(0);
    setOutputLines([
      {
        content: `<div class="guess-intro">
          <div class="text-[var(--q-accent)] font-semibold">🌏 Guess what city I'm in right now</div>
          <p>You have 3 tries to guess my current location!</p>
          <p>Simply type a city name and press Enter (e.g. <span class="text-[var(--q-accent)]">paris</span>)</p>
        </div>`,
        type: "system",
      },
    ]);
    setTimeout(focusInput, 100);
  };

  // Start hot board mode
  const startHotBoardMode = () => {
    setMode("hotboard");
    setHotBoardMessage(null);
    setOutputLines([
      {
        content: `<div class="hottake-intro">
          <div class="text-[var(--q-accent)] font-semibold">🔥 Hot Board</div>
          <p>Drop a hot take and watch it land on the board.</p>
          <p>Type your take and press Enter (e.g. <span class="text-[var(--q-accent)]">Open source is a social technology</span>)</p>
        </div>`,
        type: "system",
      },
    ]);
    setTimeout(focusInput, 100);
  };

  // Reset to landing mode
  const resetToLanding = () => {
    setMode("landing");
    setOutputLines([
      {
        content: terminalConfig.welcomeMessage,
        type: "system",
      },
      {
        content: `<div class="mt-2">
          <span class="interactive-option" data-option="g">[ g ] guess my city</span>    
          <span class="interactive-option" data-option="hot">[ hot ] hot board</span>
        </div>`,
        type: "system",
      },
    ]);
  };

  // Handle guess city command
  const handleGuessCommand = async (args: string[]) => {
    if (!args.length) {
      setOutputLines((prev) => [
        ...prev,
        {
          content:
            'Please enter a city name after "guess". For example: guess paris',
          type: "error",
        },
      ]);
      return;
    }

    const guessedCity = args.join(" ");

    // Show loading indicator
    setOutputLines((prev) => [
      ...prev,
      {
        content: `<span class="terminal-loading">${terminalConfig.loadingText}</span>`,
        type: "system",
      },
    ]);

    try {
      // Call the same API endpoint as before, but handle the response differently
      const response = await processCommand("guess", args);

      // Remove loading text
      setOutputLines((prev) =>
        prev.filter(
          (line) =>
            !line.content.includes(terminalConfig.loadingText.replace("⟳", ""))
        )
      );

      // Check if it's correct
      const isCorrect = response.success;

      if (isCorrect) {
        // They got it right!
        setOutputLines((prev) => [
          ...prev,
          { content: response.output, type: "success" },
          {
            content: `<div class="mt-4"><span class="text-[var(--q-muted)]">Type</span> <span class="text-[var(--q-accent)] terminal-command" data-command="cd /">cd /</span> <span class="text-[var(--q-muted)]">to return to main site</span></div>`,
            type: "system",
          },
        ]);
        setGuessCount(0);
      } else {
        // Wrong guess, increment counter
        const newGuessCount = guessCount + 1;
        setGuessCount(newGuessCount);

        // Add hint based on the number of guesses
        let hint = "";

        if (newGuessCount === 1) {
          // First hint - timezone/region
          hint = `<div class="guess-hint mt-1"><span class="text-[var(--q-warning)]">Hint #1:</span> <span>I'm in the ${getRandomRegionHint()} region.</span></div>`;
        } else if (newGuessCount === 2) {
          // Second hint - coastal/language
          hint = `<div class="guess-hint mt-1"><span class="text-[var(--q-warning)]">Hint #2:</span> <span>The city is ${
            Math.random() > 0.5 ? "coastal" : "not coastal"
          } and people here commonly speak ${getRandomLanguageHint()}.</span></div>`;
        } else if (newGuessCount >= 3) {
          // Final attempt - reveal answer
          try {
            const locationResponse = await fetch("/api/nomad/location");
            const locationData = await locationResponse.json();
            const currentCity = locationData.city || "Unknown";

            hint = `<div class="guess-reveal mt-1"><span class="text-[var(--q-accent)]">Game over!</span> <span>I'm currently in <b>${currentCity}</b>.</span><div class="mt-1"><span class="text-[var(--q-muted)]">Type</span> <span class="text-[var(--q-accent)] terminal-command" data-command="cd /">cd /</span> <span class="text-[var(--q-muted)]">to return to main site</span></div></div>`;
          } catch (error) {
            hint = `<div class="guess-reveal mt-1"><span class="text-[var(--q-accent)]">Game over!</span> <span>I couldn't reveal my location due to an error.</span><div class="mt-1"><span class="text-[var(--q-muted)]">Type</span> <span class="text-[var(--q-accent)] terminal-command" data-command="cd /">cd /</span> <span class="text-[var(--q-muted)]">to return to main site</span></div></div>`;
          }
        }

        setOutputLines((prev) => [
          ...prev,
          { content: `${response.output}${hint}`, type: "output" },
        ]);
      }
    } catch (error) {
      setOutputLines((prev) =>
        prev.filter(
          (line) => !line.content.includes(terminalConfig.loadingText)
        )
      );

      setOutputLines((prev) => [
        ...prev,
        {
          content: `Error processing guess: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          type: "error",
        },
      ]);
    }
  };

  const fetchHotTakes = async () => {
    if (!anonId) return;
    setHotBoardStatus("loading");
    try {
      const response = await fetch(
        `/api/hottake?anonId=${encodeURIComponent(anonId)}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to load hot takes.");
      }
      setHotTakes(data.takes || []);
      setHotBoardStatus("idle");
    } catch (error) {
      setHotBoardStatus("error");
      setHotBoardMessage(
        error instanceof Error ? error.message : "Failed to load hot takes."
      );
    }
  };

  const submitHotTake = async (text: string) => {
    if (!anonId) return;
    setHotBoardMessage(null);
    try {
      const response = await fetch("/api/hottake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, anonId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit hot take.");
      }
      setHotBoardMessage("Hot take submitted.");
      await fetchHotTakes();
    } catch (error) {
      setHotBoardMessage(
        error instanceof Error ? error.message : "Failed to submit hot take."
      );
    }
  };

  const voteHotTake = async (hotTakeId: string) => {
    if (!anonId) return;
    setHotBoardMessage(null);
    try {
      const response = await fetch("/api/hottake/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotTakeId, anonId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to vote.");
      }
      setHotBoardMessage("Vote recorded.");
      setHotTakes((prev) =>
        prev.map((take) =>
          take.id === hotTakeId
            ? { ...take, vote_count: data.vote_count, canVote: false }
            : take
        )
      );
    } catch (error) {
      setHotBoardMessage(
        error instanceof Error ? error.message : "Failed to vote."
      );
    }
  };

  // Helper functions for hints
  const getRandomRegionHint = (): string => {
    const regions = [
      "Europe",
      "Asia",
      "North America",
      "South America",
      "Africa",
      "Australia",
      "Middle East",
    ];
    return regions[Math.floor(Math.random() * regions.length)];
  };

  const getRandomLanguageHint = (): string => {
    const languages = [
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Japanese",
      "Mandarin",
      "Arabic",
      "Portuguese",
    ];
    return languages[Math.floor(Math.random() * languages.length)];
  };

  // Initialize the terminal
  useEffect(() => {
    // Display welcome message at initialization
    resetToLanding();
  }, []);

  useEffect(() => {
    const id = ensureAnonId();
    if (id) {
      setAnonId(id);
    }
  }, []);

  useEffect(() => {
    if (mode === "hotboard" && anonId) {
      fetchHotTakes();
    }
  }, [mode, anonId]);

  // Scroll to bottom when output changes and set up click handlers
  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Set up click handlers for interactive options and terminal commands
    setTimeout(() => {
      // Interactive options
      const options = document.querySelectorAll(".interactive-option");
      options.forEach((option) => {
        option.addEventListener("click", (e) => {
          const optionType = (e.currentTarget as HTMLElement).getAttribute(
            "data-option"
          );
          if (optionType === "g") {
            startGuessMode();
          } else if (optionType === "hot") {
            startHotBoardMode();
          }
        });
      });

      // Terminal command links (like cd /)
      const commandLinks = document.querySelectorAll(".terminal-command");
      commandLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const command = (e.currentTarget as HTMLElement).getAttribute(
            "data-command"
          );
          if (command) {
            // Set input and trigger the command execution
            setInput(command);
            // We need to execute the command, but can't call handleExecuteCommand directly
            // So we'll set up a one-time effect to handle this
            const tempInput = command;
            setTimeout(() => {
              if (inputRef.current) {
                inputRef.current.value = tempInput;
                inputRef.current.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
                );
              }
            }, 10);
          }
        });
      });
    }, 100); // Small delay to ensure DOM is updated

    return () => {
      const options = document.querySelectorAll(".interactive-option");
      options.forEach((option) => {
        option.removeEventListener("click", () => {});
      });

      const commandLinks = document.querySelectorAll(".terminal-command");
      commandLinks.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, [outputLines]);

  // Add a useEffect to maintain focus on the input field
  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Set up an interval to check focus and refocus if needed
    const focusInterval = setInterval(() => {
      // Only focus if the document is active and the terminal is visible
      if (
        document.hasFocus() &&
        terminalRef.current &&
        terminalRef.current.offsetParent !== null &&
        document.activeElement !== inputRef.current
      ) {
        inputRef.current?.focus();
      }
    }, 300); // Check every 300ms

    return () => {
      clearInterval(focusInterval);
    };
  }, []);

  // Handle command execution
  const handleExecuteCommand = async () => {
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    setInput("");

    // Add command to history
    commandHistoryRef.current.add(trimmedInput);

    // Show the command in output
    setOutputLines((prev) => [
      ...prev,
      {
        content: `${terminalConfig.promptSymbol} ${trimmedInput}`,
        type: "input",
      },
    ]);

    // Special case for clear - works in all modes
    if (trimmedInput.toLowerCase() === "clear") {
      setOutputLines([]);
      return;
    }

    // Special case for cd / or cd.. to redirect to main site with transition
    // These commands take priority over all other handling - work in all modes
    if (
      trimmedInput.toLowerCase() === "cd /" ||
      trimmedInput.toLowerCase() === "cd/" ||
      trimmedInput.toLowerCase() === "cd.."
    ) {
      console.log("Redirecting to homepage...");
      
      // Add a transition class to the terminal
      if (terminalRef.current) {
        terminalRef.current.classList.add("page-transition-exit");
      }

      // Delay navigation to allow animation to play
      setTimeout(() => {
        // Navigate to the home page content
        router.push('/home');
      }, 500);
      return;
    }

    // Special case for plain "cd" to reset to landing/pick mode - works in all modes
    if (trimmedInput.toLowerCase() === "cd") {
      resetToLanding();
      return;
    }

    // Landing mode keyboard shortcuts
    if (mode === "landing") {
      if (trimmedInput.toLowerCase() === "g") {
        startGuessMode();
        return;
      } else if (
        trimmedInput.toLowerCase() === "h" ||
        trimmedInput.toLowerCase() === "hot" ||
        trimmedInput.toLowerCase() === "hot board"
      ) {
        startHotBoardMode();
        return;
      }
    }

    // Handle direct city guesses in guess mode (without requiring "guess" command)
    // But make sure to exclude our special commands (clear, cd, cd/, cd..)
    if (mode === "guess") {
      // In guess mode, treat any input as a city guess
      await handleGuessCommand([trimmedInput]);
      // Prevent further input except for the return button
      inputRef.current?.blur();
      return;
    }

    // Handle direct hot take inputs in hot board mode
    if (mode === "hotboard") {
      if (
        trimmedInput.toLowerCase() === "hot" ||
        trimmedInput.toLowerCase() === "hot board" ||
        trimmedInput.toLowerCase() === "h"
      ) {
        startHotBoardMode();
        return;
      }
      await submitHotTake(trimmedInput);
      return;
    }

    try {
      // Parse and execute command
      const { command, args } = parseCommandLine(trimmedInput);

      // Handle explicit command prefixes (regardless of mode)
      if (command.toLowerCase() === "guess") {
        await handleGuessCommand(args);
        return;
      }

      // If g/h commands are entered, switch modes regardless of current mode
      if (command.toLowerCase() === "g") {
        startGuessMode();
        return;
      } else if (command.toLowerCase() === "h") {
        startHotBoardMode();
        return;
      } else if (command.toLowerCase() === "hot") {
        if (args.length === 0 || args[0]?.toLowerCase() === "board") {
          startHotBoardMode();
          return;
        }
      }

      // Execute the command
      const response = await processCommand(command, args);

      // Display command output
      const outputType =
        command.toLowerCase() === "help"
          ? "command"
          : response.error
          ? "error"
          : response.success
          ? "success"
          : "output";

      setOutputLines((prev) => [
        ...prev,
        {
          content: response.output,
          type: outputType,
        },
      ]);
    } catch (error) {
      // Handle errors
      setOutputLines((prev) => [
        ...prev,
        {
          content: `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          type: "error",
        },
      ]);
    }

    // Ensure input stays focused after command execution
    setTimeout(focusInput, 10);
  };

  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Execute command on Enter
      e.preventDefault();
      handleExecuteCommand();
    } else if (e.key === "g" && mode === "landing" && input === "") {
      // Start guess mode with 'g' key
      e.preventDefault();
      startGuessMode();
    } else if (e.key === "Tab") {
      // Tab completion
      e.preventDefault();
      const completions = getCommandCompletions(input);
      if (completions.length === 1) {
        setInput(completions[0]);
      } else if (completions.length > 0) {
        setOutputLines((prev) => [
          ...prev,
          { content: `${terminalConfig.promptSymbol} ${input}`, type: "input" },
          { content: completions.join("  "), type: "system" },
        ]);
      }
    } else if (e.key === "ArrowUp") {
      // Previous command in history
      e.preventDefault();
      const prevCommand = commandHistoryRef.current.previous();
      if (prevCommand !== undefined) {
        setInput(prevCommand);
      }
    } else if (e.key === "ArrowDown") {
      // Next command in history
      e.preventDefault();
      const nextCommand = commandHistoryRef.current.next();
      if (nextCommand !== undefined) {
        setInput(nextCommand);
      } else {
        setInput("");
      }
    }
  };

  const outputContent = (
    <div>
      {outputLines.map((line, index) => {
        if (line.type === "system") {
          // System messages - render HTML content
          return (
            <div
              key={index}
              className="whitespace-pre-wrap mb-2 text-[var(--q-muted)]"
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          );
        } else if (line.type === "input") {
          // Input commands
          return (
            <div key={index} className="whitespace-pre-wrap mb-1 font-bold">
              {line.content}
            </div>
          );
        } else if (line.type === "error") {
          // Error messages - render HTML content
          return (
            <div
              key={index}
              className="whitespace-pre-wrap mb-2 text-[var(--q-error)]"
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          );
        } else if (line.type === "success") {
          // Success messages - render HTML content
          return (
            <div
              key={index}
              className="whitespace-pre-wrap mb-2 text-[var(--q-success)]"
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          );
        } else if (line.type === "command") {
          // Command outputs for help command - render HTML content
          return (
            <div
              key={index}
              className="whitespace-pre-wrap mb-1"
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          );
        } else {
          // Regular command outputs - render HTML content
          return (
            <div
              key={index}
              className="whitespace-pre-wrap mb-2"
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          );
        }
      })}
    </div>
  );

  const inputLine = (
    <div className="flex items-center">
      <span className="text-[var(--q-accent)]">
        {terminalConfig.promptSymbol}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none px-1"
        style={{ caretColor: "var(--q-accent)" }}
        autoFocus
        aria-label="Terminal input"
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        placeholder={mode === "hotboard" ? "share your hot take..." : undefined}
      />
    </div>
  );

  const formatBoardDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
      className="qos-terminal w-full h-full overflow-hidden font-mono text-sm"
      style={{
        color: "var(--q-text)",
        backgroundColor: "rgb(40 42 54)",
        borderColor: "var(--q-accent)",
      }}
      onClick={focusInput}
      ref={terminalRef}
    >
      <div
        className="h-full overflow-y-auto p-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: `var(--q-accent) var(--q-card-bg)`,
          backgroundColor: "rgb(40 42 54)",
        }}
      >
        {mode === "hotboard" ? (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px] gap-4 h-full">
            <div className="flex flex-col h-full">
              {outputContent}
              {hotBoardMessage && (
                <div className="text-xs text-[var(--q-accent-alt)] mb-2">
                  {hotBoardMessage}
                </div>
              )}
              {inputLine}
              <div ref={outputEndRef}></div>
            </div>

            <aside className="border-l border-[var(--q-border)] pl-4 h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[var(--q-accent)] text-xs uppercase tracking-wide">
                  Hot Board
                </h3>
                <span className="text-[var(--q-muted)] text-[10px]">
                  all-time
                </span>
              </div>
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
                {hotBoardStatus === "loading" && (
                  <div className="text-xs text-[var(--q-muted)]">
                    Loading hot takes...
                  </div>
                )}
                {hotBoardStatus === "error" && (
                  <div className="text-xs text-[var(--q-error)]">
                    Failed to load board.
                  </div>
                )}
                {hotBoardStatus === "idle" && hotTakes.length === 0 && (
                  <div className="text-xs text-[var(--q-muted)]">
                    No hot takes yet. Be the first.
                  </div>
                )}
                {hotTakes.map((take, index) => (
                  <div
                    key={take.id}
                    className="border border-[var(--q-border)] rounded-md p-3 bg-[#1f2130]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-xs text-[var(--q-muted)]">
                        #{index + 1} • {formatBoardDate(take.created_at)}
                      </div>
                      <div className="text-xs text-[var(--q-muted)]">
                        {take.vote_count ?? 0} votes
                      </div>
                    </div>
                    <p className="text-sm text-[var(--q-text)] mt-2">
                      {take.text}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-xs px-2.5 py-1 rounded border border-[var(--q-accent)] text-[var(--q-accent)] hover:text-[var(--q-accent-alt)] hover:border-[var(--q-accent-alt)] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => voteHotTake(take.id)}
                        disabled={!take.canVote || take.isOwn}
                      >
                        {take.isOwn
                          ? "Your take"
                          : take.canVote
                          ? "Vote"
                          : "Voted"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        ) : (
          <>
            {outputContent}
            {inputLine}
            <div ref={outputEndRef}></div>
          </>
        )}
      </div>
    </div>
  );
}

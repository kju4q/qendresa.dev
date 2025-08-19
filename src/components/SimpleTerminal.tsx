"use client";

import { useEffect, useRef, useState } from "react";
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
  const [mode, setMode] = useState<"landing" | "guess" | "hottake">("landing");
  const [guessCount, setGuessCount] = useState(0);

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  // Start hot take mode
  const startHotTakeMode = () => {
    setMode("hottake");
    setOutputLines([
      {
        content: `<div class="hottake-intro">
          <div class="text-[var(--q-accent)] font-semibold">🔥 Your Hot Take</div>
          <p>What's your hot take or curiosity today?</p>
          <p>Simply type your thought and press Enter (e.g. <span class="text-[var(--q-accent)]">NFTs are just expensive jpegs</span>)</p>
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
          <span class="interactive-option" data-option="h">[ h ] your hot take</span>
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
            const locationResponse = await fetch("/api/nomad/weather");
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

  // Handle hot take command
  const handleHotTakeCommand = async (args: string[]) => {
    if (!args.length) {
      setOutputLines((prev) => [
        ...prev,
        {
          content:
            "Please enter your hot take or curiosity. For example: are NFTs just a fad?",
          type: "error",
        },
      ]);
      return;
    }

    const hotTake = args.join(" ");

    // Show loading indicator
    setOutputLines((prev) => [
      ...prev,
      {
        content: `<span class="terminal-loading">${terminalConfig.loadingText}</span>`,
        type: "system",
      },
    ]);

    try {
      // Use the teachme API endpoint for now
      const response = await fetch(
        `/api/nomad/teachme?topic=${encodeURIComponent(hotTake)}`
      );

      if (!response.ok) {
        throw new Error(`Error processing hot take: ${response.statusText}`);
      }

      const data = await response.json();

      // Format the response properly - just use short take, no deep dive
      const formattedOutput = `<p>${data.shortTake}</p>`;

      // Remove loading text
      setOutputLines((prev) =>
        prev.filter(
          (line) =>
            !line.content.includes(terminalConfig.loadingText.replace("⟳", ""))
        )
      );

      // Format for social sharing
      const tweetText = formatForTwitter(hotTake, data.shortTake);

      const socialButtons = `<div class="social-buttons"><div class="copy-button twitter" data-text="${encodeURIComponent(
        tweetText
      )}" onclick="copyToClipboard(this)"><span>Copy for Twitter</span></div></div>`;

      // Add copy to clipboard function
      if (!document.querySelector("#copy-script")) {
        const script = document.createElement("script");
        script.id = "copy-script";
        script.innerHTML = `
          function copyToClipboard(element) {
            const text = decodeURIComponent(element.getAttribute('data-text'));
            navigator.clipboard.writeText(text).then(() => {
              const originalText = element.innerHTML;
              element.innerHTML = '<span>Copied!</span>';
              setTimeout(() => {
                element.innerHTML = originalText;
              }, 2000);
            });
          }
        `;
        document.body.appendChild(script);
      }

      setOutputLines((prev) => [
        ...prev,
        {
          content: `<div class="hottake-output">
<div class="hottake-title">🔥 Your Hot Take: ${hotTake} ${socialButtons}</div>
${formattedOutput}
<div class="mt-2"><span class="text-[var(--q-muted)]">Type</span> <span class="text-[var(--q-accent)] terminal-command" data-command="cd /">cd /</span> <span class="text-[var(--q-muted)]">to return to main site</span></div>
</div>`,
          type: "output",
        },
      ]);
    } catch (error) {
      setOutputLines((prev) =>
        prev.filter(
          (line) => !line.content.includes(terminalConfig.loadingText)
        )
      );

      setOutputLines((prev) => [
        ...prev,
        {
          content: `Error processing hot take: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          type: "error",
        },
      ]);
    }
  };

  // Helper function for formatting social content
  const formatForTwitter = (topic: string, shortTake: string): string => {
    // Format for Twitter with max 280 chars
    return `🔥 Hot Take on "${topic}"\n\n${shortTake.substring(
      0,
      180
    )}...\n\nvia q//os terminal`;
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
          } else if (optionType === "h") {
            startHotTakeMode();
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

    // Special case for clear
    if (trimmedInput.toLowerCase() === "clear") {
      setOutputLines([]);
      return;
    }

    // Special case for cd / to redirect to main site with transition
    if (
      trimmedInput.toLowerCase() === "cd /" ||
      trimmedInput.toLowerCase() === "cd/"
    ) {
      // Add a transition class to the terminal
      if (terminalRef.current) {
        terminalRef.current.classList.add("page-transition-exit");
      }

      // Delay navigation to allow animation to play
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }

    // Landing mode keyboard shortcuts
    if (mode === "landing") {
      if (trimmedInput.toLowerCase() === "g") {
        startGuessMode();
        return;
      } else if (trimmedInput.toLowerCase() === "h") {
        startHotTakeMode();
        return;
      }
    }

    // Handle direct city guesses in guess mode (without requiring "guess" command)
    if (mode === "guess") {
      // In guess mode, treat any input as a city guess
      await handleGuessCommand([trimmedInput]);
      // Prevent further input except for the return button
      inputRef.current?.blur();
      return;
    }

    // Handle direct hot take inputs in hot take mode
    if (mode === "hottake") {
      await handleHotTakeCommand([trimmedInput]);
      // Prevent further input except for the return button
      inputRef.current?.blur();
      return;
    }

    try {
      // Parse and execute command
      const { command, args } = parseCommandLine(trimmedInput);

      // Handle explicit command prefixes (regardless of mode)
      if (command.toLowerCase() === "guess") {
        await handleGuessCommand(args);
        return;
      } else if (command.toLowerCase() === "hottake") {
        await handleHotTakeCommand(args);
        return;
      }

      // If g/h commands are entered, switch modes regardless of current mode
      if (command.toLowerCase() === "g") {
        startGuessMode();
        return;
      } else if (command.toLowerCase() === "h") {
        startHotTakeMode();
        return;
      }

      // Show loading for async commands
      if (["hottake"].includes(command.toLowerCase())) {
        setOutputLines((prev) => [
          ...prev,
          {
            content: `<span class="terminal-loading">${terminalConfig.loadingText}</span>`,
            type: "system",
          },
        ]);
      }

      // Execute the command
      const response = await processCommand(command, args);

      // Remove loading text if it was added
      if (["hottake"].includes(command.toLowerCase())) {
        setOutputLines((prev) =>
          prev.filter(
            (line) =>
              !line.content.includes(
                terminalConfig.loadingText.replace("⟳", "")
              )
          )
        );
      }

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
    } else if (e.key === "h" && mode === "landing" && input === "") {
      // Start hot take mode with 'h' key
      e.preventDefault();
      startHotTakeMode();
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
        {/* Terminal output */}
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

        {/* Current command line */}
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
          />
        </div>

        {/* Auto-scroll anchor */}
        <div ref={outputEndRef}></div>
      </div>
    </div>
  );
}

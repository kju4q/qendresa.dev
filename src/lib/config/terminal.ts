// Terminal configuration settings
export const terminalConfig = {
  // Feature flag
  enabled: process.env.ENABLE_TERMINAL_LANDING === "true",

  // Appearance
  fontSize: 14,
  fontFamily: "var(--mono-font, monospace)",
  cursorBlink: true,

  // Commands
  welcomeMessage: "q//os ready — pick a mode:",

  // Command history limit
  maxHistorySize: 50,

  // System
  promptSymbol: "❯ ",
  loadingText: "⟳ loading...",
};

// Available terminal commands
export const availableCommands = ["g", "h", "hot", "guess", "clear"];

// Command help text
export const commandDescriptions: Record<string, string> = {
  g: 'Start "Guess my city" game',
  h: 'Open "Hot board" mode',
  hot: 'Open "Hot board" mode',
  guess: 'Make a city guess (e.g., "guess paris")',
  clear: "Clear the terminal",
};

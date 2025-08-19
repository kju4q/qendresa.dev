import { commandDescriptions, availableCommands } from "../config/terminal";
import { formatWeatherOutput } from "../helpers/weather";
import {
  checkCityGuess,
  formatGuessResponse,
  checkCityGuessSync,
  formatGuessResponseSync,
} from "../helpers/location";

export type CommandResponse = {
  output: string;
  error?: boolean;
  success?: boolean;
  updateAccentColor?: string;
  type?: "command" | "standard" | "error" | "success";
};

/**
 * Process a command and return the appropriate response
 */
export async function processCommand(
  command: string,
  args: string[]
): Promise<CommandResponse> {
  // Normalize the command
  const normalizedCommand = command.trim().toLowerCase();

  // Process based on command
  switch (normalizedCommand) {
    case "clear":
      return { output: "CLEAR_TERMINAL" }; // Special case handled by the terminal
    case "g":
      return { output: "Entering guess mode..." };
    case "h":
    case "hottake":
      return handleTeachMe(args); // Reuse teachme for hot take functionality
    case "guess":
      return handleGuess(args);
    case "help":
      return {
        output: `<div class="help-section">
          <div class="help-title">Available Commands:</div>
          <div class="command-entry">
            <span class="command-name">g</span>
            <span class="command-desc">Start "Guess my city" game</span>
          </div>
          <div class="command-entry">
            <span class="command-name">h</span>
            <span class="command-desc">Start "Hot take" mode</span>
          </div>
          <div class="command-entry">
            <span class="command-name">clear</span>
            <span class="command-desc">Clear the terminal</span>
          </div>
        </div>`,
        type: "command",
      };
    default:
      return {
        output: `Command not found: ${command}\n\nAvailable commands:\n- g (guess my city)\n- h (hot take)\n- clear`,
        error: true,
      };
  }
}

/**
 * Display help information
 */
function handleHelp(): CommandResponse {
  const helpOutput = [
    "Available Commands:",
    "",
    ...availableCommands.map(
      (cmd) =>
        `  ${cmd.padEnd(10)} - ${commandDescriptions[cmd] || "No description"}`
    ),
    "",
    "Try them out! For example: 'weather' or 'guess london'",
  ].join("\n");

  return { output: helpOutput };
}

/**
 * Get and display weather information
 */
async function handleWeather(): Promise<CommandResponse> {
  try {
    // Fetch weather data from API
    const response = await fetch("/api/nomad/weather");

    if (!response.ok) {
      throw new Error(`Error fetching weather: ${response.statusText}`);
    }

    const weatherData = await response.json();
    const formattedOutput = formatWeatherOutput(weatherData);

    // Return response with updated accent color based on weather
    return {
      output: formattedOutput,
      updateAccentColor: weatherData.condition
        ? weatherData.condition
        : undefined,
    };
  } catch (error) {
    return {
      output: `Failed to get weather information: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      error: true,
    };
  }
}

/**
 * Get and display current time in nomad location
 */
async function handleTime(): Promise<CommandResponse> {
  try {
    // Fetch time data from API
    const response = await fetch("/api/nomad/time");

    if (!response.ok) {
      throw new Error(`Error fetching time: ${response.statusText}`);
    }

    const timeData = await response.json();

    return {
      output: `<div class="time-output">
        <span class="text-[var(--q-accent)]">Current local time:</span> ${timeData.localTime}
      </div>`,
      updateAccentColor: timeData.timeOfDay ? timeData.timeOfDay : undefined,
    };
  } catch (error) {
    return {
      output: `Failed to get time information: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      error: true,
    };
  }
}

/**
 * Process city guess
 */
async function handleGuess(args: string[]): Promise<CommandResponse> {
  if (!args.length) {
    return {
      output: "Please provide a city to guess. For example: 'guess tokyo'",
      error: true,
    };
  }

  const guessedCity = args.join(" ");

  try {
    // Use async versions for accurate location data
    const result = await checkCityGuess(guessedCity);
    const response = await formatGuessResponse(guessedCity, result);

    return {
      output: response,
      success: result === "correct",
    };
  } catch (error) {
    // Fallback to sync versions if async fails
    console.error("Error in handleGuess:", error);
    const result = checkCityGuessSync(guessedCity);
    const response = formatGuessResponseSync(guessedCity, result);

    return {
      output: response,
      success: result === "correct",
    };
  }
}

/**
 * Handle teachme command - provide educational content
 */
async function handleTeachMe(args: string[]): Promise<CommandResponse> {
  if (!args.length) {
    return {
      output:
        "Please provide a topic to learn about. For example: 'teachme blockchain'",
      error: true,
    };
  }

  const topic = args.join(" ");

  try {
    // Fetch response from API
    const response = await fetch(
      `/api/nomad/teachme?topic=${encodeURIComponent(topic)}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching explanation: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      output: `<div class="teachme-output">
        <div class="teachme-title">📚 ${topic.toUpperCase()}</div>
        <div class="mt-2">
          <strong class="text-[var(--q-accent-alt)]">💡 SHORT TAKE:</strong>
          <p>${data.shortTake}</p>
        </div>
        <div class="mt-3">
          <strong class="text-[var(--q-accent-alt)]">🔍 DEEP DIVE:</strong>
          <p>${data.deepDive}</p>
        </div>
      </div>`,
    };
  } catch (error) {
    return {
      output: `Failed to get explanation: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      error: true,
    };
  }
}

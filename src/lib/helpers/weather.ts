import { nomadConfig } from "../config/nomad";

export type WeatherCondition =
  | "sunny"
  | "clear"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "foggy"
  | "default";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface WeatherData {
  city: string;
  condition: WeatherCondition;
  temperature: number;
  temperatureUnit: "C" | "F";
  timeOfDay: TimeOfDay;
  localTime: string;
}

/**
 * Gets the appropriate terminal accent color based on weather condition
 */
export function getWeatherAccentColor(condition: WeatherCondition): string {
  return (
    nomadConfig.weather.conditionColors[condition] ||
    nomadConfig.weather.conditionColors.default
  );
}

/**
 * Gets the appropriate terminal accent color based on time of day
 */
export function getTimeAccentColor(timeOfDay: TimeOfDay): string {
  return (
    nomadConfig.weather.timeColors[timeOfDay] ||
    nomadConfig.weather.timeColors.night
  );
}

/**
 * Format weather data into a readable string
 */
export function formatWeatherOutput(weatherData: WeatherData): string {
  const { city, condition, temperature, temperatureUnit, localTime } =
    weatherData;

  const weatherEmoji = getWeatherEmoji(condition);

  return `<div class="weather-output">
    <div class="weather-location">Current Location: ${city}</div>
    <div class="weather-condition">
      Weather: ${weatherEmoji} ${condition} <span class="weather-temp">(${temperature}°${temperatureUnit})</span>
    </div>
    <div>Local Time: ${localTime}</div>
  </div>`;
}

/**
 * Get an emoji representation of a weather condition
 */
function getWeatherEmoji(condition: WeatherCondition): string {
  const emojiMap: Record<WeatherCondition, string> = {
    sunny: "☀️",
    clear: "🌤️",
    cloudy: "☁️",
    rainy: "🌧️",
    stormy: "⛈️",
    snowy: "❄️",
    foggy: "🌫️",
    default: "🌡️",
  };

  return emojiMap[condition] || emojiMap.default;
}

import { nomadConfig } from '../config/nomad';

export type GuessResult = 'correct' | 'warm' | 'cold';

/**
 * Check if the guessed city matches the current nomad location
 * Returns:
 * - 'correct' if exact match
 * - 'warm' if close (same region/timezone)
 * - 'cold' if not close
 */
export async function checkCityGuess(guessedCity: string): Promise<GuessResult> {
  // Normalize both city names for comparison (lowercase, no special chars)
  const normalizedGuess = normalizeCity(guessedCity);
  const currentCity = normalizeCity(await nomadConfig.getCurrentCity());
  
  // Check for exact match
  if (normalizedGuess === currentCity) {
    return 'correct';
  }
  
  // For now we'll use a simplified approach
  // In a real implementation, you might check:
  // - Cities in the same country
  // - Cities in the same timezone
  // - Cities within certain km/mi distance
  
  // Mock implementation: check if the first letter matches as a 'warm' guess
  if (normalizedGuess[0] === currentCity[0]) {
    return 'warm';
  }
  
  // Otherwise, it's cold
  return 'cold';
}

/**
 * Synchronous version for cases where async isn't possible
 */
export function checkCityGuessSync(guessedCity: string): GuessResult {
  // Normalize both city names for comparison (lowercase, no special chars)
  const normalizedGuess = normalizeCity(guessedCity);
  const currentCity = normalizeCity(nomadConfig.getCurrentCitySync());
  
  // Check for exact match
  if (normalizedGuess === currentCity) {
    return 'correct';
  }
  
  // Mock implementation: check if the first letter matches as a 'warm' guess
  if (normalizedGuess[0] === currentCity[0]) {
    return 'warm';
  }
  
  // Otherwise, it's cold
  return 'cold';
}

/**
 * Format a response based on the guess result
 */
export async function formatGuessResponse(guessedCity: string, result: GuessResult): Promise<string> {
  const currentCity = await nomadConfig.getCurrentCity();
  
  switch (result) {
    case 'correct':
      return `<div class="guess-feedback">
        <span class="guess-correct">🎉 That's correct!</span> I am currently in ${currentCity}!
      </div>`;
    case 'warm':
      return `<div class="guess-feedback">
        <span class="guess-hint">🔥 You're getting warm!</span> ${guessedCity} is in the right general area, but I'm actually in ${currentCity}.
      </div>`;
    case 'cold':
      return `<div class="guess-feedback">
        <span class="guess-hint">❄️ That's cold!</span> I'm not in ${guessedCity}. Try a different continent or region.
      </div>`;
    default:
      return `I couldn't process your guess. Try again?`;
  }
}

/**
 * Synchronous version for formatGuessResponse
 */
export function formatGuessResponseSync(guessedCity: string, result: GuessResult): string {
  const currentCity = nomadConfig.getCurrentCitySync();
  
  switch (result) {
    case 'correct':
      return `<div class="guess-feedback">
        <span class="guess-correct">🎉 That's correct!</span> I am currently in ${currentCity}!
      </div>`;
    case 'warm':
      return `<div class="guess-feedback">
        <span class="guess-hint">🔥 You're getting warm!</span> ${guessedCity} is in the right general area, but I'm actually in ${currentCity}.
      </div>`;
    case 'cold':
      return `<div class="guess-feedback">
        <span class="guess-hint">❄️ That's cold!</span> I'm not in ${guessedCity}. Try a different continent or region.
      </div>`;
    default:
      return `I couldn't process your guess. Try again?`;
  }
}

/**
 * Helper to normalize city names for comparison
 */
function normalizeCity(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^\w\s]/g, '')  // Remove special characters
    .replace(/\s+/g, '');     // Remove whitespace
}

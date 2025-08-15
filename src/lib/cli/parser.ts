import { availableCommands } from '../config/terminal';

/**
 * Split command line input into command and arguments
 */
export function parseCommandLine(input: string): { command: string; args: string[] } {
  const parts = input.trim().split(' ');
  const command = parts[0] || '';
  const args = parts.slice(1);
  
  return { command, args };
}

/**
 * Implement tab completion for known commands
 */
export function getCommandCompletions(partialCommand: string): string[] {
  if (!partialCommand) return [];
  
  return availableCommands.filter(cmd => 
    cmd.toLowerCase().startsWith(partialCommand.toLowerCase())
  );
}

/**
 * Simple command history management
 */
export class CommandHistory {
  private history: string[] = [];
  private position: number = -1;
  private readonly maxSize: number;
  
  constructor(maxSize = 50) {
    this.maxSize = maxSize;
  }
  
  /**
   * Add a command to history
   */
  add(command: string): void {
    // Don't add empty commands or duplicates of the last command
    if (!command || (this.history.length > 0 && this.history[0] === command)) {
      return;
    }
    
    // Add to the beginning
    this.history.unshift(command);
    
    // Keep history within max size
    if (this.history.length > this.maxSize) {
      this.history.pop();
    }
    
    // Reset position
    this.position = -1;
  }
  
  /**
   * Get previous command from history
   */
  previous(): string | undefined {
    if (this.position < this.history.length - 1) {
      this.position++;
      return this.history[this.position];
    }
    return undefined;
  }
  
  /**
   * Get next command from history
   */
  next(): string | undefined {
    if (this.position > 0) {
      this.position--;
      return this.history[this.position];
    } else if (this.position === 0) {
      this.position = -1;
      return '';
    }
    return undefined;
  }
  
  /**
   * Reset the history position
   */
  resetPosition(): void {
    this.position = -1;
  }
}

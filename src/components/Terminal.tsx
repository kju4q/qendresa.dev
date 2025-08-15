"use client";

import { useEffect, useRef, useState } from 'react';
import { CommandHistory, parseCommandLine, getCommandCompletions } from '@/lib/cli/parser';
import { processCommand } from '@/lib/cli/commands';
import { terminalConfig } from '@/lib/config/terminal';
import { getWeatherAccentColor, getTimeAccentColor } from '@/lib/helpers/weather';
import { Terminal as ITerminal } from 'xterm';

// Simple terminal implementation that doesn't rely on xterm.js
export default function TerminalUI() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandHistoryRef = useRef<CommandHistory>(new CommandHistory(terminalConfig.maxHistorySize));
  const xtermRef = useRef<any>(null);
  const fitAddonRef = useRef<any>(null);
  
  const [input, setInput] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [historyPosition, setHistoryPosition] = useState(-1);
  const [accentColor, setAccentColor] = useState<string>("var(--terminal-accent)");
  const [output, setOutput] = useState<Array<{text: string, isError?: boolean, isCommand?: boolean}>>(
    terminalConfig.welcomeMessage.split('\n').map(line => ({ text: line }))
  );
  
  // First, dynamically import Terminal
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only run once
    if (loaded) return;
    
    // Dynamic import for Terminal and FitAddon
    const loadDependencies = async () => {
      try {
        const xtermModule = await import('xterm');
        const fitAddonModule = await import('xterm-addon-fit');
        
        // We're not using the CSS import as it causes issues
        // Custom CSS is already loaded in /app/labs/terminal/xterm.css
        
        // Initialize after a short delay to ensure everything is loaded
        setTimeout(() => {
          initializeTerminal(xtermModule.Terminal, fitAddonModule.FitAddon);
          setLoaded(true);
        }, 500);
      } catch (error) {
        console.error('Failed to load terminal dependencies:', error);
      }
    };
    
    loadDependencies();
  }, [loaded]);
  
  // Initialize the terminal after dependencies are loaded
  const initializeTerminal = (TerminalClass: any, FitAddonClass: any) => {
    if (!terminalRef.current) return;
    
    try {
      // Create a new terminal instance
      const term = new TerminalClass({
        fontFamily: terminalConfig.fontFamily,
        fontSize: terminalConfig.fontSize,
        cursorBlink: terminalConfig.cursorBlink,
        theme: {
          background: 'var(--terminal-bg)',
          foreground: 'var(--terminal-text)',
          cursor: accentColor,
          cursorAccent: 'var(--terminal-bg)',
          selectionBackground: accentColor,
          selectionForeground: 'var(--terminal-bg)',
        }
      });
      
      // Create and load the fit addon
      const fitAddon = new FitAddonClass();
      term.loadAddon(fitAddon);
      
      // Save references
      xtermRef.current = term;
      fitAddonRef.current = fitAddon;
      
      // Open the terminal in the container
      term.open(terminalRef.current);
      
      // Add a delay before fitting to ensure DOM is ready
      setTimeout(() => {
        try {
          fitAddon.fit();
          
          // Set up terminal after fitting is complete
          setupTerminalEvents(term);
        } catch (e) {
          console.warn('Failed to fit terminal:', e);
        }
      }, 300);
    } catch (error) {
      console.error('Failed to initialize terminal:', error);
    }
  };
  
  // Set up terminal events after initialization
  const setupTerminalEvents = (term: ITerminal) => {
    // Handle terminal resize
    const handleResize = () => {
      if (!fitAddonRef.current) return;
      
      try {
        fitAddonRef.current.fit();
      } catch (e) {
        console.warn('Failed to fit terminal on resize:', e);
      }
    };
    
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    // Set up key event handler
    term.onKey((e: any) => {
      const { key, domEvent } = e;
      
      // Handle special keys
      switch (domEvent.key) {
        case 'Enter':
          handleEnterKey();
          break;
        case 'Backspace':
          handleBackspace();
          break;
        case 'ArrowUp':
          handleArrowUp();
          break;
        case 'ArrowDown':
          handleArrowDown();
          break;
        case 'ArrowLeft':
          handleArrowLeft();
          break;
        case 'ArrowRight':
          handleArrowRight();
          break;
        case 'Tab':
          domEvent.preventDefault();
          handleTab();
          break;
        case 'c':
          // Ctrl+C handling
          if (domEvent.ctrlKey) {
            handleCtrlC();
          } else {
            handleRegularKey(key);
          }
          break;
        default:
          // Regular key input
          if (!domEvent.ctrlKey && !domEvent.altKey) {
            handleRegularKey(key);
          }
          break;
      }
    });
    
    // Show welcome message
    term.write(terminalConfig.welcomeMessage);
    displayPrompt();
    term.focus();
    
    // Set cleanup on unmount
    const cleanup = () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
      if (term) term.dispose();
    };
    
    // Add cleanup to window to ensure it happens
    window.addEventListener('beforeunload', cleanup);
    
    // Return cleanup function
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  };
  
  // Update terminal theme when accent color changes
  useEffect(() => {
    if (!xtermRef.current) return;
    
    xtermRef.current.options.theme = {
      ...xtermRef.current.options.theme,
      cursor: accentColor,
      selectionBackground: accentColor,
    };
  }, [accentColor]);
  
  // Helper to display prompt
  const displayPrompt = () => {
    if (!xtermRef.current) return;
    
    const promptText = terminalConfig.promptSymbol;
    xtermRef.current.write(`\r\n${promptText}`);
    setCurrentInput("");
    setCursorPosition(0);
  };
  
  // Handle regular key input - direct write to terminal
  const handleRegularKey = (key: string) => {
    if (!xtermRef.current) return;
    
    // Write the key directly to the terminal
    xtermRef.current.write(key);
    
    // Insert character at cursor position
    const newInput = 
      currentInput.substring(0, cursorPosition) +
      key +
      currentInput.substring(cursorPosition);
    
    // Update state
    setCurrentInput(newInput);
    setCursorPosition(cursorPosition + 1);
  };
  
  // Handle backspace key - direct deletion
  const handleBackspace = () => {
    if (!xtermRef.current || cursorPosition === 0) return;
    
    // Directly handle backspace in the terminal
    xtermRef.current.write('\b \b');
    
    // Remove character before cursor
    const newInput = 
      currentInput.substring(0, cursorPosition - 1) +
      currentInput.substring(cursorPosition);
    
    // Update state
    setCurrentInput(newInput);
    setCursorPosition(cursorPosition - 1);
  };
  
  // Handle Enter key (execute command)
  const handleEnterKey = () => {
    if (!xtermRef.current) return;
    
    const command = currentInput.trim();
    
    // Write the command with a new line
    xtermRef.current.write('\r\n');
    
    // Skip empty commands
    if (!command) {
      displayPrompt();
      return;
    }
    
    // Add to command history
    commandHistoryRef.current.add(command);
    
    // Parse and execute the command
    executeCommand(command);
  };
  
  // Handle Tab key (command completion)
  const handleTab = () => {
    if (!xtermRef.current || !currentInput) return;
    
    // Split input to get the current command word
    const parts = currentInput.trim().split(' ');
    
    // Only complete the command part (first word)
    if (parts.length === 1) {
      const completions = getCommandCompletions(currentInput);
      
      if (completions.length === 1) {
        // Single completion - use it directly
        xtermRef.current.write('\r');
        xtermRef.current.write(terminalConfig.promptSymbol);
        xtermRef.current.write(completions[0]);
        
        setCurrentInput(completions[0]);
        setCursorPosition(completions[0].length);
      } else if (completions.length > 1) {
        // Multiple completions - show options
        xtermRef.current.write('\r\n');
        xtermRef.current.write(completions.join('  '));
        xtermRef.current.write('\r\n');
        xtermRef.current.write(`${terminalConfig.promptSymbol}${currentInput}`);
      }
    }
  };
  
  // Handle arrow up (previous command in history)
  const handleArrowUp = () => {
    if (!xtermRef.current) return;
    
    const prevCommand = commandHistoryRef.current.previous();
    
    if (prevCommand !== undefined) {
      // Clear current input visually
      xtermRef.current.write('\r');
      xtermRef.current.write(' '.repeat(terminalConfig.promptSymbol.length + currentInput.length));
      xtermRef.current.write('\r');
      xtermRef.current.write(terminalConfig.promptSymbol);
      
      // Write the previous command
      xtermRef.current.write(prevCommand);
      
      setCurrentInput(prevCommand);
      setCursorPosition(prevCommand.length);
    }
  };
  
  // Handle arrow down (next command in history)
  const handleArrowDown = () => {
    if (!xtermRef.current) return;
    
    const nextCommand = commandHistoryRef.current.next();
    
    if (nextCommand !== undefined) {
      // Clear current input visually
      xtermRef.current.write('\r');
      xtermRef.current.write(' '.repeat(terminalConfig.promptSymbol.length + currentInput.length));
      xtermRef.current.write('\r');
      xtermRef.current.write(terminalConfig.promptSymbol);
      
      // Write the next command
      xtermRef.current.write(nextCommand);
      
      setCurrentInput(nextCommand);
      setCursorPosition(nextCommand.length);
    }
  };
  
  // Handle left arrow - actually move the cursor
  const handleArrowLeft = () => {
    if (cursorPosition > 0 && xtermRef.current) {
      // Actually move the cursor back
      xtermRef.current.write('\b');
      setCursorPosition(cursorPosition - 1);
    }
  };
  
  // Handle right arrow - actually move the cursor
  const handleArrowRight = () => {
    if (cursorPosition < currentInput.length && xtermRef.current) {
      // Get the character at the cursor position
      const char = currentInput.charAt(cursorPosition);
      
      // Output that character to advance the cursor
      xtermRef.current.write(char);
      
      setCursorPosition(cursorPosition + 1);
    }
  };
  
  // Handle Ctrl+C - direct handling
  const handleCtrlC = () => {
    if (!xtermRef.current) return;
    
    xtermRef.current.write('^C');
    displayPrompt();
  };
  
  // Execute a command and display the result
  const executeCommand = async (commandLine: string) => {
    if (!xtermRef.current) return;
    
    // Parse the command
    const { command, args } = parseCommandLine(commandLine);
    
    // Special case for clear command
    if (command.toLowerCase() === 'clear') {
      xtermRef.current.clear();
      displayPrompt();
      return;
    }
    
    try {
      let loadingMessage: string | null = null;
      
      // Show a temporary "loading" message for async commands
      if (['weather', 'time', 'teachme'].includes(command.toLowerCase())) {
        loadingMessage = `\r\n${terminalConfig.loadingText}`;
        xtermRef.current.write(loadingMessage);
      }
      
      // Process the command
      const response = await processCommand(command, args);
      
      // Clear the loading text if it was shown
      if (loadingMessage) {
        xtermRef.current.write('\r' + ' '.repeat(loadingMessage.length - 1) + '\r');
      }
      
      // Handle accent color updates
      if (response.updateAccentColor) {
        if (command.toLowerCase() === 'weather') {
          setAccentColor(getWeatherAccentColor(response.updateAccentColor as any));
        } else if (command.toLowerCase() === 'time') {
          setAccentColor(getTimeAccentColor(response.updateAccentColor as any));
        }
      }
      
      // Special case for the CLEAR_TERMINAL response
      if (response.output === 'CLEAR_TERMINAL') {
        xtermRef.current.clear();
        displayPrompt();
        return;
      }
      
      // Display the command output
      const outputLines = response.output.split('\n');
      for (const line of outputLines) {
        if (response.error) {
          xtermRef.current.write('\r\n\x1b[31m' + line + '\x1b[0m');
        } else {
          xtermRef.current.write('\r\n' + line);
        }
      }
    } catch (error) {
      // Handle errors
      xtermRef.current.write(`\r\n\x1b[31mError: ${error instanceof Error ? error.message : 'Unknown error'}\x1b[0m`);
    }
    
    // Show the prompt again
    displayPrompt();
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      <div 
        className="w-full h-full rounded-md overflow-hidden border"
        style={{ 
          borderColor: accentColor,
          boxShadow: `0 0 15px ${accentColor}33` 
        }}
      >
        <div 
          ref={terminalRef} 
          className="w-full h-full" 
          aria-label="Terminal interface"
        />
      </div>
    </div>
  );
}

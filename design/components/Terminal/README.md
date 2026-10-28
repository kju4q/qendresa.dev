# Terminal

A dark window with a title bar, typed lines, and a blinking pink cursor, for anywhere a command or its output shows: a page intro, a code example in a product, a slide. The consumer provides the lines (an array of `{prompt, text}`) and whether the last line is still typing.

- Colors are `terminal`, `terminal-bar`, `terminal-text`, `terminal-muted` and never change with the theme.
- The prompt mark is `❯` in `butter`. Keywords inside output are set in brackets: `[ home ]`.
- Typing uses the `type` token on the last line only. The cursor blinks with `blink`. Under reduced motion the line appears at once and the cursor still blinks.
- Corners `radius-terminal`. Inside padding `space-3`. Text in `terminal` style.
- Do: use it for commands, output, and the loading state (`❯ loading`). Don't: put more than one terminal in a view, or body text inside it.

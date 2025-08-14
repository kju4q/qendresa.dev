# Commit Assistant

When I say “commit” or “commit message”:

1. Use **@Commit** to read the staged Git diff.
2. Scan for obvious bugs, missing imports, unused variables, or style mismatches.
3. If there are issues, list them in a short checklist before the message.
4. If clean, generate:
   - A single-line commit title (≤ 70 chars).
   - If needed, a short bullet-point body.
5. Mention the **user-visible impact** (component, feature, style change).
6. Prefer short Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) when they fit, but don’t overcomplicate.

**Message template**

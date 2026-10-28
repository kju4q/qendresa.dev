Qendresa's own visual language, for everything she makes: the website, digital products and PDFs, slide decks, carousels, video text overlays, newsletter layouts, and any app or page an agent builds for her. Every rule here was chosen on boards, one decision at a time. Whoever builds with it next, Claude Code, Codex, a designer, or Qendresa at 1am, reads this file first and takes its values from `tokens.json`.

## Where it applies

- Web: the site and every app or page built for her. Tokens as CSS variables, fonts from Google.
- Documents and products: PDFs, guides, Notion or Docs exports. Same palette, same three type jobs, airy spacing, stickers in margins.
- Slides, carousels, video overlays: milky or cocoa ground, one serif title per frame, mono labels, one sticker per frame.
- Agents: an agent asked to build anything for her loads this README and `tokens.json` before touching a style. The system wins over the agent's defaults.

## Voice

- Write like a confident builder who ships. Short sentences, concrete nouns, the thing itself rather than a claim about the thing.
- First person. "I ran the same model in two harnesses" rather than "Qendresa compared".
- Capital letter after every period. The pronoun I is always capital.
- No em dashes, no double dashes, no "not X but Y", no staccato comma poems, no "nobody is talking about it". No salesy or philosophical closers. End on a fact or an instruction.
- Keywords the reader comments are set in brackets in `terminal`: `[ LEARN ]`, `[ TAX ]`, `[ SKILL ]`, `[ READ ]`.
- Section names after the prompt mark are lowercase: `❯ resources`, `❯ writing`, `❯ now`, `❯ chapter two`.
- Word stickers are the only place for play words: ship it, new, ok but why, it ran, built in a day. UI labels stay plain.

Pairs that set the tone:

| say | not |
| --- | --- |
| Almost all of it is free. | Unlock free resources! |
| It ran. | Success! |
| ok but why | Learn more |
| Pick one, I'll build it. | Vote now |
| Nothing here yet. The cat is on the keyboard. | No results found |

## Color

Two themes, both warm. Light is Milky: `ground` with a 7% paper grain, white `surface` cards, `ink` text. Dark is Cocoa: brown instead of black, `ground` `#241c1f`, `surface` a shade up, never grain. Pick one per surface and keep it: a deck is milky or cocoa, never both.

- Text is `ink` on `ground` and `surface`. Secondary text is `muted`. Both pass 5:1 in both themes.
- Links are `link` (rose in light, pink in dark). Underline on hover only.
- Borders are `line`. Cards use a 1px line, never a shadow.
- Four moment colors for anything that comes in four kinds: the four sections of a product, filters in a library, chapters in a deck. The soft tint fills the card or tag, the mid tone is the dot, the deep tone is the eyebrow text:
  - Know yourself: `pink-soft`, `pink`, `rose`
  - Think: `lilac-soft`, `lilac`, `violet`
  - Build: `peach-soft`, `peach`, `clay`
  - Check: `mint-soft`, `mint`, `moss`
- Butter is the action color: the prompt mark `❯`, the primary button, the star. Text on butter is `on-butter`.
- The terminal is its own small world: `terminal` body, `terminal-bar` top, `terminal-text` and `terminal-muted`. It looks the same in both themes and is used wherever a command or output shows, on a page, in a PDF, on a slide.
- Never put mid tones (`pink`, `lilac`, `peach`, `mint`, `butter`) under small text in the light theme. Use the deep tone for text.

## Type

Three faces with three jobs, and a fourth that only speaks in stickers.

- `display`, `title`, `heading` in Young Serif for names and titles. Weight 400 always, never bold, never italic.
- `body`, `body-strong`, `small` in Figtree for everything you read. Running text at most `measure` wide.
- `label`, `terminal`, `code` in IBM Plex Mono for the terminal, eyebrows, keywords, and code. Eyebrows are uppercase with `0.08em` tracking.
- `sticker-word` in Fredoka 500 for word stickers only.
- Fonts load from Google Fonts: Young Serif 400, Figtree 400 500 600, IBM Plex Mono 400 500, Fredoka 500.

## Spacing and shape

Airy. `space-1` 8, `space-2` 16, `space-3` 24, `space-4` 48. Sections are 48 apart, cards are 24 apart and padded 24, labels sit 8 above their title. Page content stops at `page` 1040px with a 16px gutter on phones and 24px above 720px.

- Cards: `radius-card` 22. Buttons and word stickers: `radius-pill`. Tags: `radius-tag` 10. Terminal and code: `radius-terminal` 12.
- Cards in a row are equal height. Inside, three zones from top: a `label` eyebrow, the picture or sticker, then the words. The picture zone absorbs the spare height so the words always start at the same line across a row.

## Marks

The three marks that appear everywhere, in place of an icon set:

- The prompt `❯` in `butter`, `terminal` size, before section names and as the section break.
- Brackets around keywords: `[ LEARN ]`.
- The cursor block in `pink`, 0.55em wide, 1em tall, blinking with `blink`.

## Lines, breaks, bars, and texture

Each has a default and a context where another variant is right.

- Dividers between items: hairline `line` by default. Dotted 2px `lilac` on writing and personal material. Mono dashes `- - -` in `terminal-muted` on dark surfaces and in the terminal.
- Section breaks: the prompt and a line by default (`❯ name` then a hairline to the edge). A `mint` wave on personal material. Three `pink` stars `✦ ✦ ✦` inside long-form writing only.
- The moment mark on cards: a 10px dot in the moment's mid tone at the top right corner by default. A 3px bar along the top edge, inset 16px, on cards that carry no sticker. The left-edge bar is retired, do not use it.
- Texture: 7% grain on `ground` by default, 14% on heroes and covers, none in the dark theme and none inside the terminal.

## Stickers

Twenty-one SVGs under `assets/Stickers`. Inked outlines in `ink` with palette fills. They sit on cards, next to titles, in margins of documents, on slides, and in empty states.

- Every sticker is tilted between 4 and 22 degrees and no two on one screen share a size. Sizes 40, 56, 72, 96.
- At most two stickers per screen, one per card. A sticker never covers text.
- Word stickers (ship it, new, ok but why, it ran, built in a day) mark state: new on a resource under 14 days old, it ran on a verified setup, ship it on a launch, built in a day on a build log, ok but why on a critique.
- The complaining cat owns the empty state. The cat on the keyboard owns 404 and loading-too-long. The retriever means a waitlist or an ask. Tea mug and plate are for personal material. The lumpy heart with the cursor is the sign-off mark.
- Arrows point at the thing to do next, never decorate.

## Illustration

Four styles, each with a home. Do not mix two in one view.

- Doodle scenes: ink line, one fill color, a person at a desk, a hand on a trackpad. Used for a person intro, the newsletter header, the author page of a product.
- Paper shapes: flat cut-paper blobs in soft tones, no outline. Used as background relief on covers, title slides, and the top of a page, always behind text at 40% or less of the width.
- Terminal art: ASCII and box characters in `terminal-text` and `terminal-muted` inside a terminal window. Used inside terminals, on dark sections, in empty states and 404s.
- Editorial scenes: a small world of files, a cursor, a path of stones, in palette fills with faces allowed (two dots, a smile, blush, a bun). Used for launches, the top of a page, product and resource covers. Drawn from her own world, never from another creator's composition.

## Motion

Six moves and nothing else. Durations `fast` `base` `slow`, one curve `ease`.

1. Hover lift: a card rises 2px and its border darkens to `muted`, `fast`.
2. Press: 3% scale down, `fast`.
3. Focus: the ring appears, `fast`.
4. Enter: cards fade and rise 8px as they appear, `base`, staggered 40ms.
5. Filter: tags fade out and in when a filter changes, `base`.
6. Type: a terminal line types in with `type`, the cursor blinks with `blink`, a sticker settles with `slow`.

Never moves: body text, the name, section breaks, dividers, the grain, the moment dot, anything in the dark theme beyond the six above. Respect `prefers-reduced-motion`: keep the focus ring and the cursor blink, drop the rest.

## Icons

None by default. The three marks and words do the work. Where a word does not fit (menu, close, external link, copy) use a thin rounded line set at 1.5px stroke in `currentColor` drawn inline as SVG, 20px box. Never a filled icon, never an emoji in UI.

## States

- Hover: lift and border to `muted` on cards; underline on links; `pink-soft` fill behind nav items.
- Press: 3% scale.
- Focus: 2px `focus` ring 2px outside the edge, plus a 4px `butter-soft` halo. Never remove it.
- Selected: the moment's soft tone as fill with the deep tone as text.
- Disabled: 45% opacity, no hover, cursor default.
- Loading: a single terminal line typing `❯ loading` with the cursor. Never a spinner.
- Error: text in `clay` on `peach-soft` with a prompt line that says what to do: `❯ try the keyword in lowercase`.
- Success: a `mint-soft` pill with `moss` text, usually the words `it ran`.
- Empty: the complaining cat and one plain sentence.

## Components

`Terminal`, `Card`, `Button`, `Tag`, `Nav`, and the `Cover`. Each has a README with what the consumer provides and a live preview. They are the web form of the rules above; a PDF or a slide uses the same values without the components.

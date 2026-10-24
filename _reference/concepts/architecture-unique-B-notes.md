# Architecture constraint: unique concepts B1–B4 (editorial + data-visual)

The brief was to explain a split. The engine (`code.ts`) reads the file but has no screen. The panel (UI iframe) draws but can't see the file. Exactly one message, `ANALYSIS_COMPLETE`, crosses between them, carrying findings and never the file. The result is a private, repeatable score.

The 7 earlier files (concept A–C, compact 1–4) all use one of these structures:
- rooms or lanes
- a can/can't matrix
- a stepper or tabs
- a flow strip
- a floor plan with callouts

All four of these concepts borrow a format from outside software diagrams instead.

## Raw ideas (14)
1. **Venn diagram.** Two sets, and the overlap holds only the message.
2. **Privacy or nutrition label** ("Data Facts"). Shows the % of the file each party sees, and a message count.
3. **Hourglass or funnel.** The whole file sits in the top bulb, one message passes the neck, and the score sits in the bottom bulb.
4. **Annotated equation.** A struck-out "reads + draws = one program", then "Engine + Panel + 1 message = score".
5. **Customs declaration or shipping label.** "Contents: findings. Not enclosed: your file."
6. **Redacted document.** The file blacked out except for the findings lines.
7. **Telegram.** `ANALYSIS_COMPLETE STOP SCORE 82 STOP`, showing that only the telegram travels.
8. **See-saw or balance.** All the knowledge on one side and all the drawing on the other, with the message as the fulcrum.
9. **Newspaper "two witnesses, one statement"** columns.
10. **Sentence builder or magnetic poetry.** Tap chips to complete "The engine ___, the panel ___".
11. **Annotated real plugin-panel mock** with the engine "behind glass".
12. **Prison visiting booth.** Two people, a glass wall and one phone.
13. **Periodic-table tiles** for Engine, Panel and Message, with "properties".
14. **Dictionary or glossary entry** with two senses and a usage note.

**Rejected:**
- 9, 11 and 12 are rooms or lanes, or callouts on a picture, in disguise.
- 10 hides the answer until you tap, which fails the 5-second test.
- 8 implies a weighing, and nothing is weighed.
- 5 and 6 are good, but they overlap with 2 (form-like) and 3 (narrowing). Keep 5 in reserve.
- 7, 13 and 14 are cute but slower to read.

## Chosen four

| # | File | Borrowed format | Why it shares no structure with the old 7 | 1440×900 | 375×812 |
|---|---|---|---|---|---|
| B1 | `architecture-unique-B1.html` | **Venn diagram** (set theory) | There are no boxes, lanes or arrows. The *intersection region* is the message, so "they share only one thing" is shown by geometry rather than stated. | **336px** | **557px** |
| B2 | `architecture-unique-B2.html` | **Nutrition / privacy label** ("Data Facts") | It is a single-column regulatory label with a quantity per row (100% / 0% / 0%* / 1 / Yes). There is no side-by-side can/can't comparison. It reads like an app-store privacy card. | **388px** | **554px** |
| B3 | `architecture-unique-B3.html` | **Hourglass infographic** | The narrowing is the argument: the whole file (a grid of layers) fills the top, one grain (the message) drops through the neck, and the bottom holds only a drawn score. The shape carries the meaning, with 3 labels aligned to the bulbs and the neck. | **300px** | **523px** |
| B4 | `architecture-unique-B4.html` | **Annotated equation** (editorial maths, Riffle-style coloured terms) | It is pure typography. A struck-out equation ("reads your file + draws the screen ≠ one program", stamped NOT ALLOWED) is followed by Engine + Panel + 1 × `ANALYSIS_COMPLETE` = "a private, repeatable score". Each term carries its own annotation underneath. | **396px** | **514px** |

**How the heights were measured:** in headless Chrome, as `#block.getBoundingClientRect().height` (kicker through footnote). Each page was loaded in an iframe sized 1440×900 and 375×812. `scrollWidth === innerWidth` held in all 8 cases. No text with a computed font size under 12px was found inside `#block`. Every file prints these numbers in its caption, along with a live reading for the current window.

**How the constraints are met:**
- **Fixed height:** none of the four has interactions that change layout, so nothing jumps.
- **Nothing hover-only:** everything is visible in the default state.
- **Motion:** each concept has at most one motion, which is decorative. B1 and B4 pulse the message pill, and B3 drops one grain through the neck. All motion is disabled under `prefers-reduced-motion`.
- **Theme and palette:** each file has a light/dark toggle plus `prefers-color-scheme`, using the site palette.
- **Text size:** body copy is 16px. Label and footnote text is 12–15px. The B2 label rows are 13.5–14px on purpose, because they are label micro-copy. Raise them to 16px if that counts as body.

**What is flagged in the files:**
- `ANALYSIS_COMPLETE` is the only message name used, and it is real. None of these concepts needs the placeholder "run request".
- Every "offline / no internet / 0%" claim carries an asterisk: *assumes the manifest's `allowedDomains` blocks the network; not yet verified*.
- The "82" score in B3 is labelled illustrative.

## Recommendation
**Ship B1 (Venn).**
- It is the fastest read of the four. Anyone knows a Venn diagram, and "the overlap is one message" lands in about 2 seconds.
- It is the most visually distinctive of the four against everything shown before.
- Porting it is cheap: it is plain absolutely-positioned divs, with no SVG maths, so it is a server component plus one keyframe.

**Runner-up: B2 (Data Facts).** It is the strongest editorial wit, and its "100% / 0% / 0%*" numbers make the privacy claim concrete for recruiters. But it is denser, and its rows sit below 16px.

**Other options:**
- B3 is the most memorable picture. It is short on desktop (300px), but it relies on bulb-aligned labels that are tight at 375px.
- B4 is the most "case-study editorial", and it states the consequence (private, repeatable) as the answer. It works well if the page is otherwise text-heavy.

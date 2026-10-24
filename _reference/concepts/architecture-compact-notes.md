# Architecture constraint: compact concepts (1–4)

The goal is to replace the tall 3-lane, 6-step `ArchitectureFlow.tsx` with a block that fits in one viewport. The budget is ≤640px at ≥1024px wide and ≤~560px at 375px. Both limits include the kicker, heading and lead. Concepts A, B and C (`architecture-concept-*.html`) are not repeated here.

The four concepts are in `architecture-compact-1.html` through `architecture-compact-4.html`. Each file is self-contained, with a light/dark toggle and a reduced-motion guard. It prints its measured height in a caption at the bottom.

Heights were measured as `#block` `getBoundingClientRect().height` in headless Chrome. Each page was loaded in an iframe sized to the viewport, because headless windows clamp to 500px wide. `scrollWidth === innerWidth` held in every case, so there is no horizontal page scroll.

## References
1. **Electron: Process model.** https://www.electronjs.org/docs/latest/tutorial/process-model. It explains the same two-sided split (main process has Node, renderer has the web page) as two named boxes plus one IPC bridge. It states what each side *can* do before it says how they talk. That shaped the order here: capabilities first, then the single message.
2. **Chrome Extensions: Message passing.** https://developer.chrome.com/docs/extensions/develop/concepts/messaging. It explains content scripts (DOM, few APIs) and the service worker (APIs, no DOM) with no diagram at all, just "these contexts cannot directly access each other, so they pass messages". This shows the whole story compresses to one symmetric sentence, which is why every concept here keeps it to one line per side.
3. **Keyed callouts (DITA style guide, Oxygen XML).** https://www.oxygenxml.com/dita/styleguide/Graphics_and_Figures/c_Callouts.html. Its advice is to put numbers on the image and the explanations in a key beside it, rather than long labels on the picture. This is the basis for concept 4: the picture stays small and the text stays at full body size.

## Comparison

| # | Concept | Desktop 1440×900 | Mobile 375×812 | Default-state clarity | Interaction (fixed height?) | Build effort in React |
|---|---|---|---|---|---|---|
| 1 | **Flow strip**: You · Panel · wall · Engine on one row; `run request` → and ← `ANALYSIS_COMPLETE` (pulsing) on the wall | **390px** | **540px** | ★★★ Whole trip and both can'ts visible at once | None | Low (static grid and one keyframe) |
| 2 | **Mirror ledger**: butterfly table with Engine and Panel either side of a "wall" column, plus a message bar crossing it; Plain/Engineer lens | **506px** | **528px** | ★★★ Yes/no symmetry reads instantly | Lens swap, stacked in one grid cell: 506/506, 528/528 | Low (one `useState`) |
| 3 | **Fixed stepper**: can/can't lane strip plus 4 numbered tabs that read as a sentence, and one stage card | **410px** | **540px** | ★★ The story is in the tab labels, but the detail needs taps | Tabs and arrow keys, panels stacked: 410 ×4, 540 ×4 | Medium (tabs a11y) |
| 4 | **Floor plan**: SVG cutaway of FIGMA with two rooms, a hatched wall and an envelope in the slot; keyed callouts 1–4 | **492px** | **533px** | ★★★ The most memorable image, and the analogy explains itself | Tap or hover highlights only, with no new content | Medium (inline SVG and theme vars) |

All four are inside budget. The first pass ran 701–812px on mobile. The cuts that got there were a shorter lead, merging "You" into one row, putting panel and engine side by side on mobile, removing the prev/next nav, and a terse key.

## Recommendation
**Ship 1 (Flow strip) for the case study.** It is the shortest (390 / 540), tells the full story with zero interaction, keeps the only real message name as the visual focus, and is the cheapest to port. **Fall back to 4** if the page needs a stronger visual moment, since the floor-plan image is the most memorable. Concept 2 is the best fit if engineers are the main audience, and it is the natural successor to Concept C.

## Plan to replace `ArchitectureFlow.tsx` (with concept 1)
1. **Data:** cut `STEPS` and `LANES` down to three nodes (`you`, `panel`, `engine`) and two wall messages (`{ label: "run request", placeholder: true }` and `{ label: "ANALYSIS_COMPLETE" }`). Keep the `TODO(placeholder)` header comment. Keep the hedged footnote about the `allowedDomains` manifest until the manifest is checked.
2. **Markup:** replace the lanes/steps grid with a single CSS grid. Use `grid-cols-2` with areas `you you / pan eng / wall wall` on mobile and `lg:grid-cols-[.8fr_28px_1fr_minmax(210px,1.05fr)_1fr]` on desktop. Reuse the existing tokens (`bg-void-2`, `border-ink/10`, `text-pearl`, `text-fog`, `border-accent-primary`) and the existing `Reveal` wrapper.
3. **Delete state:** remove `useState`, `useRef`, the play/next/show-all buttons and `"use client"`, so it becomes a server component. The pulse and the travelling dot are pure CSS `@keyframes` in `globals.css`, behind `motion-safe:`.
4. **Verify:** run `npm run build`. Then measure the block at 1440×900 and 375×812 in light and dark (≤640 / ≤560), confirm `scrollWidth === innerWidth`, check the reduced-motion static state, and confirm body copy stays ≥16px and ≤62ch.

Copy notes: `ANALYSIS_COMPLETE` is the only confirmed message name. "run request" is a placeholder and is tagged as one in every file. The "no internet" / "offline" claim stays footnoted as unverified, pending the manifest's `networkAccess.allowedDomains`.

# Architecture constraint: research and concepts

Target: the "The architecture constraint" block in `src/components/site/Solution.tsx` (lines 60–111).

## Problem with the current block
- It assumes the reader already knows what a sandbox, an iframe and `postMessage` are. The ✓/✗ lists say *what* each side can do, but nothing says *why* that forces the design.
- Labels are jargon-first ("No DOM, no window"). A recruiter reading at a glance sees two code boxes and an arrow.
- The payoff ("clean separation… defined contract") comes last, in fog-coloured small text.
- **Accuracy issue:** "✗ No network access" on the sandbox isn't strictly true. Figma's main thread can call `fetch` through Figma's own Fetch API. What actually blocks network access is the manifest setting `networkAccess.allowedDomains: ["none"]`, which Figma enforces with CSP on both sides. The same applies to TurningPoint.tsx ("the Figma sandbox has no network access"). The copy should credit the manifest lock. If the real manifest doesn't set `"none"`, the privacy claim doesn't hold.

## Findings
1. **Figma frames it as a two-sided capability split.** Its own explanation: the main thread "can access the Figma scene… but not the browser APIs. Conversely, the iframe can access the browser APIs, but not the Figma scene." That symmetry is the hook for a non-technical reader: *neither half can do the whole job.*
2. **The split exists for security and speed.** Figma moved scene code onto a sandboxed main thread because serializing a large document for an iframe took about 14s. Keeping UI and network in the iframe kept the sandbox small and auditable. So "why it exists" fits in one sentence.
3. **Diagram hygiene (C4):** give every element a stated type and responsibility, label every arrow specifically (not "uses"), and add a legend or key. The current arrow label `postMessage` is a protocol, not a meaning. Pair it with a plain label ("one note: the findings").
4. **Analogy + benefit + trade-off** is the most cited pattern for non-technical readers. Keep boxes to 5–7 elements, use plain labels, and put a caption under the visual.
5. **Progressive disclosure (NN/g):** show the essentials first and give detail on request. This lets one block serve both recruiters and engineers. The tap target is a toggle or `<details>`, never hover.

## References
1. Figma: How plugins run: https://developers.figma.com/docs/plugins/how-plugins-run/
2. Figma: Making network requests (`allowedDomains: ["none"]`): https://developers.figma.com/docs/plugins/making-network-requests/
3. Figma blog: How we built the Figma plugin system: https://www.figma.com/blog/how-we-built-the-figma-plugin-system/
4. C4 model: Notation: https://c4model.com/diagrams/notation
5. NN/g: Progressive disclosure: https://www.nngroup.com/articles/progressive-disclosure/

## Concepts
| | A — Two rooms (analogy) | B — Swim lanes (sequence) | C — Who can do what (matrix + lens) |
|---|---|---|---|
| Core device | Two room cards, a wall with one note through it, a bank-vault analogy, `<details>` for engineers | 3 lanes (You / Panel / Engine) and 6 numbered steps, with Play/Next that only highlight steps (nothing hidden) | Capability table (read file / show screen / go online / talk) with a **Plain English ⇄ Engineer view** toggle, and the actual payload |
| Glance-read (recruiter) | ★★★ (strongest story) | ★★ (needs reading top to bottom) | ★★★ (scannable yes/no) |
| Engineer credibility | ★★ (detail tucked away) | ★★★ (shows the real flow) | ★★★ (same table, exact APIs) |
| Shows *why it shaped design* | 3 outcome cards | 1 paragraph | Payload + 3 outcome cards |
| Motion | Envelope pulse (off under reduced motion) | Autoplay stepper (autoplay off under reduced motion) | None |
| Mobile (375) | Stacks; wall turns horizontal | Lanes collapse to a labelled list | Rows become label + 2 cells |
| Build cost in React | Low | Medium (state + timer + grid placement) | Low (one `useState`) |
| Risk | Analogy can feel cute and skews less "senior" | Step 02 "run request" message name is illustrative | Engineer view duplicates strings |

## Recommendation
**Ship C, opening with A's one-line analogy.** The yes/no matrix answers "why" at a glance (*neither half can do the whole job*). The network row makes the privacy story concrete. The lens toggle gives engineers exact APIs without cluttering the default view. It's also the cheapest to build and has no motion to manage. Keep B in reserve if the section later needs to show runtime flow.

## Implementation plan (C)
1. **Data:** in `src/components/site/Solution.tsx`, replace the inline ✓/✗ lists with a `CAPS` array (`{ plain, tech, engine: {ok, plain, tech}, panel: {...} }`) and a `PAYLOAD` string. Fix the network copy so it credits `allowedDomains: ["none"]`. Also correct `TurningPoint.tsx` line 73.
2. **Lens toggle:** add a `useState<"plain"|"tech">` (the file is already `"use client"`). Render a two-button segmented control (`aria-pressed`, `min-h-11`) and swap strings in JSX instead of hiding them with CSS.
3. **Matrix markup:** replace lines 63–104 with a `role="table"` grid using the existing tokens: `bg-void-2`, `border-ink/8`, `text-fog/80`, `text-pearl`, `text-accent-primary`, and `bg-accent-soft` for the network row. Use `grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr]` with the row label at `col-span-2 md:col-span-1`. Use inline SVG check/cross icons plus a visible "Yes/No" (not colour alone).
4. **Handoff + why:** reuse the `FLOW`-style 3-card grid for the outcomes. The payload sits in a `font-mono` card with `border-dashed border-accent-primary/40` and `overflow-x-auto`. Wrap each piece in the existing `Reveal` (it already respects reduced motion via `globals.css`).
5. **Verify:** run `npm run build`, then check light and dark at 375px and 1440px for no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`), keyboard-tab the toggle, and confirm that body text stays ≥16px and copy stays ≤62ch.

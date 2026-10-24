# Decision 02 — redesign of the four-property block

## The problem
`TurningPoint.tsx` ends Decision 02 with `<GlassIcons items={PRINCIPLES} />`: four amber glass tiles (Reproducible, Private, Offline, Fast). Each tile's label only shows on hover, and there is no text explaining it. On touch screens the labels never show. The copy before it says "four properties for free", but the block never says what each property gets you or why AI-first would lose it.

## Findings
- **Labels must be visible all the time.** NN/g says icon labels should be visible without any interaction. Hover-only labels add a step and don't work on touchscreens.
- **Don't collapse short content.** NN/g's accordion guidance says to keep content visible when readers need most of it or when there isn't much of it. Four one-line reasons are both, so they should not go behind tap-to-expand. An accordion only makes sense for optional detail, like the pipeline stages in Concept C.
- **Number the principles and put the explanation right under the title.** GOV.UK Design Principles uses a numbered heading plus a paragraph, all on screen at once. The Linear Method also uses a numbered list you can scan. At this size the pattern is boring but works well.
- **Show where AI sits next to deterministic rules.** Stripe Radar puts AI next to a deterministic rule layer and shows exactly what it can and can't do: the Radar Assistant writes rules, then you test the rule against past payments before turning it on. This is a good model for "AI comes after the score, not inside it".
- **The site already has the copy for this.** The Hero says "reproducible-first, before reaching for AI". The Outcome section ends with "The engine doesn't guess. The next version will explain." The deck's pipeline is Ingest → Scan → Detect → Report. None of the concepts need a new idea.

## References
1. NN/g — Icon Usability: https://www.nngroup.com/articles/icon-usability/
2. NN/g — Accordions on Desktop: https://www.nngroup.com/articles/accordions-on-desktop/
3. GOV.UK — Government Design Principles: https://www.gov.uk/guidance/government-design-principles
4. Linear — The Linear Method: https://linear.app/method
5. Stripe — Radar rules (AI risk scoring + deterministic rules + Radar Assistant): https://docs.stripe.com/radar/rules

## Concepts
| | A — Numbered rows | B — Contrast table | C — Pipeline + "AI enters here" |
|---|---|---|---|
| File | `decision02-concept-A.html` | `decision02-concept-B.html` | `decision02-concept-C.html` |
| Shape | 01–04 rows (2×2 on desktop), icon + title + one bold claim + reason | Property × "If AI-first" × "Deterministic — chosen"; each row becomes a card on mobile | Ingest→Scan→Detect→Report core, a dashed "AI enters here" gate, an "Explain (next version)" box, then 4 one-line properties |
| Answers *why deterministic* | Partly. States the benefits, the trade-off is implied | **Yes, directly.** Each property is shown next to what AI-first would cost | Yes, by showing structure: AI is kept out of the scoring path |
| Answers *where AI fits* | No | Footnote line | **Yes, it's the main point** |
| Scan speed | Fastest | Fast, with the most text | Medium, two visual ideas |
| Interaction | None | None | Native `<details>` for stage detail only (optional) |
| Repetition on the page | Low | Low | **Medium.** The pipeline repeats Solution/UnderTheHood |
| Build cost | Smallest | Small (map over one array) | Largest |
| Risk | Can still read as generic feature tiles | Contrast copy has to stay fair, not a straw man | Repeats content; the gate gets cramped from 900 to 1100px |

## Recommendation
**Use Concept B.** The section is called *Decision* 02, and B is the only option that shows a decision: the four properties as trade-offs, each next to the default it rejects. That is the "why" the hover icons never gave. B already ends on the site's own line, "AI after the score, not inside it". If the pipeline isn't already shown elsewhere on the page, you could borrow C's "AI enters here" gate as a small row under the table. Otherwise skip it.

Caveats:
- The one-line explanations and the "If AI-first" column are **new proposed copy**, based on Decision 01 and the Outcome section. The author should check them, especially "Fast". No speed numbers were invented.
- The "Private" claim relies on Decision 01's statement that the sandbox has no network access. Keep the two wordings consistent.

## Implementation plan (Concept B)
1. **`src/components/site/TurningPoint.tsx`.** Replace `PRINCIPLES` with `{ icon, label, aiFirst, deterministic }[]` (reuse the existing `I.*` SVGs). Delete `AMBER_GRADIENT` and the `GlassIcons` import.
2. **Same file.** Replace the `<GlassIcons …/>` `Reveal` with a semantic `<table>` (caption, `thead` with `scope="col"`, rows with `th scope="row"`). Reuse the tokens Decision 01 already uses: `border-ink/8`, `bg-void-1`, `text-fog/80`, `text-pearl`, and `border-accent-primary/40 bg-accent-soft` for the chosen column, like the chosen option card.
3. **Responsive.** Use Tailwind only: `block lg:table-row` / `lg:table-cell` on rows and cells, `sr-only lg:not-sr-only` on `thead`, and an inline `lg:hidden` mono label in each cell. Keep cell copy in `max-w-[62ch]` and set body text to `text-base` (16px) or larger. No new CSS in `globals.css`.
4. **Close the block.** Add one `Reveal` paragraph with the footnote ("AI still has a place — after the score…"). Optionally wrap the table in `Reveal delay={200}` as before.
5. **Clean up and verify.** If nothing else imports them, delete `src/components/GlassIcons.jsx` and `.css` (`grep -r GlassIcons src`). Then check 375px and 1440px in both themes for no horizontal scroll, and confirm all text shows without hover.

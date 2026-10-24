# Architecture constraint: unique concepts A1–A4 (metaphor and play)

The brief was to make the constraint something you *feel* in a few seconds, using a visual idea that doesn't read as a diagram. The constraint: the engine reads but can't draw, the panel draws but can't read, and only `ANALYSIS_COMPLETE` (findings, never the file) crosses between them.

## What the old concepts already used (so none of these may reuse it)
- **concept-A**: two rooms, a can/can't list in each, and a note through the wall (bank vault and teller analogy).
- **concept-B**: swim lanes with six steps.
- **concept-C**: a capability matrix (a yes/no table) with a lens toggle.
- **compact-1**: a flow strip of nodes with a wall.
- **compact-2**: a mirror-ledger butterfly table.
- **compact-3**: a can/can't strip with a stepper and tabs.
- **compact-4**: a floor-plan cutaway with an envelope in a slot and keyed callouts.

That rules out these shared structures: side-by-side rooms or lanes, two-column can/can't grids, sequences you step through, node-arrow-node flows, a wall with a slot, and numbered callouts. It also rules out the bank, mail-slot and envelope metaphors, because concepts A and compact-4 already used them.

## Raw idea list (14)
1. **Try to cheat.** Tappable "moves" (Panel: open the file, Engine: draw a chart, and so on). Each one stamps BLOCKED or ALLOWED.
2. **Undelivered texts.** A phone chat between the two halves where every message fails with "Not delivered" except the `ANALYSIS_COMPLETE` card.
3. **Red-pen statements.** Huge sentences such as "The panel reads your file." are struck through in red, with a margin note. The only sentence left standing is "One message crosses."
4. **Two blind spots (X-ray slider).** One frame you drag across. On the engine's side the file is raw layer data with no pixels. On the panel's side there are pixels, but the file is a hatched blank. The handle is the message.
5. **Terminal log.** Denied calls such as `document is not defined` in the engine and `figma is not defined` in the panel, with one green `postMessage`. Too engineer-first for a 5-second read by a non-engineer.
6. **Radiologist and patient.** The radiologist reads the scan and the patient only gets the report. A strong analogy, but it is a text analogy, not a visual one, and it is close to concept A's bank.
7. **Exam marking.** The marker sees your paper and you see only the grade. Same problem as 6.
8. **Kitchen pass.** The chef sees the ingredients, the waiter carries the plate, and diners never enter the kitchen. This reduces to two rooms and a hatch, so it was rejected.
9. **Airlock or vending machine.** A sealed exchange chamber. It is still a wall with a slot, so it was rejected.
10. **Passport control.** Findings get a stamp and the file is turned back at the border. It is a border, which is a wall again, so the strongest part (the stamp) was kept and moved into idea 1.
11. **Charades or sign language.** One partner can see and the other can speak. Too abstract to read quickly.
12. **Puppet and puppeteer.** The puppeteer can't be seen and the puppet can't see. It doesn't explain the message.
13. **Redaction.** The panel receives the file as a fully blacked-out page except for the score. This was merged into idea 4 as the panel's hatched blind spot.
14. **Two-key safe.** Each half holds one capability and neither can open the safe alone. It suggests the halves co-operate on access, which is wrong.

## The four chosen concepts and how each differs from the old seven

| # | File | Idea | Why it's structurally new |
|---|---|---|---|
| A1 | `architecture-unique-A1.html` | **Try to cheat**: four tap-to-try move tiles that stamp BLOCKED or ALLOWED, plus Show all, Reset and an "n of 4 tried" counter | The viewer *attempts* the forbidden actions and the constraint is the outcome. There are no sides, no wall and no table, and each tile is one action, not a capability list. |
| A2 | `architecture-unique-A2.html` | **Undelivered texts**: a single chat thread with three struck, "Not delivered" bubbles and one delivered `ANALYSIS_COMPLETE` card (file: *not attached*). Replay is optional. | It borrows a phone chat, an interface everyone has used. The two halves are speakers in one conversation, not places on a map. "Not delivered" is familiar to everyone. |
| A3 | `architecture-unique-A3.html` | **Red-pen statements**: four oversized sentences. Three get a red strike drawn through them and the fourth survives with an accent highlighter. Each line has a one-line margin note. | It is pure typography with no boxes, arrows or icons. The constraint is told by what has been *crossed out*. |
| A4 | `architecture-unique-A4.html` | **Two blind spots**: a before/after compare slider over one frame. The engine's side shows the file as layer data (no pixels) and an empty "[ no screen ]". The panel's side shows a drawn score, but the file is a hatched "Not visible to the panel". The `ANALYSIS_COMPLETE` chip rides the handle. | It is a single shared surface with two *perceptions* of the same thing, not two rooms. Dragging lets you feel each half's blindness. Both views are visible at 50% by default, so the drag is optional. |

## Measured heights (`#block`, kicker → footnote, headless Chrome, page in an iframe sized to the viewport)

| | 1440×900 | 1024×768 | 375×812 | 320 (info) | Budget | `scrollWidth == innerWidth` |
|---|---|---|---|---|---|---|
| A1 | 427 | 419 | 544 | 619 | 640 / 560 ✓ | ✓ |
| A2 | 467 | 467 | 550 | 726 | ✓ | ✓ |
| A3 | 513 | 463 | 513 | 621 | ✓ | ✓ |
| A4 | 529 | 521 | 555 | 579 | ✓ | ✓ |

- **Fixed height.** A1 was measured with all answers revealed and gave the same numbers. A1's results are already laid out and only become visible when revealed. A2 and A3 replay only opacity, transform or background-size. A4 moves only a clip-path.
- **First-pass overruns that were fixed.** A1 was 602 on mobile. A2 was 787, then 630, then 569. A4 was 577. The cuts were shorter mobile leads and feet, A2's speaker labels moved into the header ("Engine left · Panel right"), the A2 card rows put two per line, and A4's handle chip moved to the bottom edge, where it flips side so it never clips.
- **320px is outside the budget.** A2 grows to 726 there. If 320 matters, hide the third (network) bubble below 360px.

## Copy honesty (all files)
- `ANALYSIS_COMPLETE` is the only real name. A2 and A4 label their bubbles, layer data, score and bars as illustrative or sample.
- The "no internet" or "upload blocked" claim always carries an asterisk and the hedge "manifest `networkAccess`, not yet verified".
- **"Your file travels to the panel" (A3) and "not attached" (A2) are presented as *by design*, not as a Figma restriction.** The engine *could* technically postMessage serialized node data, so A3 says "By design, only findings leave the engine".
- **A2's chat is metaphorical.** Its "Show me the file?" and "Draw it myself" bubbles show impossible requests, not real `postMessage` traffic. The run-request message (whose name is a placeholder) is deliberately left out to keep the "one message" story.

## Recommendation
**Ship A4 (two blind spots)** if the page needs one memorable visual. It is the only concept where a non-engineer *sees* both blindnesses at once without reading: data with no picture next to a picture with no data, with the message as the seam. The drag is optional because the default 50% state already tells the story.

**Ship A1 (try to cheat)** if you want the most playful and shortest option (427 / 544). Its one-tap stamps are the fastest "aha", and the BLOCKED* tile is a natural place for the network hedge.

**A3 is the cheapest port.** It is static text plus one CSS background transition, and it works well for a typographically led case study. **A2 is the warmest**, but its chat metaphor needs the most caveats (the bubbles are imaginary requests).

**Porting notes.** Each concept maps to existing site tokens (`bg-void-2`, `text-pearl`, `text-fog`, `accent-primary`). A1 and A4 need `"use client"` with one `useState` each. A3 can be a server component, with replay done as a CSS class toggle, or dropped entirely.

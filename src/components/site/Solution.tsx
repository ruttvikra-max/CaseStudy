"use client";

import type { ReactNode } from "react";
import RawFolder from "@/components/Folder";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ArchitectureFlow from "./ArchitectureFlow";

// the .jsx Folder types items as never[] — give it a usable signature
const Folder = RawFolder as React.ComponentType<{
  color?: string;
  size?: number;
  items?: ReactNode[];
  className?: string;
}>;

const FLOW = [
  { step: "Ingest", body: "Connect to a Figma file and its linked design system — establishing the source of truth for the pipeline." },
  { step: "Scan", body: "Traverse the full component tree, token usage, and naming patterns across every layer in the file." },
  { step: "Detect", body: "Flag detached instances, token drift, component overrides, and naming violations throughout the design." },
  { step: "Report", body: "Output a structured UI blueprint and a compliance score. Analysis only — no automation, no generation." },
];

const SCREENS = [
  { label: "Plugin panel", note: "Run analysis · live in dev" },
  { label: "Drift score + grade", note: "Results modal" },
  { label: "UI Blueprint", note: "Architecture map" },
  { label: "Compliance report", note: "Ranked violations" },
];

// Folder "papers" — the engine's deliverables
const outputPapers = [
  <div key="b" className="flex h-full w-full flex-col justify-center p-2 text-center">
    <span className="text-[8px] font-semibold text-neutral-800">UI Blueprint</span>
    <span className="mt-0.5 text-[6px] text-neutral-500">component map</span>
  </div>,
  <div key="r" className="flex h-full w-full flex-col justify-center p-2 text-center">
    <span className="text-[8px] font-semibold text-neutral-800">Drift Report</span>
    <span className="mt-0.5 text-[6px] text-neutral-500">ranked issues</span>
  </div>,
  <div key="s" className="flex h-full w-full flex-col justify-center p-2 text-center">
    <span className="text-[8px] font-semibold text-neutral-800">Health Score</span>
    <span className="mt-0.5 text-[6px] text-neutral-500">grade A–F</span>
  </div>,
];

export default function Solution() {
  return (
    <section
      id="solution"
      className="relative border-t border-ink/5 bg-void-1 py-28 sm:py-36"
    >
      <div className="wrap">
        <SectionHeader
          index="06"
          chapter="The Solution"
          title="Built to govern design."
          lead="A Figma-based engine that detects, measures, and reports on design-system health — pure analysis, no automation."
        />

        <ArchitectureFlow />

        {/* Ingest -> Scan -> Detect -> Report */}
        <div className="mt-24">
          <Reveal className="kicker mb-8 text-fog/65">How it works</Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f, i) => (
              <Reveal key={f.step} delay={i * 80} className="bg-void-1 p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-accent-primary/70">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl text-pearl">{f.step}</h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-fog/75">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* outputs (Folder) + screens placeholders */}
        <div className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Reveal className="kicker mb-3 text-fog/65">Two deliverables</Reveal>
            <Reveal
              as="h3"
              delay={60}
              className="font-display text-[clamp(24px,3vw,38px)] font-normal leading-tight tracking-[-0.01em] text-pearl"
            >
              Drift becomes something teams can act on.
            </Reveal>
            <Reveal delay={120} className="mt-5 max-w-[62ch] text-fog/75">
              A <span className="text-pearl">UI Blueprint</span> maps every
              component against the system; a{" "}
              <span className="text-pearl">Compliance &amp; Drift Report</span>{" "}
              ranks each violation by severity. Open the folder.
            </Reveal>
            <Reveal delay={180} className="mt-10 w-fit pl-6">
              <Folder color="#FF8A1E" size={1.3} items={outputPapers} />
            </Reveal>
          </div>

          {/* plugin screen placeholders */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {SCREENS.map((s) => (
                <div
                  key={s.label}
                  className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-dashed border-ink/15 bg-void-2/60 p-4 text-center"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-fog/65">
                    Screen
                  </span>
                  <span className="mt-2 text-base text-pearl/80">{s.label}</span>
                  <span className="mt-1 text-sm text-fog/65">{s.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-fog/65">
              Real plugin screens drop in here — development in progress.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

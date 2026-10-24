"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "./Reveal";

// TODO(placeholder): step copy, the "run request" label and the technical
// notes below were drafted from the concept, not read from code.ts. Replace
// with the real postMessage type names (only ANALYSIS_COMPLETE is confirmed)
// and re-check the privacy line in WHY against the plugin manifest
// (networkAccess.allowedDomains).
type Step = {
  who: string;
  text: ReactNode;
  place: string; // desktop column placement
  label?: string; // message crossing the wall
  tech?: string;
};

const STEPS: Step[] = [
  {
    who: "You",
    place: "lg:col-start-1",
    text: <>You press <b className="font-medium text-pearl">Run analysis</b> in the plugin panel.</>,
  },
  {
    who: "Panel → Engine",
    place: "lg:col-span-2 lg:col-start-2",
    label: "postMessage · run request", // TODO(placeholder)
    text: <>The panel can&rsquo;t read the file, so it asks the engine to.</>,
  },
  {
    who: "Engine",
    place: "lg:col-start-3",
    tech: "figma.* scene API — traversal",
    text: <>Walks every frame, instance and token in the file.</>,
  },
  {
    who: "Engine",
    place: "lg:col-start-3",
    tech: "deterministic scoring, no network",
    text: <>Checks the four pillars and computes the drift score. Same file, same score.</>,
  },
  {
    who: "Engine → Panel",
    place: "lg:col-span-2 lg:col-start-2",
    label: "ANALYSIS_COMPLETE",
    text: <>Sends back <b className="font-medium text-pearl">the findings — never the file itself.</b></>,
  },
  {
    who: "Panel → You",
    place: "lg:col-span-2 lg:col-start-1",
    tech: "React renders from the message alone",
    text: <>Draws the score, the pillars and each issue, screen by screen.</>,
  },
];

const LANES = [
  { name: "You", tech: "", note: <>The designer, inside Figma.</>, dot: "bg-fog" },
  {
    name: "The panel",
    tech: "UI iframe · React",
    note: <>Can draw anything. <b className="font-medium text-pearl">Can&rsquo;t see your file.</b></>,
    dot: "border-2 border-accent-primary",
  },
  {
    name: "The engine",
    tech: "Plugin sandbox · code.ts",
    note: <>Reads every layer. <b className="font-medium text-pearl">No screen, no internet.</b></>,
    dot: "bg-accent-primary",
  },
];

const btn =
  "min-h-11 whitespace-nowrap rounded-full border border-ink/15 bg-void-1 px-5 text-[15px] text-pearl transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary";

export default function ArchitectureFlow() {
  const [active, setActive] = useState<number | null>(null); // null = show all
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const last = STEPS.length - 1;

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  };
  useEffect(() => stop, []);

  const next = () => {
    stop();
    setActive((a) => (a === null || a >= last ? 0 : a + 1));
  };
  const showAll = () => {
    stop();
    setActive(null);
  };
  const play = () => {
    if (playing) return stop();
    // reduced motion: no autoplay, advance one step per press
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return next();
    setActive(0);
    setPlaying(true);
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a === null || a >= last) {
          stop();
          return null;
        }
        return a + 1;
      });
    }, 2200);
  };

  return (
    <div className="mt-16">
      <Reveal className="kicker mb-3 text-fog/65">The architecture constraint</Reveal>
      <Reveal
        as="h3"
        delay={60}
        className="max-w-3xl font-display text-[clamp(26px,3.2vw,40px)] font-normal leading-tight tracking-[-0.01em] text-pearl"
      >
        The part that reads your file can&rsquo;t draw. The part that draws can&rsquo;t read.
      </Reveal>
      <Reveal delay={120} className="mt-5 max-w-[62ch] text-fog">
        Figma runs every plugin as two separate programs. Follow one analysis
        from click to score — your file only ever lives with the engine, and{" "}
        <b className="font-medium text-pearl">a single message</b> is all that
        crosses back.
      </Reveal>

      <Reveal delay={160} className="mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-void-2">
        {/* lanes */}
        <div className="grid border-b border-ink/10 lg:grid-cols-3">
          {LANES.map((l) => (
            <div key={l.name} className="border-t border-ink/10 px-6 py-5 first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0">
              <h4 className="flex items-center gap-2.5 font-sans text-xl font-medium text-pearl">
                <span className={`h-3 w-3 shrink-0 rounded-full ${l.dot}`} aria-hidden="true" />
                {l.name}
              </h4>
              {l.tech && (
                <div className="mt-1 font-mono text-sm text-accent-primary">{l.tech}</div>
              )}
              <p className="mt-2 text-fog/80">{l.note}</p>
            </div>
          ))}
        </div>

        {/* steps */}
        <ol className="relative py-2">
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px bg-ink/10 lg:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px bg-ink/10 lg:block" />
          {STEPS.map((s, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            return (
              <li key={i} className="grid px-4 py-2 lg:grid-cols-3 lg:px-0">
                <div
                  className={`rounded-xl border p-4 transition-[opacity,background-color,border-color] duration-200 motion-reduce:transition-none lg:mx-4 ${s.place} ${
                    on
                      ? "border-accent-primary bg-accent-soft"
                      : s.label
                        ? "border-dashed border-accent-primary/50 bg-void-1"
                        : "border-ink/10 bg-void-1"
                  } ${dim ? "opacity-60" : ""}`}
                >
                  <span className="font-mono text-sm text-accent-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ml-2 font-mono text-xs uppercase tracking-wider text-fog">
                    {s.who}
                  </span>
                  <p className="mt-1 text-fog">{s.text}</p>
                  {s.label && (
                    <span className="mt-2 inline-block break-all rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-sm text-accent-primary">
                      {s.label}
                    </span>
                  )}
                  {s.tech && (
                    <span className="mt-1.5 block font-mono text-sm text-fog/80">{s.tech}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* controls */}
        <div className="flex flex-wrap items-center gap-2 border-t border-ink/10 px-6 py-4">
          <button type="button" onClick={play} className={`${btn} !border-accent-primary !bg-accent-primary font-medium !text-void-1`}>
            {playing ? "❚❚ Pause" : "▶ Play the flow"}
          </button>
          <button type="button" onClick={next} className={btn}>Next step</button>
          <button type="button" onClick={showAll} className={btn}>Show all</button>
          <span className="w-full text-[15px] text-fog sm:ml-auto sm:w-auto" aria-live="polite">
            {active === null
              ? `All ${STEPS.length} steps shown`
              : `Step ${active + 1} of ${STEPS.length}`}
          </span>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-10 max-w-[62ch]">
        <div className="kicker mb-3 text-fog/65">Why that shaped the design</div>
        {/* TODO(placeholder): verify the manifest claim (networkAccess.allowedDomains = ["none"]) */}
        <p className="text-fog">
          Because the two sides can only talk in messages, the engine and the
          interface became{" "}
          <b className="font-medium text-pearl">independent systems with one contract</b>.
          Your design data never crosses into the panel, network access is
          switched off in the plugin manifest, and the engine — with no screen
          to manage — only measures. That&rsquo;s what keeps the score private
          and repeatable.
        </p>
      </Reveal>
    </div>
  );
}

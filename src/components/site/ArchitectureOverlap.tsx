import Reveal from "./Reveal";

// TODO(placeholder): copy drafted from concept B1. Only ANALYSIS_COMPLETE is a
// real message name. The "offline" footnote is unverified — check the plugin
// manifest (networkAccess.allowedDomains) before dropping the asterisk.
export default function ArchitectureOverlap() {
  return (
    <div className="mt-16">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_600px] lg:gap-10">
        <div>
          <Reveal className="kicker mb-3 text-fog/65">The architecture constraint</Reveal>
          <Reveal
            as="h3"
            delay={60}
            className="max-w-[24ch] font-display text-[clamp(26px,3.2vw,40px)] font-normal leading-tight tracking-[-0.01em] text-pearl"
          >
            Figma splits every plugin in two. They share exactly one thing.
          </Reveal>
          <Reveal delay={120} className="mt-4 max-w-[46ch] text-fog">
            One half reads, one draws.{" "}
            <b className="font-medium text-pearl">Only the findings overlap</b>, so
            your file stays put and scores the same every time.
          </Reveal>
          <Reveal delay={160} className="mt-3 max-w-[62ch] text-sm text-fog/65">
            *&ldquo;Offline&rdquo; assumes the plugin manifest&rsquo;s{" "}
            <span className="font-mono">allowedDomains</span> blocks the network.
          </Reveal>
        </div>

        <Reveal delay={140}>
          <figure
            className="venn"
            role="img"
            aria-label="Venn diagram. Circle one, the engine: reads every layer, no screen. Circle two, the panel: draws the score, can't see your file. The only overlap is one message, ANALYSIS_COMPLETE, carrying findings, never the file."
          >
            <span className="venn-set venn-eng" />
            <span className="venn-set venn-pan" />
            <span className="venn-t venn-e">
              <span className="venn-n">The engine</span>
              <span className="venn-s">reads every layer</span>
              <span className="venn-s">no screen, offline*</span>
              <span className="venn-k">code.ts</span>
            </span>
            <span className="venn-t venn-m">
              <span className="venn-msg">ANALYSIS_COMPLETE</span>
              <span className="venn-s venn-s2">findings, never the file</span>
            </span>
            <span className="venn-t venn-p">
              <span className="venn-n">The panel</span>
              <span className="venn-s">draws the score</span>
              <span className="venn-s">can&rsquo;t see your file</span>
              <span className="venn-k">UI iframe · React</span>
            </span>
            <span className="venn-side">all they share</span>
            <span className="venn-uni">FIGMA</span>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}

import { lazy, Suspense } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { HERO_STATS } from "../data";
import { CountUp } from "./ui";

const HeroScene = lazy(() => import("./Scene"));

export function Hero({ onCompare }: { onCompare: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-aurora hero-aurora-a" />
        <div className="hero-aurora hero-aurora-b" />
      </div>

      <Suspense fallback={<div className="hero-scene scene-loading" aria-hidden="true"><div className="scene-skeleton" /></div>}>
        <HeroScene />
      </Suspense>

      <div className="container hero-content">
        <div className="hero-copy">
          <div className="hero-eyebrow reveal is-visible">
            <span className="live-pill">
              <span className="live-dot" />
              LIVE SNAPSHOT
            </span>
            <span className="mono">Q4 2026 · OCT 21</span>
          </div>

          <h1 className="hero-title">
            <span>Every model.</span>
            <span>Every lab.</span>
            <span className="serif-accent">One signal.</span>
          </h1>

          <p className="hero-sub">
            The frontier, decoded. Benchmarks, capital, pricing and momentum for the
            companies building artificial intelligence — read as one connected system.
          </p>

          <div className="hero-actions">
            <a href="#standings" className="button button-lime">
              Explore the standings
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <button className="button button-ghost" onClick={onCompare}>
              Compare models
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>

          <p className="hero-source mono">
            INDEPENDENT RESEARCH DEMO · PUBLIC DISCLOSURES + 8 INDEPENDENT SOURCES
          </p>
        </div>

      </div>

      <div className="container hero-bottom">
        <div className="hero-stats">
          {HERO_STATS.map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <div className="hero-stat-value mono">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                />
              </div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        <a href="#standings" className="scroll-cue" aria-label="Scroll to the leaderboard">
          <span className="mono">SCROLL</span>
          <span className="scroll-cue-line">
            <ArrowDown size={13} />
          </span>
        </a>
      </div>
    </section>
  );
}

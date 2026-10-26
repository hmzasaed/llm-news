import { useMemo, useState, type CSSProperties } from "react";
import { ArrowUpRight, Building2 } from "lucide-react";
import { LABS, MODELS, type Lab } from "../data";
import { Reveal, SectionHeader, SocialLinks, Tilt } from "./ui";

const FILTERS = ["All labs", "Frontier labs", "Hyperscalers", "Open-weight"];

export function Labs({ onSelectLab }: { onSelectLab: (id: string) => void }) {
  const [filter, setFilter] = useState("All labs");
  const labs = useMemo(() => {
    if (filter === "Frontier labs") return LABS.filter((lab) => lab.tier === "Frontier lab");
    if (filter === "Hyperscalers") return LABS.filter((lab) => lab.tier === "Hyperscaler");
    if (filter === "Open-weight") {
      return LABS.filter((lab) => lab.tier === "Open-weight challenger");
    }
    return LABS;
  }, [filter]);

  return (
    <section className="section section-labs" id="labs">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Labs & capital"
          title={
            <>
              Follow the <span className="serif-accent">money.</span>
            </>
          }
          description="Every frontier is a balance sheet in motion. Open a lab dossier for revenue mix, funding history, strategic backers, and the risks behind the mark."
          actions={
            <a className="button button-ghost button-small" href="#economy">
              Market economics <ArrowUpRight size={14} />
            </a>
          }
        />

        <Reveal className="labs-topline">
          <div className="labs-filter">
            {FILTERS.map((item) => (
              <button
                key={item}
                className={`filter-chip ${filter === item ? "is-active" : ""}`}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="concentration">
            <span className="concentration-value mono">90.2%</span>
            <span>
              of 2026 lab equity went to OpenAI and Anthropic
            </span>
          </div>
        </Reveal>

        <div className="lab-grid">
          {labs.map((lab, index) => (
            <Reveal key={lab.id} delay={Math.min(index * 45, 360)}>
              <LabCard lab={lab} onSelect={() => onSelectLab(lab.id)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LabCard({ lab, onSelect }: { lab: Lab; onSelect: () => void }) {
  const modelCount = MODELS.filter((model) => model.labId === lab.id).length;
  const bestModel = [...MODELS]
    .filter((model) => model.labId === lab.id)
    .sort((a, b) => b.score - a.score)[0];

  return (
    <Tilt className="lab-tilt">
      <article className="lab-card" style={{ "--accent": lab.color } as CSSProperties}>
        <div className="lab-card-watermark" aria-hidden="true">
          {lab.monogram}
        </div>
        <div className="lab-card-top">
          <div className="lab-identity">
            <span className="lab-monogram" style={{ color: lab.color, borderColor: `${lab.color}44` }}>
              {lab.monogram}
            </span>
            <span className="lab-tier mono">{lab.tier}</span>
          </div>
          <SocialLinks lab={lab} compact />
        </div>

        <div className="lab-heading">
          <h3>
            <button onClick={onSelect}>{lab.name}</button>
          </h3>
          <p>{lab.tagline}</p>
        </div>

        <div className="lab-metrics">
          <div>
            <span className="mono">VALUATION</span>
            <strong>{lab.valuation}</strong>
            <small>{lab.valuationNote}</small>
          </div>
          <div>
            <span className="mono">{lab.arr ? "ANNUALIZED REVENUE" : "REVENUE SIGNAL"}</span>
            <strong>{lab.revenue}</strong>
            <small>{lab.revenueNote}</small>
          </div>
        </div>

        <div className="lab-mix-mini">
          <div className="mono lab-mix-label">
            {lab.revenueMix[0]?.label} <span>{lab.revenueMix[0]?.value}%</span>
          </div>
          <div className="lab-mix-track">
            {lab.revenueMix.map((segment, index) => {
              const colors = ["var(--lime)", "var(--cyan)", "var(--violet)", "var(--orange)", "#718096"];
              return (
                <span
                  key={segment.label}
                  style={{
                    width: `${segment.value}%`,
                    background: colors[index % colors.length],
                  }}
                  title={`${segment.label}: ${segment.value}%`}
                />
              );
            })}
          </div>
          <div className="lab-mix-legend">
            {lab.revenueMix.slice(0, 3).map((segment) => (
              <span key={segment.label}>{segment.label}</span>
            ))}
          </div>
        </div>

        <div className="lab-card-footer">
          <div className="lab-footer-meta">
            <span className="mono">{String(modelCount).padStart(2, "0")} MODELS</span>
            {bestModel ? (
              <span className="lab-best">
                <span style={{ background: lab.color }} />
                Top: {bestModel.name}
              </span>
            ) : (
              <span className="lab-best">Private</span>
            )}
          </div>
          <button className="card-open" onClick={onSelect}>
            Dossier <ArrowUpRight size={13} />
          </button>
        </div>
        <div className="lab-hq">
          <Building2 size={12} />
          {lab.hq}
        </div>
      </article>
    </Tilt>
  );
}

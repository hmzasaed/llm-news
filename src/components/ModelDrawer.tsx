import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  Gauge,
  Plus,
  X,
} from "lucide-react";
import {
  BENCHMARKS,
  blendPrice,
  formatContext,
  formatDate,
  getLab,
  getModel,
} from "../data";
import { RadarChart } from "./Charts";
import { Badge, ExternalLink, SocialLinks } from "./ui";
import { OverlayFrame } from "./Overlay";

export function ModelDrawer({
  open,
  modelId,
  selected,
  onClose,
  onSelectLab,
  onToggleCompare,
  onOpenCompare,
}: {
  open: boolean;
  modelId: string | null;
  selected: boolean;
  onClose: () => void;
  onSelectLab: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenCompare: () => void;
}) {
  const model = getModel(modelId ?? "claude-opus-5-5");
  const lab = getLab(model.labId);
  const metrics = BENCHMARKS.map((benchmark) => ({
    ...benchmark,
    value: model.benchmarks[benchmark.key],
  }));

  return (
    <OverlayFrame open={open} onClose={onClose} label={`${model.name} dossier`} className="drawer-panel">
      <div className="drawer-head">
        <span className="mono drawer-kicker">MODEL DOSSIER / {lab.short.toUpperCase()}</span>
        <button className="icon-button" onClick={onClose} aria-label="Close dossier">
          <X size={18} />
        </button>
      </div>

      <div className="drawer-scroll">
        <div className="drawer-identity" style={{ "--accent": lab.color } as CSSProperties}>
          <div className="drawer-identity-top">
            <span className="lab-marker">
              <span className="lab-marker-dot" style={{ background: lab.color }} />
              {lab.name}
            </span>
            <Badge tone={model.license === "Open weights" ? "cyan" : "neutral"}>
              {model.license}
            </Badge>
          </div>
          <h2>{model.name}</h2>
          <p className="drawer-summary">{model.summary}</p>
          <div className="tag-row">
            {model.tags.map((tag) => (
              <span className="mini-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="drawer-scoreboard">
          <div className="drawer-score">
            <span className="mono">LATTICE INDEX</span>
            <strong className="mono">{model.score.toFixed(1)}</strong>
            <span className="drawer-score-rank">Top {Math.max(1, Math.round((1 - model.score / 100) * 22))}% of the atlas</span>
            <div className="drawer-price mini-metric-value mono">
              ${model.input.toFixed(2)} in / ${model.output.toFixed(2)} out
            </div>
          </div>
          <div className="drawer-radar">
            <RadarChart model={model} color={lab.color} />
          </div>
        </div>

        <div className="drawer-section">
          <div className="drawer-section-head">
            <span className="mono">BENCHMARK PROFILE</span>
            <span className="mono evidence-note">
              {model.evidence.toUpperCase()} · {formatDate(model.released)}
            </span>
          </div>
          <div className="benchmark-list">
            {metrics.map((metric) => (
              <div className="benchmark-row" key={metric.key}>
                <div className="benchmark-label">
                  <span>{metric.label}</span>
                  <span className="mono">{metric.short}</span>
                </div>
                <div className="benchmark-track">
                  <span style={{ width: `${metric.value}%`, background: lab.color }} />
                </div>
                <span className="benchmark-value mono">{metric.value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="drawer-facts">
          <Fact icon={<Cpu size={13} />} label="PARAMETERS" value={model.params} />
          <Fact icon={<Gauge size={13} />} label="SPEED" value={`${model.speed} tok/s`} />
          <Fact label="CONTEXT" value={formatContext(model.context)} />
          <Fact label="CACHED INPUT" value={model.cached ? `$${model.cached.toFixed(2)}` : "—"} />
          <Fact label="BLENDED PRICE" value={`$${blendPrice(model).toFixed(2)}/1M`} />
          <Fact label="ARENA ELO" value={model.benchmarks.arena.toFixed(0)} />
        </div>

        <div className="drawer-callout">
          <span className="mono">BEST FOR</span>
          <p>{model.bestFor}</p>
        </div>

        <div className="drawer-section">
          <div className="drawer-section-head">
            <span className="mono">WHY IT WINS</span>
          </div>
          <ul className="strength-list">
            {model.strengths.map((strength) => (
              <li key={strength}>
                <span>
                  <Check size={12} />
                </span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="drawer-actions">
          <button
            className={`button ${selected ? "button-ghost" : "button-lime"}`}
            onClick={() => onToggleCompare(model.id)}
          >
            {selected ? <Check size={15} /> : <Plus size={15} />}
            {selected ? "In comparison" : "Add to comparison"}
          </button>
          <button className="button button-ghost" onClick={onOpenCompare}>
            Compare now <ArrowRight size={14} />
          </button>
        </div>

        <div className="drawer-lab">
          <div className="drawer-lab-top">
            <div>
              <span className="mono">THE LAB</span>
              <h3>{lab.name}</h3>
            </div>
            <SocialLinks lab={lab} compact />
          </div>
          <p>{lab.tagline}</p>
          <div className="drawer-lab-actions">
            <button className="text-link" onClick={() => onSelectLab(lab.id)}>
              Open lab dossier <ArrowUpRight size={12} />
            </button>
            <ExternalLink href={lab.website}>Website</ExternalLink>
          </div>
        </div>

        <p className="drawer-disclaimer mono">
          Benchmark scores are an illustrative composite from public leaderboards. Pricing
          is API list price in USD. Verify before procurement.
        </p>
      </div>
    </OverlayFrame>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="fact">
      <span className="mono">
        {icon}
        {label}
      </span>
      <strong className="mono">{value}</strong>
    </div>
  );
}

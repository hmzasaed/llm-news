import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  blendPrice,
  formatContext,
  getLab,
  MODELS,
  type Model,
} from "../data";
import { Badge, Reveal, SectionHeader, Tilt } from "./ui";

const FILTERS = ["All", "Proprietary", "Open weights", "Under $1/M", "1M context", "Vision"];

type Sort = "index" | "value" | "price" | "context";

export function ModelExplorer({
  onSelectModel,
  compareIds,
  onToggleCompare,
  onOpenCompare,
}: {
  onSelectModel: (id: string) => void;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
  onOpenCompare: () => void;
}) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("index");

  const models = useMemo(() => {
    const matches = MODELS.filter((model) => {
      const lab = getLab(model.labId);
      const haystack = `${model.name} ${lab.name} ${model.tags.join(" ")}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;
      if (filter === "Proprietary" && model.license !== "Proprietary") return false;
      if (filter === "Open weights" && model.license !== "Open weights") return false;
      if (filter === "Under $1/M" && blendPrice(model) >= 1) return false;
      if (filter === "1M context" && model.context < 1000000) return false;
      if (filter === "Vision" && !model.tags.includes("Vision")) return false;
      return true;
    });
    return matches.sort((a, b) => {
      if (sort === "value") return b.score / blendPrice(b) - a.score / blendPrice(a);
      if (sort === "price") return blendPrice(a) - blendPrice(b);
      if (sort === "context") return b.context - a.context;
      return b.score - a.score;
    });
  }, [filter, query, sort]);

  const rankById = useMemo(() => {
    const ranked = [...MODELS].sort((a, b) => b.score - a.score);
    return new Map(ranked.map((model, index) => [model.id, index + 1]));
  }, []);

  return (
    <section className="section section-models" id="models">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Model atlas"
          title={
            <>
              The map is not <span className="serif-accent">the territory.</span>
            </>
          }
          description="Twenty models, one consistent profile. Open any dossier for benchmark shape, unit economics and the cases where it beats its rank."
          actions={
            <button className="button button-ghost button-small" onClick={onOpenCompare}>
              Side-by-side compare
              <ArrowUpRight size={14} />
            </button>
          }
        />

        <Reveal className="explorer-toolbar">
          <div className="filter-row">
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
          <div className="toolbar-controls">
            <label className="search-field">
              <Search size={15} aria-hidden="true" />
              <span className="sr-only">Search models</span>
              <input
                type="search"
                placeholder="Search models or labs"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <label className="select-field">
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span className="sr-only">Sort models</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
                <option value="index">Highest index</option>
                <option value="value">Best value</option>
                <option value="price">Lowest price</option>
                <option value="context">Largest context</option>
              </select>
              <ChevronDown size={13} aria-hidden="true" />
            </label>
          </div>
        </Reveal>

        <div className="explorer-meta">
          <span className="mono">
            {String(models.length).padStart(2, "0")} MODELS / SHOWING {filter.toUpperCase()}
          </span>
          {compareIds.length > 0 ? (
            <button className="compare-inline" onClick={onOpenCompare}>
              {compareIds.length} selected · compare now
            </button>
          ) : (
            <span className="explorer-hint">Add up to 4 models to compare</span>
          )}
        </div>

        {models.length === 0 ? (
          <div className="empty-state">
            <span className="mono">NO MATCH</span>
            <p>No model fits that query. Reset the filters to see the whole atlas.</p>
            <button
              className="button button-ghost button-small"
              onClick={() => {
                setFilter("All");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="model-grid">
            {models.map((model, index) => (
              <Reveal key={model.id} delay={Math.min(index * 35, 280)}>
                <ModelCard
                  model={model}
                  rank={rankById.get(model.id) ?? 0}
                  selected={compareIds.includes(model.id)}
                  onSelect={() => onSelectModel(model.id)}
                  onToggle={() => onToggleCompare(model.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ModelCard({
  model,
  rank,
  selected,
  onSelect,
  onToggle,
}: {
  model: Model;
  rank: number;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  const lab = getLab(model.labId);
  const metrics = [
    { label: "Knowledge", value: model.benchmarks.gpqa },
    { label: "Coding", value: model.benchmarks.swe },
    { label: "Agents", value: model.benchmarks.terminal },
  ];

  return (
    <Tilt className="model-tilt">
      <article className="model-card" style={{ "--accent": lab.color } as CSSProperties}>
        <div className="card-glow" aria-hidden="true" />
        <div className="model-card-top">
          <span className="rank-chip mono">#{String(rank).padStart(2, "0")}</span>
          <Badge tone={model.license === "Open weights" ? "cyan" : "neutral"}>
            {model.license}
          </Badge>
          <button
            className={`compare-add ${selected ? "is-selected" : ""}`}
            onClick={onToggle}
            aria-pressed={selected}
            aria-label={selected ? `Remove ${model.name} from comparison` : `Add ${model.name} to comparison`}
            title={selected ? "Remove from compare" : "Add to compare"}
          >
            {selected ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>

        <div className="model-card-heading">
          <span className="lab-marker">
            <span className="lab-marker-dot" style={{ background: lab.color }} />
            {lab.short}
          </span>
          <h3>
            <button className="model-title-button" onClick={onSelect}>
              {model.name}
            </button>
          </h3>
          <p>{model.summary}</p>
        </div>

        <div className="model-score-row">
          <div className="model-score mono">
            {model.score.toFixed(1)}
            <span>INDEX</span>
          </div>
          <div className="model-benchmarks">
            {metrics.map((metric) => (
              <div key={metric.label} className="mini-metric">
                <span className="mini-metric-label mono">{metric.label}</span>
                <span className="mini-metric-track">
                  <span
                    style={{
                      width: `${Math.max(4, metric.value)}%`,
                      background: metric.label === "Knowledge" ? lab.color : metric.label === "Coding" ? "var(--cyan)" : "var(--violet)",
                    }}
                  />
                </span>
                <span className="mini-metric-value mono">{metric.value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="model-specs">
          <div>
            <span className="mono">PRICE / 1M</span>
            <strong className="mono">
              ${model.input.toFixed(2)}<small> / ${model.output.toFixed(2)}</small>
            </strong>
          </div>
          <div>
            <span className="mono">CONTEXT</span>
            <strong className="mono">{formatContext(model.context)}</strong>
          </div>
          <div>
            <span className="mono">SPEED</span>
            <strong className="mono">{model.speed} <small>tok/s</small></strong>
          </div>
        </div>

        <div className="model-bestfor">
          <span className="mono">BEST FOR</span>
          <p>{model.bestFor}</p>
        </div>

        <div className="model-card-footer">
          <div className="tag-row">
            {model.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="mini-tag">
                {tag}
              </span>
            ))}
          </div>
          <button className="card-open" onClick={onSelect}>
            Dossier <ArrowUpRight size={13} />
          </button>
        </div>
      </article>
    </Tilt>
  );
}

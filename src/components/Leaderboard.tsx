import { useMemo, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  blendPrice,
  formatContext,
  getLab,
  MODELS,
  type Model,
} from "../data";
import { Badge, MicroBars, Reveal, SectionHeader } from "./ui";

type View = "index" | "reasoning" | "coding" | "agents" | "value";

const VIEWS: { id: View; label: string; metric: string; note: string }[] = [
  { id: "index", label: "Composite", metric: "Lattice Index", note: "Blended across five capability families" },
  { id: "reasoning", label: "Reasoning", metric: "GPQA Diamond", note: "Graduate-level science questions" },
  { id: "coding", label: "Coding", metric: "SWE / DeepSWE", note: "Real-world software issue resolution" },
  { id: "agents", label: "Agents", metric: "Terminal-Bench 4.0", note: "Long-horizon terminal work" },
  { id: "value", label: "Value", metric: "Index per $/1M", note: "Capability relative to blended token price" },
];

function metric(model: Model, view: View): number {
  if (view === "reasoning") return model.benchmarks.gpqa;
  if (view === "coding") return model.benchmarks.swe;
  if (view === "agents") return model.benchmarks.terminal;
  if (view === "value") return model.score / Math.max(blendPrice(model), 0.05);
  return model.score;
}

export function Leaderboard({ onSelectModel }: { onSelectModel: (id: string) => void }) {
  const [view, setView] = useState<View>("index");
  const ranked = useMemo(
    () => [...MODELS].sort((a, b) => metric(b, view) - metric(a, view)),
    [view],
  );
  const visible = ranked.slice(0, 10);
  const activeView = VIEWS.find((item) => item.id === view) ?? VIEWS[0];
  const top = [...MODELS].sort((a, b) => b.score - a.score)[0];
  const valueTop = [...MODELS].sort(
    (a, b) => b.score / blendPrice(b) - a.score / blendPrice(a),
  )[0];
  const openTop = MODELS.filter((model) => model.license === "Open weights").sort(
    (a, b) => b.score - a.score,
  )[0];

  return (
    <section className="section section-standings" id="standings">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="The standings"
          title={
            <>
              One arena. <span className="serif-accent">Every frontier.</span>
            </>
          }
          description="A composite reading of capability, cross-checked against independent boards. Sort by the dimension that matters to your workload — or by what it costs."
          actions={
            <a className="button button-ghost button-small" href="#models">
              All 20 models <ArrowUpRight size={14} />
            </a>
          }
        />

        <div className="tabs-row">
          <div className="tabs" role="tablist" aria-label="Ranking dimension">
            {VIEWS.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={view === item.id}
                className={`tab ${view === item.id ? "is-active" : ""}`}
                onClick={() => setView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="tabs-note mono">{activeView.note.toUpperCase()}</div>
        </div>

        <div className="leaderboard-layout">
          <Reveal className="leaderboard-table-wrap">
            <div className="table-scroll">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th scope="col" className="col-rank">#</th>
                    <th scope="col">Model</th>
                    <th scope="col">{view === "value" ? "Index" : activeView.metric}</th>
                    <th scope="col" className="col-arena">Arena</th>
                    <th scope="col">Price / 1M</th>
                    <th scope="col" className="col-context">Context</th>
                    <th scope="col" className="col-evidence">Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((model, index) => {
                    const lab = getLab(model.labId);
                    const value = metric(model, view);
                    const range = view === "value" ? value / 2 : 100;
                    return (
                      <tr key={model.id}>
                        <td className="col-rank mono">{String(index + 1).padStart(2, "0")}</td>
                        <td>
                          <button className="model-cell" onClick={() => onSelectModel(model.id)}>
                            <span
                              className="model-avatar"
                              style={{ borderColor: `${lab.color}55`, color: lab.color }}
                            >
                              {lab.monogram}
                            </span>
                            <span className="model-cell-copy">
                              <span className="model-name">{model.name}</span>
                              <span className="model-meta">
                                {lab.short}
                                <span className="meta-dot" />
                                {model.license === "Open weights" ? "Open weights" : "API only"}
                              </span>
                            </span>
                            <span className="model-chevron" aria-hidden="true">
                              <ArrowUpRight size={13} />
                            </span>
                          </button>
                        </td>
                        <td>
                          <div className="score-cell">
                            <span className="score-value mono">
                              {view === "value" ? value.toFixed(0) : value.toFixed(1)}
                            </span>
                            <span className="score-track" aria-hidden="true">
                              <span
                                className="score-fill"
                                style={{
                                  width: `${Math.min(100, (value / range) * 100)}%`,
                                  background: lab.color,
                                }}
                              />
                            </span>
                          </div>
                        </td>
                        <td className="col-arena mono">{model.benchmarks.arena.toFixed(0)}</td>
                        <td>
                          <span className="price-cell mono">
                            ${model.input.toFixed(2)}
                            <span>/</span>
                            <span>${model.output.toFixed(2)}</span>
                          </span>
                        </td>
                        <td className="col-context mono">{formatContext(model.context)}</td>
                        <td className="col-evidence">
                          <Badge tone={model.evidence === "Verified" ? "lime" : "orange"}>
                            {model.evidence}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span className="mono">
                SORTED BY {activeView.metric.toUpperCase()} · SNAPSHOT OCT 21, 2026
              </span>
              <button className="text-link" onClick={() => onSelectModel(top.id)}>
                Open the leader&apos;s dossier <ArrowUpRight size={13} />
              </button>
            </div>
          </Reveal>

          <Reveal className="leaderboard-rail" delay={120}>
            <button className="signal-card signal-card-hero" onClick={() => onSelectModel(top.id)}>
              <span className="signal-kicker mono">
                <span className="live-dot" />
                CURRENT LEADER
              </span>
              <span className="signal-score mono">{top.score.toFixed(1)}</span>
              <span className="signal-name">{top.name}</span>
              <span className="signal-lab">{getLab(top.labId).short}</span>
              <MicroBars
                values={[top.benchmarks.gpqa, top.benchmarks.swe, top.benchmarks.terminal]}
                colors={[getLab(top.labId).color, "var(--cyan)", "var(--violet)"]}
                label="Knowledge, coding and agent scores"
              />
              <span className="signal-footer mono">
                <span>LATTICE INDEX</span>
                <span>{top.benchmarks.arena.toFixed(0)} ARENA</span>
              </span>
            </button>

            <button className="signal-card" onClick={() => onSelectModel(valueTop.id)}>
              <span className="signal-kicker mono">
                <Sparkles size={12} /> BEST VALUE
              </span>
              <span className="signal-row">
                <span className="signal-title">{valueTop.name}</span>
                <span className="signal-stat mono">{valueTop.score.toFixed(1)}</span>
              </span>
              <span className="signal-desc">
                ${valueTop.input.toFixed(2)} in / ${valueTop.output.toFixed(2)} out. The
                highest capability per dollar in the atlas.
              </span>
            </button>

            <button className="signal-card" onClick={() => onSelectModel(openTop.id)}>
              <span className="signal-kicker mono">TOP OPEN WEIGHTS</span>
              <span className="signal-row">
                <span className="signal-title">{openTop.name}</span>
                <span className="signal-stat mono">{openTop.score.toFixed(1)}</span>
              </span>
              <span className="signal-desc">
                {getLab(openTop.labId).short} closes the gap with the closed frontier — without a per-seat contract.
              </span>
            </button>
          </Reveal>
        </div>

        <Reveal className="method-note" delay={100}>
          <span className="method-icon mono">i</span>
          <p>
            Lattice Index blends normalised scores across knowledge, coding, agentic work,
            research and multimodal tasks, with a price-neutral weighting. Models marked
            &ldquo;Estimated&rdquo; rely on partial independent coverage. This is an independent
            demonstration dataset, not investment advice.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

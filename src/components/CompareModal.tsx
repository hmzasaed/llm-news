import { Fragment, type CSSProperties } from "react";
import { ArrowUpRight, Plus, Scale, X } from "lucide-react";
import {
  BENCHMARKS,
  blendPrice,
  formatContext,
  formatDate,
  getLab,
  getModel,
  MODELS,
  type Model,
} from "../data";
import { Badge, ExternalLink } from "./ui";
import { OverlayFrame } from "./Overlay";

export function CompareModal({
  open,
  ids,
  onClose,
  onRemove,
  onAdd,
  onOpenModel,
}: {
  open: boolean;
  ids: string[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAdd: (id: string) => void;
  onOpenModel: (id: string) => void;
}) {
  const models = ids.map(getModel);
  const available = MODELS.filter((model) => !ids.includes(model.id));
  const rows: {
    group: string;
    label: string;
    value: (model: Model) => string;
    raw: (model: Model) => number;
    best: "high" | "low";
  }[] = [
    {
      group: "Capability",
      label: "Lattice index",
      value: (model) => model.score.toFixed(1),
      raw: (model) => model.score,
      best: "high",
    },
    ...BENCHMARKS.map((benchmark) => ({
      group: "Benchmarks",
      label: benchmark.label,
      value: (model: Model) => model.benchmarks[benchmark.key].toFixed(1),
      raw: (model: Model) => model.benchmarks[benchmark.key],
      best: "high" as const,
    })),
    {
      group: "Benchmarks",
      label: "Arena Elo",
      value: (model) => model.benchmarks.arena.toFixed(0),
      raw: (model) => model.benchmarks.arena,
      best: "high",
    },
    {
      group: "Economics",
      label: "Input / 1M",
      value: (model) => `$${model.input.toFixed(2)}`,
      raw: (model) => model.input,
      best: "low",
    },
    {
      group: "Economics",
      label: "Output / 1M",
      value: (model) => `$${model.output.toFixed(2)}`,
      raw: (model) => model.output,
      best: "low",
    },
    {
      group: "Economics",
      label: "Blended / 1M",
      value: (model) => `$${blendPrice(model).toFixed(2)}`,
      raw: (model) => blendPrice(model),
      best: "low",
    },
    {
      group: "Economics",
      label: "Index per $",
      value: (model) => (model.score / blendPrice(model)).toFixed(1),
      raw: (model) => model.score / blendPrice(model),
      best: "high",
    },
    {
      group: "Deployment",
      label: "Context window",
      value: (model) => formatContext(model.context),
      raw: (model) => model.context,
      best: "high",
    },
    {
      group: "Deployment",
      label: "Output speed",
      value: (model) => `${model.speed} tok/s`,
      raw: (model) => model.speed,
      best: "high",
    },
  ];

  const groups = [...new Set(rows.map((row) => row.group))];
  const bestModel = models.length ? [...models].sort((a, b) => b.score - a.score)[0] : null;
  const cheapest = models.length
    ? [...models].sort((a, b) => blendPrice(a) - blendPrice(b))[0]
    : null;
  const bestValue = models.length
    ? [...models].sort(
        (a, b) => b.score / blendPrice(b) - a.score / blendPrice(a),
      )[0]
    : null;

  return (
    <OverlayFrame open={open} onClose={onClose} label="Model comparison" className="compare-panel">
      <div className="compare-head">
        <div>
          <span className="mono drawer-kicker">COMPARISON DESK</span>
          <h2>
            Side by side. <span className="serif-accent">Line by line.</span>
          </h2>
        </div>
        <div className="compare-head-actions">
          <span className="mono compare-count">{ids.length} / 4 SELECTED</span>
          <button className="icon-button" onClick={onClose} aria-label="Close comparison">
            <X size={18} />
          </button>
        </div>
      </div>

      {models.length === 0 ? (
        <div className="compare-empty">
          <Scale size={28} />
          <h3>Choose a shortlist to compare.</h3>
          <p>Add two to four models. Capability, price, context and speed align in one table.</p>
          <div className="compare-suggestions">
            {[...MODELS]
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
              .map((model) => (
                <button key={model.id} className="button button-ghost button-small" onClick={() => onAdd(model.id)}>
                  <Plus size={13} /> {model.name}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className="compare-toolbar">
            <div className="compare-chips">
              {models.map((model) => {
                const lab = getLab(model.labId);
                return (
                  <span className="compare-chip" key={model.id} style={{ borderColor: `${lab.color}66` }}>
                    <span style={{ background: lab.color }} />
                    {model.name}
                    <button onClick={() => onRemove(model.id)} aria-label={`Remove ${model.name}`}>
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
            {ids.length < 4 && available.length > 0 ? (
              <label className="compare-add-select">
                <Plus size={14} />
                <span className="sr-only">Add a model</span>
                <select
                  value=""
                  onChange={(event) => {
                    if (event.target.value) onAdd(event.target.value);
                  }}
                >
                  <option value="" disabled>
                    Add model
                  </option>
                  {available.map((model) => (
                    <option value={model.id} key={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          <div className="compare-scroll">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col" className="compare-row-label">
                    METRIC
                  </th>
                  {models.map((model) => {
                    const lab = getLab(model.labId);
                    return (
                      <th scope="col" key={model.id}>
                        <div className="compare-model-head" style={{ "--accent": lab.color } as CSSProperties}>
                          <span className="compare-monogram mono" style={{ color: lab.color }}>
                            {lab.monogram}
                          </span>
                          <button className="compare-model-name" onClick={() => onOpenModel(model.id)}>
                            {model.name}
                            <ArrowUpRight size={12} />
                          </button>
                          <span className="compare-model-lab">{lab.short}</span>
                          <Badge tone={model.license === "Open weights" ? "cyan" : "neutral"}>
                            {model.license}
                          </Badge>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <Fragment key={group}>
                    <tr className="compare-group-row">
                      <td colSpan={models.length + 1} className="mono">
                        {group.toUpperCase()}
                      </td>
                    </tr>
                    {rows
                      .filter((row) => row.group === group)
                      .map((row) => {
                        const values = models.map(row.raw);
                        const target = row.best === "high" ? Math.max(...values) : Math.min(...values);
                        return (
                          <tr key={`${group}-${row.label}`}>
                            <th scope="row" className="compare-row-label">
                              {row.label}
                            </th>
                            {models.map((model) => {
                              const isBest = models.length > 1 && row.raw(model) === target;
                              return (
                                <td
                                  key={model.id}
                                  className={`mono ${isBest ? "is-best" : ""}`}
                                >
                                  {row.value(model)}
                                  {isBest ? <span className="best-dot" aria-label="Best value" /> : null}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                  </Fragment>
                ))}
                <tr className="compare-group-row">
                  <td colSpan={models.length + 1} className="mono">
                    RELEASE
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="compare-row-label">
                    Released
                  </th>
                  {models.map((model) => (
                    <td key={model.id} className="mono">
                      {formatDate(model.released)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="compare-row-label">
                    Best for
                  </th>
                  {models.map((model) => (
                    <td key={model.id} className="compare-bestfor">
                      {model.bestFor}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="compare-row-label">
                    Source
                  </th>
                  {models.map((model) => (
                    <td key={model.id}>
                      <ExternalLink href={getLab(model.labId).website}>
                        {getLab(model.labId).short}
                      </ExternalLink>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="compare-verdicts">
            {bestModel ? (
              <div>
                <span className="mono">HIGHEST CAPABILITY</span>
                <strong>{bestModel.name}</strong>
                <small>{bestModel.score.toFixed(1)} index</small>
              </div>
            ) : null}
            {cheapest ? (
              <div>
                <span className="mono">LOWEST BLENDED PRICE</span>
                <strong>{cheapest.name}</strong>
                <small>${blendPrice(cheapest).toFixed(2)} / 1M</small>
              </div>
            ) : null}
            {bestValue ? (
              <div>
                <span className="mono">BEST CAPABILITY PER $</span>
                <strong>{bestValue.name}</strong>
                <small>{(bestValue.score / blendPrice(bestValue)).toFixed(0)} index pts / $</small>
              </div>
            ) : null}
          </div>
        </>
      )}

      <div className="compare-foot mono">
        <span>LIST PRICES IN USD · SNAPSHOT OCT 21, 2026</span>
        <span>CLICK A MODEL NAME TO OPEN ITS DOSSIER</span>
      </div>
    </OverlayFrame>
  );
}

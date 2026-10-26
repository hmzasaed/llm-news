import { useMemo, useState, type CSSProperties } from "react";
import { ArrowUpRight, Calculator, Check, ChevronDown, Info } from "lucide-react";
import {
  blendPrice,
  getLab,
  getModel,
  MODELS,
  PRICE_TOOLS,
} from "../data";
import { Badge, Reveal, SectionHeader } from "./ui";

const CATEGORIES = ["All", "Assistant", "Coding", "Research"];
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const preciseMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const SORTED_INPUT = MODELS.map((model) => model.input).sort((a, b) => a - b);
const INPUT_FLOOR = SORTED_INPUT[0];
const INPUT_MEDIAN = SORTED_INPUT[Math.floor(SORTED_INPUT.length / 2)];
const INPUT_CEILING = SORTED_INPUT[SORTED_INPUT.length - 1];

export function Pricing({ onSelectModel }: { onSelectModel: (id: string) => void }) {
  const [modelId, setModelId] = useState("gpt-6-1-sol");
  const [requests, setRequests] = useState(5000);
  const [inputTokens, setInputTokens] = useState(1500);
  const [outputTokens, setOutputTokens] = useState(600);
  const [category, setCategory] = useState("All");

  const model = getModel(modelId);
  const monthly = requests * 30 * (
    (inputTokens / 1_000_000) * model.input +
    (outputTokens / 1_000_000) * model.output
  );
  const perRequest =
    (inputTokens / 1_000_000) * model.input +
    (outputTokens / 1_000_000) * model.output;
  const effective = inputTokens + outputTokens > 0
    ? ((inputTokens * model.input + outputTokens * model.output) / (inputTokens + outputTokens))
    : 0;

  const frontierPeers = useMemo(
    () =>
      [...MODELS]
        .filter((candidate) => candidate.score >= 64)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((candidate) => ({
          model: candidate,
          cost: requests * 30 * (
            (inputTokens / 1_000_000) * candidate.input +
            (outputTokens / 1_000_000) * candidate.output
          ),
        })),
    [requests, inputTokens, outputTokens],
  );

  const tools = useMemo(
    () =>
      category === "All"
        ? PRICE_TOOLS
        : PRICE_TOOLS.filter((tool) => tool.category === category),
    [category],
  );

  return (
    <section className="section section-pricing" id="pricing">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Pricing intelligence"
          title={
            <>
              What does <span className="serif-accent">intelligence cost?</span>
            </>
          }
          description="Model APIs are priced per million tokens; the products built on them are priced by the seat. Model both sides before you commit."
          actions={
            <span className="mono pricing-asof">PRICES VERIFIED OCT 2026 · USD</span>
          }
        />

        <div className="pricing-workbench">
          <Reveal className="panel calc-panel">
            <div className="panel-heading">
              <div>
                <span className="mono panel-kicker">
                  <Calculator size={12} /> API COST ESTIMATOR
                </span>
                <h3>Build a monthly run-rate</h3>
              </div>
              <button className="text-link" onClick={() => onSelectModel(model.id)}>
                Model dossier <ArrowUpRight size={13} />
              </button>
            </div>

            <div className="calc-body">
              <div className="calc-controls">
                <label className="field">
                  <span className="field-label mono">MODEL</span>
                  <span className="select-field select-field-wide">
                    <select value={modelId} onChange={(event) => setModelId(event.target.value)}>
                      {[...MODELS].sort((a, b) => b.score - a.score).map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name} — ${candidate.input.toFixed(2)} / ${candidate.output.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} />
                  </span>
                </label>

                <RangeField
                  label="REQUESTS / DAY"
                  value={requests}
                  min={500}
                  max={100000}
                  step={500}
                  display={requests.toLocaleString("en-US")}
                  onChange={setRequests}
                />
                <RangeField
                  label="INPUT TOKENS / REQUEST"
                  value={inputTokens}
                  min={200}
                  max={32000}
                  step={100}
                  display={inputTokens.toLocaleString("en-US")}
                  onChange={setInputTokens}
                />
                <RangeField
                  label="OUTPUT TOKENS / REQUEST"
                  value={outputTokens}
                  min={100}
                  max={8000}
                  step={50}
                  display={outputTokens.toLocaleString("en-US")}
                  onChange={setOutputTokens}
                />
              </div>

              <div className="calc-result">
                <span className="mono calc-result-label">ESTIMATED MONTHLY SPEND</span>
                <div className="calc-total mono">{money.format(monthly)}</div>
                <div className="calc-sub">
                  {money.format(monthly * 12)} / year · {preciseMoney.format(perRequest)} per request
                </div>
                <div className="calc-breakdown">
                  <div>
                    <span>Input</span>
                    <strong className="mono">
                      {monthly > 0
                        ? money.format(monthly * (inputTokens * model.input) / (inputTokens * model.input + outputTokens * model.output))
                        : "$0"}
                    </strong>
                  </div>
                  <div>
                    <span>Output</span>
                    <strong className="mono">
                      {monthly > 0
                        ? money.format(monthly * (outputTokens * model.output) / (inputTokens * model.input + outputTokens * model.output))
                        : "$0"}
                    </strong>
                  </div>
                  <div>
                    <span>Effective / 1M</span>
                    <strong className="mono">${effective.toFixed(2)}</strong>
                  </div>
                </div>
                <div className="calc-price-note mono">
                  LIST: ${model.input.toFixed(2)} IN / ${model.output.toFixed(2)} OUT
                </div>
              </div>
            </div>

            <div className="calc-compare">
              <div className="calc-compare-head">
                <span className="mono">SAME WORKLOAD · FRONTIER PEERS</span>
                <span className="mono">{getLab(model.labId).short} SELECTED</span>
              </div>
              <div className="calc-peer-list">
                {frontierPeers.map(({ model: peer, cost }) => {
                  const ratio = monthly > 0 ? cost / monthly : 1;
                  return (
                    <div className={`calc-peer ${peer.id === model.id ? "is-selected" : ""}`} key={peer.id}>
                      <span className="peer-name">{peer.name}</span>
                      <span className="peer-track">
                        <span
                          style={{
                            width: `${Math.max(3, Math.min(100, (cost / Math.max(...frontierPeers.map((entry) => entry.cost))) * 100))}%`,
                            background: getLab(peer.labId).color,
                          }}
                        />
                      </span>
                      <span className="peer-cost mono">{money.format(cost)}</span>
                      <span className="peer-ratio mono">
                        {ratio === 1 ? "BASELINE" : `${ratio.toFixed(2)}×`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="panel-foot">
              <span>
                <Info size={12} /> Excludes reasoning tokens, caching, batch discounts and taxes.
              </span>
              <span className="mono">USD · 30-DAY MONTH</span>
            </div>
          </Reveal>

          <Reveal className="panel intelligence-price-panel" delay={100}>
            <div className="panel-heading">
              <div>
                <span className="mono panel-kicker">PRICE OF A POINT</span>
                <h3>Capability per dollar</h3>
              </div>
              <span className="mono axis-note">INDEX ÷ BLENDED $</span>
            </div>
            <div className="price-podium">
              {[...MODELS]
                .sort((a, b) => b.score / blendPrice(b) - a.score / blendPrice(a))
                .slice(0, 5)
                .map((candidate, index) => {
                  const ratio = candidate.score / blendPrice(candidate);
                  return (
                    <button
                      key={candidate.id}
                      className="price-podium-row"
                      onClick={() => onSelectModel(candidate.id)}
                    >
                      <span className="podium-rank mono">0{index + 1}</span>
                      <span className="podium-name">{candidate.name}</span>
                      <span className="podium-price mono">
                        ${candidate.input.toFixed(2)} / ${candidate.output.toFixed(2)}
                      </span>
                      <span className="podium-value mono">{ratio.toFixed(0)}</span>
                    </button>
                  );
                })}
            </div>
            <div className="price-podium-caption">
              A high score is not a strategy. The cheapest capable model can cut run-rate by
              an order of magnitude.
            </div>
            <div className="price-bands">
              <div>
                <span className="mono">BUDGET FLOOR</span>
                <strong className="mono">${INPUT_FLOOR.toFixed(2)}</strong>
                <small>per 1M input tokens</small>
              </div>
              <div>
                <span className="mono">ATLAS MEDIAN</span>
                <strong className="mono">${INPUT_MEDIAN.toFixed(2)}</strong>
                <small>per 1M input tokens</small>
              </div>
              <div>
                <span className="mono">PREMIUM CEILING</span>
                <strong className="mono">${INPUT_CEILING.toFixed(2)}</strong>
                <small>per 1M input tokens</small>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="subscription-heading">
          <div>
            <span className="mono panel-kicker">CONSUMER & TEAM SUBSCRIPTIONS</span>
            <h3>What the seats actually buy</h3>
          </div>
          <div className="labs-filter">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                className={`filter-chip ${category === item ? "is-active" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="tool-grid">
          {tools.map((tool, index) => (
            <Reveal key={tool.id} delay={Math.min(index * 40, 240)}>
              <article className="tool-card">
                <div className="tool-head">
                  <span className="tool-monogram" style={{ color: tool.color, borderColor: `${tool.color}44` }}>
                    {tool.monogram}
                  </span>
                  <div>
                    <h4>{tool.name}</h4>
                    <span className="tool-maker mono">{tool.maker.toUpperCase()}</span>
                  </div>
                  <Badge tone="neutral">{tool.category}</Badge>
                </div>
                <div className="tool-plans">
                  {tool.plans.map((plan) => (
                    <div className="tool-plan" key={plan.name}>
                      <span className="tool-plan-name">
                        {plan.name === "Free" ? <Check size={11} /> : null}
                        {plan.name}
                      </span>
                      <span className="tool-plan-price mono">{plan.price}</span>
                      <span className="tool-plan-note">{plan.note}</span>
                    </div>
                  ))}
                </div>
                <div className="tool-best">
                  <span className="mono">BEST FOR</span>
                  {tool.bestFor}
                </div>
                <p className="tool-note">{tool.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="range-field">
      <span className="range-head">
        <span className="field-label mono">{label}</span>
        <span className="range-value mono">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <span className="range-bounds mono">
        <span>{min.toLocaleString("en-US")}</span>
        <span>{max.toLocaleString("en-US")}</span>
      </span>
    </label>
  );
}

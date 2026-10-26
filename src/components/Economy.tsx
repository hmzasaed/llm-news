import { ArrowUpRight, Info, TrendingDown } from "lucide-react";
import {
  CAPEX_DATA,
  CONDITIONS,
  COST_INDEX,
  FUNDING_DATA,
  FUNDING_TOTAL,
  SCATTER_LABS,
} from "../data";
import { AreaChart, Gauge, ScatterChart } from "./Charts";
import { Reveal, SectionHeader } from "./ui";

const CAPEX_TOTAL = CAPEX_DATA.reduce((total, item) => total + item.value, 0);
const CAPEX_MAX = Math.max(...CAPEX_DATA.map((item) => item.value));
const FUNDING_MAX = Math.max(...FUNDING_DATA.map((item) => item.value));
const CAPEX_TO_FUNDING = CAPEX_TOTAL / FUNDING_TOTAL;
const FUNDING_COVER = (FUNDING_TOTAL / CAPEX_TOTAL) * 100;

export function Economy() {
  return (
    <section className="section section-economy" id="economy">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="The machine economy"
          title={
            <>
              Cheaper tokens. <span className="serif-accent">Dearer infrastructure.</span>
            </>
          }
          description="Inference costs are collapsing while capital expenditure climbs toward a trillion dollars. That contradiction is the defining economics of the frontier."
          actions={
            <a className="button button-ghost button-small" href="#pricing">
              Pricing intelligence <ArrowUpRight size={14} />
            </a>
          }
        />

        <div className="economy-grid">
          <Reveal className="panel panel-cost">
            <div className="panel-heading">
              <div>
                <span className="mono panel-kicker">INFERENCE COST INDEX</span>
                <h3>Intelligence gets cheaper</h3>
              </div>
              <span className="delta-pill">
                <TrendingDown size={13} /> −99.1% <span className="mono">SINCE 2022</span>
              </span>
            </div>
            <div className="chart-hero">
              <div className="chart-big-stat mono">
                0.9
                <span>indexed cost</span>
              </div>
              <AreaChart data={COST_INDEX} color="var(--lime)" />
            </div>
            <div className="panel-foot">
              <span>Fixed capability benchmark · 2022 = 100</span>
              <span className="mono">SOURCE: ARK / EPOCH</span>
            </div>
          </Reveal>

          <Reveal className="panel panel-funding" delay={100}>
            <div className="panel-heading">
              <div>
                <span className="mono panel-kicker">2026 EQUITY RAISED</span>
                <h3>Capital concentrates</h3>
              </div>
              <div className="panel-total mono">
                ${FUNDING_TOTAL.toFixed(0)}B
                <span>tracked</span>
              </div>
            </div>
            <div className="bar-list">
              {FUNDING_DATA.map((item) => (
                <div className="bar-row" key={item.name}>
                  <span className="bar-name">{item.name}</span>
                  <span className="bar-track">
                    <span
                      className="bar-fill"
                      style={{
                        width: `${Math.max(2, (item.value / FUNDING_MAX) * 100)}%`,
                        background: item.color,
                      }}
                    />
                  </span>
                  <span className="bar-value mono">${item.value}B</span>
                </div>
              ))}
            </div>
            <div className="funding-concentration">
              <div className="funding-concentration-head">
                <span className="mono">TOP-TWO CONCENTRATION</span>
                <strong className="mono">90.2%</strong>
              </div>
              <div className="funding-concentration-track">
                <span />
              </div>
              <p>OpenAI and Anthropic absorb almost all disclosed 2026 lab equity.</p>
            </div>
            <div className="panel-foot">
              <span>Capital is consolidating around two proven distribution engines.</span>
            </div>
          </Reveal>
        </div>

        <div className="economy-grid economy-grid-reverse">
          <Reveal className="panel panel-capex">
            <div className="panel-heading">
              <div>
                <span className="mono panel-kicker">2026 CAPITAL EXPENDITURE</span>
                <h3>The physical build-out</h3>
              </div>
              <div className="panel-total mono">
                ${CAPEX_TOTAL.toFixed(0)}B
                <span>guide</span>
              </div>
            </div>
            <div className="capex-list">
              {CAPEX_DATA.map((item) => (
                <div className="capex-row" key={item.name}>
                  <span className="capex-name">{item.name}</span>
                  <span className="capex-track">
                    <span
                      className="capex-fill"
                      style={{
                        width: `${(item.value / CAPEX_MAX) * 100}%`,
                        background: item.color,
                      }}
                    />
                  </span>
                  <span className="capex-value mono">${item.value}B</span>
                  <span className="capex-note">{item.note}</span>
                </div>
              ))}
            </div>
            <div className="capex-compare">
              <div className="capex-compare-head">
                <span className="mono">CAPEX VS EQUITY RAISED</span>
                <strong className="mono">{CAPEX_TO_FUNDING.toFixed(1)}×</strong>
              </div>
              <div className="capex-compare-track">
                <span style={{ width: `${FUNDING_COVER}%` }} />
              </div>
              <div className="capex-compare-values mono">
                <span>
                  <b>${CAPEX_TOTAL.toFixed(0)}B</b> build-out
                </span>
                <span>
                  <b>${FUNDING_TOTAL.toFixed(0)}B</b> raised
                </span>
              </div>
              <p>
                Disclosed lab equity covers just {FUNDING_COVER.toFixed(0)}% of the infrastructure
                guide.
              </p>
            </div>
            <div className="panel-foot">
              <span>Big-four hyperscaler capex alone reaches roughly $747B.</span>
              <span className="mono">COMPANY GUIDES</span>
            </div>
          </Reveal>

          <Reveal className="panel panel-scatter" delay={100}>
            <div className="panel-heading">
              <div>
                <span className="mono panel-kicker">REVENUE vs VALUATION</span>
                <h3>What growth is priced in?</h3>
              </div>
              <span className="mono axis-note">LOG SCALE · $B</span>
            </div>
            <ScatterChart data={SCATTER_LABS} />
            <div className="panel-foot">
              <span>Anthropic trades at ~14.8× run-rate; OpenAI at ~35×. The gap is the growth premium.</span>
            </div>
          </Reveal>
        </div>

        <div className="conditions-board">
          <Reveal className="conditions-heading">
            <div>
              <span className="mono panel-kicker">CONDITIONS BOARD / OCT 2026</span>
              <h3>Five pressures shaping the market</h3>
            </div>
            <div className="conditions-legend">
              <span className="mono">
                <Info size={12} /> 0–100 NORMALISED
              </span>
            </div>
          </Reveal>
          <div className="gauge-grid">
            {CONDITIONS.map((condition, index) => (
              <Reveal key={condition.label} delay={index * 60}>
                <div className="gauge-card">
                  <Gauge {...condition} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

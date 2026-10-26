import { useId, useState } from "react";
import type { Model } from "../data";
import { BENCHMARKS } from "../data";

const points = (cx: number, cy: number, radius: number, values: number[]) =>
  values.map((value, index) => {
    const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: cx + Math.cos(angle) * distance,
      y: cy + Math.sin(angle) * distance,
    };
  });

export function RadarChart({ model, color }: { model: Model; color: string }) {
  const center = 150;
  const radius = 91;
  const values = BENCHMARKS.map((benchmark) => model.benchmarks[benchmark.key]);
  const polygon = points(center, 130, radius, values)
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");

  return (
    <div className="radar-wrap">
      <svg
        viewBox="0 0 300 270"
        className="radar"
        role="img"
        aria-label={`${model.name} benchmark profile across knowledge, coding, agents, research and multimodal tasks`}
      >
        {[25, 50, 75, 100].map((step) => (
          <polygon
            key={step}
            points={points(center, 130, (radius * step) / 100, [100, 100, 100, 100, 100])
              .map((point) => `${point.x},${point.y}`)
              .join(" ")}
            className="radar-grid"
          />
        ))}
        {BENCHMARKS.map((benchmark, index) => {
          const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
          const endX = center + Math.cos(angle) * radius;
          const endY = 130 + Math.sin(angle) * radius;
          const labelX = center + Math.cos(angle) * (radius + 25);
          const labelY = 130 + Math.sin(angle) * (radius + 23);
          const anchor = labelX > center + 8 ? "start" : labelX < center - 8 ? "end" : "middle";
          return (
            <g key={benchmark.key}>
              <line x1={center} y1={130} x2={endX} y2={endY} className="radar-axis" />
              <text x={labelX} y={labelY} textAnchor={anchor} className="radar-label">
                {benchmark.short}
              </text>
              <text
                x={labelX}
                y={labelY + 12}
                textAnchor={anchor}
                className="radar-value mono"
                fill={color}
              >
                {values[index].toFixed(1)}
              </text>
            </g>
          );
        })}
        <g className="radar-shape">
          <polygon points={polygon} fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.4" />
          {points(center, 130, radius, values).map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="var(--bg)"
              stroke={color}
              strokeWidth="1.5"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function AreaChart({
  data,
  color = "var(--lime)",
}: {
  data: { year: string; value: number }[];
  color?: string;
}) {
  const gradientId = useId().replace(/:/g, "");
  const width = 560;
  const height = 230;
  const padding = { left: 42, right: 20, top: 24, bottom: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const min = 0.5;
  const max = 110;
  const logMin = Math.log10(min);
  const logMax = Math.log10(max);
  const coords = data.map((point, index) => ({
    ...point,
    x: padding.left + (index / (data.length - 1)) * innerW,
    y:
      padding.top +
      (1 - (Math.log10(point.value) - logMin) / (logMax - logMin)) * innerH,
  }));

  let line = `M ${coords[0].x} ${coords[0].y}`;
  for (let index = 0; index < coords.length - 1; index += 1) {
    const current = coords[index];
    const next = coords[index + 1];
    const midX = (current.x + next.x) / 2;
    line += ` C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
  }
  const area = `${line} L ${coords[coords.length - 1].x} ${padding.top + innerH} L ${coords[0].x} ${padding.top + innerH} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="area-chart"
      role="img"
      aria-label={`Indexed cost of a fixed AI capability from 2022 to 2026, falling from ${data[0].value} to ${data[data.length - 1].value}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.33, 0.66, 1].map((ratio) => (
        <line
          key={ratio}
          x1={padding.left}
          x2={width - padding.right}
          y1={padding.top + innerH * ratio}
          y2={padding.top + innerH * ratio}
          className="chart-grid"
        />
      ))}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {coords.map((point) => (
        <g key={point.year}>
          <line
            x1={point.x}
            x2={point.x}
            y1={point.y}
            y2={padding.top + innerH}
            className="chart-grid chart-grid-vertical"
          />
          <circle cx={point.x} cy={point.y} r="4" fill="var(--bg)" stroke={color} strokeWidth="2" />
          <text x={point.x} y={point.y - 12} textAnchor="middle" className="chart-value mono">
            {point.value}
          </text>
          <text
            x={point.x}
            y={height - 14}
            textAnchor="middle"
            className="chart-label mono"
          >
            {point.year}
          </text>
        </g>
      ))}
      <text x={8} y={padding.top + 4} className="chart-label mono">
        100
      </text>
      <text x={14} y={padding.top + innerH} className="chart-label mono">
        0.5
      </text>
    </svg>
  );
}

interface ScatterDatum {
  id: string;
  name: string;
  arr: number;
  val: number;
  color: string;
}

const LABEL_LAYOUT: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "end"; tooltipDy: number }
> = {
  anthropic: { dx: -14, dy: -13, anchor: "end", tooltipDy: 3 },
  openai: { dx: 12, dy: 18, anchor: "start", tooltipDy: 31 },
};

export function ScatterChart({ data }: { data: ScatterDatum[] }) {
  const [active, setActive] = useState<string | null>(null);
  const width = 560;
  const height = 330;
  const padding = { left: 48, right: 28, top: 30, bottom: 44 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const xMin = 0.15;
  const xMax = 100;
  const yMin = 5;
  const yMax = 1600;
  const xScale = (value: number) =>
    padding.left + ((Math.log10(value) - Math.log10(xMin)) / (Math.log10(xMax) - Math.log10(xMin))) * innerW;
  const yScale = (value: number) =>
    padding.top + (1 - (Math.log10(value) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin))) * innerH;

  return (
    <div className="scatter-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="scatter-chart"
        role="img"
        aria-label="Annualized revenue versus valuation for seven private AI labs, plotted on logarithmic axes"
      >
        {[5, 20, 80, 320, 1300].map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={yScale(tick)}
              y2={yScale(tick)}
              className="chart-grid"
            />
            <text x={padding.left - 8} y={yScale(tick) + 3} textAnchor="end" className="chart-label mono">
              {tick >= 1000 ? `${tick / 1000}T` : `$${tick}B`}
            </text>
          </g>
        ))}
        {[0.25, 1, 5, 25, 65].map((tick) => (
          <g key={tick}>
            <line
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={padding.top}
              y2={padding.top + innerH}
              className="chart-grid chart-grid-vertical"
            />
            <text
              x={xScale(tick)}
              y={height - 16}
              textAnchor="middle"
              className="chart-label mono"
            >
              ${tick}B
            </text>
          </g>
        ))}
        <text x={8} y={16} className="chart-label mono">
          VALUATION
        </text>
        <text x={width - 14} y={height - 2} textAnchor="end" className="chart-label mono">
          ANNUALIZED REVENUE
        </text>
        {data.map((datum) => {
          const x = xScale(datum.arr);
          const y = yScale(datum.val);
          const isActive = active === datum.id;
          const layout = LABEL_LAYOUT[datum.id] ?? {
            dx: 12,
            dy: -8,
            anchor: "start" as const,
            tooltipDy: 13,
          };
          return (
            <g
              key={datum.id}
              className="scatter-point"
              tabIndex={0}
              role="button"
              aria-label={`${datum.name}: $${datum.val}B valuation on $${datum.arr}B revenue`}
              onMouseEnter={() => setActive(datum.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(datum.id)}
              onBlur={() => setActive(null)}
            >
              <circle cx={x} cy={y} r={isActive ? 17 : 13} fill={`${datum.color}18`} />
              <circle cx={x} cy={y} r={isActive ? 6.5 : 5} fill={datum.color} />
              <text
                x={x + layout.dx}
                y={y + layout.dy}
                textAnchor={layout.anchor}
                className="scatter-label"
                fill={isActive ? "var(--text)" : "var(--muted)"}
              >
                {datum.name}
              </text>
              {isActive ? (
                <text
                  x={x + layout.dx}
                  y={y + layout.tooltipDy}
                  textAnchor={layout.anchor}
                  className="scatter-tooltip mono"
                  fill={datum.color}
                >
                  ${datum.val}B / ${datum.arr}B ARR
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <p className="chart-caption">
        Private marks versus reported annualized revenue. Points above the diagonal imply
        multiples that assume future growth, not current earnings. Log scales.
      </p>
    </div>
  );
}

export function Gauge({
  value,
  label,
  status,
  note,
}: {
  value: number;
  label: string;
  status: string;
  note: string;
}) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const color = value > 80 ? "var(--lime)" : value > 60 ? "var(--cyan)" : "var(--orange)";
  return (
    <div className="gauge">
      <div className="gauge-ring">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={radius} className="gauge-track" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="gauge-value"
            stroke={color}
            strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
          />
        </svg>
        <div className="gauge-number mono">{value}</div>
      </div>
      <div className="gauge-copy">
        <div className="gauge-label">{label}</div>
        <div className="gauge-status" style={{ color }}>
          {status}
        </div>
        <p>{note}</p>
      </div>
    </div>
  );
}

export function StackedMix({
  segments,
  note,
}: {
  segments: { label: string; value: number }[];
  note?: string;
}) {
  const palette = ["var(--lime)", "var(--cyan)", "var(--violet)", "var(--orange)", "#718096"];
  return (
    <div className="stacked-mix">
      <div
        className="mix-bar"
        role="img"
        aria-label={segments.map((segment) => `${segment.label} ${segment.value}%`).join(", ")}
      >
        {segments.map((segment, index) => (
          <span
            key={segment.label}
            style={{ width: `${segment.value}%`, background: palette[index % palette.length] }}
            title={`${segment.label}: ${segment.value}%`}
          />
        ))}
      </div>
      <div className="mix-legend">
        {segments.map((segment, index) => (
          <div key={segment.label} className="mix-item">
            <span
              className="mix-dot"
              style={{ background: palette[index % palette.length] }}
              aria-hidden="true"
            />
            <span>{segment.label}</span>
            <span className="mono">{segment.value}%</span>
          </div>
        ))}
      </div>
      {note ? <p className="chart-caption">{note}</p> : null}
    </div>
  );
}

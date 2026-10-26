const WIRE = [
  { label: "RELEASE", text: "MiniMax M3.1 Flash · $0.15 / $0.60", color: "var(--lime)" },
  { label: "RELEASE", text: "DeepSeek V4.1 Flash 1017 · open weights", color: "var(--lime)" },
  { label: "CAPITAL", text: "OpenAI seeks $30B at up to $1.4T", color: "var(--orange)" },
  { label: "RELEASE", text: "Gemini 4 Argon · GA at $2 / $10", color: "var(--lime)" },
  { label: "MARKET", text: "Anthropic run-rate $65B · IPO filed", color: "var(--cyan)" },
  { label: "PRICING", text: "Haiku 5.5 · $0.10 / $0.50 · 1M ctx", color: "var(--violet)" },
  { label: "RELEASE", text: "Muse Wonder · Meta's new frontier", color: "var(--lime)" },
  { label: "CAPITAL", text: "Hyperscaler capex $720–745B in 2026", color: "var(--orange)" },
  { label: "MARKET", text: "Kimi K3 leads open-weight index", color: "var(--cyan)" },
];

export function Ticker() {
  return (
    <div className="ticker" aria-label="Live market wire">
      <div className="ticker-label mono">
        <span className="live-dot" />
        WIRE
      </div>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {[0, 1].map((iteration) => (
            <div className="ticker-group" key={iteration} aria-hidden={iteration === 1}>
              {WIRE.map((item) => (
                <span className="ticker-item" key={`${iteration}-${item.text}`}>
                  <span className="ticker-tag mono" style={{ color: item.color }}>
                    {item.label}
                  </span>
                  {item.text}
                  <span className="ticker-separator" aria-hidden="true">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <a className="ticker-end mono" href="#updates">
        ALL UPDATES ↗
      </a>
    </div>
  );
}

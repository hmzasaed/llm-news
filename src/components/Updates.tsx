import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Clock, Inbox } from "lucide-react";
import { DATA_NOTES, formatDate, UPDATES } from "../data";
import { Badge, Reveal, SectionHeader } from "./ui";

const FILTERS = ["All", "Release", "Capital", "Pricing"];
const TYPE_TONE: Record<string, "lime" | "orange" | "cyan"> = {
  Release: "lime",
  Capital: "orange",
  Pricing: "cyan",
};

export function Updates() {
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(8);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const updates = useMemo(
    () =>
      [...UPDATES]
        .filter((update) => filter === "All" || update.type === filter)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [filter],
  );
  const visible = updates.slice(0, limit);

  return (
    <section className="section section-updates" id="updates">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="The wire"
          title={
            <>
              Momentum, <span className="serif-accent">documented.</span>
            </>
          }
          description="Releases, capital and price cuts in one chronological ledger. What changed, why it matters, and which assumption it breaks."
          actions={
            <span className="mono wire-status">
              <span className="live-dot" /> UPDATED {DATA_NOTES.updated.toUpperCase()}
            </span>
          }
        />

        <div className="updates-layout">
          <div className="updates-main">
            <div className="updates-toolbar">
              <div className="labs-filter">
                {FILTERS.map((item) => (
                  <button
                    key={item}
                    className={`filter-chip ${filter === item ? "is-active" : ""}`}
                    onClick={() => {
                      setFilter(item);
                      setLimit(8);
                    }}
                    aria-pressed={filter === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <span className="mono updates-count">
                {String(updates.length).padStart(2, "0")} ENTRIES
              </span>
            </div>

            <div className="update-list">
              {visible.map((update, index) => {
                const date = new Date(`${update.date}T12:00:00Z`);
                const month = date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
                const day = date.toLocaleDateString("en-US", { day: "2-digit", timeZone: "UTC" });
                return (
                  <Reveal key={`${update.date}-${update.title}`} delay={Math.min(index * 35, 200)}>
                    <article className="update-row">
                      <div className="update-date">
                        <span className="mono update-month">{month.toUpperCase()}</span>
                        <span className="update-day mono">{day}</span>
                        <span className="mono update-year">{date.getUTCFullYear()}</span>
                      </div>
                      <div className="update-copy">
                        <div className="update-meta">
                          <Badge tone={TYPE_TONE[update.type] ?? "neutral"}>{update.type}</Badge>
                          <span className="update-tag mono">{update.tag}</span>
                        </div>
                        <h3>{update.title}</h3>
                        <p>{update.detail}</p>
                        <div className="update-foot mono">
                          {formatDate(update.date)} · LATTICE WIRE
                        </div>
                      </div>
                      <a
                        className="update-arrow"
                        href="#standings"
                        aria-label={`View related standings for ${update.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {limit < updates.length ? (
              <button className="load-more" onClick={() => setLimit((current) => current + 6)}>
                Load more dispatches
                <span className="mono">{updates.length - limit} REMAINING</span>
                <ArrowRight size={14} />
              </button>
            ) : null}
          </div>

          <aside className="updates-aside">
            <Reveal className="brief-card">
              <div className="brief-top">
                <span className="mono panel-kicker">
                  <Inbox size={12} /> THE WEEKLY BRIEF
                </span>
                <span className="brief-issue mono">NO. 42</span>
              </div>
              <h3>One signal, every Friday.</h3>
              <p>
                The three moves that mattered in AI: capability, capital and the price of
                intelligence. Written to be read in six minutes.
              </p>
              {subscribed ? (
                <div className="brief-success" role="status">
                  <span className="brief-success-icon">
                    <Check size={16} />
                  </span>
                  <div>
                    <strong>Demo complete.</strong>
                    <span>No address was stored and no email will be sent.</span>
                  </div>
                </div>
              ) : (
                <form
                  className="brief-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (email.trim()) setSubscribed(true);
                  }}
                >
                  <label className="sr-only" htmlFor="brief-email">
                    Email address
                  </label>
                  <input
                    id="brief-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                  />
                  <button type="submit" className="button button-lime" aria-label="Join the demo brief">
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
              <div className="brief-note mono">
                <Clock size={11} /> UI DEMO · NO ADDRESS IS STORED
              </div>
            </Reveal>

            <Reveal className="ledger-card" delay={80}>
              <div className="panel-heading">
                <div>
                  <span className="mono panel-kicker">DATA LEDGER</span>
                  <h3>How this atlas is built</h3>
                </div>
              </div>
              <div className="ledger-row">
                <span>Last verified</span>
                <strong>{DATA_NOTES.updated}</strong>
              </div>
              <div className="ledger-row">
                <span>Coverage</span>
                <strong>20 models · 13 labs</strong>
              </div>
              <div className="ledger-row">
                <span>Scoring</span>
                <strong>5 capability families</strong>
              </div>
              <div className="ledger-sources">
                <span className="mono">SOURCES</span>
                <div>
                  {DATA_NOTES.sources.map((source) => (
                    <span key={source}>{source}</span>
                  ))}
                </div>
              </div>
              <p className="ledger-disclaimer">
                Independent research demonstration. Figures are compiled from public
                reporting and may lag private disclosures. Nothing here is investment,
                legal or procurement advice.
              </p>
              <a className="text-link" href="#standings">
                Read the scoring method <ArrowRight size={13} />
              </a>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

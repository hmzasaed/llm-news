import { ArrowRight, ArrowUpRight, ArrowUp } from "lucide-react";
import { DATA_NOTES } from "../data";
import { GitHubLogo, LatticeMark, LinkedInLogo, XLogo } from "./Brand";

const COLUMNS = [
  {
    title: "Atlas",
    links: [
      { label: "Leaderboard", href: "#standings" },
      { label: "Model explorer", href: "#models" },
      { label: "Labs & capital", href: "#labs" },
      { label: "Market economy", href: "#economy" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "The wire", href: "#updates" },
      { label: "Scoring method", href: "#standings" },
      { label: "Data ledger", href: "#updates" },
    ],
  },
];

export function Footer({ onCompare }: { onCompare: () => void }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-copy">
            <span className="mono panel-kicker">THE NEXT MOVE</span>
            <h2>
              Decide with the <span className="serif-accent">full picture.</span>
            </h2>
            <p>
              Capability, cost and capital in one frame. Compare your shortlist before
              the next model launch rewrites it.
            </p>
          </div>
          <button className="button button-lime button-large" onClick={onCompare}>
            Open the comparison desk
            <ArrowRight size={17} />
          </button>
          <div className="footer-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="wordmark" aria-label="Back to top">
              <LatticeMark size={32} />
              <span>
                LATTICE<span className="wordmark-dot">.</span>
              </span>
            </a>
            <p>
              An independent atlas of artificial intelligence: models, labs, capital
              and the economics of the frontier.
            </p>
            <div className="footer-socials">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                <XLogo size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInLogo size={14} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubLogo size={14} />
              </a>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div className="footer-column" key={column.title}>
              <span className="mono footer-column-title">{column.title}</span>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                  <ArrowUpRight size={11} />
                </a>
              ))}
            </div>
          ))}

          <div className="footer-column footer-sources">
            <span className="mono footer-column-title">Sources</span>
            {DATA_NOTES.sources.slice(0, 5).map((source) => (
              <span key={source}>{source}</span>
            ))}
            <span className="footer-updated mono">VERIFIED {DATA_NOTES.updated.toUpperCase()}</span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="mono">© 2026 LATTICE RESEARCH</span>
            <span className="footer-divider" aria-hidden="true" />
            <span>Independent research demo</span>
          </div>
          <p>
            Benchmark and financial figures are illustrative, compiled from public sources,
            and may not reflect the latest private disclosures. Not investment advice.
          </p>
          <a href="#top" className="back-top" aria-label="Back to top">
            <ArrowUp size={14} />
          </a>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          LATTICE
        </div>
      </div>
    </footer>
  );
}

import type { CSSProperties } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { getLab, MODELS } from "../data";
import { StackedMix } from "./Charts";
import { Badge, ExternalLink, SocialLinks } from "./ui";
import { OverlayFrame } from "./Overlay";

export function LabDrawer({
  open,
  labId,
  onClose,
  onSelectModel,
}: {
  open: boolean;
  labId: string | null;
  onClose: () => void;
  onSelectModel: (id: string) => void;
}) {
  const lab = getLab(labId ?? "anthropic");
  const labModels = MODELS.filter((model) => model.labId === lab.id).sort(
    (a, b) => b.score - a.score,
  );

  return (
    <OverlayFrame open={open} onClose={onClose} label={`${lab.name} dossier`} className="drawer-panel">
      <div className="drawer-head">
        <span className="mono drawer-kicker">COMPANY DOSSIER / {lab.tier.toUpperCase()}</span>
        <button className="icon-button" onClick={onClose} aria-label="Close dossier">
          <X size={18} />
        </button>
      </div>

      <div className="drawer-scroll">
        <div className="lab-drawer-hero" style={{ "--accent": lab.color } as CSSProperties}>
          <div className="lab-drawer-mark" style={{ color: lab.color, borderColor: `${lab.color}55` }}>
            {lab.monogram}
          </div>
          <div>
            <div className="drawer-identity-top">
              <Badge tone="neutral">{lab.tier}</Badge>
              <span className="mono lab-founded">EST. {lab.founded}</span>
            </div>
            <h2>{lab.name}</h2>
            <p className="lab-tagline">{lab.tagline}</p>
          </div>
        </div>

        <p className="drawer-summary">{lab.description}</p>

        <div className="lab-fact-strip">
          <span>
            <MapPin size={12} /> {lab.hq}
          </span>
          <span>
            <Users size={12} /> {lab.employees}
          </span>
          <span>
            <Building2 size={12} /> {lab.ceo}
          </span>
        </div>

        <div className="valuation-grid">
          <div className="valuation-main">
            <span className="mono">VALUATION</span>
            <strong>{lab.valuation}</strong>
            <small>{lab.valuationNote}</small>
          </div>
          <div>
            <span className="mono">REVENUE</span>
            <strong>{lab.revenue}</strong>
            <small>{lab.revenueNote}</small>
          </div>
          <div>
            <span className="mono">CAPITAL RAISED</span>
            <strong>{lab.capital}</strong>
            <small>{lab.capitalNote}</small>
          </div>
          <div>
            <span className="mono">REVENUE MULTIPLE</span>
            <strong>{lab.multiple}</strong>
            <small>{lab.multipleNote}</small>
          </div>
        </div>

        <div className="drawer-callout burn-callout">
          <span className="mono">BURN & RUNWAY</span>
          <p>{lab.burn}</p>
          <small>{lab.burnNote}</small>
        </div>

        <div className="drawer-section">
          <div className="drawer-section-head">
            <span className="mono">REVENUE MIX</span>
            <span className="mono">{lab.mixNote}</span>
          </div>
          <StackedMix segments={lab.revenueMix} />
        </div>

        <div className="drawer-section">
          <div className="drawer-section-head">
            <span className="mono">SIGNAL LOG</span>
            <span className="mono">HISTORY</span>
          </div>
          <div className="lab-history">
            {lab.history.map((event) => (
              <div className="history-row" key={`${event.date}-${event.label}`}>
                <span className="mono history-date">{event.date}</span>
                <span className="history-dot" style={{ background: lab.color }} />
                <span className="history-label">{event.label}</span>
                {event.value ? <span className="mono history-value">{event.value}</span> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="drawer-two-col">
          <div>
            <div className="drawer-section-head">
              <span className="mono">WHY IT MATTERS</span>
            </div>
            <ul className="strength-list compact">
              {lab.highlights.map((highlight) => (
                <li key={highlight}>
                  <span>
                    <Check size={11} />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="drawer-section-head">
              <span className="mono">RISKS TO THE MARK</span>
            </div>
            <ul className="risk-list">
              {lab.risks.map((risk) => (
                <li key={risk}>
                  <span>
                    <AlertTriangle size={11} />
                  </span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="drawer-section">
          <div className="drawer-section-head">
            <span className="mono">BACKERS</span>
            <span className="mono">{lab.ipo}</span>
          </div>
          <div className="backer-row">
            {lab.backers.map((backer) => (
              <span key={backer} className="backer-chip">
                {backer}
              </span>
            ))}
          </div>
        </div>

        {labModels.length > 0 ? (
          <div className="drawer-section">
            <div className="drawer-section-head">
              <span className="mono">MODELS IN THE ATLAS</span>
              <span className="mono">{labModels.length} TRACKED</span>
            </div>
            <div className="lab-model-list">
              {labModels.map((model) => (
                <button key={model.id} className="lab-model-row" onClick={() => onSelectModel(model.id)}>
                  <span className="lab-model-name">{model.name}</span>
                  <span className="lab-model-license mono">{model.license}</span>
                  <span className="lab-model-score mono">{model.score.toFixed(1)}</span>
                  <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="drawer-callout">
            <span className="mono">MODEL COVERAGE</span>
            <p>No model from this lab is tracked in the current atlas.</p>
          </div>
        )}

        <div className="drawer-lab">
          <div className="drawer-lab-top">
            <div>
              <span className="mono">CONNECT</span>
              <h3>{lab.short}</h3>
            </div>
            <SocialLinks lab={lab} />
          </div>
          <div className="drawer-lab-actions">
            <ExternalLink href={lab.website}>Official website</ExternalLink>
            <span className="mono lab-ipo">
              <CalendarDays size={11} /> {lab.ipo}
            </span>
          </div>
        </div>

        <p className="drawer-disclaimer mono">
          Financial figures are illustrative and compiled from public reporting. Private
          marks may differ materially from fair value. Not investment advice.
        </p>
      </div>
    </OverlayFrame>
  );
}

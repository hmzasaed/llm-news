import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { getLab, LABS, MODELS } from "../data";
import { OverlayFrame } from "./Overlay";

type Entry = {
  type: "model" | "lab";
  id: string;
  name: string;
  meta: string;
  monogram: string;
  color: string;
  search: string;
};

const ENTRIES: Entry[] = [
  ...[...MODELS].sort((a, b) => b.score - a.score).map((model) => {
    const lab = getLab(model.labId);
    return {
      type: "model" as const,
      id: model.id,
      name: model.name,
      meta: `${lab.short} · ${model.score.toFixed(1)} index · $${model.input.toFixed(2)} in`,
      monogram: lab.monogram,
      color: lab.color,
      search: `${model.name} ${lab.name} ${model.tags.join(" ")}`.toLowerCase(),
    };
  }),
  ...LABS.map((lab) => ({
    type: "lab" as const,
    id: lab.id,
    name: lab.name,
    meta: `${lab.tier} · ${lab.valuation} valuation`,
    monogram: lab.monogram,
    color: lab.color,
    search: `${lab.name} ${lab.tagline} ${lab.tier}`.toLowerCase(),
  })),
];

export function CommandPalette({
  open,
  onClose,
  onSelectModel,
  onSelectLab,
}: {
  open: boolean;
  onClose: () => void;
  onSelectModel: (id: string) => void;
  onSelectLab: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
  }, [open]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = needle
      ? ENTRIES.filter((entry) => entry.search.includes(needle))
      : ENTRIES.filter((entry) => entry.type === "model").slice(0, 5).concat(
          ENTRIES.filter((entry) => entry.type === "lab").slice(0, 3),
        );
    return matches.slice(0, 9);
  }, [query]);

  const indexed = useMemo(
    () => results.map((entry, index) => ({ ...entry, index })),
    [results],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const choose = (entry: Entry) => {
    if (entry.type === "model") onSelectModel(entry.id);
    else onSelectLab(entry.id);
    onClose();
  };

  const handleKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % Math.max(1, results.length));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (current) => (current - 1 + Math.max(1, results.length)) % Math.max(1, results.length),
      );
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      choose(results[activeIndex]);
    }
  };

  return (
    <OverlayFrame open={open} onClose={onClose} label="Search Lattice" className="command-panel">
      <div className="command-search">
        <Search size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          data-autofocus
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-results"
          aria-activedescendant={results[activeIndex] ? `command-result-${activeIndex}` : undefined}
          placeholder="Search models, labs, capabilities…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKey}
        />
        {query ? (
          <button className="command-clear" onClick={() => setQuery("")} aria-label="Clear search">
            <X size={14} />
          </button>
        ) : (
          <kbd className="mono">ESC</kbd>
        )}
      </div>

      <div className="command-body" id="command-results" role="listbox">
        {results.length === 0 ? (
          <div className="command-empty">
            <span className="mono">NO SIGNAL</span>
            <p>No model or lab matches “{query}”. Try a capability like “coding” or a lab name.</p>
          </div>
        ) : (
          <>
            {(["model", "lab"] as const).map((type) => {
              const group = indexed.filter((entry) => entry.type === type);
              if (group.length === 0) return null;
              return (
                <div className="command-group" key={type}>
                  <div className="command-group-label mono">
                    {type === "model" ? "Models" : "Labs"}
                    <span>{group.length}</span>
                  </div>
                  {group.map((entry) => (
                    <button
                      key={`${entry.type}-${entry.id}`}
                      id={`command-result-${entry.index}`}
                      role="option"
                      aria-selected={activeIndex === entry.index}
                      className={`command-item ${activeIndex === entry.index ? "is-active" : ""}`}
                      onMouseEnter={() => setActiveIndex(entry.index)}
                      onClick={() => choose(entry)}
                    >
                      <span
                        className="command-monogram mono"
                        style={{ color: entry.color, borderColor: `${entry.color}55` }}
                      >
                        {entry.monogram}
                      </span>
                      <span className="command-copy">
                        <strong>{entry.name}</strong>
                        <small>{entry.meta}</small>
                      </span>
                      <ArrowRight size={14} className="command-arrow" />
                    </button>
                  ))}
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="command-footer">
        <span>
          <kbd className="mono">↑</kbd>
          <kbd className="mono">↓</kbd> navigate
        </span>
        <span>
          <kbd className="mono">
            <CornerDownLeft size={10} />
          </kbd>{" "}
          open
        </span>
        <span className="command-count mono">{results.length} RESULTS</span>
      </div>
    </OverlayFrame>
  );
}

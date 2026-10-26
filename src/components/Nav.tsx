import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  Command,
  Menu,
  Search,
  X,
} from "lucide-react";
import { LatticeMark } from "./Brand";

const LINKS = [
  { href: "#standings", label: "Leaderboard", id: "standings" },
  { href: "#models", label: "Models", id: "models" },
  { href: "#labs", label: "Labs & capital", id: "labs" },
  { href: "#economy", label: "Economy", id: "economy" },
  { href: "#pricing", label: "Pricing", id: "pricing" },
  { href: "#updates", label: "Updates", id: "updates" },
];

export function Nav({
  onSearch,
  onCompare,
}: {
  onSearch: () => void;
  onCompare: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("standings");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-shell">
        <a href="#top" className="wordmark" aria-label="Lattice home">
          <LatticeMark size={30} />
          <span>
            LATTICE<span className="wordmark-dot">.</span>
          </span>
          <span className="wordmark-tag mono">AI INTELLIGENCE</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.id ? "is-active" : ""}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="nav-search" onClick={onSearch} aria-label="Search models and labs">
            <Search size={15} />
            <span>Search</span>
            <kbd className="mono">
              <Command size={10} /> K
            </kbd>
          </button>
          <button className="button button-lime button-small nav-compare" onClick={onCompare}>
            <ArrowLeftRight size={14} />
            Compare
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-nav-inner">
          <div className="mono mobile-label">INDEX / SECTIONS</div>
          {LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={active === link.id ? "is-active" : ""}
            >
              <span className="mono">0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <div className="mobile-nav-actions">
            <button className="button button-lime" onClick={() => { setMenuOpen(false); onCompare(); }}>
              Compare models
            </button>
            <button className="button button-ghost" onClick={() => { setMenuOpen(false); onSearch(); }}>
              <Search size={15} /> Search the atlas
            </button>
          </div>
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <ScrollProgress />
      </div>
    </header>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="scroll-progress-fill" style={{ transform: `scaleX(${progress})` }} />;
}

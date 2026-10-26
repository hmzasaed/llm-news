import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, BookOpen, Globe2 } from "lucide-react";
import type { Lab } from "../data";
import { GitHubLogo, LinkedInLogo, XLogo } from "./Brand";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  actions,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <Reveal className="section-header">
      <div className="section-heading">
        <div className="section-kicker mono">
          <span className="section-index">{index}</span>
          <span className="section-line" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </Reveal>
  );
}

export function Badge({
  children,
  tone = "neutral",
  dot = false,
}: {
  children: ReactNode;
  tone?: "neutral" | "lime" | "cyan" | "violet" | "orange" | "red";
  dot?: boolean;
}) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot ? <span className="badge-dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function Tilt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    element.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
    element.style.setProperty("--mx", `${x * 100}%`);
    element.style.setProperty("--my", `${y * 100}%`);
  }

  function reset() {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}

export function SocialLinks({ lab, compact = false }: { lab: Lab; compact?: boolean }) {
  const links = [
    { href: lab.socials.x, label: `${lab.name} on X`, icon: <XLogo /> },
    { href: lab.socials.linkedin, label: `${lab.name} on LinkedIn`, icon: <LinkedInLogo /> },
    { href: lab.socials.github, label: `${lab.name} on GitHub`, icon: <GitHubLogo /> },
    { href: lab.socials.blog, label: `${lab.name} research feed`, icon: <BookOpen size={15} /> },
    { href: lab.website, label: `${lab.name} website`, icon: <Globe2 size={15} /> },
  ].filter((link) => Boolean(link.href));

  return (
    <div className={`socials ${compact ? "socials-compact" : ""}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.label}
          title={link.label}
          onClick={(event) => event.stopPropagation()}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`external-link ${className}`}
    >
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export function MicroBars({
  values,
  colors,
  label,
}: {
  values: number[];
  colors?: string[];
  label: string;
}) {
  return (
    <span className="micro-bars" role="img" aria-label={label}>
      {values.map((value, index) => (
        <span
          key={index}
          style={{
            width: `${Math.max(6, Math.min(value, 100))}%`,
            background: colors?.[index] ?? "var(--lime)",
          }}
        />
      ))}
    </span>
  );
}

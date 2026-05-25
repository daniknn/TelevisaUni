import { useState, useEffect, useRef } from "react";

const BRAND = {
  orange: "#FF5900",
  magenta: "#CA2173",
  red: "#F52D1F",
  dark: "#111111",
  midGray: "#767676",
  lightGray: "#E8E7E5",
  offWhite: "#F7F6F4",
  white: "#FFFFFF",
};

const GRADIENT_PRIMARY = `linear-gradient(90deg, ${BRAND.orange} 0%, ${BRAND.magenta} 100%)`;
const GRADIENT_SECONDARY = `linear-gradient(90deg, ${BRAND.orange} 0%, ${BRAND.red} 100%)`;
const GRADIENT_DIAGONAL = `linear-gradient(135deg, ${BRAND.orange} 0%, ${BRAND.magenta} 60%, ${BRAND.red} 100%)`;

const sections = [
  { id: "story",        num: "01", title: "Brand Story" },
  { id: "logo",         num: "02", title: "Logo" },
  { id: "color",        num: "03", title: "Color" },
  { id: "typography",   num: "04", title: "Typography" },
  { id: "gradient",     num: "05", title: "Gradient" },
  { id: "voice",        num: "06", title: "Voice & Tone" },
  { id: "applications", num: "07", title: "Applications" },
] as const;

type SectionId = (typeof sections)[number]["id"];

const palette = [
  { name: "TeleUni Orange",  hex: "#FF5900", rgb: "255, 89, 0",    cmyk: "0, 65, 100, 0",  pantone: "1665 C",         isPrimary: true  },
  { name: "TeleUni Magenta", hex: "#CA2173", rgb: "202, 33, 115",  cmyk: "0, 84, 43, 21",  pantone: "233 C",          isPrimary: true  },
  { name: "TeleUni Red",     hex: "#F52D1F", rgb: "245, 45, 31",   cmyk: "0, 82, 87, 4",   pantone: "485 C",          isPrimary: true  },
  { name: "Near Black",      hex: "#111111", rgb: "17, 17, 17",    cmyk: "0, 0, 0, 93",    pantone: "Black 6 C",      isPrimary: false },
  { name: "Mid Gray",        hex: "#767676", rgb: "118, 118, 118", cmyk: "0, 0, 0, 54",    pantone: "Cool Gray 8 C",  isPrimary: false },
  { name: "Off White",       hex: "#F7F6F4", rgb: "247, 246, 244", cmyk: "0, 0, 1, 3",     pantone: "9181 C",         isPrimary: false },
];

function GradientText({
  children,
  gradient = GRADIENT_PRIMARY,
  className = "",
}: {
  children: React.ReactNode;
  gradient?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="text-[11px] tabular-nums font-medium" style={{ color: "#CCCCCC", letterSpacing: "0.2em" }}>
        {num}
      </span>
      <div className="h-px flex-1 bg-black/8" />
      <span className="text-[11px] font-semibold uppercase" style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}>
        {title}
      </span>
    </div>
  );
}

function GradientBar({ width = "w-8" }: { width?: string }) {
  return <div className={`h-0.5 ${width}`} style={{ background: GRADIENT_PRIMARY }} />;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("story");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -55% 0px" }
    );
    const refs = Object.values(sectionRefs.current);
    refs.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Hanken Grotesk', sans-serif", background: BRAND.offWhite }}>

      {/* ── COVER ─────────────────────────────────────────────────────── */}
      <div
        className="relative h-screen overflow-hidden flex flex-col"
        style={{ background: BRAND.dark }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 65%, rgba(255,89,0,0.16) 0%, rgba(202,33,115,0.1) 55%, transparent 100%)`,
          }}
        />
        <div className="relative z-10 flex items-center justify-between px-12 md:px-16 pt-12">
          <span
            className="text-[11px] font-semibold uppercase"
            style={{ color: BRAND.midGray, letterSpacing: "0.25em" }}
          >
            Brand Guidelines
          </span>
          <span className="text-[11px] font-medium" style={{ color: "#444444", letterSpacing: "0.2em" }}>
            v2.1 — 2025
          </span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-end px-12 md:px-16 pb-20">
          <div className="mb-4">
            <span
              className="text-[11px] font-semibold uppercase"
              style={{ color: BRAND.orange, letterSpacing: "0.35em" }}
            >
              TeleUni
            </span>
          </div>
          <h1
            className="font-bold leading-[0.88] text-white mb-10"
            style={{ fontSize: "clamp(64px, 11vw, 160px)", letterSpacing: "-0.04em" }}
          >
            TELE
            <GradientText gradient={GRADIENT_PRIMARY}>UNI</GradientText>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="max-w-md text-lg leading-relaxed" style={{ color: "#666666" }}>
              Where telecommunications meets excellence. A complete guide to expressing the TeleUni identity with clarity, confidence, and consistency.
            </p>
            <div className="flex items-center gap-6">
              <div className="h-px w-10" style={{ background: BRAND.orange }} />
              <span className="text-[11px] uppercase" style={{ color: "#444444", letterSpacing: "0.2em" }}>
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ───────────────────────────────────────────────── */}
      <div className="flex">

        {/* Sidebar */}
        <nav
          className="hidden lg:flex flex-col sticky top-0 h-screen flex-shrink-0 border-r border-black/8"
          style={{ width: 244, background: BRAND.white }}
        >
          <div className="px-8 pt-10 pb-6">
            <div
              className="text-xl font-bold"
              style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
            >
              TeleUni
            </div>
            <GradientBar width="w-8" />
            <div className="mt-2" />
          </div>

          <ul className="flex-1 px-4 space-y-0.5 overflow-y-auto">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all duration-150"
                    style={{
                      background: isActive ? `${BRAND.orange}12` : "transparent",
                      color: isActive ? BRAND.orange : BRAND.midGray,
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold tabular-nums"
                      style={{ color: isActive ? BRAND.orange : "#CCCCCC", letterSpacing: "0.15em" }}
                    >
                      {s.num}
                    </span>
                    <span className="text-sm font-medium">{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="px-8 pb-8">
            <div className="h-px w-full bg-black/8 mb-5" />
            <p className="text-[11px] leading-relaxed" style={{ color: "#BBBBBB" }}>
              Confidential. For internal and approved partner use only.
            </p>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 min-w-0">

          {/* ── 01 BRAND STORY ──────────────────────────────────────────── */}
          <section
            id="story"
            ref={(el: HTMLElement | null) => { sectionRefs.current["story"] = el; }}
            className="px-10 py-24 md:px-20 border-b border-black/8"
            style={{ background: BRAND.offWhite }}
          >
            <div className="max-w-3xl">
              <SectionHeader num="01" title="Brand Story" />

              <h2
                className="font-bold leading-[1.02] mb-12"
                style={{ fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.035em", color: BRAND.dark }}
              >
                Built for<br />
                <GradientText gradient={GRADIENT_PRIMARY}>the connected world</GradientText>
              </h2>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <p className="text-lg leading-relaxed mb-5" style={{ color: BRAND.dark }}>
                    TeleUni was founded on a singular conviction: that telecommunications is not just an industry — it is the infrastructure of modern human connection. We train the engineers, architects, and leaders who shape the networks billions depend on every day.
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: BRAND.midGray }}>
                    Our brand reflects this ambition. It is direct, technically precise, and unafraid of bold color. Every application of the TeleUni identity should feel purposeful, confident, and unmistakably of its moment.
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-10">
                  <blockquote
                    className="pl-6 border-l-4"
                    style={{ borderColor: BRAND.orange }}
                  >
                    <p
                      className="text-2xl font-semibold leading-snug"
                      style={{ color: BRAND.dark, letterSpacing: "-0.02em" }}
                    >
                      "Networks connect us. Education transforms us."
                    </p>
                    <cite className="mt-4 block text-sm not-italic" style={{ color: BRAND.midGray }}>
                      TeleUni Mission Statement
                    </cite>
                  </blockquote>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "1987", label: "Founded" },
                      { value: "47K+", label: "Alumni" },
                      { value: "120+", label: "Countries" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div
                          className="text-3xl font-bold"
                          style={{ color: BRAND.dark, letterSpacing: "-0.04em" }}
                        >
                          {stat.value}
                        </div>
                        <div
                          className="text-[11px] uppercase mt-1"
                          style={{ color: BRAND.midGray, letterSpacing: "0.12em" }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Precise", "Ambitious", "Collaborative", "Forward-thinking"].map((val) => (
                  <div
                    key={val}
                    className="py-5 px-5 border border-black/8"
                    style={{ background: BRAND.white }}
                  >
                    <div className="w-5 h-0.5 mb-3" style={{ background: BRAND.orange }} />
                    <span className="text-sm font-semibold" style={{ color: BRAND.dark }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 02 LOGO ─────────────────────────────────────────────────── */}
          <section
            id="logo"
            ref={(el: HTMLElement | null) => { sectionRefs.current["logo"] = el; }}
            className="px-10 py-24 md:px-20 border-b border-black/8"
            style={{ background: BRAND.white }}
          >
            <div className="max-w-3xl">
              <SectionHeader num="02" title="Logo" />

              <h2
                className="text-4xl font-bold mb-3"
                style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
              >
                The Wordmark
              </h2>
              <p className="text-lg mb-14" style={{ color: BRAND.midGray }}>
                Set in Neue Haas Grotesk Display Pro. Never recreated, re-typeset, or distorted.
              </p>

              {/* Primary lockup */}
              <div
                className="rounded-sm flex items-center justify-center h-60 mb-3"
                style={{ background: BRAND.offWhite, border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="text-center">
                  <div
                    className="text-6xl font-bold"
                    style={{ color: BRAND.dark, letterSpacing: "-0.045em" }}
                  >
                    TeleUni
                  </div>
                  <div
                    className="mt-3 text-[11px] font-medium uppercase"
                    style={{ color: "#BBBBBB", letterSpacing: "0.28em" }}
                  >
                    Telecommunications University
                  </div>
                </div>
              </div>
              <div className="text-[11px] mb-8" style={{ color: "#BBBBBB" }}>
                Primary lockup — light backgrounds
              </div>

              {/* Dark + gradient */}
              <div className="grid grid-cols-2 gap-3 mb-14">
                <div
                  className="rounded-sm h-48 flex items-center justify-center"
                  style={{ background: BRAND.dark }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white" style={{ letterSpacing: "-0.04em" }}>
                      TeleUni
                    </div>
                    <div
                      className="mt-2 text-[11px] uppercase"
                      style={{ color: "#444444", letterSpacing: "0.22em" }}
                    >
                      Telecommunications University
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-sm h-48 flex items-center justify-center"
                  style={{ background: GRADIENT_DIAGONAL }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white" style={{ letterSpacing: "-0.04em" }}>
                      TeleUni
                    </div>
                    <div
                      className="mt-2 text-[11px] uppercase text-white/60"
                      style={{ letterSpacing: "0.22em" }}
                    >
                      Telecommunications University
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear space */}
              <div
                className="p-8 rounded-sm mb-8"
                style={{ border: "1px solid rgba(0,0,0,0.08)", background: BRAND.offWhite }}
              >
                <div
                  className="text-[11px] font-semibold uppercase mb-8"
                  style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
                >
                  Clear Space Rule
                </div>
                <div className="flex items-center justify-center py-6">
                  <div
                    className="relative px-12 py-8"
                    style={{ border: "1.5px dashed rgba(255,89,0,0.35)" }}
                  >
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono"
                      style={{ color: BRAND.orange }}
                    >
                      ← x →
                    </div>
                    <div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono"
                      style={{ color: BRAND.orange }}
                    >
                      x
                    </div>
                    <span
                      className="text-4xl font-bold"
                      style={{ color: BRAND.dark, letterSpacing: "-0.04em" }}
                    >
                      TeleUni
                    </span>
                  </div>
                </div>
                <p className="mt-8 text-sm leading-relaxed" style={{ color: BRAND.midGray }}>
                  Maintain clear space equal to the cap-height of the letter "T" on all four sides of the wordmark at all times.
                </p>
              </div>

              {/* Incorrect usage */}
              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Incorrect Usage
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Do not stretch",  extra: { transform: "scaleX(1.5)", display: "inline-block" as const } },
                  { label: "Do not rotate",   extra: { transform: "rotate(-18deg)", display: "inline-block" as const } },
                  { label: "Do not outline",  extra: { WebkitTextStroke: `1.5px ${BRAND.dark}`, color: "transparent" } },
                  { label: "Do not recolor",  extra: { color: "#4A90E2" } },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-sm p-4 flex flex-col items-center gap-4"
                    style={{ border: "1px solid #FECDD3", background: "#FFF5F5" }}
                  >
                    <div className="h-10 flex items-center justify-center">
                      <span
                        className="text-xl font-bold"
                        style={{ color: BRAND.dark, letterSpacing: "-0.03em", ...item.extra }}
                      >
                        TeleUni
                      </span>
                    </div>
                    <div
                      className="text-[10px] font-semibold text-center"
                      style={{ color: "#EF4444", letterSpacing: "0.06em" }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 03 COLOR ────────────────────────────────────────────────── */}
          <section
            id="color"
            ref={(el: HTMLElement | null) => { sectionRefs.current["color"] = el; }}
            className="px-10 py-24 md:px-20 border-b border-black/8"
            style={{ background: BRAND.offWhite }}
          >
            <div className="max-w-3xl">
              <SectionHeader num="03" title="Color" />

              <h2
                className="text-4xl font-bold mb-3"
                style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
              >
                Color System
              </h2>
              <p className="text-lg mb-14" style={{ color: BRAND.midGray }}>
                Three brand primaries that convey energy and precision. A neutral system provides structure and balance.
              </p>

              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Primary Palette
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-12">
                {palette.filter((c) => c.isPrimary).map((color) => (
                  <div
                    key={color.hex}
                    className="rounded-sm overflow-hidden"
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div className="h-36" style={{ background: color.hex }} />
                    <div className="p-5" style={{ background: BRAND.white }}>
                      <div className="font-semibold mb-0.5" style={{ color: BRAND.dark }}>
                        {color.name}
                      </div>
                      <div className="font-mono text-sm mb-4" style={{ color: BRAND.midGray }}>
                        {color.hex}
                      </div>
                      <div className="space-y-1.5">
                        {([["RGB", color.rgb], ["CMYK", color.cmyk], ["Pantone", color.pantone]] as [string, string][]).map(([label, val]) => (
                          <div key={label} className="flex justify-between text-[11px]" style={{ color: "#AAAAAA" }}>
                            <span>{label}</span>
                            <span className="font-mono">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Neutral System
              </div>
              <div className="grid grid-cols-3 gap-3 mb-14">
                {palette.filter((c) => !c.isPrimary).map((color) => (
                  <div
                    key={color.hex}
                    className="rounded-sm overflow-hidden"
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="h-20"
                      style={{
                        background: color.hex,
                        border: color.hex === BRAND.offWhite ? "1px solid rgba(0,0,0,0.06)" : undefined,
                      }}
                    />
                    <div className="p-4" style={{ background: BRAND.white }}>
                      <div className="font-semibold text-sm mb-0.5" style={{ color: BRAND.dark }}>
                        {color.name}
                      </div>
                      <div className="font-mono text-xs" style={{ color: BRAND.midGray }}>
                        {color.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Usage Ratio
              </div>
              <div className="flex h-7 rounded-sm overflow-hidden mb-3">
                <div className="flex-[60]" style={{ background: BRAND.offWhite, borderRight: "1px solid rgba(0,0,0,0.08)" }} />
                <div className="flex-[25]" style={{ background: BRAND.dark }} />
                <div className="flex-[10]" style={{ background: GRADIENT_PRIMARY }} />
                <div className="flex-[5]"  style={{ background: BRAND.red }} />
              </div>
              <div className="grid grid-cols-4 text-[11px]" style={{ color: BRAND.midGray }}>
                <span>60% Off White</span>
                <span>25% Near Black</span>
                <span>10% Gradient</span>
                <span>5% Red</span>
              </div>
            </div>
          </section>

          {/* ── 04 TYPOGRAPHY ───────────────────────────────────────────── */}
          <section
            id="typography"
            ref={(el: HTMLElement | null) => { sectionRefs.current["typography"] = el; }}
            className="px-10 py-24 md:px-20 border-b border-black/8"
            style={{ background: BRAND.white }}
          >
            <div className="max-w-3xl">
              <SectionHeader num="04" title="Typography" />

              <h2
                className="text-4xl font-bold mb-3"
                style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
              >
                Neue Haas Grotesk
              </h2>
              <p className="text-lg mb-16" style={{ color: BRAND.midGray }}>
                One family, all weights. Hierarchy is expressed through size, weight, and spacing — never through additional typefaces.
              </p>

              {/* Large specimen */}
              <div className="mb-12 overflow-hidden pb-12" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <div
                  className="font-bold leading-none"
                  style={{ fontSize: "clamp(80px, 16vw, 180px)", letterSpacing: "-0.05em", color: BRAND.dark }}
                >
                  Aa
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] uppercase" style={{ color: "#BBBBBB", letterSpacing: "0.2em" }}>
                    Neue Haas Grotesk Display Pro
                  </span>
                  <span className="text-[11px]" style={{ color: "#BBBBBB", letterSpacing: "0.15em" }}>
                    Medium · Bold
                  </span>
                </div>
              </div>

              {/* Alphabet */}
              <div
                className="text-2xl font-medium leading-relaxed break-all mb-12 pb-12"
                style={{ color: BRAND.dark, letterSpacing: "0.04em", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                <span style={{ color: BRAND.midGray }}>0123456789 @#&%!?.,;:</span>
              </div>

              {/* Scale */}
              <div
                className="text-[11px] font-semibold uppercase mb-6"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Type Scale
              </div>
              <div className="space-y-0">
                {[
                  { label: "Display · 72 · Bold",     cls: "text-6xl font-bold",     tracking: "-0.04em",  sample: "Connected" },
                  { label: "H1 · 48 · Bold",           cls: "text-5xl font-bold",     tracking: "-0.03em",  sample: "Signal Systems" },
                  { label: "H2 · 32 · Semibold",      cls: "text-4xl font-semibold", tracking: "-0.02em",  sample: "Wireless Technology" },
                  { label: "H3 · 24 · Medium",        cls: "text-2xl font-medium",   tracking: "-0.01em",  sample: "Protocol Engineering" },
                  { label: "Body · 18 · Regular",     cls: "text-lg font-normal",    tracking: "0em",      sample: "Advanced study of telecommunications infrastructure, signal propagation, and modern network architecture." },
                  { label: "Caption · 12 · Semibold", cls: "text-xs font-semibold",  tracking: "0.1em",    sample: "FIGURE 1.2 — NETWORK TOPOLOGY DIAGRAM" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline gap-6 py-5"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="w-36 flex-shrink-0 text-[10px] font-medium"
                      style={{ color: "#CCCCCC", letterSpacing: "0.08em" }}
                    >
                      {row.label}
                    </div>
                    <div
                      className={`${row.cls} leading-tight`}
                      style={{ color: BRAND.dark, letterSpacing: row.tracking }}
                    >
                      {row.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 05 GRADIENT ─────────────────────────────────────────────── */}
          <section
            id="gradient"
            ref={(el: HTMLElement | null) => { sectionRefs.current["gradient"] = el; }}
            className="px-10 py-24 md:px-20 border-b border-black/8"
            style={{ background: BRAND.offWhite }}
          >
            <div className="max-w-3xl">
              <SectionHeader num="05" title="Gradient" />

              <h2
                className="text-4xl font-bold mb-3"
                style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
              >
                The Signature Gradient
              </h2>
              <p className="text-lg mb-14" style={{ color: BRAND.midGray }}>
                TeleUni's most distinctive visual element. Use it sparingly and purposefully — it should feel earned, not decorative.
              </p>

              {/* Primary */}
              <div className="rounded-sm h-56 mb-2" style={{ background: GRADIENT_PRIMARY }} />
              <div
                className="flex justify-between text-[11px] font-mono mb-12"
                style={{ color: BRAND.midGray }}
              >
                <span>#FF5900 at 0%</span>
                <span className="hidden md:block">linear-gradient(90deg, #FF5900 0%, #CA2173 100%)</span>
                <span>#CA2173 at 100%</span>
              </div>

              {/* Secondary */}
              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Secondary Gradient
              </div>
              <div className="rounded-sm h-40 mb-2" style={{ background: GRADIENT_SECONDARY }} />
              <div
                className="flex justify-between text-[11px] font-mono mb-14"
                style={{ color: BRAND.midGray }}
              >
                <span>#FF5900 at 0%</span>
                <span className="hidden md:block">linear-gradient(90deg, #FF5900 0%, #F52D1F 100%)</span>
                <span>#F52D1F at 100%</span>
              </div>

              {/* Approved contexts */}
              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Approved Contexts
              </div>
              <div className="grid grid-cols-3 gap-3 mb-12">
                <div
                  className="rounded-sm p-6 flex flex-col justify-between h-40"
                  style={{ background: BRAND.dark }}
                >
                  <GradientText
                    gradient={GRADIENT_PRIMARY}
                    className="text-3xl font-bold"
                    style={{ letterSpacing: "-0.04em" } as React.CSSProperties}
                  >
                    TeleUni
                  </GradientText>
                  <span
                    className="text-[10px] uppercase"
                    style={{ color: "#444444", letterSpacing: "0.18em" }}
                  >
                    Display text
                  </span>
                </div>

                <div
                  className="rounded-sm p-6 flex flex-col justify-between h-40"
                  style={{ background: BRAND.white, border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div>
                    <div className="text-sm font-medium mb-3" style={{ color: BRAND.dark }}>
                      Section divider
                    </div>
                    <div className="h-0.5 w-full" style={{ background: GRADIENT_PRIMARY }} />
                  </div>
                  <span
                    className="text-[10px] uppercase"
                    style={{ color: "#BBBBBB", letterSpacing: "0.18em" }}
                  >
                    Accent rule
                  </span>
                </div>

                <div
                  className="rounded-sm p-6 flex flex-col justify-between h-40"
                  style={{ background: BRAND.white, border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div>
                    <button
                      className="text-white text-sm font-semibold px-5 py-2.5 rounded-sm"
                      style={{ background: GRADIENT_PRIMARY }}
                    >
                      Apply Now
                    </button>
                  </div>
                  <span
                    className="text-[10px] uppercase"
                    style={{ color: "#BBBBBB", letterSpacing: "0.18em" }}
                  >
                    CTA button
                  </span>
                </div>
              </div>

              {/* Don'ts */}
              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Gradient Don'ts
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-sm p-5"
                  style={{ border: "1px solid #FECDD3", background: "#FFF5F5" }}
                >
                  <div
                    className="h-20 rounded-sm mb-3"
                    style={{ background: "linear-gradient(90deg, #FF5900, #CA2173, #4A90E2)" }}
                  />
                  <div className="text-xs font-semibold" style={{ color: "#EF4444" }}>
                    Do not add extra colors to the gradient
                  </div>
                </div>
                <div
                  className="rounded-sm p-5"
                  style={{ border: "1px solid #FECDD3", background: "#FFF5F5" }}
                >
                  <div
                    className="h-20 rounded-sm mb-3"
                    style={{ background: GRADIENT_PRIMARY, opacity: 0.3 }}
                  />
                  <div className="text-xs font-semibold" style={{ color: "#EF4444" }}>
                    Do not use the gradient at reduced opacity
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 06 VOICE & TONE ─────────────────────────────────────────── */}
          <section
            id="voice"
            ref={(el: HTMLElement | null) => { sectionRefs.current["voice"] = el; }}
            className="px-10 py-24 md:px-20 border-b border-black/8"
            style={{ background: BRAND.white }}
          >
            <div className="max-w-3xl">
              <SectionHeader num="06" title="Voice & Tone" />

              <h2
                className="text-4xl font-bold mb-3"
                style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
              >
                How We Speak
              </h2>
              <p className="text-lg mb-14" style={{ color: BRAND.midGray }}>
                TeleUni communicates with the confidence of a technical institution and the warmth of a community. Always expert — never cold.
              </p>

              <div className="space-y-5">
                {[
                  {
                    trait: "Precise",
                    desc: "We say exactly what we mean. Technical accuracy is a sign of respect for our audience.",
                    do: "Our 5G curriculum spans 14 weeks and covers MIMO, beamforming, and NR protocol stacks.",
                    dont: "We offer a comprehensive, cutting-edge 5G program covering all the latest technologies.",
                  },
                  {
                    trait: "Ambitious",
                    desc: "We set a high bar. Our language reflects the conviction that students can and will shape the future.",
                    do: "Graduates lead network teams at Ericsson, Nokia, and Cisco within three years of leaving TeleUni.",
                    dont: "Our graduates go on to have great career opportunities in the telecommunications sector.",
                  },
                  {
                    trait: "Direct",
                    desc: "We do not hide behind jargon or passive voice. Short sentences, active verbs.",
                    do: "Apply by 15 March. Interviews begin 1 April.",
                    dont: "Applications should be submitted prior to the deadline of the 15th of March.",
                  },
                  {
                    trait: "Inclusive",
                    desc: "Telecommunications connects everyone. Our language must too — no assumed backgrounds.",
                    do: "Whether you are joining from industry or straight from undergraduate study, you belong here.",
                    dont: "Our MSc is designed for working industry professionals seeking to advance their careers.",
                  },
                ].map((item) => (
                  <div
                    key={item.trait}
                    className="rounded-sm overflow-hidden"
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className="flex items-start gap-5 px-7 py-5 border-b border-black/8"
                      style={{ background: BRAND.offWhite }}
                    >
                      <div
                        className="w-1 h-5 mt-0.5 flex-shrink-0"
                        style={{ background: GRADIENT_PRIMARY }}
                      />
                      <div>
                        <div
                          className="font-bold text-lg"
                          style={{ color: BRAND.dark, letterSpacing: "-0.02em" }}
                        >
                          {item.trait}
                        </div>
                        <div className="text-sm mt-0.5" style={{ color: BRAND.midGray }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2">
                      <div className="p-7 border-b md:border-b-0 md:border-r border-black/8">
                        <div
                          className="text-[10px] font-bold uppercase mb-3"
                          style={{ color: "#16A34A", letterSpacing: "0.18em" }}
                        >
                          Do
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: BRAND.dark }}>
                          {item.do}
                        </p>
                      </div>
                      <div className="p-7">
                        <div
                          className="text-[10px] font-bold uppercase mb-3"
                          style={{ color: "#EF4444", letterSpacing: "0.18em" }}
                        >
                          Don't
                        </div>
                        <p
                          className="text-sm leading-relaxed line-through decoration-red-300"
                          style={{ color: "#AAAAAA" }}
                        >
                          {item.dont}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 07 APPLICATIONS ─────────────────────────────────────────── */}
          <section
            id="applications"
            ref={(el: HTMLElement | null) => { sectionRefs.current["applications"] = el; }}
            className="px-10 py-24 md:px-20"
            style={{ background: BRAND.offWhite }}
          >
            <div className="max-w-3xl">
              <SectionHeader num="07" title="Applications" />

              <h2
                className="text-4xl font-bold mb-3"
                style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
              >
                Brand in Use
              </h2>
              <p className="text-lg mb-14" style={{ color: BRAND.midGray }}>
                Across every touchpoint the identity should feel consistent — typographically precise, energized by its signature color.
              </p>

              {/* Business card */}
              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Business Card
              </div>
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div
                  className="rounded-sm p-8 h-48 flex flex-col justify-between"
                  style={{ background: BRAND.dark }}
                >
                  <div
                    className="text-2xl font-bold text-white"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    TeleUni
                  </div>
                  <GradientBar width="w-14" />
                </div>
                <div
                  className="rounded-sm p-8 h-48 flex flex-col justify-between"
                  style={{ background: BRAND.white, border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div>
                    <div className="font-bold" style={{ color: BRAND.dark }}>Dr. Amara Diallo</div>
                    <div className="text-xs mt-0.5" style={{ color: BRAND.midGray }}>
                      Head of Wireless Systems
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono" style={{ color: BRAND.midGray }}>
                      a.diallo@teleuni.edu
                    </div>
                    <div className="text-xs font-mono" style={{ color: BRAND.midGray }}>
                      +1 (617) 555-0142
                    </div>
                    <div className="text-xs" style={{ color: "#BBBBBB" }}>
                      teleuni.edu
                    </div>
                  </div>
                </div>
              </div>

              {/* Email header */}
              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Email Header
              </div>
              <div
                className="rounded-sm overflow-hidden mb-12"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="h-1.5" style={{ background: GRADIENT_PRIMARY }} />
                <div
                  className="px-10 py-5 flex items-center justify-between"
                  style={{ background: BRAND.dark }}
                >
                  <div
                    className="text-xl font-bold text-white"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    TeleUni
                  </div>
                  <div className="hidden md:flex gap-8">
                    {["Programs", "Research", "Alumni", "Apply"].map((item) => (
                      <span
                        key={item}
                        className="text-xs cursor-pointer transition-colors duration-150"
                        style={{ color: "#555555" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social banner */}
              <div
                className="text-[11px] font-semibold uppercase mb-4"
                style={{ color: BRAND.midGray, letterSpacing: "0.18em" }}
              >
                Social Media Banner
              </div>
              <div
                className="rounded-sm h-64 flex items-center justify-center mb-16"
                style={{ background: GRADIENT_DIAGONAL }}
              >
                <div className="text-center text-white px-8">
                  <div
                    className="text-[11px] uppercase mb-5 opacity-70"
                    style={{ letterSpacing: "0.28em" }}
                  >
                    Open Applications — 2025/26
                  </div>
                  <div
                    className="text-4xl font-bold leading-tight mb-5"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Shape the Networks<br />of Tomorrow
                  </div>
                  <div className="text-sm opacity-60">teleuni.edu/apply</div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-12" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex items-end justify-between">
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: BRAND.dark, letterSpacing: "-0.03em" }}
                    >
                      TeleUni
                    </div>
                    <div
                      className="text-[11px] mt-1"
                      style={{ color: "#BBBBBB", letterSpacing: "0.1em" }}
                    >
                      Brand Guidelines v2.1
                    </div>
                  </div>
                  <div className="text-right text-[11px]" style={{ color: "#BBBBBB" }}>
                    <div>Confidential &amp; Proprietary</div>
                    <div>© 2025 TeleUni. All rights reserved.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

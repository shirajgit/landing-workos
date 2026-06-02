import { useState, useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────
   HERO_POSTERS = hero carousel slides (embedded so they render immediately).
   For production, host the included workforceos-hero-1.jpg / -2.jpg and put URLs here.
   They auto-rotate; pause on hover. Add/remove items to change the rotation.
   DEMO_URL: your live demo / Loom / YouTube link.
──────────────────────────────────────────────────────────── */
const HERO_POSTERS =  [
  "/public/poster1.jpeg",
  "/public/poster2.png",
  "/public/poster3.jpeg",
  "/public/poster4.jpg",
]
const DEMO_URL = "https://your-demo-link.example.com";

const c = {
  bg: "var(--bg)",
  bgAlt: "var(--bg-alt)",
  ink: "var(--ink)",
  sub: "var(--sub)",
  line: "var(--line)",
  accent: "var(--accent)",
  accentText: "var(--accent)",
  accentSoft: "var(--accent-soft)",
  dark: "var(--band)",
};

const FONT = "'Hanken Grotesk', -apple-system, system-ui, sans-serif";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* Minimal line icons (no emoji) */
const Icon = ({ d, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const icons = {
  team: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  tasks: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></>,
  pipeline: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 6a9 9 0 0 1-9 9" /><circle cx="18" cy="6" r="3" /></>,
  chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 4-5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />,
};

const features = [
  { icon: "team", title: "Team management", desc: "Create users, assign roles, and control access across recruiters, callers, and bidders." },
  { icon: "tasks", title: "Task tracking", desc: "Assign work, set deadlines, and follow progress without chasing status updates." },
  { icon: "upload", title: "Submissions", desc: "Set daily submission targets and watch actuals against them in real time." },
  { icon: "pipeline", title: "Interview pipeline", desc: "Track every candidate from first screen to final offer in one view." },
  { icon: "chat", title: "Built-in chat", desc: "Keep conversations next to the work instead of in a separate app." },
  { icon: "chart", title: "Analytics", desc: "Performance metrics and KPIs that managers can act on, not just admire." },
];

const steps = [
  { n: 1, title: "Add your team", desc: "Invite recruiters, callers, and bidders in a couple of minutes." },
  { n: 2, title: "Assign roles", desc: "Give each person the right permissions for their work." },
  { n: 3, title: "Track the work", desc: "Follow candidates, submissions, and tasks as they move." },
  { n: 4, title: "Review results", desc: "Use reports to see what's working and where to focus." },
];

const plans = [
  { name: "Starter", price: "₹0", period: "forever", features: ["Up to 5 users", "100 candidates", "Basic reports", "Email support"], cta: "Start free", highlight: false },
  { name: "Pro", price: "₹999", period: "per month", features: ["Unlimited users", "Unlimited candidates", "Full analytics", "Team chat", "Priority support", "API access"], cta: "Start Pro trial", highlight: true },
  { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Pro", "Dedicated manager", "Custom integrations", "SLA", "On-premise option"], cta: "Contact sales", highlight: false },
];

const testimonials = [
  { text: "We finally have one place to see the whole pipeline. Status meetings got shorter overnight.", name: "Priya Sharma", role: "HR Manager, TechCorp" },
  { text: "Adoption was quick. Tracking submissions and interviews is genuinely simple now.", name: "Arjun Mehta", role: "Talent Lead, ScaleUp" },
  { text: "The reporting paid for itself. We cut two weeks off our average hiring cycle.", name: "Sneha Verma", role: "Recruitment Head, NexaHire" },
];

/* Clean, sharp product mockup (real text, light UI) */
function ProductMockup() {
  return (
    <div style={{ border: `1px solid ${c.line}`, borderRadius: 12, overflow: "hidden", background: "var(--surface)", boxShadow: "0 12px 40px -18px rgba(15,19,32,.22)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 14px", borderBottom: `1px solid ${c.line}`, background: c.bgAlt }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e4e6eb" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e4e6eb" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e4e6eb" }} />
        <span style={{ marginLeft: 10, fontSize: 12, color: c.sub }}>app.workforceos.com / dashboard</span>
      </div>
      <div style={{ display: "flex", minHeight: 300 }}>
        <div style={{ width: 150, borderRight: `1px solid ${c.line}`, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {["Overview", "Candidates", "Submissions", "Interviews", "Reports"].map((l, i) => (
            <div key={l} style={{ fontSize: 13, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? c.ink : c.sub, background: i === 0 ? c.accentSoft : "transparent", padding: "8px 10px", borderRadius: 7 }}>{l}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
            {[["Candidates", "1,248", "+12%"], ["Submissions", "342", "+8%"], ["Interviews", "89", "+5%"]].map(([l, v, d]) => (
              <div key={l} style={{ border: `1px solid ${c.line}`, borderRadius: 9, padding: "10px 12px" }}>
                <div style={{ fontSize: 11, color: c.sub }}>{l}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 3 }}>
                  <span style={{ fontSize: 19, fontWeight: 700, color: c.ink }}>{v}</span>
                  <span style={{ fontSize: 11, color: "#16a34a" }}>{d}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ border: `1px solid ${c.line}`, borderRadius: 9, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: c.sub, marginBottom: 8 }}>Submissions this week</div>
            <svg viewBox="0 0 320 70" width="100%" height="70" preserveAspectRatio="none">
              <polyline points="0,55 50,40 100,46 150,24 200,34 260,14 320,22" fill="none" stroke={c.accent} strokeWidth="2.2" />
            </svg>
          </div>
          {[["Rahul Kapoor", "Interview"], ["Anita Menon", "Submitted"], ["Dev Sharma", "Screening"]].map(([n, s]) => (
            <div key={n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderTop: `1px solid ${c.line}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: c.accentSoft, color: c.accent, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{n[0]}</span>
                <span style={{ fontSize: 13, color: c.ink }}>{n}</span>
              </div>
              <span style={{ fontSize: 11, color: c.sub, border: `1px solid ${c.line}`, borderRadius: 20, padding: "2px 10px" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* Auto-rotating hero carousel: cross-fade, dots, pause on hover, reduced-motion aware */
function HeroCarousel({ images, interval = 5000, fill = false }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (images.length < 2 || paused) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI(p => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, paused, interval]);
  const wrap = fill
    ? { position: "absolute", inset: 0, overflow: "hidden", background: c.bgAlt }
    : { position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${c.line}`, boxShadow: "0 24px 60px -30px rgba(15,19,32,.35)", aspectRatio: "16 / 10", background: c.bgAlt, animation: "rise .6s ease both" };
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={wrap}>
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`WorkforceOS in use, slide ${idx + 1}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: idx === i ? 1 : 0, transition: "opacity .8s ease" }} />
      ))}
      {images.length > 1 && (
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8, zIndex: 3 }}>
          {images.map((_, idx) => (
            <button key={idx} aria-label={`Go to slide ${idx + 1}`} onClick={() => setI(idx)}
              style={{ width: idx === i ? 22 : 8, height: 8, borderRadius: 20, border: "none", cursor: "pointer", padding: 0, background: idx === i ? "#fff" : "rgba(255,255,255,.55)", boxShadow: "0 1px 3px rgba(0,0,0,.35)", transition: "width .25s, background .25s" }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkforceOSLanding() {
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState(() => (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");
  const [scrolled, setScrolled] = useState(false);
  const [fRef, fIn] = useInView(0.1);
  const [pRef, pIn] = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = ["Features", "How it works", "Pricing", "Customers"];
  const goTo = (id) => { setMenu(false); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  const openDemo = () => window.open(DEMO_URL, "_blank", "noopener,noreferrer");

  return (
    <div data-theme={theme} style={{ background: c.bg, color: c.ink, fontFamily: FONT, minHeight: "100vh", overflowX: "hidden", transition: "background-color .25s ease, color .25s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        [data-theme="light"] {
          --bg:#ffffff; --bg-alt:#f6f7f9; --surface:#ffffff;
          --ink:#0f1320; --sub:#5b6473; --line:#e6e8ee;
          --accent:#1d4ed8; --accent-soft:#eef2ff; --band:#0f1320; --nav-bg:rgba(255,255,255,.85);
        }
        [data-theme="dark"] {
          --bg:#0b0f17; --bg-alt:#0f1420; --surface:#141a26;
          --ink:#f2f5fa; --sub:#9aa4b6; --line:#242b3a;
          --accent:#7aa2ff; --accent-soft:rgba(122,162,255,.14); --band:#141a26; --nav-bg:rgba(11,15,23,.82);
        }
        @keyframes rise { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:none; } }
        a { color: inherit; }
        .lnk { color: ${c.sub}; text-decoration: none; font-size: 15px; font-weight: 500; cursor: pointer; }
        .lnk:hover { color: ${c.ink}; }
        .btn { font-family: ${FONT}; font-weight: 600; cursor: pointer; border-radius: 9px; font-size: 15px; transition: background .15s, border-color .15s; }
        .btn-pri { background: ${c.accent}; color: #fff; border: 1px solid ${c.accent}; padding: 11px 20px; }
        .btn-pri:hover { filter: brightness(0.94); }
        .btn-sec { background: var(--surface); color: ${c.ink}; border: 1px solid ${c.line}; padding: 11px 20px; }
        .btn-sec:hover { border-color: #c7ccd6; }
        .card { background: var(--surface); border:1px solid ${c.line}; border-radius: 14px; }
        .feat:hover { border-color:#c7ccd6; }
        .mtoggle { display:none; }
        @media (max-width: 900px) {
          .dnav, .dact { display:none !important; }
          .mtoggle { display:inline-flex !important; }
          .g3 { grid-template-columns: 1fr !important; }
          .split { grid-template-columns: 1fr !important; }
          .steps { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .steps { grid-template-columns: 1fr !important; }
          .logos { gap: 20px !important; }
        }
        .hero { position: relative; display: flex; align-items: center; min-height: calc(100vh - 64px); overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(90deg, rgba(10,13,22,.92) 0%, rgba(10,13,22,.62) 42%, rgba(10,13,22,.12) 100%); }
        .hero-inner { position: relative; z-index: 2; width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px; }
        .hero-copy { max-width: 600px; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #fff; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.25); padding: 5px 12px; border-radius: 20px; margin-bottom: 20px; backdrop-filter: blur(4px); }
        .hero-h1 { font-size: clamp(34px, 5vw, 60px); font-weight: 800; letter-spacing: -0.025em; line-height: 1.06; color: #fff; }
        .hero-sub { margin-top: 18px; font-size: 18px; line-height: 1.6; color: rgba(255,255,255,.82); }
        .hero-note { margin-top: 14px; font-size: 13px; color: rgba(255,255,255,.7); }
        @media (max-width: 820px) {
          .hero { min-height: auto; padding: 30px 0 4px; background: #fff; }
          .hero-bg, .hero-scrim { display: none !important; }
          .hero-eyebrow { color: ${c.accent}; background: ${c.accentSoft}; border-color: #dbe3ff; backdrop-filter: none; }
          .hero-h1 { color: ${c.ink}; }
          .hero-sub { color: ${c.sub}; }
          .hero-note { color: ${c.sub}; }
        }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "var(--nav-bg)", backdropFilter: "blur(10px)", borderBottom: scrolled ? `1px solid ${c.line}` : "1px solid transparent", transition: "border-color .2s" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", height: 64, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>W</div>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>WorkforceOS</span>
          </div>
          <nav className="dnav" style={{ display: "flex", gap: 28 }}>
            {nav.map(l => <span key={l} className="lnk" onClick={() => goTo(l.toLowerCase().replace(/ /g, "-"))}>{l}</span>)}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="dact" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="lnk" style={{ fontWeight: 600 }}>Log in</span>
              <button className="btn btn-pri" onClick={() => goTo("pricing")}>Get started</button>
            </div>
            <button className="themebtn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} aria-label="Toggle dark mode" style={{ background: "var(--surface)", border: `1px solid ${c.line}`, color: c.ink, width: 40, height: 40, borderRadius: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
              <Icon d={theme === "dark" ? icons.sun : icons.moon} size={18} />
            </button>
            <button className="btn mtoggle" onClick={() => setMenu(v => !v)} style={{ background: "var(--surface)", border: `1px solid ${c.line}`, color: c.ink, width: 40, height: 40, alignItems: "center", justifyContent: "center", padding: 0 }} aria-label="Menu">
              <Icon d={menu ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>} size={20} />
            </button>
          </div>
        </div>
        {menu && (
          <div style={{ borderTop: `1px solid ${c.line}`, padding: "12px 24px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
            {nav.map(l => <span key={l} className="lnk" style={{ padding: "10px 0", fontSize: 16 }} onClick={() => goTo(l.toLowerCase().replace(/ /g, "-"))}>{l}</span>)}
            <button className="btn btn-pri" style={{ marginTop: 8 }} onClick={() => goTo("pricing")}>Get started</button>
          </div>
        )}
      </header>

      {/* FULL-BLEED HERO: image covers desktop, hidden on phone, content overlaid */}
      <section className="hero">
        <div className="hero-bg"><HeroCarousel images={HERO_POSTERS} fill /></div>
        <div className="hero-scrim" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> Now live for modern recruitment teams
            </div>
            <h1 className="hero-h1">Run your recruitment team from one clear dashboard</h1>
            <p className="hero-sub">WorkforceOS gives recruiters, callers, bidders, and managers a single place to track candidates, interviews, submissions, tasks, and team performance.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button className="btn btn-pri" style={{ padding: "13px 24px", fontSize: 16 }} onClick={() => goTo("pricing")}>Start free trial</button>
              <button className="btn btn-sec" style={{ padding: "13px 24px", fontSize: 16 }} onClick={openDemo}>Watch demo</button>
            </div>
            <p className="hero-note">No credit card required · Set up in minutes</p>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "44px 24px 8px" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: c.sub, textTransform: "uppercase", marginBottom: 20 }}>Trusted by recruitment teams across India</p>
        <div className="logos" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 44, opacity: 0.6 }}>
          {["TechCorp", "ScaleUp", "NexaHire", "Hirewell", "TalentGrid"].map(n => (
            <span key={n} style={{ fontWeight: 700, fontSize: 18, color: c.ink, letterSpacing: "-0.01em" }}>{n}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" ref={fRef} style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ maxWidth: 620, marginBottom: 44 }}>
          <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.12 }}>Everything your team needs, nothing it doesn't</h2>
          <p style={{ marginTop: 14, fontSize: 17, color: c.sub, lineHeight: 1.6 }}>Built around how recruitment teams actually work — clear ownership, fewer tabs, and numbers you can trust.</p>
        </div>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={f.title} className="card feat" style={{ padding: 24, transition: "border-color .15s", animation: fIn ? `rise .5s ${i * 0.05}s both` : "none" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: c.accentSoft, color: c.accent, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon d={icons[f.icon]} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 7 }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: c.sub, lineHeight: 1.55 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT SPLIT */}
      <section style={{ background: c.bgAlt, borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}` }}>
        <div className="split" style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 56, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>A command center for hiring</h2>
            <p style={{ fontSize: 16, color: c.sub, lineHeight: 1.65, marginBottom: 24 }}>Every metric, candidate, and conversation in one view. Stop stitching spreadsheets together and start running a real operation.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {["Real-time updates across the whole team", "Role-based access with fine-grained control", "Candidate tracking through every stage", "Reporting managers will actually use"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ color: c.accent, display: "flex" }}><Icon d={<path d="M20 6 9 17l-5-5" />} size={18} /></span>
                  <span style={{ fontSize: 15, color: c.ink }}>{t}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-pri" style={{ marginTop: 28, padding: "12px 22px" }} onClick={() => goTo("pricing")}>Start free trial</button>
          </div>
          <ProductMockup />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ maxWidth: 560, marginBottom: 44 }}>
          <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Up and running in minutes</h2>
        </div>
        <div className="steps" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {steps.map(s => (
            <div key={s.n} style={{ paddingTop: 20, borderTop: `2px solid ${c.line}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.accent, marginBottom: 10 }}>0{s.n}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 7 }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: c.sub, lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="customers" style={{ background: c.bgAlt, borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px" }}>
          <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 44 }}>What teams are saying</h2>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {testimonials.map(t => (
              <div key={t.name} className="card" style={{ padding: 24, background: "var(--surface)" }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: c.ink, marginBottom: 22 }}>“{t.text}”</p>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ width: 38, height: 38, borderRadius: "50%", background: c.accentSoft, color: c.accent, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.name[0]}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: c.sub }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={pRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 44px" }}>
          <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Simple, transparent pricing</h2>
          <p style={{ marginTop: 14, fontSize: 17, color: c.sub }}>Start free. Upgrade when your team grows.</p>
        </div>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
          {plans.map((p, i) => (
            <div key={p.name} className="card" style={{ padding: 28, position: "relative", borderColor: p.highlight ? c.accent : c.line, borderWidth: p.highlight ? 2 : 1, boxShadow: p.highlight ? "0 16px 40px -22px rgba(29,78,216,.5)" : "none", animation: pIn ? `rise .5s ${i * 0.06}s both` : "none" }}>
              {p.highlight && <div style={{ position: "absolute", top: -11, left: 24, background: c.accent, color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>Most popular</div>}
              <div style={{ fontSize: 14, fontWeight: 700, color: c.sub, marginBottom: 12 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em" }}>{p.price}</span>
                {p.period && <span style={{ fontSize: 14, color: c.sub }}>/ {p.period}</span>}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 24 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: c.ink }}>
                    <span style={{ color: c.accent, display: "flex" }}><Icon d={<path d="M20 6 9 17l-5-5" />} size={16} /></span>{f}
                  </li>
                ))}
              </ul>
              <button className={`btn ${p.highlight ? "btn-pri" : "btn-sec"}`} style={{ width: "100%", padding: "12px" }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", background: c.dark, borderRadius: 20, padding: "56px 40px", textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>Ready to scale your recruitment team?</h2>
          <p style={{ fontSize: 17, color: "#aeb6c6", maxWidth: 460, margin: "0 auto 28px", lineHeight: 1.6 }}>Manage candidates, submissions, and interviews from one place.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn" style={{ background: "#fff", color: "#0f1320", border: "1px solid #fff", padding: "13px 26px", fontSize: 16 }} onClick={() => goTo("pricing")}>Get started free</button>
            <button className="btn" style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.3)", padding: "13px 26px", fontSize: 16 }} onClick={openDemo}>Book a demo</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${c.line}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 24px 32px" }}>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36, marginBottom: 36 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: c.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>W</div>
                <span style={{ fontWeight: 800, fontSize: 17 }}>WorkforceOS</span>
              </div>
              <p style={{ fontSize: 14, color: c.sub, lineHeight: 1.6, maxWidth: 240 }}>The recruitment OS for modern hiring teams.</p>
            </div>
            {[["Product", ["Features", "Pricing", "Changelog", "Roadmap"]], ["Company", ["About", "Blog", "Careers", "Contact"]], ["Legal", ["Privacy", "Terms", "Security", "Cookies"]]].map(([title, links]) => (
              <div key={title}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>{title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {links.map(l => <a key={l} href="#" style={{ fontSize: 14, color: c.sub, textDecoration: "none" }}>{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${c.line}`, paddingTop: 22, fontSize: 13, color: c.sub }}>© 2025 WorkforceOS. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
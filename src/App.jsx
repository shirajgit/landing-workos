 import { useState, useEffect, useRef } from "react";

const theme = {
  bg: "#0b1020",
  accent: "#6c63ff",
  accent2: "#8b5cf6",
  blue: "#3b82f6",
  green: "#10b981",
};

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

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const GlassCard = ({ children, style = {}, className = "" }) => (
  <div className={className} style={{
    background: "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 20,
    boxShadow: "0 20px 60px rgba(108,99,255,.18), inset 0 1px 0 rgba(255,255,255,.08)",
    ...style,
  }}>
    {children}
  </div>
);

const features = [
  { icon: "👥", title: "Team Management", desc: "Create users, define roles, and manage access with precision across your whole org." },
  { icon: "📋", title: "Task Tracking", desc: "Assign tasks, set deadlines, and monitor real-time progress with smart workflows." },
  { icon: "📤", title: "Resume Submissions", desc: "Track daily submission targets against actuals with automated progress indicators." },
  { icon: "🎯", title: "Interview Pipeline", desc: "Monitor every candidate across all stages — from screening to final offer." },
  { icon: "💬", title: "Team Chat", desc: "Real-time communication built in — no more switching between apps." },
  { icon: "📊", title: "Analytics Dashboard", desc: "Live performance metrics, KPIs, and insights that actually drive decisions." },
];

const testimonials = [
  { stars: 5, text: "Workforce OS completely transformed how we manage our recruitment pipeline. The visibility we have now is unmatched.", name: "Priya Sharma", role: "HR Manager, TechCorp" },
  { stars: 5, text: "From day one, the team adoption was seamless. Tracking submissions and interviews has never been this intuitive.", name: "Arjun Mehta", role: "Talent Lead, ScaleUp India" },
  { stars: 5, text: "The analytics dashboard alone is worth it. We cut our hiring cycle by 40% in two months.", name: "Sneha Verma", role: "Recruitment Head, NexaHire" },
];

const plans = [
  { name: "Starter", price: "₹0", period: "/forever", color: theme.blue, features: ["Up to 5 users", "100 candidates", "Basic analytics", "Email support"], cta: "Get Started Free" },
  { name: "Pro", price: "₹999", period: "/month", color: theme.accent, highlight: true, features: ["Unlimited users", "Unlimited candidates", "Full analytics suite", "Team chat", "Priority support", "API access"], cta: "Start Pro Trial" },
  { name: "Enterprise", price: "Custom", period: "", color: theme.green, features: ["Everything in Pro", "Dedicated account manager", "Custom integrations", "SLA guarantee", "On-premise option"], cta: "Contact Sales" },
];

const steps = [
  { num: "01", title: "Add Team Members", desc: "Invite recruiters, callers, and bidders in seconds." },
  { num: "02", title: "Assign Roles", desc: "Set granular permissions for every role in your org." },
  { num: "03", title: "Track Workflows", desc: "Monitor candidates, submissions, and tasks in real time." },
  { num: "04", title: "Analyze Performance", desc: "Get AI-powered insights and optimize your pipeline." },
];

// Orb / ambient glow
function OrbBG() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)",
        top: -200, left: -200, filter: "blur(40px)",
        animation: "orbFloat 8s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)",
        top: "40%", right: -150, filter: "blur(40px)",
        animation: "orbFloat 10s ease-in-out infinite alternate-reverse",
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
        bottom: 0, left: "40%", filter: "blur(50px)",
        animation: "orbFloat 12s ease-in-out infinite alternate",
      }} />
    </div>
  );
}

// Floating stats card
function FloatingCard({ style, icon, label, value, color }) {
  return (
    <GlassCard style={{ padding: "14px 20px", minWidth: 160, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 22 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "'Syne', sans-serif" }}>{value}</div>
        </div>
      </div>
    </GlassCard>
  );
}

// Mock dashboard visual
function DashboardMockup() {
  return (
    <GlassCard style={{ padding: 0, overflow: "hidden", borderRadius: 24, minHeight: 340, position: "relative" }}>
      {/* Header bar */}
      <div style={{ background: "rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.08)", padding: "14px 22px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 16, fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'DM Sans', sans-serif" }}>workforce-os.app / dashboard</span>
      </div>
      {/* Sidebar + content */}
      <div style={{ display: "flex", minHeight: 300 }}>
        {/* Sidebar */}
        <div style={{ width: 56, borderRight: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 18, gap: 18 }}>
          {["🏠","👥","📋","📊","💬"].map((ic, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: i === 0 ? "rgba(108,99,255,.3)" : "transparent", cursor: "pointer" }}>{ic}</div>
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Stat row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              { label: "Candidates", val: "1,248", color: theme.accent },
              { label: "Submissions", val: "342", color: theme.blue },
              { label: "Interviews", val: "89", color: theme.green },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "'Syne', sans-serif" }}>{s.val}</div>
              </div>
            ))}
          </div>
          {/* Fake chart */}
          <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,.06)", flex: 1 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>Weekly Submissions</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
              {[40,65,50,80,55,90,72].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: `linear-gradient(180deg, ${theme.accent}, ${theme.accent2})`, borderRadius: "4px 4px 0 0", opacity: 0.8 + i * 0.02 }} />
              ))}
            </div>
          </div>
          {/* Candidate row */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { name: "Rahul K.", stage: "Interview", color: theme.blue },
              { name: "Anita M.", stage: "Submitted", color: theme.green },
              { name: "Dev S.", stage: "Screening", color: theme.accent },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,.03)", borderRadius: 8, padding: "7px 12px", border: "1px solid rgba(255,255,255,.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${c.color}, ${theme.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{c.name[0]}</div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)", fontFamily: "'DM Sans', sans-serif" }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}44`, fontFamily: "'DM Sans', sans-serif" }}>{c.stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default function WorkforceOSLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [featRef, featInView] = useInView(0.1);
  const [stepsRef, stepsInView] = useInView(0.1);
  const [testRef, testInView] = useInView(0.1);
  const [pricingRef, pricingInView] = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Features", "How It Works", "Testimonials", "Pricing"];

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes orbFloat { from { transform: translateY(0) scale(1); } to { transform: translateY(-40px) scale(1.08); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(108,99,255,.4)} 50%{box-shadow:0 0 0 16px rgba(108,99,255,0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .nav-link { color:rgba(255,255,255,.6); text-decoration:none; font-size:15px; transition:color .2s; }
        .nav-link:hover { color:#fff; }
        .btn-primary { background:linear-gradient(135deg,#6c63ff,#8b5cf6); color:#fff; border:none; padding:14px 32px; border-radius:12px; font-size:16px; font-weight:600; cursor:pointer; transition:transform .2s, box-shadow .2s; font-family:'DM Sans',sans-serif; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(108,99,255,.5); }
        .btn-outline { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.25); padding:14px 32px; border-radius:12px; font-size:16px; font-weight:500; cursor:pointer; transition:all .2s; font-family:'DM Sans',sans-serif; }
        .btn-outline:hover { background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.5); }
        .feat-card { transition:transform .25s, box-shadow .25s; }
        .feat-card:hover { transform:translateY(-6px); box-shadow:0 30px 80px rgba(108,99,255,.25) !important; }
        .test-card { transition:transform .25s; }
        .test-card:hover { transform:translateY(-4px); }
        .price-card { transition:transform .25s, box-shadow .25s; }
        .price-card:hover { transform:translateY(-8px); }
        .step-line { border-left:2px dashed rgba(108,99,255,.3); }
        ::-webkit-scrollbar { width:6px; } 
        ::-webkit-scrollbar-track { background:#0b1020; }
        ::-webkit-scrollbar-thumb { background:rgba(108,99,255,.4); border-radius:3px; }
      `}</style>

      <OrbBG />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        background: scrolled ? "rgba(11,16,32,.85)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "none",
        transition: "all .3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6c63ff, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, animation: "pulse 3s infinite" }}>⚡</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>Workforce<span style={{ color: theme.accent }}>OS</span></span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {navLinks.map(l => <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="nav-link">{l}</a>)}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-outline" style={{ padding: "10px 22px", fontSize: 14 }}>Log In</button>
          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>Start Free</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 120, paddingBottom: 80, padding: "120px 40px 80px" }}>
        {/* Pill badge */}
        <div style={{ animation: heroInView ? "fadeIn .6s ease forwards" : "none", opacity: 0, marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,99,255,.15)", border: "1px solid rgba(108,99,255,.3)", borderRadius: 40, padding: "6px 18px", fontSize: 13, color: "rgba(255,255,255,.8)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: theme.green, display: "inline-block", animation: "pulse 2s infinite" }} />
            Now live — Real-time recruitment OS for modern teams
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5.5vw, 76px)",
          lineHeight: 1.08, textAlign: "center", maxWidth: 900, letterSpacing: "-2px",
          animation: heroInView ? "fadeUp .8s .1s ease forwards" : "none", opacity: 0,
          background: "linear-gradient(135deg, #fff 40%, rgba(139,92,246,.9) 100%)",
          backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Manage Your Recruitment Team From One Powerful Dashboard
        </h1>

        <p style={{
          marginTop: 24, maxWidth: 620, textAlign: "center", fontSize: 18, lineHeight: 1.7,
          color: "rgba(255,255,255,.55)", fontWeight: 400,
          animation: heroInView ? "fadeUp .8s .25s ease forwards" : "none", opacity: 0,
        }}>
          Workforce OS helps recruiters, callers, bidders, and managers track candidates, interviews, submissions, tasks, and team performance — all in one place.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", justifyContent: "center", animation: heroInView ? "fadeUp .8s .4s ease forwards" : "none", opacity: 0 }}>
          <button className="btn-primary" style={{ fontSize: 17, padding: "16px 36px", display: "flex", alignItems: "center", gap: 8 }}>🚀 Start Free Trial</button>
          <button className="btn-outline" style={{ fontSize: 17, padding: "16px 36px", display: "flex", alignItems: "center", gap: 8 }}>▶ Watch Demo</button>
        </div>

        {/* Dashboard visual + floating cards */}
        <div style={{ position: "relative", marginTop: 70, width: "100%", maxWidth: 900, animation: heroInView ? "fadeUp 1s .55s ease forwards" : "none", opacity: 0 }}>
          <DashboardMockup />
          {/* Floating cards */}
          <div style={{ position: "absolute", top: -24, left: -36, animation: "float 4s ease-in-out infinite" }}>
            <FloatingCard icon="🎯" label="Today's Targets" value="12/15" color={theme.green} />
          </div>
          <div style={{ position: "absolute", top: 40, right: -40, animation: "float 5s ease-in-out infinite .5s" }}>
            <FloatingCard icon="📤" label="Submissions" value="+48" color={theme.accent} />
          </div>
          <div style={{ position: "absolute", bottom: -24, left: 60, animation: "float 4.5s ease-in-out infinite 1s" }}>
            <FloatingCard icon="✅" label="Interviews Done" value="7 today" color={theme.blue} />
          </div>
          <div style={{ position: "absolute", bottom: 20, right: -30, animation: "float 6s ease-in-out infinite .3s" }}>
            <FloatingCard icon="⚡" label="Team Online" value="24 / 27" color={theme.accent2} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <GlassCard style={{ padding: "48px 40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
              {[
                { val: 5000, suffix: "+", label: "Candidates Managed", color: theme.accent },
                { val: 10000, suffix: "+", label: "Resume Submissions", color: theme.blue },
                { val: 95, suffix: "%", label: "Workflow Efficiency", color: theme.green },
                { val: 24, suffix: "/7", label: "Team Collaboration", color: theme.accent2 },
              ].map((s, i) => (
                <div key={i} style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,.07)" : "none", padding: "0 16px" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 42, color: s.color, letterSpacing: "-1px" }}>
                    <AnimatedCounter target={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ marginTop: 8, fontSize: 14, color: "rgba(255,255,255,.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" ref={featRef} style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, letterSpacing: 3, color: theme.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Features</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Everything Your Recruitment Team Needs
            </h2>
            <p style={{ marginTop: 18, fontSize: 17, color: "rgba(255,255,255,.5)", maxWidth: 540, margin: "18px auto 0" }}>Built for speed, designed for scale — Workforce OS covers every angle of your hiring workflow.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f, i) => (
              <GlassCard key={i} className="feat-card" style={{ padding: "32px 28px", animationDelay: `${i * 0.08}s`, animation: featInView ? `fadeUp .7s ${i * 0.08}s ease forwards` : "none", opacity: 0 }}>
                <div style={{ fontSize: 40, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.55)" }}>{f.desc}</p>
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: theme.accent, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                  Learn more <span style={{ fontSize: 18 }}>→</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD SHOWCASE ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <DashboardMockup />
          <div>
            <div style={{ fontSize: 13, letterSpacing: 3, color: theme.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Dashboard</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 24 }}>
              Your Command Center for Hiring
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.55)", marginBottom: 36 }}>
              Every metric, every candidate, every conversation — visible at a glance. Stop juggling spreadsheets and start running a real operation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Real-time updates across your entire team", "Role-based access with fine-grained controls", "Candidate tracking through every pipeline stage", "Team performance analytics and goal tracking", "Modern SaaS UI built for daily power users"].map((point, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(16,185,129,.2)", border: "1px solid rgba(16,185,129,.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, color: theme.green }}>✓</div>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,.75)" }}>{point}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 8 }}>🚀 Start Free Trial</button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" ref={stepsRef} style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, letterSpacing: 3, color: theme.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>How It Works</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-1.5px" }}>Up and Running in Minutes</h2>
          </div>
          <div style={{ position: "relative" }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: 32, marginBottom: i < steps.length - 1 ? 0 : 0,
                animation: stepsInView ? `fadeUp .7s ${i * 0.15}s ease forwards` : "none", opacity: 0,
                paddingBottom: i < steps.length - 1 ? 0 : 0,
              }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff",
                    boxShadow: `0 0 30px rgba(108,99,255,.4)`,
                    zIndex: 1,
                  }}>{s.num}</div>
                  {i < steps.length - 1 && <div style={{ flex: 1, width: 2, background: "linear-gradient(180deg, rgba(108,99,255,.5), rgba(108,99,255,.05))", minHeight: 60, margin: "8px 0" }} />}
                </div>
                <GlassCard style={{ padding: "22px 28px", flex: 1, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{s.desc}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" ref={testRef} style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, letterSpacing: 3, color: theme.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Testimonials</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-1.5px" }}>Loved by Recruitment Teams</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <GlassCard key={i} className="test-card" style={{ padding: "32px 28px", animation: testInView ? `fadeUp .7s ${i * 0.1}s ease forwards` : "none", opacity: 0 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {[...Array(t.stars)].map((_, j) => <span key={j} style={{ fontSize: 18, color: "#fbbf24" }}>⭐</span>)}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.75)", fontStyle: "italic", marginBottom: 24 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#fff" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)" }}>{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" ref={pricingRef} style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 13, letterSpacing: 3, color: theme.accent, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-1.5px" }}>Simple, Transparent Pricing</h2>
            <p style={{ marginTop: 16, fontSize: 17, color: "rgba(255,255,255,.5)" }}>No hidden fees. No surprises. Start free, scale when you're ready.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {plans.map((p, i) => (
              <div key={i} className="price-card" style={{
                position: "relative",
                background: p.highlight ? `linear-gradient(135deg, rgba(108,99,255,.18), rgba(139,92,246,.10))` : "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                backdropFilter: "blur(24px)",
                border: p.highlight ? `2px solid rgba(108,99,255,.5)` : "1px solid rgba(255,255,255,.09)",
                borderRadius: 24,
                padding: "40px 32px",
                boxShadow: p.highlight ? "0 30px 80px rgba(108,99,255,.3)" : "0 20px 60px rgba(0,0,0,.2)",
                animation: pricingInView ? `fadeUp .7s ${i * 0.12}s ease forwards` : "none",
                opacity: 0,
              }}>
                {p.highlight && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #6c63ff, #8b5cf6)", borderRadius: 20, padding: "4px 18px", fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize: 13, color: p.color, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 48, letterSpacing: "-2px", color: "#fff" }}>{p.price}</span>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>{p.period}</span>
                </div>
                <div style={{ margin: "24px 0", height: 1, background: "rgba(255,255,255,.07)" }} />
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "rgba(255,255,255,.75)" }}>
                      <span style={{ color: p.color, fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%", padding: "14px", borderRadius: 12, fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: 16, cursor: "pointer",
                  background: p.highlight ? `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` : "rgba(255,255,255,.07)",
                  color: "#fff", border: p.highlight ? "none" : "1px solid rgba(255,255,255,.15)",
                  transition: "all .2s",
                }}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            borderRadius: 32, padding: "72px 48px", textAlign: "center", position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(108,99,255,.22), rgba(139,92,246,.15), rgba(59,130,246,.12))",
            backgroundSize: "200% 200%",
            animation: "gradShift 6s ease infinite",
            border: "1px solid rgba(108,99,255,.3)",
            boxShadow: "0 40px 100px rgba(108,99,255,.25)",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(108,99,255,.12), transparent 60%)", pointerEvents: "none" }} />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-1.5px", marginBottom: 20 }}>
              Ready to Scale Your Recruitment Team?
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,.6)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
              Start managing candidates, submissions, and interviews from one unified dashboard.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ fontSize: 17, padding: "16px 40px" }}>Get Started — It's Free</button>
              <button className="btn-outline" style={{ fontSize: 17, padding: "16px 40px" }}>Book a Demo</button>
            </div>
            <p style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,.35)" }}>No credit card required · Setup in under 5 minutes</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,.07)", padding: "48px 40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6c63ff, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>Workforce<span style={{ color: theme.accent }}>OS</span></span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,.4)", maxWidth: 260 }}>The recruitment OS for modern hiring teams. Track everything, lose nothing.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 16, color: "#fff" }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => <a key={l} href="#" style={{ fontSize: 14, color: "rgba(255,255,255,.4)", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.4)"}>{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>© 2025 Workforce OS. All rights reserved.</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["𝕏", "in", "⬡"].map((ic, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,.5)", transition: "all .2s" }}>
                  {ic}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
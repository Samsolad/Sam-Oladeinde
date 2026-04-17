import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════
   TOKENS
═══════════════════════════════════════ */
const D   = "#080e0c";   // deepest dark
const D2  = "#0c1510";   // dark 2
const D3  = "#111e17";   // card bg
const D4  = "#162620";   // card hover
const G   = "#C8A84B";   // gold
const GB  = "rgba(200,168,75,0.1)";
const GD  = "rgba(200,168,75,0.22)";
const GL  = "#e8c96a";   // gold light
const T   = "#0d9488";   // teal
const TB  = "rgba(13,148,136,0.1)";
const W   = "#eef2ed";   // white
const M   = "#6b8c78";   // muted
const BR  = "rgba(200,168,75,0.12)";
const BR2 = "rgba(255,255,255,0.05)";

/* ═══════════════════════════════════════
   PILLAR DATA
═══════════════════════════════════════ */
const PILLARS = [
  {
    id:"career", num:"01", icon:"📚", color:G, bg:GB, border:GD, label:"Career & Income",
    tagline:"The roadmap nobody handed you when you landed.",
    desc:"Books, toolkits, and a diaspora marketplace that give African immigrants everything they need to earn, grow, and navigate the UK career system from day one.",
    products:[
      { name:"52 Weeks UK Blueprint", type:"Book Series", status:"live", desc:"4-book roadmap from landing to £4K+/month. Built from 10+ real immigrant success interviews." },
      { name:"UK Career Pivot Toolkit", type:"Notion Template", status:"live", desc:"30-page command centre for job search, CV, networking and income tracking." },
      { name:"TADM", type:"SaaS Platform", status:"live", desc:"The African Diaspora Market. Advertisers reach diaspora audiences. Affiliates earn commission on every conversion." },
    ]
  },
  {
    id:"community", num:"02", icon:"🏛️", color:T, bg:TB, border:"rgba(13,148,136,0.28)", label:"Community Infrastructure",
    tagline:"Systems that make African communities safer and stronger.",
    desc:"Software replacing WhatsApp chaos with structured, GDPR-compliant platforms. Built from problems witnessed firsthand in diaspora church communities.",
    products:[
      { name:"Transport Team", type:"SaaS Platform", status:"live", desc:"GDPR-compliant transport coordination for churches, SEND schools, and community programmes." },
      { name:"PresenceIQ", type:"SaaS Platform", status:"live", desc:"QR-based attendance tracking for diaspora organisations. No paper registers. No WhatsApp chaos." },
      { name:"Eventflow", type:"Mobile App", status:"building", desc:"Community event discovery, creation, and chip-in payments — built for the African diaspora social calendar." },
    ]
  },
  {
    id:"wealth", num:"03", icon:"🏦", color:"#7fba6e", bg:"rgba(127,186,110,0.08)", border:"rgba(127,186,110,0.25)", label:"Wealth Building",
    tagline:"Build assets that outlast you.",
    desc:"Investment platforms and property strategies that open the wealth doors African immigrants have historically been locked out of — structured, accessible, diaspora-first.",
    products:[
      { name:"Okoowo", type:"Investment Platform", status:"building", desc:"UK-Nigeria investment corridor. Diaspora investors back African SMEs through a structured, trust-first platform. Okoowo means 'investment' in Yoruba." },
      { name:"Property Strategy", type:"Knowledge Product", status:"coming", desc:"Rent-to-rent, HMO, and UK property investment guides built for African immigrants starting from zero capital." },
      { name:"Diaspora Investment Club", type:"Community", status:"coming", desc:"Pooled capital investment group. Collective wealth-building for Africans in the diaspora." },
    ]
  },
  {
    id:"trade", num:"04", icon:"🌍", color:"#e07b4a", bg:"rgba(224,123,74,0.08)", border:"rgba(224,123,74,0.25)", label:"Cross-Border Trade",
    tagline:"Move goods, money, and opportunity between two worlds.",
    desc:"Infrastructure connecting the Nigerian and UK economies through people, goods, and trusted logistics — so the diaspora can live freely across both worlds.",
    products:[
      { name:"TDDM", type:"Logistics Platform", status:"building", desc:"Verified travellers flying Nigeria-to-UK carry fashion items for sellers and get paid. Escrow-protected. Trust-first." },
      { name:"Diaspora Chauffeur", type:"Mobile App", status:"building", desc:"Vetted local drivers for diaspora visitors in Nigeria. You provide the car — they provide the expertise." },
      { name:"Ojooja", type:"Delivery Platform", status:"coming", desc:"Trust-first local delivery for Nigerian SMEs. Lagos pickup and returns — eventually the Nigeria-end infrastructure for TDDM." },
    ]
  },
  {
    id:"culture", num:"05", icon:"✨", color:"#c46fa0", bg:"rgba(196,111,160,0.08)", border:"rgba(196,111,160,0.25)", label:"Culture & Wellness",
    tagline:"Stay rooted while you grow.",
    desc:"Experiences, events, and products that keep the African diaspora connected to who they are — because thriving here should never mean losing where you came from.",
    products:[
      { name:"Aquagroove", type:"Experience Brand", status:"live", desc:"Travelling cultural wellness experience — guided swim sessions, African and Caribbean dance, monthly cultural mixers." },
      { name:"African Heritage Clothing", type:"Brand", status:"building", desc:"Ethically sourced African heritage clothing. Pre-order model. Direct from artisans." },
      { name:"Newcastle Cultural Community", type:"Community", status:"live", desc:"Local diaspora community hub in Newcastle. Events, meetups, and cultural gatherings." },
    ]
  },
];

const FILTER_ITEMS = [
  { label:"All", id:"all" },
  { label:"Career & Income", id:"career" },
  { label:"Community", id:"community" },
  { label:"Wealth", id:"wealth" },
  { label:"Cross-Border Trade", id:"trade" },
  { label:"Culture & Wellness", id:"culture" },
];

/* ═══════════════════════════════════════
   REVEAL HOOK
═══════════════════════════════════════ */
function Reveal({ children, delay=0, style={} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setV(true); }, { threshold:0.07 });
    if(ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(22px)", transition:`opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════
   APP
═══════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled]   = useState(false);
  const [menu, setMenu]           = useState(false);
  const [activePillar, setActive] = useState("career");
  const [filter, setFilter]       = useState("all");
  const [form, setForm]           = useState({ name:"", email:"", message:"" });
  const [sent, setSent]           = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenu(false);
  };

  const NAV = ["Ecosystem","JOS","Pillars","Sam","Products","Contact"];
  const pillar = PILLARS.find(p => p.id === activePillar);

  /* all products flat list for the products section */
  const allProducts = PILLARS.flatMap(p =>
    p.products.map(pr => ({ ...pr, pillar:p.label, pillarId:p.id, pillarColor:p.color, pillarIcon:p.icon }))
  );
  const shown = filter === "all" ? allProducts : allProducts.filter(p => p.pillarId === filter);

  return (
    <div style={S.root}>

      {/* ─── NAV ─── */}
      <nav style={{ ...S.nav, padding: scrolled?"0.75rem 3rem":"1.15rem 3rem" }}>
        <div style={S.navBrand} onClick={() => go("hero")}>
          <span style={S.ajala}>Ajala</span>
          <span style={S.navSub}>by Sam Oladeinde</span>
        </div>
        <div style={S.navLinks}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n.toLowerCase())} style={S.navBtn}>{n}</button>
          ))}
        </div>
        <a href="https://soladeinde.gumroad.com" target="_blank" rel="noreferrer" style={S.navCta}>Get Started</a>
        <button onClick={() => setMenu(!menu)} style={S.burger}>☰</button>
      </nav>
      {menu && (
        <div style={S.mobileMenu}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n.toLowerCase())} style={S.mobileBtn}>{n}</button>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────
          HERO
      ───────────────────────────────────── */}
      <section id="hero" style={S.hero}>
        <div style={S.heroGlow} />
        <div style={S.heroGrid} />
        {/* Adinkra-style decorative marks */}
        <div style={{ ...S.deco, top:"18%", right:"7%", fontSize:"6rem", opacity:0.03, animation:"float1 9s ease-in-out infinite" }}>✦</div>
        <div style={{ ...S.deco, bottom:"22%", left:"5%", fontSize:"4rem", opacity:0.025, animation:"float2 11s ease-in-out infinite" }}>◈</div>

        <div style={S.heroInner}>
          <Reveal>
            <div style={S.provBox}>
              <div style={S.provYoruba}>"Ẹni tó bá ma gbádùn ìgbésí ayé rẹ̀, kò níí jẹ́ irú ẹni tó ń gbé ìgbésí ayé ẹlòmíràn."</div>
              <div style={S.provEng}>He who truly lives his own life will never live the life of another.</div>
              <div style={S.provSrc}>— Yoruba Proverb</div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 style={S.h1}>
              You didn't cross<br />an ocean to live<br />
              <em style={{ color:G, fontStyle:"italic" }}>someone else's life.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p style={S.heroDesc}>
              Ajala is the complete ecosystem for Africans in the diaspora who want control of their time, freedom in their lifestyle, and a life built entirely on their own terms.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div style={S.pillarsRow}>
              {PILLARS.map(p => (
                <div key={p.id} style={{ ...S.heroPill, borderColor:p.border, background:p.bg }}>
                  <span>{p.icon}</span>
                  <span style={{ fontSize:"0.7rem", color:M }}>{p.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div style={S.btnRow}>
              <button onClick={() => go("ecosystem")} style={S.btnGold}>Explore the Ecosystem</button>
              <button onClick={() => go("jos")} style={S.btnGhost}>Meet JOS →</button>
            </div>
          </Reveal>

          <Reveal delay={0.55}>
            <div style={S.heroStats}>
              {[["5","Ecosystem Pillars"],["11","Products & Platforms"],["3","Live Right Now"],["£4K","Monthly Freedom Path"]].map(([n,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={S.statN}>{n}</div>
                  <div style={S.statL}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────
          THE PROBLEM
      ───────────────────────────────────── */}
      <div style={{ background:D2, padding:"0" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"5rem 3rem" }}>
          <Reveal>
            <p style={{ ...S.tag, textAlign:"center", marginBottom:"1rem" }}>The Problem</p>
            <h2 style={{ ...S.h2, textAlign:"center", maxWidth:"680px", margin:"0 auto 1rem" }}>
              You arrived with <em style={{ color:G }}>everything.</em><br />And still felt like zero.
            </h2>
            <p style={{ ...S.intro, textAlign:"center", margin:"0 auto 2.5rem", maxWidth:"580px" }}>
              Qualifications nobody recognises. Networks you haven't built yet. A system with unwritten rules. You're not behind — you were just missing the infrastructure.
            </p>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
            {[
              ["💼","Career Gap","The UK hiring system wasn't built to read your credentials. The unwritten rules exist — nobody explains them."],
              ["🏘️","No Community","The village you grew up in doesn't exist here. You're building your network from absolute zero."],
              ["💷","Wealth Locked Out","Property, investment, financial systems — all designed for people already inside them."],
              ["🌱","Root Disconnect","Thriving here shouldn't mean losing who you are. But nobody built the bridge between both worlds."],
            ].map(([e,t,d]) => (
              <Reveal key={t}>
                <div style={S.problemCard}>
                  <div style={{ fontSize:"1.8rem", marginBottom:"0.8rem" }}>{e}</div>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", fontWeight:600, color:W, marginBottom:"0.5rem" }}>{t}</div>
                  <div style={{ fontSize:"0.82rem", color:M, lineHeight:1.7 }}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={S.problemCta}>
              <span style={{ fontFamily:"Georgia,serif", fontSize:"1.15rem", fontStyle:"italic", color:G }}>Ajala is the infrastructure you were missing.</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─────────────────────────────────────
          ECOSYSTEM OVERVIEW
      ───────────────────────────────────── */}
      <section id="ecosystem" style={S.section}>
        <Reveal>
          <p style={S.tag}>The Ecosystem</p>
          <h2 style={S.h2}>Five pillars.<br /><em style={{ color:G }}>One fulfilled life.</em></h2>
          <p style={S.intro}>Named after the legendary Yoruba traveller who moved through the world on his own terms. Ajala is not a product. It's the complete system for the African in the diaspora who refuses to settle for surviving.</p>
        </Reveal>

        {/* PILLAR TABS */}
        <div style={S.tabRow}>
          {PILLARS.map(p => (
            <button key={p.id} onClick={() => setActive(p.id)}
              style={{ ...S.tab, ...(activePillar===p.id ? { borderColor:p.color, color:p.color, background:p.bg } : {}) }}>
              <span>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>

        {/* ACTIVE PANEL */}
        {pillar && (
          <div style={{ ...S.panel, borderColor:pillar.border, background:`linear-gradient(135deg, ${pillar.bg} 0%, ${D3} 70%)` }}>
            <div style={{ flex:"1.2", minWidth:260 }}>
              <div style={{ ...S.pillarNum, color:pillar.color }}>{pillar.num}</div>
              <h3 style={{ ...S.pillarTitle, color:pillar.color }}>{pillar.label}</h3>
              <p style={{ fontFamily:"Georgia,serif", fontSize:"1rem", fontStyle:"italic", color:W, marginBottom:"1rem", lineHeight:1.5 }}>{pillar.tagline}</p>
              <p style={{ fontSize:"0.88rem", color:M, lineHeight:1.85, marginBottom:"1.5rem" }}>{pillar.desc}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.8rem" }}>
                {pillar.products.map(pr => (
                  <div key={pr.name} style={{ ...S.panelProduct, borderLeft:`2px solid ${pillar.color}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.25rem" }}>
                      <span style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", fontWeight:600, color:W }}>{pr.name}</span>
                      <span style={{ fontFamily:"monospace", fontSize:"0.55rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.15rem 0.5rem", background: pr.status==="live" ? TB : pr.status==="building" ? GB : BR2, color: pr.status==="live" ? T : pr.status==="building" ? G : M, border:`1px solid ${pr.status==="live" ? "rgba(13,148,136,0.3)" : pr.status==="building" ? GD : BR2}` }}>
                        {pr.status==="live" ? "● Live" : pr.status==="building" ? "⟳ Building" : "◌ Coming"}
                      </span>
                    </div>
                    <div style={{ fontSize:"0.78rem", color:M, lineHeight:1.6 }}>{pr.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex:1, minWidth:220, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"5rem", opacity:0.12, marginBottom:"1rem" }}>{pillar.icon}</div>
                <div style={{ fontFamily:"monospace", fontSize:"0.6rem", letterSpacing:"0.25em", textTransform:"uppercase", color:pillar.color, marginBottom:"0.5rem" }}>Pillar {pillar.num}</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1.6rem", fontStyle:"italic", color:W, lineHeight:1.3 }}>{pillar.label}</div>
              </div>
            </div>
          </div>
        )}
      </section>

      <div style={S.divider} />

      {/* ─────────────────────────────────────
          JOS — THE CROWN JEWEL
      ───────────────────────────────────── */}
      <section id="jos" style={{ ...S.section, background:D2 }}>
        <div style={S.josWrap}>
          <div style={{ flex:1 }}>
            <Reveal>
              <p style={{ ...S.tag, color:GL }}>The Operating System · JOS</p>
              <h2 style={{ ...S.h2, fontSize:"clamp(2rem,5vw,3.8rem)" }}>
                Every pillar.<br />One <em style={{ color:G }}>intelligence.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={S.pull}>
                "A personal AI operating system that knows who you are, manages every area of your life, thinks like your best PA, pushes you like a mentor, and adapts in real time as life happens."
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={S.body}>JOS is not another productivity app. It is the intelligence layer that sits underneath every pillar of Ajala — understanding your career goals, your wealth targets, your community commitments, your cultural identity, your cross-border life.</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p style={S.body}>It knows you're an African in the UK with a job to grow, a property to buy, a community to serve, and a family in Lagos to stay connected to. It doesn't give you generic advice. It gives you the next right move — for your specific life, right now.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={S.josCapabilities}>
                {[
                  ["🧠","Knows You","Your goals, pressures, timelines, and two-world context — always in view."],
                  ["📋","Manages Everything","Career moves, wealth targets, community commitments, home visits — coordinated."],
                  ["🎯","Pushes You Forward","Not just a task list. A mentor that holds you accountable to the life you said you wanted."],
                  ["🔄","Adapts in Real Time","Life changes. JOS changes with it — recalibrating without you having to start over."],
                  ["🌍","Built for Two Worlds","Understands the UK-Nigeria (and broader diaspora) context that no generic AI assistant does."],
                  ["🔗","Connects All Pillars","Your Career, Wealth, Community, Trade and Culture goals — unified in one intelligence."],
                ].map(([e,t,d]) => (
                  <div key={t} style={S.josCap}>
                    <span style={{ fontSize:"1.2rem" }}>{e}</span>
                    <div>
                      <div style={{ fontSize:"0.82rem", fontWeight:600, color:W, marginBottom:"0.15rem" }}>{t}</div>
                      <div style={{ fontSize:"0.75rem", color:M, lineHeight:1.5 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div style={S.josStatus}>
                <span style={{ fontFamily:"monospace", fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase", color:G }}>⟳ In Development</span>
                <span style={{ fontSize:"0.8rem", color:M }}>JOS is the most ambitious product in the Ajala ecosystem. Building in public.</span>
              </div>
            </Reveal>
          </div>

          {/* JOS Visual */}
          <Reveal delay={0.2} style={{ flex:1, minWidth:280 }}>
            <div style={S.josCard}>
              <div style={S.josGlow} />
              <div style={S.josHeader}>
                <div style={S.josOrb} />
                <div>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"1.4rem", fontWeight:700, color:W }}>JOS</div>
                  <div style={{ fontFamily:"monospace", fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase", color:G }}>Ajala Operating System</div>
                </div>
              </div>
              <div style={S.josMessages}>
                {[
                  { role:"jos", text:"Good morning, Sam. Your Okoowo investor deck needs updating before Thursday's call. Want to start there?" },
                  { role:"user", text:"Yes. Also remind me to call Mum — it's been 3 weeks." },
                  { role:"jos", text:"Done. I've blocked 30 minutes for the deck at 6am. Mum reminder set for 8pm. You're also 2 days behind on your 52 Weeks chapter — want me to adjust this week's schedule?" },
                  { role:"user", text:"Yes please." },
                  { role:"jos", text:"Adjusted. You're back on track. One thing — your Transport Team trial conversions dropped 12% this week. I've drafted 3 re-engagement emails for your review." },
                ].map((m,i) => (
                  <div key={i} style={{ ...S.josMsg, ...(m.role==="jos" ? S.josMsgJos : S.josMsgUser) }}>
                    {m.role==="jos" && <span style={S.josLabel}>JOS</span>}
                    <span style={{ fontSize:"0.78rem", lineHeight:1.6 }}>{m.text}</span>
                  </div>
                ))}
              </div>
              <div style={S.josInput}>
                <span style={{ fontSize:"0.78rem", color:M }}>Ask JOS anything about your Ajala life…</span>
                <span style={{ color:G, fontSize:"0.8rem" }}>↵</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* JOS + Pillars Connection */}
        <Reveal style={{ marginTop:"3rem" }}>
          <div style={S.josMap}>
            <div style={S.josMapCenter}>
              <div style={S.josMapOrb}>JOS</div>
            </div>
            {PILLARS.map((p,i) => (
              <div key={p.id} style={{ ...S.josMapPillar, borderColor:p.border, background:p.bg }}>
                <span>{p.icon}</span>
                <span style={{ fontSize:"0.72rem", color:p.color, fontFamily:"monospace", letterSpacing:"0.05em" }}>{p.label}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign:"center", fontSize:"0.78rem", color:M, marginTop:"1rem", fontStyle:"italic" }}>JOS connects and orchestrates all five Ajala pillars in real time</p>
        </Reveal>
      </section>

      <div style={S.divider} />

      {/* ─────────────────────────────────────
          SAM
      ───────────────────────────────────── */}
      <section id="sam" style={S.section}>
        <div style={S.aboutWrap}>
          <Reveal style={{ flex:"0 0 260px" }}>
            <div style={S.photoBox}>
              <div style={S.cTL} /><div style={S.cBR} />
              <div style={{ fontSize:"3rem", opacity:0.15 }}>📸</div>
              <span style={{ fontFamily:"monospace", fontSize:"0.62rem", color:M, letterSpacing:"0.1em" }}>Your photo</span>
            </div>
            <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", marginTop:"1rem" }}>
              {["Systems Builder","Author","YouTuber","Founder"].map(b => (
                <span key={b} style={{ fontFamily:"monospace", fontSize:"0.55rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.2rem 0.55rem", background:GB, color:G, border:`1px solid ${GD}` }}>{b}</span>
              ))}
            </div>
          </Reveal>
          <div style={{ flex:1.5 }}>
            <Reveal><p style={S.tag}>The Person Behind Ajala</p></Reveal>
            <Reveal delay={0.1}><h2 style={S.h2}>I built Ajala<br /><em style={{ color:G }}>because I needed it first.</em></h2></Reveal>
            <Reveal delay={0.15}><p style={S.pull}>"I'm not a distant guru. I'm a fellow traveller — five years ahead of you on the same road."</p></Reveal>
            <Reveal delay={0.2}><p style={S.body}>I moved from Nigeria to the UK less than 5 years ago. Qualifications, experience, ambition — and still felt like zero. The UK has unwritten rules nobody hands you at the airport. So I started asking people who'd already figured it out.</p></Reveal>
            <Reveal delay={0.25}><p style={S.body}>I interviewed 10+ African immigrants who rebuilt from scratch. Those conversations became books. I saw my church coordinate transport over WhatsApp, spotted the GDPR risk, and built software to fix it. I watched the diaspora struggle to invest back home, and started building Okoowo. I saw travellers flying Lagos-to-London carrying goods informally, and started building TDDM.</p></Reveal>
            <Reveal delay={0.3}><p style={{ ...S.body, color:G, fontStyle:"italic" }}>Every product in Ajala started with a problem I witnessed. Every solution exists because it didn't.</p></Reveal>
            <Reveal delay={0.35}>
              <div style={{ display:"flex", gap:"2.5rem", marginTop:"1.5rem", borderTop:`1px solid ${BR}`, paddingTop:"1.5rem", flexWrap:"wrap" }}>
                {[["Nigeria","Origin"],["Newcastle","Base"],["&lt;5yrs","In the UK"],["5 Pillars","Building"]].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ ...S.statN, fontSize:"1.5rem" }} dangerouslySetInnerHTML={{ __html:n }} />
                    <div style={S.statL}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* ─────────────────────────────────────
          PRODUCTS — FULL GRID
      ───────────────────────────────────── */}
      <section id="products" style={{ ...S.section, background:D2 }}>
        <Reveal>
          <p style={S.tag}>All Products & Platforms</p>
          <h2 style={S.h2}>The complete<br /><em style={{ color:G }}>Ajala stack.</em></h2>
          <p style={S.intro}>Every product, platform, and tool across all five pillars — from live and trading to building and coming soon.</p>
        </Reveal>

        {/* Filter */}
        <div style={S.filterRow}>
          {FILTER_ITEMS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              style={{ ...S.filterBtn, ...(filter===f.id ? { background:GB, color:G, border:`1px solid ${GD}` } : {}) }}>
              {f.label}
            </button>
          ))}
        </div>

        <div style={S.productsGrid}>
          {shown.map((p,i) => (
            <Reveal key={p.name+i} delay={i*0.05}>
              <div style={{ ...S.productCard, borderTop:`2px solid ${p.pillarColor}` }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.8rem" }}>
                  <span style={{ fontFamily:"monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", color:p.pillarColor, background:`${p.pillarColor}15`, padding:"0.2rem 0.5rem", border:`1px solid ${p.pillarColor}30` }}>{p.pillarIcon} {p.pillar}</span>
                  <span style={{ fontFamily:"monospace", fontSize:"0.55rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.2rem 0.5rem", background: p.status==="live" ? TB : p.status==="building" ? GB : BR2, color: p.status==="live" ? T : p.status==="building" ? G : M, border:`1px solid ${p.status==="live" ? "rgba(13,148,136,0.3)" : p.status==="building" ? GD : BR2}` }}>
                    {p.status==="live" ? "● Live" : p.status==="building" ? "⟳ Building" : "◌ Coming Soon"}
                  </span>
                </div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1.05rem", fontWeight:600, color:W, marginBottom:"0.5rem" }}>{p.name}</div>
                <div style={{ fontFamily:"monospace", fontSize:"0.6rem", letterSpacing:"0.08em", color:M, marginBottom:"0.7rem" }}>{p.type}</div>
                <div style={{ fontSize:"0.82rem", color:M, lineHeight:1.7 }}>{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      {/* ─────────────────────────────────────
          BOOKS
      ───────────────────────────────────── */}
      <section id="books" style={S.section}>
        <Reveal>
          <p style={S.tag}>Career & Income · Books</p>
          <h2 style={S.h2}>The roadmap in<br /><em style={{ color:G }}>your hands.</em></h2>
          <p style={S.intro}>Four books. One complete journey. From the day you land to the day you own your life in the UK. Built from real immigrant success stories.</p>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"1.2rem" }}>
          {[
            { n:"01", t:"Foundation", s:"From £0 to £4,000+/month", live:true, p:"£17" },
            { n:"02", t:"The Playbook", s:"Week-by-week execution across all 3 routes", live:false },
            { n:"03", t:"Mastering the System", s:"UK money, law & life decoded", live:false },
            { n:"04", t:"Beyond the Blueprint", s:"From £4K to freedom — the long game", live:false },
          ].map((b,i) => (
            <Reveal key={b.n} delay={i*0.1}>
              <div style={{ ...S.bookCard, ...(b.live ? { border:`1px solid ${GD}` } : {}) }}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"3rem", fontWeight:700, color:G, opacity:0.18, lineHeight:1, marginBottom:"1rem" }}>{b.n}</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1.05rem", fontWeight:600, color:W, marginBottom:"0.4rem" }}>{b.t}</div>
                <div style={{ fontSize:"0.78rem", color:M, marginBottom:"1.2rem", lineHeight:1.6 }}>{b.s}</div>
                <span style={{ fontFamily:"monospace", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", padding:"0.25rem 0.6rem", background: b.live ? GB : BR2, color: b.live ? G : M, border:`1px solid ${b.live ? GD : BR2}` }}>
                  {b.live ? `Available Now — ${b.p}` : "Coming Soon"}
                </span>
                {b.live && (
                  <a href="https://soladeinde.gumroad.com" target="_blank" rel="noreferrer"
                    style={{ ...S.btnGold, display:"block", textAlign:"center", textDecoration:"none", marginTop:"1rem", padding:"0.65rem", fontSize:"0.68rem" }}>
                    Buy Now — {b.p}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      {/* ─────────────────────────────────────
          VISION
      ───────────────────────────────────── */}
      <section style={{ padding:"6rem 3rem", background:`linear-gradient(160deg, ${D2} 0%, rgba(200,168,75,0.04) 50%, ${D2} 100%)`, textAlign:"center" }}>
        <Reveal>
          <p style={{ ...S.tag, textAlign:"center", marginBottom:"2rem" }}>The Ajala Vision</p>
          <p style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.5rem,4vw,2.8rem)", fontStyle:"italic", fontWeight:300, lineHeight:1.4, maxWidth:"760px", margin:"0 auto 1rem", color:W }}>
            "An African lands in the UK with everything — and feels like zero. <strong style={{ color:G, fontStyle:"normal" }}>Ajala is the infrastructure underneath every step back to themselves.</strong>"
          </p>
          <p style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.2em", color:M, textTransform:"uppercase", marginBottom:"3rem" }}>— Sam Oladeinde · Systems Builder · Newcastle, UK</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", maxWidth:"900px", margin:"0 auto" }}>
            {[
              ["📚","Now","Career & Income","Books, toolkit, TADM live and earning"],
              ["🏛️","Now","Community Infrastructure","Transport Team & PresenceIQ live"],
              ["🏦","Building","Wealth","Okoowo investment platform in development"],
              ["🌍","Building","Cross-Border Trade","TDDM & Diaspora Chauffeur in development"],
              ["✨","Building","Culture & Wellness","Aquagroove live. Clothing brand coming."],
              ["🧠","Vision","JOS","The operating system that ties it all together"],
            ].map(([e,phase,t,d]) => (
              <div key={t} style={{ background:D3, border:`1px solid ${BR}`, padding:"1.5rem", flex:"1", minWidth:"140px", textAlign:"center" }}>
                <div style={{ fontSize:"1.4rem", marginBottom:"0.4rem" }}>{e}</div>
                <div style={{ fontFamily:"monospace", fontSize:"0.55rem", letterSpacing:"0.15em", textTransform:"uppercase", color: phase==="Now" ? T : G, marginBottom:"0.4rem" }}>{phase}</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", fontWeight:600, color:W, marginBottom:"0.35rem" }}>{t}</div>
                <div style={{ fontSize:"0.73rem", color:M, lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={S.divider} />

      {/* ─────────────────────────────────────
          CONTACT
      ───────────────────────────────────── */}
      <section id="contact" style={{ ...S.section, background:D2 }}>
        <div style={{ display:"flex", gap:"4rem", alignItems:"flex-start", flexWrap:"wrap" }}>
          <div style={{ flex:1 }}>
            <Reveal><p style={S.tag}>Join Ajala</p></Reveal>
            <Reveal delay={0.1}><h2 style={S.h2}>The journey is<br /><em style={{ color:G }}>better together.</em></h2></Reveal>
            <Reveal delay={0.15}><p style={S.intro}>Whether you want to collaborate, be interviewed for the channel, partner on a product, or just say hello — fellow travellers are always welcome.</p></Reveal>
            <Reveal delay={0.2} style={{ display:"flex", flexDirection:"column", gap:"0.7rem" }}>
              {[
                ["✉️","Email","52weeksukblueprint@gmail.com","mailto:52weeksukblueprint@gmail.com"],
                ["🛍️","Gumroad Store","soladeinde.gumroad.com","https://soladeinde.gumroad.com"],
                ["🚌","Transport Team","transportteam.app","https://transportteam.app"],
                ["📊","PresenceIQ","presenceiq.app","https://presenceiq.app"],
                ["▶️","YouTube","Immigrant Success","https://youtube.com"],
                ["📱","Phone (text only)","+44 7747 226904","tel:+447747226904"],
              ].map(([icon,label,val,href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={S.contactLink}>
                  <span style={{ width:22, textAlign:"center" }}>{icon}</span>
                  <span style={{ fontSize:"0.83rem" }}>{label}</span>
                  <span style={{ fontSize:"0.72rem", color:M, marginLeft:"auto", fontFamily:"monospace" }}>{val}</span>
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.2} style={{ flex:1 }}>
            <p style={{ ...S.tag, marginBottom:"1.2rem" }}>Send a Message</p>
            {sent ? (
              <div style={{ background:D3, border:`1px solid ${BR}`, padding:"3rem", textAlign:"center" }}>
                <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>✅</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem", color:G }}>Message sent!</div>
                <div style={{ fontSize:"0.82rem", color:M, marginTop:"0.5rem" }}>Sam will be in touch. Àjàlá continues.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
                {[["Your Name","text","name","e.g. Amara Osei"],["Email","email","email","you@email.com"]].map(([l,t,f,p]) => (
                  <div key={f} style={{ display:"flex", flexDirection:"column", gap:"0.35rem" }}>
                    <label style={S.label}>{l}</label>
                    <input type={t} placeholder={p} value={form[f]} onChange={e => setForm({...form,[f]:e.target.value})} style={S.input} />
                  </div>
                ))}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.35rem" }}>
                  <label style={S.label}>Message</label>
                  <textarea rows={5} placeholder="What would you like to discuss?" value={form.message} onChange={e => setForm({...form,message:e.target.value})} style={{...S.input,resize:"vertical"}} />
                </div>
                <button onClick={() => { if(form.name&&form.email&&form.message) setSent(true); }}
                  style={{ ...S.btnGold, border:"none", cursor:"pointer", width:"100%", padding:"1rem", fontSize:"0.78rem" }}>
                  Send Message
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={S.footer}>
        <div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.6rem", fontWeight:700, color:G, letterSpacing:"0.08em" }}>Ajala</div>
          <div style={{ fontSize:"0.7rem", color:M, marginTop:"0.2rem" }}>by Sam Oladeinde · Systems Builder · Newcastle, UK</div>
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"0.8rem", fontStyle:"italic", color:M, marginBottom:"0.3rem", opacity:0.7 }}>"Ẹni tó bá gbádùn ìgbésí ayé rẹ̀, kò níí jẹ́ irú ẹni tó ń gbé ìgbésí ayé ẹlòmíràn."</div>
          <div style={{ fontSize:"0.65rem", color:M, opacity:0.5 }}>© 2025 Sam Oladeinde · J. Ednieds Ltd · Registered in England and Wales</div>
        </div>
        <div style={{ display:"flex", gap:"1.2rem", flexWrap:"wrap", justifyContent:"flex-end" }}>
          {["Ecosystem","JOS","Pillars","Products","Contact"].map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"monospace", fontSize:"0.58rem", letterSpacing:"0.1em", textTransform:"uppercase", color:M }}>
              {l}
            </button>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500&family=Space+Mono&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${D};}
        @keyframes float1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(3deg)}}
        @keyframes float2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(-2deg)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
        @keyframes orbPulse{0%,100%{box-shadow:0 0 0 0 rgba(200,168,75,0.4)}70%{box-shadow:0 0 0 20px rgba(200,168,75,0)}}
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════
   STYLES
═══════════════════════════════════════ */
const S = {
  root:{ background:D, color:W, fontFamily:"'DM Sans',sans-serif", fontWeight:300, lineHeight:1.7, minHeight:"100vh", overflowX:"hidden" },

  nav:{ position:"sticky", top:0, zIndex:900, display:"flex", alignItems:"center", gap:"1rem", background:"rgba(8,14,12,0.94)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${BR}`, transition:"padding 0.3s" },
  navBrand:{ display:"flex", alignItems:"baseline", gap:"0.5rem", marginRight:"auto", cursor:"pointer" },
  ajala:{ fontFamily:"Georgia,serif", fontSize:"1.5rem", fontWeight:700, color:G, letterSpacing:"0.1em" },
  navSub:{ fontSize:"0.65rem", color:M, fontFamily:"monospace", letterSpacing:"0.05em" },
  navLinks:{ display:"flex", gap:"0.15rem" },
  navBtn:{ background:"none", border:"none", cursor:"pointer", fontFamily:"monospace", fontSize:"0.61rem", letterSpacing:"0.12em", textTransform:"uppercase", color:M, padding:"0.4rem 0.6rem" },
  navCta:{ background:G, color:D, border:"none", cursor:"pointer", fontFamily:"monospace", fontSize:"0.61rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.6rem 1.2rem", textDecoration:"none", fontWeight:700, whiteSpace:"nowrap" },
  burger:{ display:"none", background:"none", border:"none", color:W, fontSize:"1.4rem", cursor:"pointer" },
  mobileMenu:{ background:D2, padding:"1.5rem 3rem", display:"flex", flexDirection:"column", gap:"0.8rem", borderBottom:`1px solid ${BR}` },
  mobileBtn:{ background:"none", border:"none", cursor:"pointer", fontFamily:"monospace", fontSize:"0.7rem", letterSpacing:"0.12em", textTransform:"uppercase", color:M, textAlign:"left" },

  hero:{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"8rem 3rem 5rem", position:"relative", overflow:"hidden" },
  heroGlow:{ position:"absolute", inset:0, background:`radial-gradient(ellipse 65% 50% at 55% 38%, rgba(200,168,75,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 18% 72%, rgba(13,148,136,0.05) 0%, transparent 60%)`, pointerEvents:"none" },
  heroGrid:{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BR2} 1px,transparent 1px),linear-gradient(90deg,${BR2} 1px,transparent 1px)`, backgroundSize:"52px 52px", pointerEvents:"none", opacity:0.6 },
  deco:{ position:"absolute", fontFamily:"serif", pointerEvents:"none", userSelect:"none" },
  heroInner:{ position:"relative", zIndex:2, maxWidth:"800px", textAlign:"center" },

  provBox:{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.35rem", marginBottom:"2.5rem", padding:"1.4rem 2rem", background:GB, border:`1px solid ${GD}`, maxWidth:"600px", margin:"0 auto 2.5rem" },
  provYoruba:{ fontFamily:"Georgia,serif", fontSize:"0.92rem", fontStyle:"italic", color:G, lineHeight:1.65 },
  provEng:{ fontSize:"0.8rem", color:M, fontStyle:"italic" },
  provSrc:{ fontFamily:"monospace", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", color:M, opacity:0.7 },

  h1:{ fontFamily:"Georgia,serif", fontSize:"clamp(2.6rem,6.5vw,5rem)", fontWeight:300, lineHeight:1.06, letterSpacing:"-0.02em", marginBottom:"1.5rem" },
  heroDesc:{ fontSize:"1rem", color:M, maxWidth:"540px", margin:"0 auto 2rem", lineHeight:1.88 },
  pillarsRow:{ display:"flex", gap:"0.6rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"2rem" },
  heroPill:{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.25rem", padding:"0.6rem 1rem", border:"1px solid", fontSize:"1rem" },
  btnRow:{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"3rem" },
  btnGold:{ display:"inline-block", padding:"0.9rem 2.2rem", fontFamily:"monospace", fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", background:G, color:D, fontWeight:700, border:"none", cursor:"pointer" },
  btnGhost:{ display:"inline-block", padding:"0.9rem 2rem", fontFamily:"monospace", fontSize:"0.7rem", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", color:W, border:`1px solid ${BR2}`, cursor:"pointer" },
  heroStats:{ display:"flex", gap:"2rem", justifyContent:"center", borderTop:`1px solid ${BR}`, paddingTop:"2.5rem", flexWrap:"wrap" },
  statN:{ fontFamily:"Georgia,serif", fontSize:"2rem", fontWeight:600, color:G, lineHeight:1 },
  statL:{ fontSize:"0.68rem", color:M, marginTop:"0.2rem" },

  problemCard:{ background:D3, border:`1px solid ${BR2}`, padding:"1.8rem" },
  problemCta:{ textAlign:"center", padding:"1.5rem", border:`1px solid ${GD}`, background:GB, marginTop:"1rem" },

  section:{ padding:"5rem 3rem", maxWidth:"1200px", margin:"0 auto" },
  tag:{ fontFamily:"monospace", fontSize:"0.59rem", letterSpacing:"0.3em", textTransform:"uppercase", color:G, marginBottom:"0.8rem", display:"block" },
  h2:{ fontFamily:"Georgia,serif", fontSize:"clamp(1.9rem,4.5vw,3.3rem)", fontWeight:300, lineHeight:1.1, marginBottom:"1.2rem" },
  intro:{ fontSize:"0.93rem", color:M, maxWidth:"600px", lineHeight:1.88, marginBottom:"2.5rem" },
  divider:{ height:"1px", background:`linear-gradient(to right, transparent, ${BR}, transparent)` },

  tabRow:{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"1.5rem", marginTop:"0.5rem" },
  tab:{ fontFamily:"monospace", fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.55rem 1.1rem", background:"transparent", color:M, border:`1px solid ${BR2}`, cursor:"pointer", display:"flex", alignItems:"center", gap:"0.4rem" },
  panel:{ border:"1px solid", padding:"2.5rem", display:"flex", gap:"2.5rem", flexWrap:"wrap" },
  pillarNum:{ fontFamily:"Georgia,serif", fontSize:"3rem", fontWeight:700, opacity:0.2, lineHeight:1, marginBottom:"0.5rem" },
  pillarTitle:{ fontFamily:"Georgia,serif", fontSize:"1.5rem", fontWeight:600, marginBottom:"0.5rem" },
  panelProduct:{ padding:"0.8rem 0 0.8rem 1rem", borderBottom:`1px solid ${BR2}` },

  josWrap:{ display:"flex", gap:"4rem", alignItems:"flex-start", flexWrap:"wrap" },
  pull:{ fontFamily:"Georgia,serif", fontSize:"1.1rem", fontStyle:"italic", color:G, lineHeight:1.55, margin:"1.2rem 0", paddingLeft:"1.2rem", borderLeft:`2px solid ${G}` },
  body:{ color:M, lineHeight:1.9, marginBottom:"1rem", fontSize:"0.9rem" },
  josCapabilities:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem", margin:"1.5rem 0" },
  josCap:{ display:"flex", gap:"0.7rem", alignItems:"flex-start", padding:"0.9rem", background:D3, border:`1px solid ${BR2}` },
  josStatus:{ display:"flex", alignItems:"center", gap:"1rem", padding:"0.9rem 1.2rem", background:GB, border:`1px solid ${GD}`, flexWrap:"wrap" },

  josCard:{ background:D3, border:`1px solid ${GD}`, padding:"2rem", position:"relative", overflow:"hidden" },
  josGlow:{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"400px", height:"200px", background:`radial-gradient(ellipse, ${GB} 0%, transparent 70%)`, pointerEvents:"none" },
  josHeader:{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.5rem", position:"relative" },
  josOrb:{ width:44, height:44, borderRadius:"50%", background:`radial-gradient(circle, ${GL} 0%, ${G} 60%, rgba(200,168,75,0.3) 100%)`, animation:"orbPulse 3s ease-in-out infinite" },
  josMessages:{ display:"flex", flexDirection:"column", gap:"0.8rem", marginBottom:"1.2rem", position:"relative" },
  josMsg:{ padding:"0.8rem 1rem", fontSize:"0.78rem", lineHeight:1.6, display:"flex", flexDirection:"column", gap:"0.25rem" },
  josMsgJos:{ background:GB, border:`1px solid ${GD}`, borderLeft:`3px solid ${G}` },
  josMsgUser:{ background:BR2, borderLeft:`3px solid ${T}`, marginLeft:"1rem" },
  josLabel:{ fontFamily:"monospace", fontSize:"0.55rem", letterSpacing:"0.15em", textTransform:"uppercase", color:G },
  josInput:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.7rem 1rem", background:D, border:`1px solid ${BR2}`, position:"relative" },
  josMap:{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", flexWrap:"wrap", padding:"2rem", background:D3, border:`1px solid ${BR}` },
  josMapCenter:{ display:"flex", alignItems:"center", justifyContent:"center" },
  josMapOrb:{ width:64, height:64, borderRadius:"50%", background:`radial-gradient(circle, ${GL}, ${G})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", fontWeight:700, color:D, fontSize:"0.9rem", animation:"orbPulse 3s ease-in-out infinite" },
  josMapPillar:{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem", padding:"0.7rem 1.1rem", border:"1px solid", fontSize:"1.2rem" },

  aboutWrap:{ display:"flex", gap:"4rem", alignItems:"flex-start", flexWrap:"wrap" },
  photoBox:{ background:D3, border:`1px solid ${GD}`, aspectRatio:"3/4", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1rem", position:"relative", width:"100%" },
  cTL:{ position:"absolute", top:10, left:10, width:22, height:22, borderTop:`1px solid ${G}`, borderLeft:`1px solid ${G}`, opacity:0.4 },
  cBR:{ position:"absolute", bottom:10, right:10, width:22, height:22, borderBottom:`1px solid ${G}`, borderRight:`1px solid ${G}`, opacity:0.4 },

  filterRow:{ display:"flex", gap:"0.5rem", flexWrap:"wrap", margin:"1rem 0 1.5rem" },
  filterBtn:{ fontFamily:"monospace", fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.5rem 1rem", background:"transparent", color:M, border:`1px solid ${BR2}`, cursor:"pointer" },
  productsGrid:{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1rem" },
  productCard:{ background:D3, border:`1px solid ${BR2}`, padding:"1.6rem" },

  bookCard:{ background:D3, border:`1px solid ${BR2}`, padding:"2rem", textAlign:"center" },

  contactLink:{ display:"flex", alignItems:"center", gap:"1rem", padding:"0.8rem 1.2rem", border:`1px solid ${BR2}`, background:D3, textDecoration:"none", color:W },
  label:{ fontFamily:"monospace", fontSize:"0.57rem", letterSpacing:"0.15em", textTransform:"uppercase", color:M },
  input:{ background:D3, border:`1px solid ${BR2}`, color:W, padding:"0.82rem 1rem", fontFamily:"sans-serif", fontSize:"0.88rem", outline:"none", width:"100%" },

  footer:{ background:D, padding:"2.5rem 3rem", borderTop:`1px solid ${BR}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem" },
};

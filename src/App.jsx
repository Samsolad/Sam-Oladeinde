import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  BOOKS,
  CONTACT_LINKS,
  ECOSYSTEM_NAME,
  FEATURES,
  FILTER_ITEMS,
  JOS_CAPABILITIES,
  JOS_MESSAGES,
  NAV_ITEMS,
  PILLARS,
  PROBLEM_CARDS,
  VISION_ITEMS,
  statusBadgeVariant,
  statusLabel,
} from '@/data/content'
import { IMAGES } from '@/data/images'

function SectionTag({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary mb-3">
      {children}
    </p>
  )
}

function SectionHeading({ children, className = '' }) {
  return (
    <h2 className={`text-4xl md:text-5xl font-display mb-4 leading-tight ${className}`}>
      {children}
    </h2>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const allProducts = PILLARS.flatMap((p) =>
    p.products.map((pr) => ({ ...pr, pillar: p.label, pillarId: p.id, pillarIcon: p.icon }))
  )
  const shown = filter === 'all' ? allProducts : allProducts.filter((p) => p.pillarId === filter)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button type="button" onClick={() => scrollTo('hero')} className="flex items-center gap-2 text-left">
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-base font-display text-primary block leading-tight">Sam Oladeinde</span>
              <span className="text-xs font-serif italic text-muted-foreground">{ECOSYSTEM_NAME}</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <a href="https://soladeinde.gumroad.com" target="_blank" rel="noreferrer">
                Get Started
              </a>
            </Button>
            <button
              type="button"
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="text-left py-2 text-sm text-foreground/70 hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            <Button size="sm" className="mt-2" asChild>
              <a href="https://soladeinde.gumroad.com" target="_blank" rel="noreferrer">
                Get Started
              </a>
            </Button>
          </div>
        )}
      </nav>

      {scrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center transition-transform hover:scale-105"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Hero */}
      <section id="hero" className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: IMAGES.heroBackground ? `url('${IMAGES.heroBackground}')` : undefined }}
        >
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
        </div>

        <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary font-serif italic">
                Ẹni tó bá gbádùn ìgbésí ayé rẹ̀…
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display mb-6 leading-tight">
              You didn&apos;t cross an ocean to live
              <span className="block text-primary">someone else&apos;s life.</span>
            </h1>

            <p className="text-lg text-foreground/70 mb-8 max-w-lg leading-relaxed font-serif">
              {ECOSYSTEM_NAME} is the complete ecosystem for Africans in the diaspora who want control of their time,
              freedom in their lifestyle, and a life built entirely on their own terms.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {PILLARS.map((p) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
                >
                  <span>{p.icon}</span>
                  <span className="hidden sm:inline">{p.label}</span>
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="gap-2" onClick={() => scrollTo('uncle-sam')}>
                Explore {ECOSYSTEM_NAME} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollTo('jos')}>
                Meet JOS →
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border/60">
              {[
                ['5', 'Ecosystem Pillars'],
                ['11', 'Products & Platforms'],
                ['3', 'Live Right Now'],
                ['£4K', 'Monthly Freedom Path'],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-display text-primary">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {IMAGES.heroAccent && (
            <div className="hidden md:block relative h-96">
              <img
                src={IMAGES.heroAccent}
                alt="Decorative botanical accent"
                className="w-full h-full object-contain animate-float"
              />
            </div>
          )}
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <SectionTag>The Problem</SectionTag>
              <SectionHeading>
                You arrived with <span className="text-primary">everything.</span>
                <br />
                And still felt like zero.
              </SectionHeading>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-serif">
                Qualifications nobody recognises. Networks you haven&apos;t built yet. A system with unwritten
                rules. You&apos;re not behind — you were just missing the infrastructure.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {PROBLEM_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.05}>
                <Card className="h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-4">{card.icon}</div>
                    <h3 className="font-display text-lg mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground font-serif leading-relaxed">{card.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <p className="font-serif text-lg italic text-primary">
                {ECOSYSTEM_NAME} is the infrastructure you were missing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Uncle Sam Ecosystem */}
      <section id="uncle-sam" className="py-20 md:py-32">
        <div className="container">
          <Reveal>
            <SectionTag>{ECOSYSTEM_NAME} — The Ecosystem</SectionTag>
            <SectionHeading>
              Five pillars.
              <br />
              <span className="text-primary">One fulfilled life.</span>
            </SectionHeading>
            <p className="text-lg text-foreground/60 max-w-2xl font-serif mb-10">
              Built by someone who&apos;s been five years ahead on the same road. {ECOSYSTEM_NAME} is the complete
              system for the African in the diaspora who refuses to settle for surviving.
            </p>
          </Reveal>

          <Tabs defaultValue="career" className="w-full">
            <TabsList className="mb-6">
              {PILLARS.map((p) => (
                <TabsTrigger key={p.id} value={p.id}>
                  <span>{p.icon}</span>
                  <span className="hidden sm:inline">{p.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {PILLARS.map((p) => (
              <TabsContent key={p.id} value={p.id}>
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background overflow-hidden">
                  <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 p-6 md:p-10">
                    <div>
                      <div className="text-5xl font-display text-primary/20 mb-2">{p.num}</div>
                      <h3 className="text-2xl font-display text-primary mb-3">{p.label}</h3>
                      <p className="font-serif italic text-foreground mb-4">{p.tagline}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
                      <div className="space-y-4">
                        {p.products.map((pr) => (
                          <div key={pr.name} className="pl-4 border-l-2 border-primary/40">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-display text-sm">{pr.name}</span>
                              <Badge variant={statusBadgeVariant(pr.status)}>{statusLabel(pr.status)}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{pr.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl opacity-20 mb-4">{p.icon}</div>
                        <p className="text-xs uppercase tracking-widest text-primary mb-2">Pillar {p.num}</p>
                        <p className="font-display text-2xl">{p.label}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* JOS */}
      <section id="jos" className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Reveal>
                <SectionTag>The Operating System · JOS</SectionTag>
                <SectionHeading>
                  Every pillar.
                  <br />
                  <span className="text-primary">One intelligence.</span>
                </SectionHeading>
                <blockquote className="border-l-2 border-primary pl-4 my-6 font-serif italic text-primary text-lg">
                  A personal AI operating system that knows who you are, manages every area of your life,
                  thinks like your best PA, pushes you like a mentor, and adapts in real time as life happens.
                </blockquote>
                <p className="text-muted-foreground font-serif leading-relaxed mb-4">
                  JOS is not another productivity app. It is the intelligence layer that sits underneath
                  every pillar of {ECOSYSTEM_NAME} — understanding your career goals, your wealth targets, your community
                  commitments, your cultural identity, your cross-border life.
                </p>
                <p className="text-muted-foreground font-serif leading-relaxed mb-6">
                  It knows you&apos;re an African in the UK with a job to grow, a property to buy, a community
                  to serve, and a family in Lagos to stay connected to.
                </p>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {JOS_CAPABILITIES.map((cap, i) => (
                  <Reveal key={cap.title} delay={i * 0.05}>
                    <div className="flex gap-3 p-4 rounded-xl bg-background border border-border/50">
                      <span className="text-xl">{cap.icon}</span>
                      <div>
                        <p className="text-sm font-medium mb-0.5">{cap.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Badge variant="building">⟳ In Development</Badge>
                  <span className="text-sm text-muted-foreground">
                    JOS is the most ambitious product in the {ECOSYSTEM_NAME} ecosystem. Building in public.
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <Card className="border-primary/30 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/10 blur-3xl pointer-events-none" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary animate-orb-pulse" />
                    <div>
                      <CardTitle>JOS</CardTitle>
                      <CardDescription>{ECOSYSTEM_NAME} Operating System</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 relative">
                  {JOS_MESSAGES.map((m, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg text-sm leading-relaxed ${
                        m.role === 'jos'
                          ? 'bg-primary/10 border border-primary/20 ml-0'
                          : 'bg-muted ml-6 border border-border'
                      }`}
                    >
                      {m.role === 'jos' && (
                        <span className="text-xs uppercase tracking-wider text-primary block mb-1">JOS</span>
                      )}
                      {m.text}
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background text-sm text-muted-foreground">
                    <span>Ask JOS anything about your {ECOSYSTEM_NAME} life…</span>
                    <span className="text-primary">↵</span>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <div className="flex flex-wrap items-center justify-center gap-4 p-8 rounded-2xl bg-background border border-border">
              {PILLARS.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/15"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-xs text-primary text-center max-w-[100px]">{p.label}</span>
                </div>
              ))}
              <div className="w-full text-center mt-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-display mb-2 animate-orb-pulse">
                  JOS
                </div>
                <p className="text-xs text-muted-foreground italic">
                  JOS connects and orchestrates all five {ECOSYSTEM_NAME} pillars in real time
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sam */}
      <section id="sam" className="py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            <Reveal>
              <div className="aspect-[3/4] rounded-2xl bg-card border border-primary/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/40" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/40" />
                {IMAGES.samPhoto ? (
                  <img
                    src={IMAGES.samPhoto}
                    alt="Sam Oladeinde"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="text-5xl opacity-20">📸</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Your photo</span>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Systems Builder', 'Author', 'YouTuber', 'Founder'].map((b) => (
                  <Badge key={b} variant="default">{b}</Badge>
                ))}
              </div>
            </Reveal>

            <div>
              <Reveal>
                <SectionTag>The Person Behind {ECOSYSTEM_NAME}</SectionTag>
                <SectionHeading>
                  I built {ECOSYSTEM_NAME}
                  <br />
                  <span className="text-primary">because I needed it first.</span>
                </SectionHeading>
                <blockquote className="border-l-2 border-primary pl-4 my-6 font-serif italic text-primary">
                  I&apos;m not a distant guru. I&apos;m a fellow traveller — five years ahead of you on the same road.
                </blockquote>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-muted-foreground font-serif leading-relaxed mb-4">
                  I moved from Nigeria to the UK less than 5 years ago. Qualifications, experience, ambition —
                  and still felt like zero. The UK has unwritten rules nobody hands you at the airport. So I
                  started asking people who&apos;d already figured it out.
                </p>
                <p className="text-muted-foreground font-serif leading-relaxed mb-4">
                  I interviewed 10+ African immigrants who rebuilt from scratch. Those conversations became
                  books. I saw my church coordinate transport over WhatsApp, spotted the GDPR risk, and built
                  software to fix it.
                </p>
                <p className="text-primary font-serif italic leading-relaxed mb-8">
                  Every product in {ECOSYSTEM_NAME} started with a problem I witnessed. Every solution exists because it didn&apos;t.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
                  {[
                    ['Nigeria', 'Origin'],
                    ['Newcastle', 'Base'],
                    ['<5yrs', 'In the UK'],
                    ['5 Pillars', 'Building'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <div className="text-xl font-display text-primary">{n}</div>
                      <div className="text-xs text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 md:py-32 bg-card">
        <div className="container">
          <Reveal>
            <SectionTag>All Products & Platforms</SectionTag>
            <SectionHeading>
              The complete
              <br />
              <span className="text-primary">{ECOSYSTEM_NAME} stack.</span>
            </SectionHeading>
            <p className="text-lg text-foreground/60 max-w-2xl font-serif mb-8">
              Every product, platform, and tool across all five pillars — from live and trading to building
              and coming soon.
            </p>
          </Reveal>

          <div className="flex flex-wrap gap-2 mb-8">
            {FILTER_ITEMS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                  filter === f.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((p, i) => (
              <Reveal key={`${p.name}-${i}`} delay={i * 0.03}>
                <Card className="h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300 border-t-2 border-t-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Badge variant="outline">
                        {p.pillarIcon} {p.pillar}
                      </Badge>
                      <Badge variant={statusBadgeVariant(p.status)}>{statusLabel(p.status)}</Badge>
                    </div>
                    <h3 className="font-display text-lg mb-1">{p.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{p.type}</p>
                    <p className="text-sm text-muted-foreground font-serif leading-relaxed">{p.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section id="books" className="py-20 md:py-32">
        <div className="container">
          <Reveal>
            <SectionTag>Career & Income · Books</SectionTag>
            <SectionHeading>
              The roadmap in
              <br />
              <span className="text-primary">your hands.</span>
            </SectionHeading>
            <p className="text-lg text-foreground/60 max-w-2xl font-serif mb-10">
              Four books. One complete journey. From the day you land to the day you own your life in the UK.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOOKS.map((b, i) => (
              <Reveal key={b.n} delay={i * 0.08}>
                <Card className={`text-center h-full ${b.live ? 'border-primary/40 shadow-md' : ''}`}>
                  <CardContent className="p-8">
                    <div className="text-5xl font-display text-primary/20 mb-4">{b.n}</div>
                    <h3 className="font-display text-lg mb-2">{b.t}</h3>
                    <p className="text-sm text-muted-foreground font-serif mb-6 leading-relaxed">{b.s}</p>
                    <Badge variant={b.live ? 'live' : 'coming'}>
                      {b.live ? `Available Now — ${b.p}` : 'Coming Soon'}
                    </Badge>
                    {b.live && (
                      <Button className="w-full mt-4" asChild>
                        <a href="https://soladeinde.gumroad.com" target="_blank" rel="noreferrer">
                          Buy Now — {b.p}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Uncle Sam / Features */}
      <section id="features" className="py-20 md:py-32 bg-card">
        <div className="container">
          <Reveal>
            <div className="text-center mb-16">
              <SectionTag>Why {ECOSYSTEM_NAME}</SectionTag>
              <SectionHeading>Built for the diaspora journey</SectionHeading>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-serif">
                Modern infrastructure with timeless design principles — for Africans building lives on their own terms.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <Card className="h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-3xl mb-4">{f.icon}</div>
                    <h3 className="font-display text-xl mb-3">{f.title}</h3>
                    <p className="text-muted-foreground font-serif leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <SectionTag>The {ECOSYSTEM_NAME} Vision</SectionTag>
              <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed max-w-3xl mx-auto text-foreground">
                An African lands in the UK with everything — and feels like zero.{' '}
                <strong className="text-primary not-italic font-display">
                  {ECOSYSTEM_NAME} is the infrastructure underneath every step back to themselves.
                </strong>
              </blockquote>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-6">
                — Sam Oladeinde · Systems Builder · Newcastle, UK
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VISION_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <Card className="text-center h-full bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <Badge variant={item.phase === 'Now' ? 'live' : item.phase === 'Vision' ? 'accent' : 'building'}>
                      {item.phase}
                    </Badge>
                    <h3 className="font-display mt-3 mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-serif">{item.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Button size="lg" className="gap-2" onClick={() => scrollTo('products')}>
              Browse All Products <ArrowRight className="w-4 h-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Reveal>
                <SectionTag>Join {ECOSYSTEM_NAME}</SectionTag>
                <SectionHeading>
                  The journey is
                  <br />
                  <span className="text-primary">better together.</span>
                </SectionHeading>
                <p className="text-lg text-foreground/60 font-serif mb-8">
                  Whether you want to collaborate, be interviewed for the channel, partner on a product, or
                  just say hello — fellow travellers are always welcome.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-3">
                  {CONTACT_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <span>{link.icon}</span>
                      <span className="text-sm font-medium">{link.label}</span>
                      <span className="text-xs text-muted-foreground ml-auto font-mono">{link.val}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <SectionTag>Send a Message</SectionTag>
              {sent ? (
                <Card className="text-center p-12">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="font-display text-xl text-primary mb-2">Message sent!</p>
                  <p className="text-sm text-muted-foreground font-serif">
                    Sam will be in touch. The journey continues.
                  </p>
                </Card>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (form.name && form.email && form.message) setSent(true)
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Amara Osei"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="What would you like to discuss?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="font-display text-primary">{ECOSYSTEM_NAME}</span>
              </div>
              <p className="text-sm text-muted-foreground font-serif">
                The complete ecosystem for Africans in the diaspora building lives on their own terms.
              </p>
            </div>
            {[
              { title: 'Ecosystem', links: [{ label: ECOSYSTEM_NAME, id: 'uncle-sam' }, { label: 'JOS', id: 'jos' }, { label: 'Products', id: 'products' }, { label: 'Books', id: 'books' }] },
              { title: 'Connect', links: ['Contact', 'Gumroad', 'YouTube', 'Transport Team'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'License'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-display mb-4">{col.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {col.links.map((link) => {
                    const label = typeof link === 'string' ? link : link.label
                    const id = typeof link === 'string' ? link.toLowerCase() : link.id
                    return (
                      <li key={label}>
                        <button
                          type="button"
                          onClick={() => scrollTo(id)}
                          className="hover:text-primary transition-colors"
                        >
                          {label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p className="font-serif italic text-center md:text-left max-w-md">
              &quot;Ẹni tó bá gbádùn ìgbésí ayé rẹ̀, kò níí jẹ́ irú ẹni tó ń gbé ìgbésí ayé ẹlòmíràn.&quot;
            </p>
            <p>© 2025 Sam Oladeinde · J. Ednieds Ltd · Registered in England and Wales</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

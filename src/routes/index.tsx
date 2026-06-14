import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, Compass, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { COMPANY, PLOTS, PLANS, GALLERY, TESTIMONIALS, formatINR } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auralis Estates — Premium Residential Plots & House Plans" },
      { name: "description", content: "Discover limited-edition plots, signature house plans and award-winning projects from Auralis Estates." },
      { property: "og:title", content: "Auralis Estates — Premium Residential Plots & House Plans" },
      { property: "og:description", content: "Discover limited-edition plots, signature house plans and award-winning projects." },
    ],
  }),
  component: Home,
});

const HERO_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80";

function Home() {
  const featuredPlots = PLOTS.slice(0, 3);
  const featuredPlans = PLANS.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Luxury residence" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--forest)] via-[var(--forest)]/85 to-[var(--forest)]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)] via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/35 text-[var(--gold)] text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Estd. 2009 · 25+ projects
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Premium <span className="text-gradient-gold">residential plots</span> & bespoke house plans.
            </h1>
            <p className="mt-6 text-lg text-[var(--cream-2)] max-w-xl leading-relaxed">
              A quiet portfolio of limited-edition addresses crafted for those who notice the small things — the grain of timber, the angle of light, the slow ease of arriving home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl">
                <Link to="/plots">Explore Plots <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button asChild variant="gold-outline" size="xl">
                <Link to="/plans">View House Plans</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "500+", l: "Happy Owners" },
                { v: "25+",  l: "Projects" },
                { v: "16",   l: "Years" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-[var(--gold)]">{s.v}</div>
                  <div className="text-xs uppercase tracking-widest text-[var(--muted-sage)]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plots */}
      <Section
        eyebrow="Featured Plots"
        title="A handpicked release for this season"
        sub="Three plots from our latest masterplan — each released by invitation only."
        cta={<Link to="/plots" className="text-[var(--gold)] hover:underline text-sm">View all plots →</Link>}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPlots.map((p) => (
            <article key={p.id} className="luxe-card rounded-xl overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <p className="text-sm text-[var(--muted-sage)]">{p.location} · {p.size.toLocaleString()} sqft</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold bg-[var(--gold)] text-[var(--forest)] px-2.5 py-1 rounded">
                    {formatINR(p.price)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-[11px] uppercase tracking-wider text-[var(--cream-2)]/85 border border-[var(--gold)]/25 px-2 py-0.5 rounded">{a}</span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <Button asChild variant="gold" size="sm" className="flex-1"><Link to="/contact">Enquire</Link></Button>
                  <Button asChild variant="gold-outline" size="sm" className="flex-1"><Link to="/plots">Details</Link></Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* House plans */}
      <Section
        eyebrow="House Plans"
        title="Live in one of four signature typologies"
        sub="From compact ateliers to four-bedroom heritage villas — every plan refined over a decade of practice."
        cta={<Link to="/plans" className="text-[var(--gold)] hover:underline text-sm">Explore all plans →</Link>}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredPlans.map((p) => (
            <article key={p.id} className="luxe-card rounded-xl overflow-hidden">
              <div className="aspect-[5/4] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-widest text-[var(--gold)]">{p.category}</div>
                <h3 className="font-display text-lg mt-1">{p.name}</h3>
                <p className="text-xs text-[var(--muted-sage)] mt-1">
                  {p.bedrooms} BR · {p.bathrooms} BA · {p.area} sqft
                </p>
                <div className="mt-3 text-sm text-[var(--cream-2)]">From <span className="text-[var(--gold)] font-semibold">{formatINR(p.price)}</span></div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section eyebrow="Why Auralis" title="A practice built around restraint">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Compass, t: "Prime Locations", d: "Curated micro-markets vetted across infrastructure, schools and natural assets." },
            { icon: Building2, t: "Considered Architecture", d: "In-house atelier of architects who refuse the generic." },
            { icon: ShieldCheck, t: "Transparent Payments", d: "Clear, milestone-based plans with zero hidden charges." },
            { icon: Award, t: "16 Years, On Time", d: "A delivery record measured in handed-over keys, not promises." },
          ].map((f) => (
            <div key={f.t} className="luxe-card rounded-xl p-6">
              <div className="w-11 h-11 grid place-items-center rounded-md border border-[var(--gold)]/40 text-[var(--gold)] bg-[var(--forest)]">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg mt-4">{f.t}</h3>
              <p className="mt-2 text-sm text-[var(--cream-2)]/85 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section eyebrow="Owners" title="Stories from our residents">
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="luxe-card rounded-xl p-6">
              <div className="flex gap-1 text-[var(--gold)]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[var(--cream-2)] leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="text-cream font-medium">{t.name}</div>
                <div className="text-[var(--muted-sage)] text-xs">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section eyebrow="Gallery" title="A glimpse of the work" cta={<Link to="/gallery" className="text-[var(--gold)] hover:underline text-sm">Visit full gallery →</Link>}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY.slice(0, 8).map((g, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg border border-[var(--gold)]/15 group">
              <img src={g.src} alt={g.tag} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="px-5 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--sage)]/30 via-[var(--forest-2)] to-[var(--forest)]" />
          <div className="absolute inset-0 border border-[var(--gold)]/30 rounded-2xl pointer-events-none" />
          <div className="relative px-8 md:px-14 py-14 md:py-20 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <p className="text-[var(--gold)] text-xs uppercase tracking-widest">Ready to begin?</p>
              <h2 className="font-display text-4xl md:text-5xl mt-3">Schedule a private site visit.</h2>
              <p className="mt-4 text-[var(--cream-2)] max-w-xl">Spend an unhurried morning with a member of our team. We'll walk you through the masterplan, the architecture and the land itself.</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Button asChild variant="gold" size="xl"><Link to="/contact">Schedule a Visit</Link></Button>
              <Button asChild variant="gold-outline" size="xl"><a href={`tel:${COMPANY.phoneHref}`}>Call {COMPANY.phone}</a></Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Section({
  eyebrow, title, sub, cta, children,
}: { eyebrow: string; title: string; sub?: string; cta?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="px-5 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[var(--gold)] text-xs uppercase tracking-widest">{eyebrow}</p>
            <h2 className="font-display text-3xl md:text-4xl mt-2 max-w-2xl">{title}</h2>
            {sub && <p className="mt-3 text-[var(--muted-sage)] max-w-2xl">{sub}</p>}
          </div>
          {cta}
        </div>
        {children}
      </div>
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Compass, Leaf, ShieldCheck, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { COMPANY, PLOTS, PLANS, GALLERY, TESTIMONIALS, formatINR } from "@/lib/data";

import { getPlots, getPlans } from "@/lib/inventoryService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shika Estates — Premium Residential Plots & House Plans" },
      { name: "description", content: "An invitation-only portfolio of limited-edition residential plots, house plans and signature projects from Shika Estates." },
      { property: "og:title", content: "Shika Estates — Premium Residential Plots & House Plans" },
      { property: "og:description", content: "Limited-edition plots, signature house plans and award-winning projects." },
    ],
  }),
  component: Home,
});

const HERO_IMG = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85";
const HERO_SIDE = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85";
const STORY_IMG = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85";

import { useAuth } from "@/hooks/useAuth";

function Home() {
  const { role } = useAuth();
  const featuredPlots = getPlots().slice(0, 3);
  const featuredPlans = getPlans().slice(0, 4);

  return (
    <Layout>
      {/* HERO — editorial split */}
      <section className="relative pt-6 lg:pt-10">
        <div className="max-w-[1480px] mx-auto container-edge">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between min-h-[78vh] lg:min-h-[82vh] fade-up">
              <div className="flex items-center gap-4 text-[var(--muted-sage)]">
                <span className="gold-rule-left" />
                <span className="eyebrow">Estd. 2026 · Hyderabad · India</span>
              </div>

              <div className="mt-10 lg:mt-0">
                <h1 className="font-display text-[12vw] lg:text-[8.5vw] leading-[0.92] tracking-tight">
                  Quiet&nbsp;land.
                  <br />
                  <span className="italic text-gradient-gold">Considered</span>
                  <br />
                  homes.
                </h1>
                <div className="mt-10 grid sm:grid-cols-[1fr_auto] gap-8 items-end max-w-3xl">
                  <p className="text-lg text-[var(--cream-2)] leading-relaxed max-w-lg">
                    An invitation-only portfolio of premium residential plots and house
                    plans, crafted for those who value home in detail, not square footage.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="gold" size="xl">
                      <Link to="/plots">View the Release <ArrowUpRight className="ml-1" /></Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="text-[var(--cream)]/70 hover:text-[var(--gold)] justify-start px-0">
                      <Link to="/about">Read our story →</Link>
                    </Button>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 relative fade-in">
              <div className="relative h-[55vh] lg:h-[82vh] overflow-hidden rounded-sm">
                <img src={HERO_IMG} alt="Featured residence" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest)]/60 via-transparent to-[var(--forest)]/30" />
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <div>
                    <div className="eyebrow text-[var(--cream)]/80">Featured · Vol. XVI</div>
                    <div className="font-display text-2xl mt-1 text-[var(--cream)]">Magnolia Park</div>
                  </div>
                  <div className="hidden md:flex w-11 h-11 rounded-full border border-[var(--cream)]/40 items-center justify-center text-[var(--cream)] backdrop-blur-sm">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute -bottom-10 -left-16 w-40 h-52 overflow-hidden rounded-sm border border-[var(--gold)]/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
                <img src={HERO_SIDE} alt="" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="mt-24 lg:mt-40 border-y border-[var(--gold)]/15 py-6 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap font-display text-3xl md:text-5xl italic text-[var(--cream)]/40">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center">
              {["Restraint.", "Provenance.", "Craft.", "Stewardship.", "Patience.", "Permanence."].map((w) => (
                <span key={w} className="flex items-center">
                  <span className="px-10">{w}</span>
                  <span className="text-[var(--gold)] text-base">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED PLOTS */}
      <Section
        index="01"
        eyebrow="Latest Release"
        title="Three plots, by invitation."
        sub="From our spring volume — each parcel personally surveyed, titled and ready to build on."
        cta={{ label: "View all plots", to: "/plots" }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPlots.map((p, i) => (
            <article key={p.id} className="group">
              <Link to="/plots" className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)]/80 via-[var(--forest)]/0 to-[var(--forest)]/0" />
                  <span className="absolute top-4 left-4 eyebrow text-[var(--cream)]/80">{String(i + 1).padStart(2, "0")} / 03</span>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl text-[var(--cream)]">{p.name}</h3>
                        <p className="text-xs text-[var(--cream)]/70 mt-1 font-mono uppercase tracking-widest">{p.location}</p>
                      </div>
                      <span className="text-[var(--gold)] font-display text-xl whitespace-nowrap">{formatINR(p.price)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 mt-4">
                  <span className="text-sm text-[var(--cream-2)]/80">{p.size.toLocaleString()} sqft · {p.amenities[0]}</span>
                  <span className="text-[var(--gold)] text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* HOUSE PLANS */}
      <Section
        index="02"
        eyebrow="House Plans"
        title="Six typologies. Infinite variations."
        sub="From compact ateliers to four-bedroom heritage villas — every plan refined over a decade of practice."
        cta={{ label: "Explore all plans", to: "/plans" }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredPlans.map((p) => (
            <article key={p.id} className="luxe-card rounded-sm overflow-hidden">
              <div className="aspect-[5/6] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1400ms]" />
              </div>
              <div className="p-5">
                <div className="eyebrow text-[var(--gold)]">{p.category}</div>
                <h3 className="font-display text-2xl mt-2">{p.name}</h3>
                <p className="text-xs text-[var(--muted-sage)] mt-1.5 font-mono tracking-wider">
                  {p.bedrooms} BR · {p.bathrooms} BA · {p.area} SQFT
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--gold)]/15 text-sm text-[var(--cream-2)]/80">
                  From <span className="text-[var(--gold)] font-medium">{formatINR(p.price)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* STORY / WHY US */}
      <section className="px-0 mt-32 lg:mt-48">
        <div className="max-w-[1480px] mx-auto container-edge">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <img src={STORY_IMG} alt="Studio interior" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="flex items-center gap-4">
                <span className="gold-rule-left" />
                <span className="eyebrow">03 — On Practice</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl mt-6">
                We build slowly,<br /><span className="italic text-gradient-gold">on purpose.</span>
              </h2>
              <p className="mt-6 text-lg text-[var(--cream-2)] leading-relaxed max-w-lg">
                We choose land carefully. We refuse the work we cannot do well.
                The result is a portfolio we will be proud to walk through, a decade later.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { icon: Compass, t: "Prime micro-markets", d: "Curated for infrastructure, schools and natural assets." },
                  { icon: ShieldCheck, t: "Transparent payments", d: "Milestone-based, zero hidden charges." },
                  { icon: Leaf, t: "Stewardship", d: "We leave each site with more trees than we found." },
                  { icon: Award, t: "Delivered on time", d: "A record measured in handed-over keys." },
                ].map((f) => (
                  <div key={f.t} className="flex gap-3">
                    <f.icon className="w-5 h-5 text-[var(--gold)] mt-1 shrink-0" />
                    <div>
                      <div className="font-display text-lg">{f.t}</div>
                      <div className="text-sm text-[var(--cream-2)]/75 leading-relaxed mt-0.5">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild variant="gold-outline" size="lg" className="mt-10">
                <Link to="/about">About the atelier →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section index="04" eyebrow="Owners" title="From the people who live here.">
        <div className="grid md:grid-cols-3 gap-px bg-[var(--gold)]/15 border-y border-[var(--gold)]/15">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="bg-[var(--forest)] p-8 lg:p-10">
              <div className="flex gap-0.5 text-[var(--gold)]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-display text-2xl leading-snug text-[var(--cream)]">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-[var(--gold)]/15">
                <div className="text-[var(--cream)] font-medium">{t.name}</div>
                <div className="text-[var(--muted-sage)] text-xs mt-0.5 font-mono uppercase tracking-widest">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* GALLERY STRIP */}
      <Section index="05" eyebrow="Gallery" title="A glimpse of the work." cta={{ label: "Full gallery", to: "/gallery" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {GALLERY.slice(0, 6).map((g, i) => (
            <div key={i} className={`overflow-hidden rounded-sm border border-[var(--gold)]/10 ${i % 3 === 0 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"}`}>
              <img src={g.src} alt={g.tag} className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1400ms]" />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="container-edge mt-32 lg:mt-48 mb-8">
        <div className="max-w-[1480px] mx-auto relative overflow-hidden rounded-sm border border-[var(--gold)]/30">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest)] via-[var(--forest)]/95 to-[var(--forest-2)]" />
          </div>
          <div className="relative px-8 md:px-16 py-20 md:py-28 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <span className="eyebrow">Begin</span>
              <h2 className="font-display text-5xl md:text-6xl mt-4 leading-[0.95]">
                Spend a quiet morning<br /><span className="italic text-gradient-gold">on the land.</span>
              </h2>
              <p className="mt-6 text-[var(--cream-2)] max-w-lg">
                A member of our team will walk you through the masterplan, the architecture and the parcel itself — unhurried, by appointment.
              </p>
            </div>
            <div className="flex flex-col gap-3">
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
  index, eyebrow, title, sub, cta, children,
}: {
  index?: string; eyebrow: string; title: string; sub?: string;
  cta?: { label: string; to: string }; children: React.ReactNode;
}) {
  return (
    <section className="container-edge mt-28 lg:mt-44">
      <div className="max-w-[1480px] mx-auto">
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-end mb-12 lg:mb-16">
          {index && (
            <div className="eyebrow text-[var(--muted-sage)] md:pt-3">— {index}</div>
          )}
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-3 max-w-2xl leading-[1.02]">{title}</h2>
            {sub && <p className="mt-4 text-[var(--cream-2)]/80 max-w-xl">{sub}</p>}
          </div>
          {cta && (
            <Link to={cta.to} className="self-end text-[var(--gold)] hover:text-[var(--gold-soft)] text-sm font-mono uppercase tracking-widest whitespace-nowrap inline-flex items-center gap-2">
              {cta.label} <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

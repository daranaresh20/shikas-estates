import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { COMPANY } from "@/lib/data";
import { Award, Building2, Heart, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${COMPANY.name}` },
      { name: "description", content: "Sixteen years of crafting limited-edition residences with restraint, intention and an obsession with craft." },
      { property: "og:title", content: `About — ${COMPANY.name}` },
      { property: "og:description", content: "Our story, our team, and the architectural practice behind Shika's Estates." },
    ],
  }),
  component: About,
});

const TEAM = [
  { name: "Aarav Menon", title: "Founder & Principal Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { name: "Isha Krishnan", title: "Head of Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
  { name: "Rohan Iyer", title: "Director of Operations", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "Meera Nair", title: "Client Experience Lead", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80" },
];

function About() {
  return (
    <Layout>
      <section className="px-5 lg:px-8 pt-20 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">About {COMPANY.name}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-3">A practice of restraint, craft and provenance.</h1>
          <p className="mt-6 text-lg text-[var(--cream-2)] max-w-3xl mx-auto leading-relaxed">
            Founded in 2026, we are building a curated portfolio of plots and residences for a discerning clientele who measure success in detail, not square footage.
          </p>
        </div>
      </section>

      <section className="px-5 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
            alt="Studio interior"
            className="rounded-xl border border-[var(--gold)]/20"
          />
          <div>
            <p className="text-[var(--gold)] text-xs uppercase tracking-widest">Our story</p>
            <h2 className="font-display text-3xl md:text-4xl mt-3">From a single drawing board to twenty-five communities.</h2>
            <div className="mt-6 space-y-4 text-[var(--cream-2)]/90 leading-relaxed">
              <p>What started as a two-person studio above a bookstore in Banjara Hills has quietly grown into one of Hyderabad's most respected boutique developers — without ever losing the original promise: every project, personally led.</p>
              <p>We choose land carefully. We build slowly. We refuse the projects we cannot do well. The result is a portfolio that we are still proud to walk through, years later.</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { v: "2026", l: "Founded" },
                { v: "25+",  l: "Projects" },
                { v: "500+", l: "Owners" },
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

      <section className="px-5 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="luxe-card rounded-xl p-8">
            <div className="text-[var(--gold)] flex items-center gap-2 text-xs uppercase tracking-widest"><Leaf className="w-4 h-4" /> Mission</div>
            <h3 className="font-display text-2xl mt-3">Build slow. Build well. Build to be inherited.</h3>
            <p className="mt-4 text-[var(--cream-2)]/85">We design homes for second generations — places that age into something more beautiful, not less.</p>
          </div>
          <div className="luxe-card rounded-xl p-8" style={{ borderColor: "rgba(184,103,74,0.4)" }}>
            <div className="text-[var(--copper)] flex items-center gap-2 text-xs uppercase tracking-widest"><Heart className="w-4 h-4" /> Vision</div>
            <h3 className="font-display text-2xl mt-3">To make restraint the new luxury.</h3>
            <p className="mt-4 text-[var(--cream-2)]/85">In an industry of more, we are quietly building a body of work defined by less — less noise, less excess, more meaning.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            { icon: Award, t: "Craft", d: "Every joint, every finish, signed off by the design team." },
            { icon: Building2, t: "Provenance", d: "Materials traced; stories told." },
            { icon: Leaf, t: "Stewardship", d: "We leave each site with more trees than we found." },
          ].map((v) => (
            <div key={v.t} className="luxe-card rounded-xl p-6">
              <v.icon className="w-5 h-5 text-[var(--gold)]" />
              <h4 className="font-display text-lg mt-3">{v.t}</h4>
              <p className="text-sm text-[var(--cream-2)]/85 mt-2">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">The team</p>
          <h2 className="font-display text-3xl md:text-4xl mt-2">A small studio of senior practitioners.</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {TEAM.map((m) => (
              <div key={m.name} className="luxe-card rounded-xl overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-display text-lg">{m.name}</div>
                  <div className="text-xs text-[var(--muted-sage)] mt-1">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

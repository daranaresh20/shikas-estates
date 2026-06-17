import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { GALLERY } from "@/lib/data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Home" },
      { name: "description", content: "A visual archive of projects, plots, interiors and construction across our portfolio." },
      { property: "og:title", content: "Gallery — Home" },
      { property: "og:description", content: "An archive of our projects, plots and interiors." },
    ],
  }),
  component: GalleryPage,
});

const TAGS = ["All", "Projects", "Plots", "Interiors", "Construction"] as const;

function GalleryPage() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const [idx, setIdx] = useState<number | null>(null);
  const filtered = useMemo(() => tag === "All" ? [...GALLERY] : GALLERY.filter((g) => g.tag === tag), [tag]);

  const prev = () => setIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setIdx((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <Layout>
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-mono">Gallery</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-2 leading-[1.05]">A visual archive.</h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted-sage)] max-w-2xl leading-relaxed">A curated collection of plots, residences and details — captured by the photographers we trust most.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button key={t} onClick={() => { setTag(t); setIdx(null); }}
                className={`px-4 py-2 rounded-full text-xs border transition min-h-[36px] ${
                  tag === t
                    ? "bg-[var(--gold)] text-[var(--forest)] border-[var(--gold)] font-mono uppercase tracking-wider shadow-sm"
                    : "border-[var(--gold)]/30 text-cream/85 hover:border-[var(--gold)] hover:text-[var(--gold)] font-mono uppercase tracking-wider"
                }`}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filtered.map((g, i) => (
            <button key={i} onClick={() => setIdx(i)} className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--gold)]/15 bg-slate-100">
              <img src={g.src} alt={g.tag} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-widest bg-[var(--forest)]/90 text-[var(--gold)] border border-[var(--gold)]/35 px-2 py-0.5 rounded font-mono">{g.tag}</span>
            </button>
          ))}
        </div>
      </section>

      {idx !== null && (
        <div className="fixed inset-0 z-50 bg-[var(--forest)]/95 backdrop-blur-md grid place-items-center p-4" onClick={() => setIdx(null)}>
          <button onClick={(e) => { e.stopPropagation(); setIdx(null); }} className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-[var(--forest-2)] text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)] border border-[var(--gold)]/10 shadow-sm transition-colors">
            <X className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 sm:left-5 w-10 h-10 sm:w-12 sm:h-12 grid place-items-center rounded-full bg-[var(--forest-2)] text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)] border border-[var(--gold)]/10 shadow-sm transition-colors">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <img src={filtered[idx].src} alt="" className="max-h-[80vh] max-w-[90vw] object-contain rounded-md border border-[var(--gold)]/30 shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 sm:right-5 w-10 h-10 sm:w-12 sm:h-12 grid place-items-center rounded-full bg-[var(--forest-2)] text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)] border border-[var(--gold)]/10 shadow-sm transition-colors">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-[var(--muted-sage)] uppercase tracking-wider">
            {idx + 1} of {filtered.length} · {filtered[idx].tag}
          </div>
        </div>
      )}
    </Layout>
  );
}

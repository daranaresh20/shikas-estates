import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { GALLERY } from "@/lib/data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Shika's Estates" },
      { name: "description", content: "A visual archive of projects, plots, interiors and construction across our portfolio." },
      { property: "og:title", content: "Gallery — Shika's Estates" },
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
      <section className="px-5 lg:px-8 pt-16 pb-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">Gallery</p>
          <h1 className="font-display text-5xl mt-2">A visual archive.</h1>
          <p className="mt-4 text-[var(--muted-sage)] max-w-2xl">Sixteen years of plots, residences and details — captured by the photographers we trust most.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button key={t} onClick={() => { setTag(t); setIdx(null); }}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  tag === t
                    ? "bg-[var(--gold)] text-[var(--forest)] border-[var(--gold)]"
                    : "border-[var(--gold)]/30 text-cream/85 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((g, i) => (
            <button key={i} onClick={() => setIdx(i)} className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--gold)]/15">
              <img src={g.src} alt={g.tag} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-widest bg-[var(--forest)]/80 text-[var(--gold)] border border-[var(--gold)]/40 px-2 py-0.5 rounded">{g.tag}</span>
            </button>
          ))}
        </div>
      </section>

      {idx !== null && (
        <div className="fixed inset-0 z-50 bg-[var(--forest)]/95 grid place-items-center p-4" onClick={() => setIdx(null)}>
          <button onClick={(e) => { e.stopPropagation(); setIdx(null); }} className="absolute top-5 right-5 w-10 h-10 grid place-items-center rounded-full bg-[var(--forest-2)] text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)]">
            <X className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-5 w-12 h-12 grid place-items-center rounded-full bg-[var(--forest-2)] text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)]">
            <ChevronLeft />
          </button>
          <img src={filtered[idx].src} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-md border border-[var(--gold)]/30" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-5 w-12 h-12 grid place-items-center rounded-full bg-[var(--forest-2)] text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)]">
            <ChevronRight />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-[var(--muted-sage)]">
            {idx + 1} of {filtered.length} · {filtered[idx].tag}
          </div>
        </div>
      )}
    </Layout>
  );
}

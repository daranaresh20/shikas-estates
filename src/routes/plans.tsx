import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { getPlans, ExtendedPlan } from "@/lib/inventoryService";
import { formatINR } from "@/lib/data";
import { Bath, BedDouble, Car, Ruler, X } from "lucide-react";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "House Plans — Shika's Estates" },
      { name: "description", content: "Bespoke house plans from compact ateliers to four-bedroom heritage villas, fully customisable to your land." },
      { property: "og:title", content: "House Plans — Shika's Estates" },
      { property: "og:description", content: "Signature 1BHK, 2BHK, 3BHK and luxury house plans." },
    ],
  }),
  component: PlansPage,
});

const CATS = ["All", "1BHK", "2BHK", "3BHK", "Luxury"] as const;

function PlansPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [selected, setSelected] = useState<ExtendedPlan | null>(null);
  
  const plans = getPlans();
  
  const filtered = useMemo(() => cat === "All" ? plans : plans.filter((p) => p.category === cat), [plans, cat]);

  return (
    <Layout>
      <section className="px-5 lg:px-8 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">House Plans</p>
          <h1 className="font-display text-5xl mt-2">Six typologies. Endless customisation.</h1>
          <p className="mt-4 text-[var(--muted-sage)] max-w-2xl">Each plan is the start of a conversation. Pick a shape we love, then we shape it around your life.</p>
        </div>
      </section>

      <section className="px-5 lg:px-8 mt-2">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                cat === c
                  ? "bg-[var(--gold)] text-[var(--forest)] border-[var(--gold)] shadow-[0_8px_24px_-10px_rgba(212,165,116,0.6)]"
                  : "border-[var(--gold)]/30 text-cream/85 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="luxe-card rounded-xl overflow-hidden group flex flex-col">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded bg-[var(--forest)]/80 text-[var(--gold)] border border-[var(--gold)]/40">{p.category}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-xl">{p.name}</h3>
                <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-[var(--cream-2)]/85">
                  <Spec icon={BedDouble} v={`${p.bedrooms} BR`} />
                  <Spec icon={Bath} v={`${p.bathrooms} BA`} />
                  <Spec icon={Car} v={`${p.parking} P`} />
                  <Spec icon={Ruler} v={`${p.area}`} />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.features.map((f) => (
                    <span key={f} className="text-[11px] uppercase tracking-wider text-[var(--cream-2)]/85 border border-[var(--gold)]/25 px-2 py-0.5 rounded">{f}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="text-sm text-[var(--cream-2)]/80">From <span className="text-[var(--gold)] font-semibold">{formatINR(p.price)}</span></div>
                  <Button variant="gold" size="sm" onClick={() => setSelected(p)}>View Plan</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (() => {
        const imagesList = [selected.image, ...(selected.additionalImages || [])].filter(img => img && img.trim() !== "");
        const [activeImgIdx, setActiveImgIdx] = useState(0);

        const nextImg = () => {
          setActiveImgIdx((prev) => (prev + 1) % imagesList.length);
        };

        const prevImg = () => {
          setActiveImgIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
        };

        return (
          <div className="fixed inset-0 z-50 bg-[var(--forest)]/85 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" onClick={() => setSelected(null)}>
            <div className="max-w-4xl w-full bg-[var(--forest-2)] border border-[var(--gold)]/30 rounded-xl overflow-hidden my-8" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-96 bg-[var(--forest)]/40 flex items-center justify-center">
                <img src={imagesList[activeImgIdx]} alt={selected.name} className="w-full h-full object-cover" />
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-[var(--forest)]/80 text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)] z-10">
                  <X className="w-4 h-4" />
                </button>
                
                {imagesList.length > 1 && (
                  <>
                    <button onClick={prevImg} className="absolute left-4 w-10 h-10 rounded-full bg-black/55 hover:bg-[var(--gold)] hover:text-[var(--forest)] text-cream flex items-center justify-center transition-colors font-mono select-none" style={{fontSize: '20px'}}>
                      &larr;
                    </button>
                    <button onClick={nextImg} className="absolute right-4 w-10 h-10 rounded-full bg-black/55 hover:bg-[var(--gold)] hover:text-[var(--forest)] text-cream flex items-center justify-center transition-colors font-mono select-none" style={{fontSize: '20px'}}>
                      &rarr;
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-xs font-mono text-[var(--cream)] select-none">
                      {activeImgIdx + 1} / {imagesList.length}
                    </div>
                  </>
                )}
              </div>
              <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--gold)]">{selected.category}</p>
                  <h3 className="font-display text-3xl mt-1">{selected.name}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
                    <Info label="Bedrooms" value={`${selected.bedrooms}`} />
                    <Info label="Bathrooms" value={`${selected.bathrooms}`} />
                    <Info label="Parking" value={`${selected.parking}`} />
                    <Info label="Built-up Area" value={`${selected.area} sqft`} />
                    <Info label="Starting Price" value={formatINR(selected.price)} />
                  </div>
                  <h4 className="font-display text-lg mt-6">Signature Features</h4>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--cream-2)]/85">
                    {selected.features.map((f) => <li key={f}>• {f}</li>)}
                  </ul>
                </div>
                <InquiryForm defaultSubject="Customization Request" title="Request customisation" />
              </div>
            </div>
          </div>
        );
      })()}
    </Layout>
  );
}

function Spec({ icon: Icon, v }: { icon: React.ElementType; v: string }) {
  return (
    <div className="flex items-center gap-1 border border-[var(--gold)]/15 rounded-md py-1.5 px-2 justify-center">
      <Icon className="w-3.5 h-3.5 text-[var(--gold)]" />
      <span>{v}</span>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--gold)]/15 rounded-md p-3">
      <div className="text-[10px] uppercase tracking-widest text-[var(--muted-sage)]">{label}</div>
      <div className="text-cream mt-1">{value}</div>
    </div>
  );
}

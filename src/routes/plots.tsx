import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { getPlots, ExtendedPlot } from "@/lib/inventoryService";
import { formatINR } from "@/lib/data";
import { Search, X } from "lucide-react";

export const Route = createFileRoute("/plots")({
  head: () => ({
    meta: [
      { title: "Available Plots — Shika Estates" },
      { name: "description", content: "Browse limited-edition residential plots across Hyderabad with transparent pricing, sizes and availability." },
      { property: "og:title", content: "Available Plots — Shika Estates" },
      { property: "og:description", content: "Curated residential plots — corner, hilltop, riverside and more." },
    ],
  }),
  component: PlotsPage,
});

function PlotsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | "Available" | "Reserved" | "Sold">("All");
  const [size, setSize] = useState<"All" | "<2000" | "2000-3000" | ">3000">("All");
  const [selected, setSelected] = useState<ExtendedPlot | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const plots = getPlots();

  const filtered = useMemo(() => plots.filter((p) => {
    if (status !== "All" && p.status !== status) return false;
    if (size === "<2000" && p.size >= 2000) return false;
    if (size === "2000-3000" && (p.size < 2000 || p.size > 3000)) return false;
    if (size === ">3000" && p.size <= 3000) return false;
    if (q && !(p.name + " " + p.location).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [plots, q, status, size]);

  const imagesList = useMemo(() => {
    if (!selected) return [];
    return [selected.image, ...(selected.additionalImages || [])].filter(img => img && img.trim() !== "");
  }, [selected]);

  const nextImg = () => {
    if (imagesList.length === 0) return;
    setActiveImgIdx((prev) => (prev + 1) % imagesList.length);
  };

  const prevImg = () => {
    if (imagesList.length === 0) return;
    setActiveImgIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  return (
    <Layout>
      <section className="px-5 lg:px-8 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">Available Plots</p>
          <h1 className="font-display text-5xl mt-2">Land worth waiting for.</h1>
          <p className="mt-4 text-[var(--muted-sage)] max-w-2xl">A curated release across Hyderabad — every plot personally surveyed, titled and ready to build on.</p>
        </div>
      </section>

      <section className="px-5 lg:px-8 sticky top-16 z-30 backdrop-blur-md bg-[var(--forest)]/90 border-y border-[var(--gold)]/15 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-sage)]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or location"
              className="w-full bg-[var(--forest-2)] border border-[var(--gold)]/25 rounded-md pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)]" />
          </div>
          <Select label="Status" value={status} onChange={(v) => setStatus(v as typeof status)} opts={["All", "Available", "Reserved", "Sold"]} />
          <Select label="Size" value={size} onChange={(v) => setSize(v as typeof size)} opts={["All", "<2000", "2000-3000", ">3000"]} />
          {(q || status !== "All" || size !== "All") && (
            <Button size="sm" variant="ghost" onClick={() => { setQ(""); setStatus("All"); setSize("All"); }}>Reset</Button>
          )}
        </div>
      </section>

      <section className="px-5 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-[var(--muted-sage)] py-20">No plots match your filters.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article key={p.id} className="luxe-card rounded-xl overflow-hidden group flex flex-col">
                   <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded ${
                      p.status === "Available" ? "bg-[var(--gold)] text-[var(--forest)]"
                        : p.status === "Reserved" ? "bg-[var(--copper)] text-cream"
                        : "bg-[var(--forest-3)] text-[var(--muted-sage)]"
                    }`}>{p.status}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl">{p.name}</h3>
                        <p className="text-sm text-[var(--muted-sage)]">{p.location} · {p.size.toLocaleString()} sqft</p>
                      </div>
                      <span className="shrink-0 text-xs font-semibold bg-[var(--gold)] text-[var(--forest)] px-2.5 py-1 rounded">{formatINR(p.price)}</span>
                    </div>
                    <p className="text-sm text-[var(--cream-2)]/85 mt-3 flex-1">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.amenities.map((a) => (
                        <span key={a} className="text-[11px] uppercase tracking-wider text-[var(--cream-2)]/85 border border-[var(--gold)]/25 px-2 py-0.5 rounded">{a}</span>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Button variant="gold" size="sm" className="flex-1" onClick={() => { setActiveImgIdx(0); setSelected(p); }}>View Details</Button>
                      <Button variant="gold-outline" size="sm" className="flex-1" onClick={() => { setActiveImgIdx(0); setSelected(p); }}>Enquire Now</Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-[var(--forest)]/85 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" onClick={() => setSelected(null)}>
          <div className="max-w-4xl w-full bg-[var(--forest-2)] border border-[var(--gold)]/30 rounded-xl overflow-hidden my-8" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-96 bg-[var(--forest)]/40 flex items-center justify-center">
              {imagesList[activeImgIdx] && (
                <img src={imagesList[activeImgIdx]} alt={selected.name} className="w-full h-full object-cover" />
              )}
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
                <h3 className="font-display text-3xl">{selected.name}</h3>
                <p className="text-[var(--muted-sage)] mt-1">{selected.location}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Info label="Size" value={`${selected.size.toLocaleString()} sqft`} />
                  <Info label="Price" value={formatINR(selected.price)} />
                  <Info label="Status" value={selected.status} />
                  <Info label="Orientation" value="East–West" />
                </div>
                <h4 className="font-display text-lg mt-6">Amenities</h4>
                <ul className="mt-2 grid grid-cols-2 gap-1.5 text-sm text-[var(--cream-2)]/85">
                  {selected.amenities.map((a) => <li key={a}>• {a}</li>)}
                </ul>
                <p className="text-sm text-[var(--cream-2)]/85 mt-5">{selected.description}</p>
              </div>
              <InquiryForm defaultSubject="Plot Inquiry" title={`Enquire about ${selected.name}`} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function Select({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[] }) {
  return (
    <label className="text-xs text-[var(--muted-sage)] flex items-center gap-2">
      {label}:
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="bg-[var(--forest-2)] border border-[var(--gold)]/25 rounded-md px-3 py-2 text-cream text-sm focus:outline-none focus:border-[var(--gold)]">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
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

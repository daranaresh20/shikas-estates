import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { getPlots, ExtendedPlot } from "@/lib/inventoryService";
import { formatINR } from "@/lib/data";
import { Search, X, ShieldCheck, Compass, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

import { useNavigate, useSearch } from "@tanstack/react-router";

type PlotsSearch = {
  q?: string;
  status?: string;
  facing?: string;
  approval?: string;
};

export const Route = createFileRoute("/plots")({
  validateSearch: (search: Record<string, unknown>): PlotsSearch => {
    return {
      q: (search.q as string) || undefined,
      status: (search.status as string) || undefined,
      facing: (search.facing as string) || undefined,
      approval: (search.approval as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Open Plots for Sale — Shikas Estates" },
      { name: "description", content: "Browse premium HMDA and DTCP approved residential plots across Hyderabad (Pasumamla, Abdullapurmet) with clear titles." },
      { property: "og:title", content: "Open Plots for Sale — Shikas Estates" },
      { property: "og:description", content: "Premium gated residential plots with clear titles and HMDA/DTCP approvals." },
    ],
  }),
  component: PlotsPage,
});

function PlotsPage() {
  const { t, language } = useLanguage();
  const search = useSearch({ from: "/plots" });
  const navigate = useNavigate({ from: "/plots" });

  const q = search.q || "";
  const status = search.status || "All";
  const facing = search.facing || "All";
  const approval = search.approval || "All";

  const [selected, setSelected] = useState<ExtendedPlot | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const plots = getPlots();

  const setFilter = (key: keyof PlotsSearch, val: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: val === "All" || !val ? undefined : val,
      }),
    });
  };

  const filtered = useMemo(() => plots.filter((p) => {
    if (status !== "All" && p.status !== status) return false;
    if (facing !== "All" && p.facing !== facing && !p.facing.includes(facing)) return false;
    if (approval === "HMDA" && !p.hmdaApproved) return false;
    if (approval === "DTCP" && !p.dtcpApproved) return false;
    if (q && !(p.name + " " + p.location + " " + p.facing).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [plots, q, status, facing, approval]);

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
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">{t("navPlots")}</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-2 leading-[1.05]">
            {language === "en" && "Premium Gated Community Layouts"}
            {language === "te" && "ప్రీమియం గేటెడ్ కమ్యూనిటీ లేఅవుట్లు"}
            {language === "hi" && "प्रीमियम गेटेड कम्युनिटी लेआउट"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted-sage)] max-w-2xl leading-relaxed">
            {language === "en" && "A curated release across East Hyderabad corridor — personally surveyed, clear titles, and ready for spot registration."}
            {language === "te" && "తూర్పు హైదరాబాద్ కారిడార్‌లో లేఅవుట్లు — వ్యక్తిగతంగా సర్వే చేయబడి, క్లియర్ టైటిల్‌తో స్పాట్ రిజిస్ట్రేషన్ కోసం సిద్ధంగా ఉన్నాయి."}
            {language === "hi" && "पूर्वी हैदराबाद कॉरिडोर में चयनित लेआउट — व्यक्तिगत रूप से सर्वेक्षित, स्पष्ट स्वामित्व के साथ तत्काल रजिस्ट्री के लिए उपलब्ध।"}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 sticky top-[80px] z-30 backdrop-blur-md bg-[var(--forest)]/90 border-y border-[var(--gold)]/15 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-sage)]" />
            <input 
              value={q} 
              onChange={(e) => setFilter("q", e.target.value)} 
              placeholder={language === "en" ? "Search by location or name" : "స్థలం లేదా పేరు ద్వారా వెతకండి"}
              className="w-full bg-[var(--forest-2)] border border-[var(--gold)]/25 rounded-md pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)]" 
            />
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-between sm:justify-start">
            <Select label={language === "en" ? "Status" : "స్థితి"} value={status} onChange={(v) => setFilter("status", v)} opts={["All", "Available", "Reserved", "Sold"]} />
            <Select label={language === "en" ? "Facing" : "దిశ"} value={facing} onChange={(v) => setFilter("facing", v)} opts={["All", "East", "West", "North", "South"]} />
            <Select label={language === "en" ? "Approval" : "అనుమతి"} value={approval} onChange={(v) => setFilter("approval", v)} opts={["All", "HMDA", "DTCP"]} />
            {(q || status !== "All" || facing !== "All" || approval !== "All") && (
              <Button size="sm" variant="ghost" onClick={() => navigate({ search: {} })} className="h-10 px-3 cursor-pointer">
                {language === "en" ? "Reset" : "రీసెట్"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Plots Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-[var(--muted-sage)] py-20 font-mono text-sm">
              {language === "en" ? "No plots match your filters." : "మ్యాచింగ్ ప్లాట్లు ఏవీ లేవు."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article key={p.id} className="luxe-card rounded-xl overflow-hidden group flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    
                    {/* Status Badge */}
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-white/20 shadow-sm ${
                      p.status === "Available" ? "bg-[var(--gold)] text-[var(--forest)] font-bold"
                        : p.status === "Reserved" ? "bg-[var(--copper)] text-white"
                        : "bg-[var(--forest-3)] text-[var(--muted-sage)]"
                    }`}>{p.status}</span>

                    {/* RERA/HMDA Trust Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                      <span className="text-[9px] font-bold tracking-wider bg-[var(--forest)]/90 text-cream px-2 py-0.5 rounded border border-[var(--gold)]/20 shadow">
                        {p.hmdaApproved ? "HMDA Layout" : "DTCP Layout"}
                      </span>
                      {p.reraNo && (
                        <span className="text-[9px] font-bold tracking-wider bg-[var(--gold)] text-[var(--forest)] px-2 py-0.5 rounded shadow">
                          RERA REGISTERED
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl leading-tight">{p.name}</h3>
                          <p className="text-xs text-[var(--muted-sage)] mt-1 font-mono uppercase tracking-wider">
                            {p.location} · {p.sqYds} {language === "en" ? "Sq. Yds" : "గజాలు"} ({p.facing} Facing)
                          </p>
                        </div>
                        <span className="shrink-0 text-xs font-semibold bg-[var(--gold)]/10 border border-[var(--gold)]/35 text-[var(--gold)] px-2.5 py-1.5 rounded">{formatINR(p.price)}</span>
                      </div>
                      
                      <p className="text-sm text-[var(--cream-2)]/85 mt-3 line-clamp-3 leading-relaxed">{p.description}</p>
                      
                      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--gold)]/10 text-xs font-mono text-[var(--muted-sage)]">
                        {p.lpNo && <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[var(--gold)]" /> LP No: {p.lpNo}</div>}
                        <div className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[var(--gold)]" /> 100% Vastu Compliant</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                      <Button variant="gold" size="sm" className="flex-1 h-10 justify-center cursor-pointer" onClick={() => { setActiveImgIdx(0); setSelected(p); }}>
                        {language === "en" ? "View Details" : "పూర్తి వివరాలు"}
                      </Button>
                      <Button variant="gold-outline" size="sm" className="flex-1 h-10 justify-center cursor-pointer" onClick={() => { setActiveImgIdx(0); setSelected(p); }}>
                        {t("navEnquire")}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Selected Plot Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-[var(--forest)]/85 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" onClick={() => setSelected(null)}>
          <div className="max-w-4xl w-full bg-[var(--forest-2)] border border-[var(--gold)]/30 rounded-xl overflow-hidden my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-60 sm:h-96 bg-[var(--forest)]/40 flex items-center justify-center">
              {imagesList[activeImgIdx] && (
                <img src={imagesList[activeImgIdx]} alt={selected.name} className="w-full h-full object-cover" />
              )}
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-[var(--forest)]/80 text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)] z-10 shadow-sm transition-colors border border-[var(--gold)]/10">
                <X className="w-4 h-4" />
              </button>
              
              {imagesList.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-4 w-10 h-10 rounded-full bg-black/55 hover:bg-[var(--gold)] hover:text-[var(--forest)] text-white flex items-center justify-center transition-colors font-mono select-none" style={{fontSize: '20px'}}>
                    &larr;
                  </button>
                  <button onClick={nextImg} className="absolute right-4 w-10 h-10 rounded-full bg-black/55 hover:bg-[var(--gold)] hover:text-[var(--forest)] text-white flex items-center justify-center transition-colors font-mono select-none" style={{fontSize: '20px'}}>
                    &rarr;
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-xs font-mono text-[var(--forest)] select-none">
                    {activeImgIdx + 1} / {imagesList.length}
                  </div>
                </>
              )}
            </div>
            
            <div className="p-5 sm:p-6 md:p-8 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-3xl leading-none">{selected.name}</h3>
                <p className="text-[var(--muted-sage)] mt-1.5 font-mono uppercase text-xs tracking-wider">{selected.location}</p>
                
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Info label={language === "en" ? "Area (Sq. Yds)" : "వైశాల్యం (చ.గజాలు)"} value={`${selected.sqYds} Sq. Yds`} />
                  <Info label={language === "en" ? "Area (Sq. Ft)" : "వైశాల్యం (చ.అడుగులు)"} value={`${selected.size.toLocaleString()} Sq. Ft`} />
                  <Info label={language === "en" ? "Facing" : "దిశ"} value={`${selected.facing} Facing`} />
                  <Info label={language === "en" ? "Layout Status" : "లేఅవుట్ అనుమతి"} value={selected.hmdaApproved ? "HMDA Pre-approved" : "DTCP Pre-approved"} />
                  {selected.lpNo && <Info label="Layout LP Number" value={selected.lpNo} />}
                  {selected.reraNo && <Info label="TS RERA Registration" value={selected.reraNo} />}
                </div>

                <h4 className="font-display text-lg mt-6">{language === "en" ? "Layout Amenities" : "లేఅవుట్ సదుపాయాలు"}</h4>
                <ul className="mt-2 grid grid-cols-2 gap-1.5 text-xs text-[var(--cream-2)]/85 font-mono">
                  {selected.amenities.map((a) => <li key={a}>• {a}</li>)}
                  <li>• Underground drainage</li>
                  <li>• Gated layout compound</li>
                  <li>• Overhead water tank</li>
                </ul>
                
                <p className="text-sm text-[var(--cream-2)]/85 mt-5 leading-relaxed">{selected.description}</p>
              </div>
              
              <InquiryForm defaultSubject={selected.name} title={t("formTitleProperty")} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function Select({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[] }) {
  return (
    <label className="text-xs text-[var(--muted-sage)] flex items-center gap-2 font-mono uppercase tracking-wider">
      {label}:
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="bg-[var(--forest-2)] border border-[var(--gold)]/25 rounded-md px-3 py-1.5 text-cream text-sm focus:outline-none focus:border-[var(--gold)] min-h-[36px]">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--gold)]/15 rounded-md p-3">
      <div className="text-[10px] uppercase tracking-widest text-[var(--muted-sage)] font-mono">{label}</div>
      <div className="text-cream mt-1 font-medium">{value}</div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { getHouses, ExtendedHouse } from "@/lib/inventoryService";
import { formatINR } from "@/lib/data";
import { Search, X, BedDouble, Bath, Car, Ruler, Compass } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/houses")({
  head: () => ({
    meta: [
      { title: "Premium Houses & Villas for Sale — Shikas Estates" },
      { name: "description", content: "Explore bespoke luxury independent houses and villas for sale in premium layouts across Hyderabad." },
      { property: "og:title", content: "Premium Houses & Villas for Sale — Shikas Estates" },
      { property: "og:description", content: "Luxury villas and houses for sale in prime areas of East Hyderabad." },
    ],
  }),
  component: HousesPage,
});

function HousesPage() {
  const { t, language } = useLanguage();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | "Ready to Move" | "Under Construction">("All");
  const [facing, setFacing] = useState<"All" | "East" | "West" | "North" | "South">("All");
  const [beds, setBeds] = useState<"All" | "3" | "4">("All");
  const [selected, setSelected] = useState<ExtendedHouse | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const houses = getHouses();

  const filtered = useMemo(() => houses.filter((h) => {
    if (status !== "All" && h.status !== status) return false;
    if (facing !== "All" && h.facing !== facing && !h.facing.includes(facing)) return false;
    if (beds !== "All" && h.bedrooms.toString() !== beds) return false;
    if (q && !(h.name + " " + h.location + " " + h.facing).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [houses, q, status, facing, beds]);

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
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">
            {language === "en" ? "Exclusive Listings" : language === "te" ? "ప్రత్యేక ఆఫర్లు" : "विशेष सूचियां"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl mt-2 leading-[1.05]">
            {language === "en" && "Luxury Houses & Villas for Sale"}
            {language === "te" && "అమ్మకానికి సిద్ధంగా ఉన్న విలాసవంతమైన ఇళ్ళు & విల్లాలు"}
            {language === "hi" && "बिक्री के लिए लग्जरी घर और विला"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted-sage)] max-w-2xl leading-relaxed">
            {language === "en" && "Bespoke, architect-designed independent luxury residences built on premium plots with complete Vastu compliance and state-of-the-art infrastructure."}
            {language === "te" && "అత్యుత్తమ మౌలిక సదుపాయాలు మరియు 100% వాస్తు అమరికలతో ప్రీమియం ప్లాట్లలో నిర్మించబడిన విలాసవంతమైన స్వతంత్ర ఇళ్ళు."}
            {language === "hi" && "प्रीमियम भूखंडों पर पूर्ण वास्तु अनुपालन और आधुनिक बुनियादी ढांचे के साथ निर्मित शानदार स्वतंत्र विला।"}
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
              onChange={(e) => setQ(e.target.value)} 
              placeholder={language === "en" ? "Search by location, villa name..." : "స్థలం లేదా పేరు ద్వారా వెతకండి..."}
              className="w-full bg-[var(--forest-2)] border border-[var(--gold)]/25 rounded-md pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)]" 
            />
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-between sm:justify-start">
            <Select label={language === "en" ? "Status" : "స్థితి"} value={status} onChange={(v) => setStatus(v as typeof status)} opts={["All", "Ready to Move", "Under Construction"]} />
            <Select label={language === "en" ? "Facing" : "దిశ"} value={facing} onChange={(v) => setFacing(v as typeof facing)} opts={["All", "East", "West", "North", "South"]} />
            <Select label={language === "en" ? "Beds" : "గదులు"} value={beds} onChange={(v) => setBeds(v as typeof beds)} opts={["All", "3", "4"]} />
            {(q || status !== "All" || facing !== "All" || beds !== "All") && (
              <Button size="sm" variant="ghost" onClick={() => { setQ(""); setStatus("All"); setFacing("All"); setBeds("All"); }} className="h-10 px-3 cursor-pointer">
                {language === "en" ? "Reset" : "రీసెట్"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Houses Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-[var(--muted-sage)] py-20 font-mono text-sm">
              {language === "en" ? "No houses match your filters." : "మ్యాచింగ్ ఇళ్ళు ఏవీ లేవు."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((h) => (
                <article key={h.id} className="luxe-card rounded-xl overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      
                      {/* Status Badge */}
                      <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-white/20 shadow-sm ${
                        h.status === "Ready to Move" ? "bg-[var(--gold)] text-[var(--forest)] font-bold"
                          : "bg-[var(--copper)] text-white"
                      }`}>{h.status}</span>

                      {/* Vastu approval label */}
                      <span className="absolute top-3 right-3 text-[9px] font-bold tracking-wider bg-[var(--forest)]/90 text-cream px-2 py-0.5 rounded border border-[var(--gold)]/20 shadow flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-[var(--gold)]" /> 100% VASTU
                      </span>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl leading-tight">{h.name}</h3>
                          <p className="text-xs text-[var(--muted-sage)] mt-1 font-mono uppercase tracking-wider">
                            {h.location} · {h.facing} Facing
                          </p>
                        </div>
                        <span className="shrink-0 text-xs font-semibold bg-[var(--gold)]/10 border border-[var(--gold)]/35 text-[var(--gold)] px-2.5 py-1.5 rounded">{formatINR(h.price)}</span>
                      </div>
                      
                      <p className="text-sm text-[var(--cream-2)]/85 mt-3 line-clamp-3 leading-relaxed">{h.description}</p>
                      
                      <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[var(--gold)]/10 text-xs text-[var(--cream-2)]/85">
                        <Spec icon={BedDouble} v={`${h.bedrooms} BHK`} />
                        <Spec icon={Bath} v={`${h.bathrooms} BA`} />
                        <Spec icon={Car} v={`${h.parking} P`} />
                        <Spec icon={Ruler} v={`${h.area} SFT`} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 pt-0 mt-2 flex gap-3">
                    <Button variant="gold" size="sm" className="flex-1 h-10 justify-center cursor-pointer" onClick={() => { setActiveImgIdx(0); setSelected(h); }}>
                      {language === "en" ? "View Details" : "పూర్తి వివరాలు"}
                    </Button>
                    <Button variant="gold-outline" size="sm" className="flex-1 h-10 justify-center cursor-pointer" onClick={() => { setActiveImgIdx(0); setSelected(h); }}>
                      {t("navEnquire")}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Selected House Details Modal */}
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
                <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono">{selected.status}</span>
                <h3 className="font-display text-3xl leading-none mt-1">{selected.name}</h3>
                <p className="text-[var(--muted-sage)] mt-1.5 font-mono uppercase text-xs tracking-wider">{selected.location}</p>
                
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Info label={language === "en" ? "Built-up Area" : "నిర్మాణ వైశాల్యం"} value={`${selected.area.toLocaleString()} Sq. Ft`} />
                  <Info label={language === "en" ? "Plot Area" : "ప్లాట్ వైశాల్యం"} value={`${selected.sqYds} Sq. Yards`} />
                  <Info label={language === "en" ? "Bedrooms" : "బెడ్ రూములు"} value={`${selected.bedrooms} BHK`} />
                  <Info label={language === "en" ? "Bathrooms" : "బాత్ రూములు"} value={`${selected.bathrooms} Baths`} />
                  <Info label={language === "en" ? "Facing" : "దిశ"} value={`${selected.facing} Facing`} />
                  <Info label={language === "en" ? "Price" : "ధర"} value={formatINR(selected.price)} />
                </div>

                <h4 className="font-display text-lg mt-6">{language === "en" ? "Signature Amenities" : "విశిష్ట సదుపాయాలు"}</h4>
                <ul className="mt-2 grid grid-cols-2 gap-1.5 text-xs text-[var(--cream-2)]/85 font-mono">
                  {selected.amenities.map((a) => <li key={a}>• {a}</li>)}
                </ul>
                
                <p className="text-sm text-[var(--cream-2)]/85 mt-5 leading-relaxed">{selected.description}</p>
              </div>
              
              <InquiryForm defaultSubject={`Villa Enquiry: ${selected.name}`} title={t("formTitleProperty")} />
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

function Spec({ icon: Icon, v }: { icon: React.ElementType; v: string }) {
  return (
    <div className="flex items-center gap-1 border border-[var(--gold)]/15 rounded-md py-1.5 px-2 justify-center font-mono text-[10px]">
      <Icon className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
      <span>{v}</span>
    </div>
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

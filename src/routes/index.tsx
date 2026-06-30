import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Compass, Leaf, ShieldCheck, Star, BedDouble, Bath, Ruler, Sparkles, Paintbrush, Home as HomeIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { COMPANY, formatINR } from "@/lib/data";
import { getPlots, getHouses } from "@/lib/inventoryService";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shikas Estates — Premium Hyderabad Villas, Plots & Designs" },
      { name: "description", content: "Explore premium houses for sale, HMDA/DTCP open plots, custom architectural drafting, and luxury interior design in Hyderabad." },
      { property: "og:title", content: "Shikas Estates — Premium Hyderabad Villas, Plots & Designs" },
      { property: "og:description", content: "Houses for sale, approved open plots, and full-service architectural & interior design." },
    ],
  }),
  component: Home,
});

const HERO_IMG = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85";
const HERO_SIDE = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85";
const ARCHITECT_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85";
const INTERIOR_IMG = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85";

function Home() {
  const { role } = useAuth();
  const { t, language } = useLanguage();
  
  const featuredHouses = getHouses().slice(0, 3);
  const featuredPlots = getPlots().slice(0, 3);

  // Dynamic marquee list based on selected language
  const marqueeItems = language === "en" 
    ? ["Restraint.", "Provenance.", "Craft.", "Stewardship.", "Patience.", "Permanence."]
    : ["నిగ్రహం.", "మూలం.", "హస్తకళ.", "పర్యావరణ బాధ్యత.", "ఓర్పు.", "శాశ్వతత్వం."];

  return (
    <Layout>
      {/* HERO — editorial split */}
      <section className="relative pt-6 lg:pt-10">
        <div className="max-w-[1480px] mx-auto container-edge">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between min-h-0 lg:min-h-[82vh] gap-8 py-4 lg:py-0 fade-up">
              <div className="flex items-center gap-4 text-[var(--muted-sage)]">
                <span className="gold-rule-left" />
                <span className="eyebrow">{t("navEstd")}</span>
              </div>

              <div className="mt-6 lg:mt-0">
                <h1 className="font-display text-5xl xs:text-6xl sm:text-7xl md:text-[10vw] lg:text-[8.5vw] leading-[0.95] tracking-tight">
                  {language === "en" ? "Considered" : "ఆలోచనాత్మక"}
                  <br />
                  <span className="italic text-gradient-gold">
                    {language === "en" ? "living." : "గృహాలు."}
                  </span>
                  <br />
                  {language === "en" ? "Quiet land." : "ప్రశాంత భూమి."}
                </h1>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-6 max-w-3xl">
                  <p className="text-base sm:text-lg text-[var(--cream-2)] leading-relaxed max-w-lg">
                    {language === "en" 
                      ? "A premium portfolio of custom luxury houses for sale, approved open plots, bespoke architectural blueprints, and high-end interior designs across Hyderabad's elite corridors."
                      : "హైదరాబాద్‌లోని ప్రముఖ ప్రాంతాలలో అమ్మకానికి సిద్ధంగా ఉన్న లగ్జరీ ఇళ్ళు, అనుమతులు పొందిన ప్లాట్లు, ప్రత్యేక ఆర్కిటెక్ట్ డిజైన్లు మరియు విలాసవంతమైన ఇంటీరియర్ కలెక్షన్."}
                  </p>
                  <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
                    <Button asChild variant="gold" size="xl" className="w-full sm:w-auto justify-center cursor-pointer">
                      <Link to="/houses">
                        {language === "en" ? "Explore Houses" : "ఇళ్లను చూడండి"} <ArrowUpRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="text-[var(--cream)]/70 hover:text-[var(--gold)] justify-center sm:justify-start px-0 cursor-pointer">
                      <Link to="/plots">
                        {language === "en" ? "View Open Plots →" : "ఓపెన్ ప్లాట్లు చూడండి →"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative fade-in">
              <div className="relative h-[35vh] sm:h-[45vh] lg:h-[82vh] overflow-hidden rounded-sm">
                <img src={HERO_IMG} alt="Featured residence" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[var(--forest)]/10" />
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
              {marqueeItems.map((w) => (
                <span key={w} className="flex items-center">
                  <span className="px-10">{w}</span>
                  <span className="text-[var(--gold)] text-base">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* 01 — HOUSES FOR SALE */}
      <Section
        index="01"
        eyebrow={language === "en" ? "Premium Gated Villas" : "విలాసవంతమైన విల్లాలు"}
        title={language === "en" ? "Houses & Villas for Sale" : "అమ్మకానికి సిద్ధంగా ఉన్న ఇళ్లు"}
        sub={language === "en" ? "Bespoke, move-in-ready architectural masterpieces situated in Hyderabad's premier zones." : "హైదరాబాద్ లోని ప్రధాన ఐటి మరియు ఫార్మా హబ్‌ల సమీపంలో అత్యుత్తమ సదుపాయాలతో నిర్మించిన ఇళ్లు."}
        cta={{ label: language === "en" ? "View all houses" : "అన్ని ఇళ్లను చూడండి", to: "/houses" }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {featuredHouses.map((h, i) => (
            <article key={h.id} className="luxe-card rounded-xl overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--forest)]/90 text-[var(--gold)] border border-[var(--gold)]/20 shadow font-mono">{h.status}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl mt-1">{h.name}</h3>
                  <p className="text-xs text-[var(--muted-sage)] mt-1 font-mono uppercase tracking-wider">{h.location} · {h.facing} Facing</p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[var(--gold)]/10 text-xs text-[var(--cream-2)]/85">
                    <div className="flex items-center gap-1 font-mono">
                      <BedDouble className="w-3.5 h-3.5 text-[var(--gold)]" />
                      <span>{h.bedrooms} BHK</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      <Bath className="w-3.5 h-3.5 text-[var(--gold)]" />
                      <span>{h.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      <Ruler className="w-3.5 h-3.5 text-[var(--gold)]" />
                      <span>{h.area} SFT</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-[var(--gold)]/5 mt-2 flex items-center justify-between gap-3">
                <div className="text-sm text-[var(--cream-2)]/80">{language === "en" ? "Price" : "ధర"} <span className="text-[var(--gold)] font-semibold">{formatINR(h.price)}</span></div>
                <Button asChild variant="gold" size="sm">
                  <Link to="/houses">{language === "en" ? "View Villa" : "వివరాలు"}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 02 — OPEN PLOTS */}
      <Section
        index="02"
        eyebrow={language === "en" ? "HMDA & DTCP Layouts" : "అనుమతి పొందిన ప్లాట్లు"}
        title={language === "en" ? "Approved Open Plots" : "ఓపెన్ ప్లాట్లు అమ్మకాలు"}
        sub={language === "en" ? "Personally surveyed parcels of land with clear titles and 100% Vastu compliance." : "స్పష్టమైన హక్కులతో రిజిస్ట్రేషన్‌కు సిద్ధంగా ఉన్న 100% వాస్తు కంప్లైంట్ ప్లాట్లు."}
        cta={{ label: language === "en" ? "View all plots" : "అన్ని ప్లాట్లను చూడండి", to: "/plots" }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPlots.map((p, i) => (
            <article key={p.id} className="group">
              <Link to="/plots" className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)]/80 via-[var(--forest)]/0 to-[var(--forest)]/0" />
                  <span className="absolute top-4 left-4 eyebrow text-[var(--cream)]/80">{String(i + 1).padStart(2, "0")} / 03</span>
                  <span className="absolute top-4 right-4 text-[9px] font-mono font-bold uppercase tracking-wider bg-[var(--gold)] text-[var(--forest)] px-2 py-1 rounded">
                    {p.hmdaApproved ? "HMDA" : p.dtcpApproved ? "DTCP" : "Approved"}
                  </span>
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
                  <span className="text-xs sm:text-sm text-[var(--cream-2)]/80">
                    {p.sqYds} Sq. Yards ({p.size} {t("sqft")}) · {p.facing} Facing
                  </span>
                  <span className="text-[var(--gold)] text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* 03 — ARCHITECTURAL DESIGN (EDITORIAL SECTION) */}
      <section className="container-edge mt-16 sm:mt-32 lg:mt-48">
        <div className="max-w-[1480px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-sm">
              <img src={ARCHITECT_IMG} alt="Architectural design layout" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 mt-6 lg:mt-0">
            <div className="flex items-center gap-4">
              <span className="gold-rule-left" />
              <span className="eyebrow">03 — Bespoke blueprints</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">
              {language === "en" ? "Residential Architect Design" : "రెసిడెన్షియల్ ఆర్కిటెక్ట్ డిజైన్స్"}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--cream-2)] leading-relaxed max-w-lg">
              {language === "en" 
                ? "From conceptual structural designs and correct Vastu layouts to premium 3D exterior elevations, we draft blueprints tailored precisely to your land and lifestyle."
                : "వాస్తు బ్లూప్రింట్లు, వివరణాత్మక 2D ఫ్లోర్ ప్లాన్లు మరియు అద్భుతమైన 3D ఎలివేషన్ డిజైన్ల వరకు — మీ అభిరుచికి తగ్గట్లుగా మా ఆర్కిటెక్ట్లు డిజైన్ చేస్తారు."}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-[var(--cream-2)]/80">
              <span className="border border-[var(--gold)]/20 px-3 py-1 rounded">Vastu Compliance Checks</span>
              <span className="border border-[var(--gold)]/20 px-3 py-1 rounded">Detailed 2D Floor Plans</span>
              <span className="border border-[var(--gold)]/20 px-3 py-1 rounded">3D Exterior Elevations</span>
            </div>
            <Button asChild variant="gold" size="lg" className="mt-8 cursor-pointer">
              <Link to="/architect">
                {language === "en" ? "Explore Architect Services" : "ఆర్కిటెక్ట్ డిజైన్లు చూడండి"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 04 — INTERIOR DESIGN (EDITORIAL SECTION) */}
      <section className="container-edge mt-16 sm:mt-32 lg:mt-48">
        <div className="max-w-[1480px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-sm">
              <img src={INTERIOR_IMG} alt="Premium living interiors" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-6 mt-6 lg:mt-0">
            <div className="flex items-center gap-4">
              <span className="gold-rule-left" />
              <span className="eyebrow">04 — Curated spaces</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">
              {language === "en" ? "Bespoke Interior Design" : "లగ్జరీ ఇంటీరియర్ డిజైన్స్"}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--cream-2)] leading-relaxed max-w-lg">
              {language === "en" 
                ? "Elevate your living experience with premium wardrobes, German-engineered modular kitchens, custom false ceilings, and beautifully detailed pooja spaces."
                : "జర్మన్ టెక్నాలజీ మోడ్యులర్ కిచెన్స్, లగ్జరీ వార్డ్‌రోబ్స్, ఆధునిక ఫాల్స్ సీలింగ్స్ మరియు అద్భుతమైన పూజా మందిరాలతో మీ ఇంటిని సుందరంగా మార్చుకోండి."}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-[var(--cream-2)]/80">
              <span className="border border-[var(--gold)]/20 px-3 py-1 rounded">German Modular Kitchens</span>
              <span className="border border-[var(--gold)]/20 px-3 py-1 rounded">CNC Pooja Rooms</span>
              <span className="border border-[var(--gold)]/20 px-3 py-1 rounded">Luxury Living Aesthetics</span>
            </div>
            <Button asChild variant="gold" size="lg" className="mt-8 cursor-pointer">
              <Link to="/interiors">
                {language === "en" ? "View Interior Gallery" : "ఇంటీరియర్ గ్యాలరీ చూడండి"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY SHIKAS ESTATES */}
      <section className="container-edge mt-16 sm:mt-32 lg:mt-48">
        <div className="max-w-[1480px] mx-auto text-center border-t border-[var(--gold)]/10 pt-16">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="font-display text-3xl sm:text-5xl mt-2">Core Trust Pillars</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-left">
            {[
              { icon: Compass, title: language === "en" ? "100% Vastu Design" : "100% వాస్తు అమరిక", desc: language === "en" ? "Every house plan and plot selection follows traditional Vastu guidelines for happiness and wealth." : "మా ప్రతి హౌస్ ప్లాన్ మరియు ప్లాట్ ఎంపిక సంప్రదాయ వాస్తు పద్ధతులను అనుసరిస్తుంది." },
              { icon: ShieldCheck, title: language === "en" ? "HMDA / DTCP Approvals" : "HMDA / DTCP లేఅవుట్లు", desc: language === "en" ? "Fully pre-approved gated community ventures with TS RERA registrations and zero legal hurdles." : "RERA మరియు అనుమతులు లభించిన క్లియర్ టైటిల్ ప్లాట్లు మాత్రమే మేము అందిస్తాము." },
              { icon: Leaf, title: language === "en" ? "Premium Infrastructure" : "మౌలిక సదుపాయాలు", desc: language === "en" ? "40ft BT roads, underground electricity and drainage, central water supply, and landscaped park spaces." : "40 అడుగుల బీటీ రోడ్లు, అండర్ గ్రౌండ్ డ్రైనేజీ మరియు వాటర్ ట్యాంక్ సదుపాయాలు." },
              { icon: Award, title: language === "en" ? "Integrated Engineering" : "ఇంటిగ్రేటెడ్ సర్వీసెస్", desc: language === "en" ? "One partner from layout plot purchase, through architectural blueprints, construction, and premium interior handovers." : "ప్లాట్ కొనుగోలు నుండి, ప్లాన్ డిజైన్, నిర్మాణం మరియు ఇంటీరియర్ వరకు ఒకే ఒక నమ్మకమైన భాగస్వామి." }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-[var(--forest-2)]/30 border border-[var(--gold)]/10 p-6 rounded-lg">
                <pillar.icon className="w-8 h-8 text-[var(--gold)] mb-4" />
                <h3 className="font-display text-lg text-cream font-bold">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--cream-2)]/75 mt-2 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="container-edge mt-16 sm:mt-32 lg:mt-48 mb-8">
        <div className="max-w-[1480px] mx-auto relative overflow-hidden rounded-sm border border-[var(--gold)]/30">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest)] via-[var(--forest)]/95 to-[var(--forest-2)]" />
          </div>
          <div className="relative px-6 py-14 md:px-16 md:py-28 grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-10 items-center">
            <div>
              <span className="eyebrow">{language === "en" ? "Begin Consultation" : "విచారణ ప్రారంభించండి"}</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.02]">
                {language === "en" ? <>Let's design or find<br /><span className="italic text-gradient-gold">your home.</span></> : <>మీ కలల గృహాన్ని<br /><span className="italic text-gradient-gold">సాకారం చేసుకోండి.</span></>}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--cream-2)] max-w-lg leading-relaxed">
                {language === "en" 
                  ? "Speak to our property and design experts. Schedule an on-site visit or a design desk consultation today."
                  : "మా రియల్ ఎస్టేట్ మరియు డిజైన్ నిపుణులతో మాట్లాడండి. సందర్శనను లేదా డిజైన్ కన్సల్టేషన్‌ను ఇప్పుడే షెడ్యూల్ చేయండి."}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button asChild variant="gold" size="xl" className="w-full justify-center cursor-pointer">
                <Link to="/contact">
                  {language === "en" ? "Book a consultation" : "కన్సల్టేషన్ బుక్ చేయండి"}
                </Link>
              </Button>
              <Button asChild variant="gold-outline" size="xl" className="w-full justify-center cursor-pointer">
                <a href={`tel:${COMPANY.phoneHref}`}>
                  {language === "en" ? `Call ${COMPANY.phone}` : `కాల్ చేయండి: ${COMPANY.phone}`}
                </a>
              </Button>
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
    <section className="container-edge mt-16 sm:mt-28 lg:mt-44">
      <div className="max-w-[1480px] mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-10 items-start md:items-end mb-8 lg:mb-16">
          {index && (
            <div className="eyebrow text-[var(--muted-sage)] md:pt-3">— {index}</div>
          )}
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 max-w-2xl leading-[1.05]">{title}</h2>
            {sub && <p className="mt-3 text-sm sm:text-base text-[var(--cream-2)]/80 max-w-xl">{sub}</p>}
          </div>
          {cta && (
            <Link to={cta.to} className="md:self-end mt-2 md:mt-0 text-[var(--gold)] hover:text-[var(--gold-soft)] text-sm font-mono uppercase tracking-widest whitespace-nowrap inline-flex items-center gap-2">
              {cta.label} <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

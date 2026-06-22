import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Compass, Leaf, ShieldCheck, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { COMPANY, formatINR } from "@/lib/data";
import { getPlots, getPlans } from "@/lib/inventoryService";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Premium Residential Plots & House Plans" },
      { name: "description", content: "An invitation-only portfolio of limited-edition residential plots, house plans and signature projects from Home." },
      { property: "og:title", content: "Home — Premium Residential Plots & House Plans" },
      { property: "og:description", content: "Limited-edition plots, signature house plans and award-winning projects." },
    ],
  }),
  component: Home,
});

const HERO_IMG = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85";
const HERO_SIDE = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85";
const STORY_IMG = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85";

function Home() {
  const { role } = useAuth();
  const { t, language } = useLanguage();
  const featuredPlots = getPlots().slice(0, 3);
  const featuredPlans = getPlans().slice(0, 4);

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
                  {t("heroTitlePart1")}
                  <br />
                  <span className="italic text-gradient-gold">{t("heroTitlePart3")}</span>
                  <br />
                  {t("heroTitlePart2") || t("heroTitlePart4")}
                </h1>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-6 max-w-3xl">
                  <p className="text-base sm:text-lg text-[var(--cream-2)] leading-relaxed max-w-lg">
                    {t("heroSubtitle")}
                  </p>
                  <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
                    <Button asChild variant="gold" size="xl" className="w-full sm:w-auto justify-center cursor-pointer">
                      <Link to="/plots">{t("heroCtaRelease")} <ArrowUpRight className="ml-1 w-4 h-4" /></Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="text-[var(--cream)]/70 hover:text-[var(--gold)] justify-center sm:justify-start px-0 cursor-pointer">
                      <Link to="/about">{t("heroCtaStory")}</Link>
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

      {/* FEATURED PLOTS */}
      <Section
        index="01"
        eyebrow={t("secPlotsEyebrow")}
        title={t("secPlotsTitle")}
        sub={t("secPlotsSub")}
        cta={{ label: t("secPlotsCta"), to: "/plots" }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPlots.map((p, i) => (
            <article key={p.id} className="group">
              <Link to="/plots" className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)]/80 via-[var(--forest)]/0 to-[var(--forest)]/0" />
                  <span className="absolute top-4 left-4 eyebrow text-[var(--cream)]/80">{String(i + 1).padStart(2, "0")} / 03</span>
                  
                  {/* Legality approval badge */}
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
                    {p.sqYds} {language === "en" ? "Sq. Yds" : language === "te" ? "చ.గజాలు" : "वर्ग गज"} ({p.size} {t("sqft")}) · {p.facing} Facing
                  </span>
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
        eyebrow={t("secPlansEyebrow")}
        title={t("secPlansTitle")}
        sub={t("secPlansSub")}
        cta={{ label: t("secPlansCta"), to: "/plans" }}
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
                  {p.bedrooms} {t("br")} · {p.bathrooms} {t("ba")} · {p.area} {t("sqft")}
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--gold)]/15 text-sm text-[var(--cream-2)]/80">
                  {t("from")} <span className="text-[var(--gold)] font-medium">{formatINR(p.price)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* STORY / WHY US */}
      <section className="px-0 mt-16 sm:mt-32 lg:mt-48">
        <div className="max-w-[1480px] mx-auto container-edge">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-sm">
                <img src={STORY_IMG} alt="Studio interior" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-1 mt-6 lg:mt-0">
              <div className="flex items-center gap-4">
                <span className="gold-rule-left" />
                <span className="eyebrow">{t("secStoryEyebrow")}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">
                {t("secStoryTitleLine1")}<br /><span className="italic text-gradient-gold">{t("secStoryTitleLine2")}</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[var(--cream-2)] leading-relaxed max-w-lg">
                {t("secStorySub")}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {[
                  { icon: Compass, t: t("featPrimeTitle"), d: t("featPrimeDesc") },
                  { icon: ShieldCheck, t: t("featPaymentsTitle"), d: t("featPaymentsDesc") },
                  { icon: Leaf, t: t("featStewardshipTitle"), d: t("featStewardshipDesc") },
                  { icon: Award, t: t("featDeliveredTitle"), d: t("featDeliveredDesc") },
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

              <Button asChild variant="gold-outline" size="lg" className="mt-8 w-full sm:w-auto justify-center cursor-pointer">
                <Link to="/about">
                  {language === "en" && "About the atelier →"}
                  {language === "te" && "మా గురించి మరింత తెలుసుకోండి →"}
                  {language === "hi" && "अटेलियर के बारे में →"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section 
        index="04" 
        eyebrow={language === "en" ? "Owners" : language === "te" ? "యజమానులు" : "मालिक"} 
        title={language === "en" ? "From the people who live here." : language === "te" ? "మా కస్టమర్ల అనుభవాలు." : "यहाँ रहने वाले लोगों से।"}
      >
        <div className="grid md:grid-cols-3 gap-px bg-[var(--gold)]/15 border-y border-[var(--gold)]/15">
          {[
            {
              name: "Ananya Rao",
              title: language === "en" ? "Resident, Magnolia Park" : language === "te" ? "నివాసి, మాగ్నోలియా పార్క్" : "निवासी, मैगनोलिया पार्क",
              rating: 5,
              quote: language === "en" 
                ? "The attention to detail is extraordinary — from the gold-leaf signage to the timber finishings, every choice feels considered."
                : language === "te"
                  ? "నిర్మాణంలో తీసుకున్న శ్రద్ధ అసాధారణమైనది — ప్రతి చిన్న విషయానికి వారు ఇచ్చిన విలువ ప్రతిధ్వనిస్తుంది."
                  : "बारीकियों पर ध्यान असाधारण है — सोने की नक्काशी वाले साइनेज से लेकर लकड़ी की फिनिशिंग तक, हर विकल्प सोचा-समझा लगता है।"
            },
            {
              name: "Vikram Shetty",
              title: language === "en" ? "Investor, Greenwood Residency" : language === "te" ? "పెట్టుబడిదారుడు, గ్రీన్‌వుడ్ రెసిడెన్సీ" : "निवेशक, ग्रीनवुड रेजीडेंसी",
              rating: 5,
              quote: language === "en"
                ? "Home is the rare developer that ships on time without compromising the architectural intent. Best decision we've made."
                : language === "te"
                  ? "నిర్మాణ రూపకల్పనను రాజీ పడకుండా సమయానికి పూర్తి చేసే అరుదైన సంస్థ ఇది. మేము తీసుకున్న సరైన నిర్ణయం."
                  : "यह एक दुर्लभ डेवलपर है जो स्थापत्य कला से समझौता किए बिना समय पर काम पूरा करता है। हमारा सबसे अच्छा फैसला।"
            },
            {
              name: "Priya & Rohan",
              title: language === "en" ? "Owners, Aurelia Hill Villas" : language === "te" ? "యజమానులు, ఆరేలియా హిల్ విల్లాస్" : "मालिक, ऑरेलिया हिल विला",
              rating: 5,
              quote: language === "en"
                ? "We were treated like custodians of a future home, not buyers. The team made the entire process feel effortless."
                : language === "te"
                  ? "మమ్మల్ని కేవలం కస్టమర్లుగా కాకుండా కుటుంబ సభ్యులుగా చూసుకున్నారు. మొత్తం ప్రయాణం చాలా సులభంగా సాగింది."
                  : "हमारे साथ खरीदारों की तरह नहीं, बल्कि एक भावी घर के रखवालों की तरह व्यवहार किया गया। पूरी प्रक्रिया बहुत आसान रही।"
            }
          ].map((t) => (
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
      <Section 
        index="05" 
        eyebrow={t("navGallery")} 
        title={language === "en" ? "A glimpse of the work." : language === "te" ? "మా నిర్మాణాల ఒక చిన్న చూపు." : "काम की एक झलक।"}
        cta={{ label: language === "en" ? "Full gallery" : language === "te" ? "పూర్తి గ్యాలరీ" : "पूरी गैलरी", to: "/gallery" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {GALLERY.slice(0, 6).map((g, i) => (
            <div key={i} className={`overflow-hidden rounded-sm border border-[var(--gold)]/10 ${i % 3 === 0 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"}`}>
              <img src={g.src} alt={g.tag} className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1400ms]" />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="container-edge mt-16 sm:mt-32 lg:mt-48 mb-8">
        <div className="max-w-[1480px] mx-auto relative overflow-hidden rounded-sm border border-[var(--gold)]/30">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest)] via-[var(--forest)]/95 to-[var(--forest-2)]" />
          </div>
          <div className="relative px-6 py-14 md:px-16 md:py-28 grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-10 items-center">
            <div>
              <span className="eyebrow">
                {language === "en" && "Begin"}
                {language === "te" && "ప్రారంభించండి"}
                {language === "hi" && "शुरू करें"}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.02]">
                {language === "en" && <>Spend a quiet morning<br /><span className="italic text-gradient-gold">on the land.</span></>}
                {language === "te" && <>మా ప్లాట్లలో ఒక ప్రశాంతమైన ఉదయం<br /><span className="italic text-gradient-gold">గడపండి.</span></>}
                {language === "hi" && <>भूमि पर एक शांत सुबह<br /><span className="italic text-gradient-gold">बिताएं।</span></>}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--cream-2)] max-w-lg leading-relaxed">
                {language === "en" && "A member of our team will walk you through the masterplan, the architecture and the parcel itself — unhurried, by appointment."}
                {language === "te" && "మా బృంద సభ్యులు మీతో పాటు వచ్చి మా ప్లాన్, ఆర్కిటెక్చర్ మరియు మొత్తం లేఅవుట్‌ను వివరంగా చూపిస్తారు — అపాయింట్‌మెంట్ ద్వారా మాత్రమే."}
                {language === "hi" && "हमारी टीम का एक सदस्य आपको मास्टरप्लान, वास्तुकला और स्वयं भूखंड की विस्तृत सैर कराएगा — बिना किसी जल्दबाजी के, केवल अपॉइंटमेंट द्वारा।"}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button asChild variant="gold" size="xl" className="w-full justify-center cursor-pointer">
                <Link to="/contact">
                  {language === "en" ? "Schedule a Visit" : "సందర్శనను షెడ్యూల్ చేయండి"}
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

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", tag: "Projects" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", tag: "Projects" },
  { src: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", tag: "Construction" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80", tag: "Interiors" },
  { src: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", tag: "Projects" },
  { src: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80", tag: "Plots" },
] as const;

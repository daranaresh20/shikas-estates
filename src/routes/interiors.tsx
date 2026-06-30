import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { Sparkles, Armchair, HelpCircle, X, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/interiors")({
  head: () => ({
    meta: [
      { title: "Premium Interior Design — Shikas Estates" },
      { name: "description", content: "Luxurious residential interior design services in Hyderabad. Custom modular kitchens, wardrobes, living rooms and false ceilings." },
      { property: "og:title", content: "Premium Interior Design — Shikas Estates" },
      { property: "og:description", content: "Transform your home with bespoke luxury interior designs tailored to your style." },
    ],
  }),
  component: InteriorsPage,
});

function InteriorsPage() {
  const { language } = useLanguage();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const categories = [
    {
      title: language === "en" ? "Modular Kitchens" : "మోడ్యులర్ కిచెన్స్",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      desc: language === "en" ? "German-engineered mechanisms, anti-scratch acrylic finishes, and high-efficiency layouts." : "జర్మన్ డిజైన్ అమరికలు, స్క్రాచ్ పడని యాక్రిలిక్ ఫినిషింగ్ మరియు విశాలమైన వంట గది డిజైన్లు."
    },
    {
      title: language === "en" ? "Living Spaces" : "లివింగ్ గదులు",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      desc: language === "en" ? "Custom wooden paneling, custom lighting arrays, and bespoke seating designs." : "ప్రత్యేక వుడెన్ ప్యానెలింగ్, ఆకర్షణీయమైన లైటింగ్ మరియు సౌకర్యవంతమైన సోఫా అమరికలు."
    },
    {
      title: language === "en" ? "Master Bedrooms" : "మాస్టర్ బెడ్ రూమ్స్",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      desc: language === "en" ? "Plush upholstered headboards, walk-in closets, and ambient light controls." : "మెత్తటి హెడ్‌బోర్డులు, విశాలమైన వాక్-ఇన్ వార్డ్‌రోబ్స్ మరియు ప్రశాంతమైన లైటింగ్."
    },
    {
      title: language === "en" ? "Divine Pooja Rooms" : "పూజా మందిరాలు",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      desc: language === "en" ? "Intricate CNC teak wood carving, backlit marble onyx, and 100% Vastu alignment." : "సున్నితమైన టీక్ వుడ్ చెక్కడాలు, బ్యాక్‌లిట్ మార్బుల్ డిజైన్లు మరియు సంప్రదాయ వాస్తు పద్ధతులు."
    }
  ];

  const styles = [
    {
      name: "Contemporary Minimalist",
      desc: language === "en" ? "Clean lines, hidden storage, neutral palettes, and premium matte finishes." : "క్లీన్ లైన్స్, కనిపించని స్టోరేజ్ అల్మారాలు, మృదువైన రంగులు మరియు మ్యాట్ ఫినిషింగ్.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Neo-Classical Luxury",
      desc: language === "en" ? "Elegant wall moldings, gold leaf trims, luxury chandeliers, and velvet upholstery." : "అందమైన వాల్ మోల్డింగ్స్, గోల్డ్ లీఫ్ బోర్డర్లు, విలాసవంతమైన షాండ్లియర్లు మరియు వెల్వెట్ సీటింగ్.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Heritage Fusion",
      desc: language === "en" ? "Blending rich Indian teak accents, brass inserts, and hand-carved pillars with modern utility." : "భారతీయ సాంప్రదాయ టీక్ వుడ్, బ్రాస్ డిజైన్లు మరియు చేతి చెక్కడాలను ఆధునిక ఇంటీరియర్‌తో కలపడం.",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-mono">Bespoke Interior Craftsmanship</p>
          <h1 className="font-display text-4xl sm:text-6xl mt-3 leading-[1.05] max-w-3xl">
            {language === "en" && <>Timeless aesthetics for <span className="italic text-gradient-gold">living well.</span></>}
            {language === "te" && <>అందమైన జీవనానికి <span className="italic text-gradient-gold">సరికొత్త కళాఖండాలు.</span></>}
            {language === "hi" && <>सुखी जीवन के लिए <span className="italic text-gradient-gold">कालातीत कलाकृतियाँ।</span></>}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[var(--muted-sage)] max-w-2xl leading-relaxed">
            {language === "en" && "We curate luxury interior environments from layout design to material hand-selection. Every cabinet, paint shade, and light fixture is handpicked to complete your sanctuary."}
            {language === "te" && "ఇంటీరియర్ ప్లాన్ డిజైన్ నుండి మెటీరియల్స్ ఎంపిక వరకు ప్రతి పనిలో నాణ్యతను పాటిస్తాము. ప్రతి క్యాబినెట్, రంగు మరియు లైటింగ్ మీ ఇల్లాన్ని ఒక దేవాలయంగా మారుస్తాయి."}
            {language === "hi" && "हम लेआउट डिजाइन से लेकर सामग्री के चयन तक हर बारीक काम का ध्यान रखते हैं। हर अलमारी, रंग और लाइट को आपके घर की सुंदरता बढ़ाने के लिए चुना जाता है।"}
          </p>
        </div>
      </section>

      {/* Grid of Areas */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((c, idx) => (
            <div key={idx} className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-[var(--gold)]/20 shadow-md">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)]/90 via-[var(--forest)]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-2xl text-white">{c.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--cream-2)]/90 mt-1 leading-relaxed max-w-md">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Philosophy / Style Showcases */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[var(--forest-2)]/30 border-y border-[var(--gold)]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono">Curated Collections</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Interior Design Typologies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {styles.map((s, idx) => (
              <article key={idx} className="luxe-card rounded-xl overflow-hidden group flex flex-col justify-between h-full">
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-white leading-tight">{s.name}</h3>
                    <p className="text-xs sm:text-sm text-[var(--cream-2)]/85 mt-2.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 mt-2">
                  <Button 
                    onClick={() => setSelectedStyle(s.name)}
                    variant="gold-outline" 
                    size="sm" 
                    className="w-full justify-center h-10 cursor-pointer"
                  >
                    {language === "en" ? "Consult Design Style" : "డిజైన్ సంప్రదింపులు"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Trigger CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="w-8 h-8 text-[var(--gold)] mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl">Ready to design your space?</h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted-sage)] max-w-xl mx-auto leading-relaxed">
            {language === "en" ? "Schedule a consultation with our signature design leads. We provide color matching, layout sketching, and 3D visualisations." : "మా సీనియర్ డిజైనర్లతో ఒక సంప్రదింపులను షెడ్యూల్ చేసుకోండి. మేము కలర్ మ్యాచింగ్, లేఅవుట్ స్కెచ్‌లు మరియు 3D నమూనాలు అందిస్తాము."}
          </p>
          <Button 
            onClick={() => setSelectedStyle("General Consultation")}
            variant="gold" 
            size="lg" 
            className="mt-6 px-8 h-12 cursor-pointer inline-flex items-center gap-2"
          >
            {language === "en" ? "Schedule Consultation" : "కన్సల్టేషన్ షెడ్యూల్ చేయండి"} <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Consultation Modal */}
      {selectedStyle && (
        <div className="fixed inset-0 z-50 bg-[var(--forest)]/85 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" onClick={() => setSelectedStyle(null)}>
          <div className="max-w-2xl w-full bg-[var(--forest-2)] border border-[var(--gold)]/30 rounded-xl overflow-hidden my-8 shadow-2xl p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedStyle(null)} className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-[var(--forest)]/80 text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)] border border-[var(--gold)]/10 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <InquiryForm defaultSubject={`Interior Design: ${selectedStyle}`} title={`Interior Design Consultation - ${selectedStyle}`} />
          </div>
        </div>
      )}
    </Layout>
  );
}

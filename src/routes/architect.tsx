import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { Compass, PenTool, Layout as LayoutIcon, Building, HelpCircle, Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/architect")({
  head: () => ({
    meta: [
      { title: "Residential Architect Design — Shikas Estates" },
      { name: "description", content: "Bespoke custom home plan designs, 3D elevation renderings, structural layouts and Vastu-compliant drafting in Hyderabad." },
      { property: "og:title", content: "Residential Architect Design — Shikas Estates" },
      { property: "og:description", content: "Turn your plot into a custom luxury residence with our architectural services." },
    ],
  }),
  component: ArchitectPage,
});

function ArchitectPage() {
  const { language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const steps = [
    {
      icon: Compass,
      title: language === "en" ? "01 / Vastu & Orientation" : "01 / వాస్తు & స్థల అమరిక",
      desc: language === "en" 
        ? "Detailed analysis of directional wind, natural lighting, and 100% correct Vastu layout planning."
        : "దిశలు, గాలి వెలుతురు మరియు 100% ఖచ్చితమైన వాస్తు ఆధారంగా లేఅవుట్ ప్రణాళిక."
    },
    {
      icon: LayoutIcon,
      title: language === "en" ? "02 / Conceptual Floor Plans" : "02 / ఫ్లోర్ ప్లాన్ డిజైన్",
      desc: language === "en" 
        ? "Iterative 2D floor plans optimized for spacing, storage, and modern family flow."
        : "ఆధునిక అవసరాలకు తగినట్లుగా స్థల వినియోగం పెంచే 2D ఫ్లోర్ ప్లాన్లు."
    },
    {
      icon: PenTool,
      title: language === "en" ? "03 / 3D Elevation Walkthrough" : "03 / 3D ఎలివేషన్ మోడల్స్",
      desc: language === "en" 
        ? "High-definition 3D elevations and virtual walkthroughs to see your home before building starts."
        : "నిర్మాణానికి ముందే ఇల్లు ఎలా ఉంటుందో చూపించే హై-డెఫినిషన్ 3D ఎలివేషన్ ప్లాన్లు."
    },
    {
      icon: Building,
      title: language === "en" ? "04 / Blueprints & Permissions" : "04 / నిర్మాణ అనుమతులు & బ్లూప్రింట్",
      desc: language === "en" 
        ? "Complete structural, electrical, and plumbing blueprints, plus municipal approval-ready drawings."
        : "నిర్మాణానికి కావలసిన స్ట్రక్చరల్, ఎలక్ట్రికల్, ప్లంబింగ్ డ్రాయింగ్స్ మరియు అనుమతుల ప్లాన్."
    }
  ];

  const packages = [
    {
      name: language === "en" ? "Concept Blueprint" : "కాన్సెప్ట్ బ్లూప్రింట్",
      price: "₹99 / Sq. Ft",
      desc: language === "en" ? "Ideal for getting approvals and visualising basic layout structures." : "నిర్మాణ అనుమతులు మరియు ప్రాథమిక అవగాహన కోసం సరిపోతుంది.",
      features: [
        "2D Detailed Floor Plans",
        "Basic 3D Front Elevation",
        "Vastu Compliance Check",
        "2 Revision Cycles",
        "PDF Handover"
      ]
    },
    {
      name: language === "en" ? "Executive Design" : "ఎగ్జిక్యూటివ్ డిజైన్",
      price: "₹149 / Sq. Ft",
      desc: language === "en" ? "Comprehensive package including structural details for contractors." : "కాంట్రాక్టర్లకు కావలసిన పూర్తి స్ట్రక్చరల్ వివరాలతో కూడిన ప్యాకేజీ.",
      features: [
        "Everything in Concept Plan",
        "Premium 3D Exterior Elevation",
        "Structural Layout (Footing, Column)",
        "Electrical & Plumbing Layouts",
        "4 Revision Cycles",
        "Site Visit Verification (1 No)"
      ],
      popular: true
    },
    {
      name: language === "en" ? "Signature Bespoke" : "సిగ్నేచర్ బెస్పోక్",
      price: "₹249 / Sq. Ft",
      desc: language === "en" ? "Ultimate customization with continuous designer support and walkthroughs." : "డిజైనర్ల నిరంతర పర్యవేక్షణ మరియు 3D వాక్‌త్రూలతో కూడిన ప్రత్యేక ప్యాకేజీ.",
      features: [
        "Everything in Executive Plan",
        "Ultra HD 3D Video Walkthrough",
        "Detailed Gate & Compound Design",
        "Material Selection Consultancy",
        "Unlimited Revision Cycles",
        "Regular Site Inspections"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-mono">Bespoke Residential Architecture</p>
          <h1 className="font-display text-4xl sm:text-6xl mt-3 leading-none max-w-4xl mx-auto">
            {language === "en" && <>We shape your land into a <span className="italic text-gradient-gold">signature home</span></>}
            {language === "te" && <>మీ ప్లాట్‌ను ఒక <span className="italic text-gradient-gold">కలల నివాసంగా</span> తీర్చిదిద్దుతాము</>}
            {language === "hi" && <>हम आपकी भूमि को एक <span className="italic text-gradient-gold">सपनो के घर</span> में बदलते हैं</>}
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-[var(--muted-sage)] max-w-2xl mx-auto leading-relaxed">
            {language === "en" && "Whether it is a luxury villa in Bongloor or a modern residence in Pasumamla, our expert architectural team designs homes that merge local sensibilities with international craftsmanship."}
            {language === "te" && "బొంగుళూరులో విల్లా అయినా, పసుమామలలో ఇల్లు అయినా — మా ఆర్కిటెక్ట్లు స్థానిక అవసరాలకు మరియు అంతర్జాతీయ నాణ్యతకు సరిపోయేలా డిజైన్ చేస్తారు."}
            {language === "hi" && "चाहे वह बोंगलोर में एक लक्जरी विला हो या पसुमामला में एक आधुनिक घर — हमारी विशेषज्ञ टीम आपकी सोच के अनुसार शानदार डिजाइन तैयार करती है।"}
          </p>
        </div>
      </section>

      {/* Showcase Image with Text Overlay */}
      <section className="px-4 sm:px-6 lg:px-8 my-10">
        <div className="max-w-7xl mx-auto relative h-[40vh] sm:h-[60vh] overflow-hidden rounded-xl border border-[var(--gold)]/20 shadow-xl">
          <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80" alt="Architectural Drafting" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)] via-[var(--forest)]/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 max-w-lg">
            <h3 className="font-display text-2xl sm:text-3xl text-white">"Form follows life, not just function."</h3>
            <p className="text-xs sm:text-sm text-[var(--cream-2)] mt-2 font-mono uppercase tracking-wider">Every layout, window, and wall is designed to enhance your daily rituals.</p>
          </div>
        </div>
      </section>

      {/* Workflow / Steps Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-[var(--forest-2)]/30 border-y border-[var(--gold)]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono">Our Process</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Four Steps to Perfection</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-[var(--forest-2)] border border-[var(--gold)]/15 rounded-lg p-6 relative group hover:border-[var(--gold)] transition-colors">
                <s.icon className="w-8 h-8 text-[var(--gold)] mb-4" />
                <h3 className="font-display text-lg mt-2 text-white">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--cream-2)]/80 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono">Transparent Packages</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Select a Plan That Fits Your Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col justify-between border rounded-xl p-6 sm:p-8 relative ${
                  pkg.popular 
                    ? "bg-[var(--forest)] border-[var(--gold)] shadow-[0_15px_40px_-15px_rgba(212,165,116,0.25)] scale-100 md:scale-[1.03] z-10" 
                    : "bg-[var(--forest-2)]/60 border-[var(--gold)]/20"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--forest)] font-mono text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="font-display text-2xl text-cream">{pkg.name}</h3>
                  <p className="text-xs text-[var(--muted-sage)] font-mono mt-1">{pkg.desc}</p>
                  <div className="text-3xl font-display text-[var(--gold)] mt-5">{pkg.price}</div>
                  
                  <ul className="mt-6 space-y-3.5 border-t border-[var(--gold)]/10 pt-6">
                    {pkg.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex gap-2 text-xs sm:text-sm text-[var(--cream-2)]/85">
                        <Check className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => setSelectedPlan(pkg.name)}
                  variant={pkg.popular ? "gold" : "gold-outline"} 
                  className="w-full mt-8 justify-center h-11 cursor-pointer"
                >
                  {language === "en" ? "Select Package" : "ప్యాకేజీ ఎంచుకోండి"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Inquiry Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-[var(--forest)]/85 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" onClick={() => setSelectedPlan(null)}>
          <div className="max-w-2xl w-full bg-[var(--forest-2)] border border-[var(--gold)]/30 rounded-xl overflow-hidden my-8 shadow-2xl p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedPlan(null)} className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-[var(--forest)]/80 text-cream hover:bg-[var(--gold)] hover:text-[var(--forest)] border border-[var(--gold)]/10 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <InquiryForm defaultSubject={`Architectural Design Package: ${selectedPlan}`} title={`Architect Consultation - ${selectedPlan}`} />
          </div>
        </div>
      )}
    </Layout>
  );
}

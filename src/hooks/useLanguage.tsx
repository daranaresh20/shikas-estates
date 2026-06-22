import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "te" | "hi";

export const translations = {
  en: {
    // Navigation
    navHome: "Home",
    navAtelier: "Atelier",
    navPlots: "Plots",
    navPlans: "Plans",
    navOngoing: "Ongoing",
    navArchive: "Archive",
    navGallery: "Gallery",
    navContact: "Contact",
    navAdminPanel: "Admin Panel",
    navEnquire: "Enquire",
    navEnquireNow: "Enquire Now",
    navLogout: "Logout",
    navAdminAccess: "Admin Access",
    navAdminDashboard: "Admin Dashboard",
    navEstd: "Estd. 2026 · Hyderabad · India",
    navEstdShort: "Estd. 2026 · Hyderabad, India",

    // Hero
    heroTitlePart1: "Quiet ",
    heroTitlePart2: "land.",
    heroTitlePart3: "Considered",
    heroTitlePart4: " homes.",
    heroSubtitle: "An invitation-only portfolio of premium residential plots and house plans, crafted for those who value home in detail, not square footage.",
    heroCtaRelease: "View the Release",
    heroCtaStory: "Read our story →",

    // Marquee Words
    marqueeRestraint: "Restraint.",
    marqueeProvenance: "Provenance.",
    marqueeCraft: "Craft.",
    marqueeStewardship: "Stewardship.",
    marqueePatience: "Patience.",
    marqueePermanence: "Permanence.",

    // Landing Page Sections
    secPlotsEyebrow: "Latest Release",
    secPlotsTitle: "Three plots, by invitation.",
    secPlotsSub: "From our spring volume — each parcel personally surveyed, titled and ready to build on.",
    secPlotsCta: "View all plots",

    secPlansEyebrow: "House Plans",
    secPlansTitle: "Six typologies. Infinite variations.",
    secPlansSub: "From compact ateliers to four-bedroom heritage villas — every plan refined over a decade of practice.",
    secPlansCta: "Explore all plans",

    secStoryEyebrow: "03 — On Practice",
    secStoryTitleLine1: "We build slowly,",
    secStoryTitleLine2: "on purpose.",
    secStorySub: "We choose land carefully. We refuse the work we cannot do well. The result is a portfolio we will be proud to walk through, a decade later.",

    // Features
    featPrimeTitle: "Prime micro-markets",
    featPrimeDesc: "Curated for infrastructure, schools and natural assets.",
    featPaymentsTitle: "Transparent payments",
    featPaymentsDesc: "Milestone-based, zero hidden charges.",
    featStewardshipTitle: "Stewardship",
    featStewardshipDesc: "We leave each site with more trees than we found.",
    featDeliveredTitle: "Delivered on time",
    featDeliveredDesc: "A record measured in handed-over keys.",

    // Footer
    footerAddress: "Pasumamla, Abdullapurmet Mandal, Ranga Reddy District, Telangana 501505",
    footerPhone: "Phone",
    footerEmail: "Email",
    footerHours: "Hours",
    footerHoursVal: "Mon–Sat: 9 AM – 6 PM · Sunday: 10 AM – 4 PM",
    footerNavigation: "Navigation",
    footerLegal: "Legal",
    footerRights: "All rights reserved.",

    // Inquiry Form
    formTitleGeneral: "General Enquiry",
    formTitleProperty: "Enquire about this property",
    formName: "Full Name",
    formNamePlaceholder: "e.g., Srinivas Rao",
    formEmail: "Email Address",
    formEmailPlaceholder: "e.g., srinivas@example.com",
    formPhone: "Phone Number",
    formPhonePlaceholder: "e.g., +91 98765 43210",
    formSubject: "Subject",
    formSubjectSelect: "Select subject...",
    formSubjectPlots: "Plots & Land Releases",
    formSubjectPlans: "Bespoke House Plans",
    formSubjectOngoing: "Ongoing Projects",
    formSubjectCompleted: "Archive / Completed Projects",
    formSubjectOther: "Other Enquiries",
    formMessage: "Message / Requirements",
    formMessagePlaceholder: "Tell us about your requirements or preferred plot size...",
    formNewsletter: "Join our private list for advance notice on upcoming land releases.",
    formSubmit: "Send Enquiry",
    formSubmitting: "Sending...",
    formSuccessTitle: "Thank you!",
    formSuccessDesc: "We have received your message and will reach out shortly.",

    // Common
    sqft: "sqft",
    br: "BR",
    ba: "BA",
    from: "From",
    plot: "Plot"
  },
  te: {
    // Navigation
    navHome: "హోమ్",
    navAtelier: "అటెలియర్",
    navPlots: "ప్లాట్లు",
    navPlans: "ప్లాన్లు",
    navOngoing: "ప్రస్తుత ప్రాజెక్టులు",
    navArchive: "పాత ప్రాజెక్టులు",
    navGallery: "గ్యాలరీ",
    navContact: "సంప్రదించండి",
    navAdminPanel: "అడ్మిన్ ప్యానెల్",
    navEnquire: "విచారణ",
    navEnquireNow: "ఇప్పుడే విచారించండి",
    navLogout: "లాగౌట్",
    navAdminAccess: "అడ్మిన్ లాగిన్",
    navAdminDashboard: "అడ్మిన్ డాష్‌బోర్డ్",
    navEstd: "స్థాపన. 2026 · హైదరాబాద్ · ఇండియా",
    navEstdShort: "స్థాపన. 2026 · హైదరాబాద్, ఇండియా",

    // Hero
    heroTitlePart1: "ప్రశాంతమైన ",
    heroTitlePart2: "భూమి.",
    heroTitlePart3: "ఆలోచనాత్మకమైన",
    heroTitlePart4: " ఇళ్ళు.",
    heroSubtitle: "పరిమిత సంఖ్యలో అందుబాటులో ఉన్న ప్రీమియం రెసిడెన్షియల్ ప్లాట్లు మరియు హౌస్ ప్లాన్ల ప్రత్యేక కలెక్షన్, వైశాల్యం కంటే ఇళ్ల నాణ్యతకు విలువనిచ్చేవారి కోసం రూపొందించబడింది.",
    heroCtaRelease: "విడుదల చేసిన ప్లాట్లు",
    heroCtaStory: "మా కథ చదవండి →",

    // Marquee Words
    marqueeRestraint: "నిగ్రహం.",
    marqueeProvenance: "మూలం.",
    marqueeCraft: "హస్తకళ.",
    marqueeStewardship: "బాధ్యత.",
    marqueePatience: "ఓర్పు.",
    marqueePermanence: "శాశ్వతత్వం.",

    // Landing Page Sections
    secPlotsEyebrow: "తాజా విడుదల",
    secPlotsTitle: "ఆహ్వానం మేరకు మాత్రమే లభించే మూడు ప్లాట్లు.",
    secPlotsSub: "మా వసంతకాలపు ప్రత్యేక ప్లాట్ల నుండి — ప్రతి ప్లాట్ వ్యక్తిగతంగా సర్వే చేయబడి, క్లియర్ టైటిల్‌తో ఇల్లు కట్టుకోవడానికి సిద్ధంగా ఉంది.",
    secPlotsCta: "అన్ని ప్లాట్లను చూడండి",

    secPlansEyebrow: "ఇంటి ప్లాన్లు",
    secPlansTitle: "ఆరు రకాల డిజైన్లు. అపరిమిత వైవిధ్యాలు.",
    secPlansSub: "చిన్న స్టూడియోల నుండి నాలుగు పడకల విల్లాల వరకు — ప్రతి ప్లాన్ దశాబ్ద కాలపు అనుభవంతో తీర్చిదిద్దబడింది.",
    secPlansCta: "అన్ని ప్లాన్లను అన్वेషించండి",

    secStoryEyebrow: "03 — మా పని విధానం",
    secStoryTitleLine1: "మేము నెమ్మదిగా నిర్మిస్తాము,",
    secStoryTitleLine2: "ఉద్దేశపూర్వకంగానే.",
    secStorySub: "మేము భూమిని చాలా జాగ్రత్తగా ఎంపిక చేసుకుంటాము. మేము నాణ్యతగా చేయలేని పనిని అస్సలు ఒప్పుకోము. ఫలితంగా, ఒక దశాబ్దం తర్వాత కూడా మేము గర్వంగా చూపించగల ప్రాజెక్టులు ఇవి.",

    // Features
    featPrimeTitle: "అత్యుత్తమ ప్రాంతాలు",
    featPrimeDesc: "మౌలిక సదుపాయాలు, పాఠశాలలు మరియు సహజ వనరుల ఆధారంగా ఎంపిక చేయబడినవి.",
    featPaymentsTitle: "పారదర్శక చెల్లింపులు",
    featPaymentsDesc: "పనుల పురోగతి ఆధారంగా చెల్లింపులు, ఎలాంటి అదనపు రుసుములు లేవు.",
    featStewardshipTitle: "పర్యావరణ బాధ్యత",
    featStewardshipDesc: "మేము కొనుగోలు చేసినప్పటి కంటే ఎక్కువ చెట్లను నాటి అందిస్తాము.",
    featDeliveredTitle: "సమయానికి పంపిణీ",
    featDeliveredDesc: "సకాలంలో కీలను అందించిన అద్భుతమైన రికార్డు.",

    // Footer
    footerAddress: "పసుమామల, అబ్దుల్లాపూర్‌మెట్ మండలం, రంగారెడ్డి జిల్లా, తెలంగాణ 501505",
    footerPhone: "ఫోన్",
    footerEmail: "ఈమెయిల్",
    footerHours: "పనివేళలు",
    footerHoursVal: "సోమ–శని: ఉదయం 9 – సాయంత్రం 6 · ఆదివారం: ఉదయం 10 – మధ్యాహ్నం 4",
    footerNavigation: "లింకులు",
    footerLegal: "చట్టపరమైనవి",
    footerRights: "అన్ని హక్కులూ ప్రత్యేకించుకోబడినవి.",

    // Inquiry Form
    formTitleGeneral: "సాధారణ విచారణ",
    formTitleProperty: "ఈ ప్రాపర్టీ గురించి విచారించండి",
    formName: "పూర్తి పేరు",
    formNamePlaceholder: "ఉదా., శ్రీనివాసరావు",
    formEmail: "ఈమెయిల్ చిరునామా",
    formEmailPlaceholder: "ఉదా., srinivas@example.com",
    formPhone: "ఫోన్ నంబర్",
    formPhonePlaceholder: "ఉదా., +91 98765 43210",
    formSubject: "అంశం",
    formSubjectSelect: "అంశాన్ని ఎంచుకోండి...",
    formSubjectPlots: "ప్లాట్లు & ల్యాండ్ రిలీజెస్",
    formSubjectPlans: "ప్రత్యేకమైన ఇంటి ప్లాన్లు",
    formSubjectOngoing: "ప్రస్తుత ప్రాజెక్టులు",
    formSubjectCompleted: "పూర్తయిన ప్రాజెక్టులు",
    formSubjectOther: "ఇతర విచారణలు",
    formMessage: "సందేశం / మీ అవసరాలు",
    formMessagePlaceholder: "మీకు కావలసిన ప్లాట్ పరిమాణం లేదా ఇతర వివరాలను ఇక్కడ తెలియజేయండి...",
    formNewsletter: "రాబోయే సరికొత్త ప్లాట్ల గురించి ముందుగా తెలుసుకోవడానికి మా లిస్టులో చేరండి.",
    formSubmit: "విచారణను పంపండి",
    formSubmitting: "పంపిణీ అవుతోంది...",
    formSuccessTitle: "ధన్యవాదాలు!",
    formSuccessDesc: "మీ సందేశం మాకు చేరింది. మేము త్వరలోనే మిమ్మల్ని సంప్రదిస్తాము.",

    // Common
    sqft: "చ.అడుగులు",
    br: "బెడ్ రూమ్",
    ba: "బాత్ రూమ్",
    from: "ధర",
    plot: "ప్లాట్"
  },
  hi: {
    // Navigation
    navHome: "होम",
    navAtelier: "अटेलियर",
    navPlots: "प्लॉट्स",
    navPlans: "प्लान्स",
    navOngoing: "जारी प्रोजेक्ट्स",
    navArchive: "पूरे हुए प्रोजेक्ट्स",
    navGallery: "गैलरी",
    navContact: "संपर्क करें",
    navAdminPanel: "एडमिन पैनल",
    navEnquire: "पूछताछ",
    navEnquireNow: "अभी पूछताछ करें",
    navLogout: "लॉगआउट",
    navAdminAccess: "एडमिन लॉगिन",
    navAdminDashboard: "एडमिन डैशबोर्ड",
    navEstd: "स्थापना. 2026 · हैदराबाद · भारत",
    navEstdShort: "स्थापना. 2026 · हैदराबाद, भारत",

    // Hero
    heroTitlePart1: "शांत ",
    heroTitlePart2: "ज़मीन।",
    heroTitlePart3: "बेहतर",
    heroTitlePart4: " घर।",
    heroSubtitle: "प्रीमियम आवासीय भूखंडों और घर की योजनाओं का एक आमंत्रण-मात्र पोर्टफोलियो, जो क्षेत्रफल से अधिक गुणवत्ता को महत्व देने वालों के लिए बनाया गया है।",
    heroCtaRelease: "प्लॉट्स देखें",
    heroCtaStory: "हमारी कहानी पढ़ें →",

    // Marquee Words
    marqueeRestraint: "संयम।",
    marqueeProvenance: "उत्पत्ति।",
    marqueeCraft: "शिल्पकला।",
    marqueeStewardship: "जिम्मेदारी।",
    marqueePatience: "धैर्य।",
    marqueePermanence: "स्थायित्व।",

    // Landing Page Sections
    secPlotsEyebrow: "नवीनतम रिलीज",
    secPlotsTitle: "केवल आमंत्रण पर तीन विशिष्ट भूखंड।",
    secPlotsSub: "हमारे वसंत संस्करण से — प्रत्येक भूखंड का व्यक्तिगत रूप से सर्वेक्षण किया गया है, स्पष्ट स्वामित्व के साथ तुरंत घर बनाने के लिए तैयार।",
    secPlotsCta: "सभी प्लॉट्स देखें",

    secPlansEyebrow: "घर के नक्शे",
    secPlansTitle: "छह श्रेणियां। असीमित विविधताएं।",
    secPlansSub: "छोटे अटोलेयर्स से लेकर चार कमरों वाले हेरिटेज विला तक — हर एक नक्शा एक दशक के अनुभव के साथ परिष्कृत किया गया है।",
    secPlansCta: "सभी नक्शे देखें",

    secStoryEyebrow: "03 — हमारी कार्यप्रणाली",
    secStoryTitleLine1: "हम समझदारी से और",
    secStoryTitleLine2: "धीरे बनाते हैं।",
    secStorySub: "हम ज़मीन का चयन बहुत सावधानी से करते हैं। हम वह काम नहीं लेते जिसे हम सर्वोत्तम ढंग से न कर सकें। परिणाम एक ऐसा पोर्टफोलियो है जिस पर हम एक दशक बाद भी गर्व कर सकेंगे।",

    // Features
    featPrimeTitle: "प्रमुख क्षेत्र",
    featPrimeDesc: "बुनियादी ढांचे, स्कूलों और प्राकृतिक सुंदरता के आधार पर चुने गए स्थान।",
    featPaymentsTitle: "पारदर्शी भुगतान",
    featPaymentsDesc: "काम की प्रगति के अनुसार भुगतान, कोई छिपे हुए शुल्क नहीं।",
    featStewardshipTitle: "पर्यावरण की रक्षा",
    featStewardshipDesc: "हम प्रत्येक स्थान पर पहले से अधिक पेड़ लगाकर सौंपते हैं।",
    featDeliveredTitle: "समय पर डिलीवरी",
    featDeliveredDesc: "ससमय चाबियां सौंपने का बेहतरीन रिकॉर्ड।",

    // Footer
    footerAddress: "पसुमामला, अब्दुल्लापुरमेट मंडल, रंगारेड्डी जिला, तेलंगाना 501505",
    footerPhone: "फ़ोन",
    footerEmail: "ईमेल",
    footerHours: "कार्य समय",
    footerHoursVal: "सोम-शनि: सुबह 9 - शाम 6 · रविवार: सुबह 10 - दोपहर 4",
    footerNavigation: "नेविगेशन",
    footerLegal: "कानूनी",
    footerRights: "सर्वाधिकार सुरक्षित।",

    // Inquiry Form
    formTitleGeneral: "सामान्य पूछताछ",
    formTitleProperty: "इस प्रॉपर्टी के बारे में पूछें",
    formName: "पूरा नाम",
    formNamePlaceholder: "जैसे, श्रीनिवास राव",
    formEmail: "ईमेल पता",
    formEmailPlaceholder: "जैसे, srinivas@example.com",
    formPhone: "फ़ोन नंबर",
    formPhonePlaceholder: "जैसे, +91 98765 43210",
    formSubject: "विषय",
    formSubjectSelect: "विषय चुनें...",
    formSubjectPlots: "प्लॉट्स और नई रिलीज",
    formSubjectPlans: "घर के नक्शे",
    formSubjectOngoing: "वर्तमान प्रोजेक्ट्स",
    formSubjectCompleted: "पूरे हुए प्रोजेक्ट्स",
    formSubjectOther: "अन्य पूछताछ",
    formMessage: "सन्देश / आपकी आवश्यकताएं",
    formMessagePlaceholder: "हमें अपनी आवश्यकताओं या पसंदीदा प्लॉट आकार के बारे में बताएं...",
    formNewsletter: "आने वाले नए प्लॉट्स की सूचना सबसे पहले पाने के लिए हमारी सूची में शामिल हों।",
    formSubmit: "पूछताछ भेजें",
    formSubmitting: "भेजा जा रहा है...",
    formSuccessTitle: "धन्यवाद!",
    formSuccessDesc: "हमें आपका संदेश मिल गया है। हम जल्द ही आपसे संपर्क करेंगे।",

    // Common
    sqft: "वर्ग फीट",
    br: "बेडरुम",
    ba: "बाथरूम",
    from: "कीमत",
    plot: "प्लॉट"
  }
};

export type TranslationKey = keyof typeof translations.en;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("shikas_lang") as Language;
    if (savedLang === "en" || savedLang === "te" || savedLang === "hi") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("shikas_lang", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

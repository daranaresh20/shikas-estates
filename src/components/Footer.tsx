import { Link } from "@tanstack/react-router";
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="mt-24 border-t border-[var(--gold)]/15 bg-[var(--forest)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-cream mb-3">{COMPANY.name}</div>
          <p className="text-sm text-[var(--muted-sage)] leading-relaxed">
            {language === "en" && "Crafting timeless residences and limited-edition plots for those who value provenance, craft and quiet luxury."}
            {language === "te" && "మూలం, హస్తకళ మరియు ప్రశాంతమైన జీవనానికి ప్రాధాన్యత ఇచ్చే వారి కోసం కాలాతీత గృహాలను, ప్లాట్లను రూపొందిస్తున్నాము."}
            {language === "hi" && "मूल, शिल्प कौशल और शांत विलासिता को महत्व देने वालों के लिए कालातीत आवासों और सीमित संस्करण भूखंडों का निर्माण।"}
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest)] transition-colors" aria-label="Social">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-widest">{t("footerNavigation")}</h4>
          <ul className="space-y-2.5 text-sm text-[var(--cream-2)]/85">
            <li><Link to="/houses" className="hover:text-[var(--gold)] block py-0.5">{t("navHouses")}</Link></li>
            <li><Link to="/plots" className="hover:text-[var(--gold)] block py-0.5">{t("navPlots")}</Link></li>
            <li><Link to="/architect" className="hover:text-[var(--gold)] block py-0.5">{t("navArchitect")}</Link></li>
            <li><Link to="/interiors" className="hover:text-[var(--gold)] block py-0.5">{t("navInteriors")}</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--gold)] block py-0.5">{t("navContact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-widest">
            {language === "en" && "Contact"}
            {language === "te" && "సంప్రదించండి"}
            {language === "hi" && "संपर्क करें"}
          </h4>
          <ul className="space-y-3.5 text-sm text-[var(--cream-2)]/85">
            <li className="flex gap-2">
              <Phone className="w-4 h-4 mt-0.5 text-[var(--gold)] shrink-0" /> 
              <a href={`tel:${COMPANY.phoneHref}`} className="hover:text-[var(--gold)]">{COMPANY.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-[var(--gold)] shrink-0" /> 
              <a href={`mailto:${COMPANY.email}`} className="hover:text-[var(--gold)]">{COMPANY.email}</a>
            </li>
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[var(--gold)] shrink-0" /> 
              <span className="leading-relaxed">{t("footerAddress")}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-[var(--muted-sage)]">{t("footerHoursVal")}</p>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-widest">{t("footerLegal")}</h4>
          <ul className="space-y-2.5 text-sm text-[var(--cream-2)]/85">
            <li>
              <a href="#" className="hover:text-[var(--gold)] block py-0.5">
                {language === "en" && "Privacy Policy"}
                {language === "te" && "గోప్యతా విధానం"}
                {language === "hi" && "गोपनीयता नीति"}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--gold)] block py-0.5">
                {language === "en" && "Terms & Conditions"}
                {language === "te" && "నిబంధనలు & షరతులు"}
                {language === "hi" && "नियम एवं शर्तें"}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--gold)] block py-0.5">
                {language === "en" && "RERA Disclosures"}
                {language === "te" && "RERA వెల్లడింపులు"}
                {language === "hi" && "RERA प्रकटीकरण"}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-[var(--muted-sage)] flex flex-col md:flex-row justify-between gap-3 text-center md:text-left">
        <span>© {new Date().getFullYear()} {COMPANY.name}. {t("footerRights")}</span>
        <span className="italic">
          {language === "en" && "Designed with restraint. Built with intent."}
          {language === "te" && "అద్భుతమైన డిజైన్‌తో కూడినది. నిబద్ధతతో నిర్మించబడినది."}
          {language === "hi" && "संयम के साथ डिज़ाइन किया गया। इरादे के साथ बनाया गया।"}
        </span>
      </div>
    </footer>
  );
}

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
            {language === "en" 
              ? "Crafting timeless residences and limited-edition plots for those who value provenance, craft and quiet luxury."
              : "మూలం, హస్తకళ మరియు ప్రశాంతమైన జీవనానికి ప్రాధాన్యత ఇచ్చే వారి కోసం కాలాతీత గృహాలను, ప్లాట్లను రూపొందిస్తున్నాము."}
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
            <li><Link to="/about" className="hover:text-[var(--gold)] block py-0.5">{t("navAtelier")}</Link></li>
            <li><Link to="/plots" className="hover:text-[var(--gold)] block py-0.5">{t("navPlots")}</Link></li>
            <li><Link to="/plans" className="hover:text-[var(--gold)] block py-0.5">{t("navPlans")}</Link></li>
            <li><Link to="/projects/ongoing" className="hover:text-[var(--gold)] block py-0.5">{t("navOngoing")}</Link></li>
            <li><Link to="/projects/completed" className="hover:text-[var(--gold)] block py-0.5">{t("navArchive")}</Link></li>
            <li><Link to="/gallery" className="hover:text-[var(--gold)] block py-0.5">{t("navGallery")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-widest">{language === "en" ? "Contact" : "సంప్రదించండి"}</h4>
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
                {language === "en" ? "Privacy Policy" : "గోప్యతా విధానం"}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--gold)] block py-0.5">
                {language === "en" ? "Terms & Conditions" : "నిబంధనలు & షరతులు"}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--gold)] block py-0.5">
                {language === "en" ? "RERA Disclosures" : "RERA వెల్లడింపులు"}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-[var(--muted-sage)] flex flex-col md:flex-row justify-between gap-3 text-center md:text-left">
        <span>© {new Date().getFullYear()} {COMPANY.name}. {t("footerRights")}</span>
        <span className="italic">
          {language === "en" ? "Designed with restraint. Built with intent." : "అద్భుతమైన డిజైన్‌తో కూడినది. నిబద్ధతతో నిర్మించబడినది."}
        </span>
      </div>
    </footer>
  );
}

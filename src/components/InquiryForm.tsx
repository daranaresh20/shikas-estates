import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";

type Props = {
  defaultSubject?: string;
  compact?: boolean;
  title?: string;
};

export function InquiryForm({ defaultSubject, compact, title }: Props) {
  const { t, language } = useLanguage();
  
  // Set default subject key mapping safely
  const resolvedDefaultSubject = defaultSubject || t("formTitleGeneral");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: resolvedDefaultSubject,
    message: "",
    newsletter: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) {
      e.name = language === "en" ? "Name is required" : language === "te" ? "పేరు తప్పనిసరి" : "नाम आवश्यक है";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = language === "en" ? "Valid email required" : language === "te" ? "సరైన ఈమెయిల్ అవసరం" : "सही ईमेल आवश्यक है";
    }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      e.phone = language === "en" ? "10-digit phone required" : language === "te" ? "10 అంకెల ఫోన్ నంబర్" : "10 अंकों का फोन नंबर";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      toast.error(
        language === "en" 
          ? "Please check the form" 
          : language === "te" 
            ? "దయచేసి ఫారమ్‌ను తనిఖీ చేయండి" 
            : "कृपया फॉर्म की जांच करें", 
        { 
          description: language === "en" 
            ? "A few fields need attention." 
            : language === "te" 
              ? "కొన్ని ఫీల్డ్స్ సరిదిద్దవలసి ఉంది." 
              : "कुछ फ़ील्ड्स में सुधार की आवश्यकता है।" 
        }
      );
      return;
    }
    setSubmitting(true);
    
    let dbSuccess = false;
    try {
      if (supabase) {
        const { error } = await supabase.from("inquiries").insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            subject: form.subject,
            message: form.message,
            newsletter: form.newsletter,
          },
        ]);
        if (error) throw error;
        dbSuccess = true;
      }
    } catch (err) {
      console.error("Supabase insert error, falling back to local storage:", err);
    }

    if (!dbSuccess) {
      try {
        const key = "shikas_inquiries";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push({ ...form, at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(prev));
      } catch {}
    }

    setSubmitting(false);
    toast.success(t("formSuccessTitle"), { 
      description: t("formSuccessDesc") 
    });
    setForm({ name: "", email: "", phone: "", subject: resolvedDefaultSubject, message: "", newsletter: true });
  }

  const inputCls =
    "w-full bg-[var(--forest)] border border-[var(--gold)]/25 rounded-md px-4 py-3 text-cream placeholder:text-[var(--muted-sage)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30 transition";

  return (
    <form onSubmit={onSubmit} className={`luxe-card rounded-xl p-6 md:p-8 ${compact ? "" : ""}`}>
      <h3 className="text-2xl font-display mb-1">
        {title || (defaultSubject ? t("formTitleProperty") : t("formTitleGeneral"))}
      </h3>
      <p className="text-sm text-[var(--muted-sage)] mb-6">
        {language === "en" ? "We respond personally within one business day." : "మేము ఒక పని దినంలో వ్యక్తిగతంగా స్పందిస్తాము."}
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input 
            className={inputCls} 
            placeholder={t("formName")} 
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
          />
          {errors.name && <p className="text-xs text-[var(--copper)] mt-1">{errors.name}</p>}
        </div>
        <div>
          <input 
            className={inputCls} 
            placeholder={t("formEmail")} 
            type="email" 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
          />
          {errors.email && <p className="text-xs text-[var(--copper)] mt-1">{errors.email}</p>}
        </div>
        <div>
          <input 
            className={inputCls} 
            placeholder={t("formPhone")} 
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} 
          />
          {errors.phone && <p className="text-xs text-[var(--copper)] mt-1">{errors.phone}</p>}
        </div>
        <div>
          <select 
            className={inputCls} 
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            <option value={t("formTitleGeneral")}>{t("formTitleGeneral")}</option>
            <option value={t("formSubjectPlots")}>{t("formSubjectPlots")}</option>
            <option value={t("formSubjectPlans")}>{t("formSubjectPlans")}</option>
            <option value={t("formSubjectOngoing")}>{t("formSubjectOngoing")}</option>
            <option value={t("formSubjectOther")}>{t("formSubjectOther")}</option>
          </select>
        </div>
      </div>

      <textarea
        className={`${inputCls} mt-4 min-h-32`}
        placeholder={t("formMessagePlaceholder")}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <label className="flex items-center gap-2 mt-4 text-sm text-[var(--cream-2)]/80">
        <input 
          type="checkbox" 
          className="accent-[var(--gold)]" 
          checked={form.newsletter}
          onChange={(e) => setForm({ ...form, newsletter: e.target.checked })} 
        />
        {t("formNewsletter")}
      </label>

      <Button type="submit" variant="gold" size="lg" disabled={submitting} className="mt-6 w-full sm:w-auto cursor-pointer">
        {submitting ? t("formSubmitting") : t("formSubmit")}
      </Button>
    </form>
  );
}

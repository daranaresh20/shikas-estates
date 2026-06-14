import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/data";

type Props = {
  defaultSubject?: string;
  compact?: boolean;
  title?: string;
};

export function InquiryForm({ defaultSubject = "General Inquiry", compact, title }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: "",
    newsletter: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) e.phone = "10-digit phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please check the form", { description: "A few fields need attention." });
      return;
    }
    setSubmitting(true);
    try {
      const key = "shikas_inquiries";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push({ ...form, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {}
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you!", { description: `We'll get back to you within 24 hours at ${form.email}.` });
      setForm({ name: "", email: "", phone: "", subject: defaultSubject, message: "", newsletter: true });
    }, 600);
  }

  const inputCls =
    "w-full bg-[var(--forest)] border border-[var(--gold)]/25 rounded-md px-4 py-3 text-cream placeholder:text-[var(--muted-sage)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30 transition";

  return (
    <form onSubmit={onSubmit} className={`luxe-card rounded-xl p-6 md:p-8 ${compact ? "" : ""}`}>
      {title && <h3 className="text-2xl font-display mb-1">{title}</h3>}
      <p className="text-sm text-[var(--muted-sage)] mb-6">We respond personally within one business day.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input className={inputCls} placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {errors.name && <p className="text-xs text-[var(--copper)] mt-1">{errors.name}</p>}
        </div>
        <div>
          <input className={inputCls} placeholder="Email" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email && <p className="text-xs text-[var(--copper)] mt-1">{errors.email}</p>}
        </div>
        <div>
          <input className={inputCls} placeholder="Phone" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          {errors.phone && <p className="text-xs text-[var(--copper)] mt-1">{errors.phone}</p>}
        </div>
        <div>
          <select className={inputCls} value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}>
            <option>General Inquiry</option>
            <option>Plot Inquiry</option>
            <option>House Plan</option>
            <option>Site Visit</option>
            <option>Customization Request</option>
          </select>
        </div>
      </div>

      <textarea
        className={`${inputCls} mt-4 min-h-32`}
        placeholder="Tell us a little about what you're looking for"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <label className="flex items-center gap-2 mt-4 text-sm text-[var(--cream-2)]/80">
        <input type="checkbox" className="accent-[var(--gold)]" checked={form.newsletter}
          onChange={(e) => setForm({ ...form, newsletter: e.target.checked })} />
        Send me occasional updates from {COMPANY.name}
      </label>

      <Button type="submit" variant="gold" size="lg" disabled={submitting} className="mt-6 w-full sm:w-auto">
        {submitting ? "Sending…" : "Send Inquiry"}
      </Button>
    </form>
  );
}

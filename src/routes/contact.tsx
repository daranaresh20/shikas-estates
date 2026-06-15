import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { InquiryForm } from "@/components/InquiryForm";
import { COMPANY } from "@/lib/data";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shika's Estates" },
      { name: "description", content: "Speak with the Shika's Estates team. Phone, WhatsApp, email and visits — we reply within one business day." },
      { property: "og:title", content: "Contact — Shika's Estates" },
      { property: "og:description", content: "Get in touch with the Shika's Estates team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Layout>
      <section className="px-5 lg:px-8 pt-16 pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl mt-3">We're easy to reach.</h1>
          <p className="mt-4 text-[var(--muted-sage)] max-w-xl mx-auto">Phone, email, WhatsApp or a quiet morning on-site — we respond within one business day.</p>
        </div>
      </section>

      <section className="px-5 lg:px-8 mt-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-5">
          <Card icon={Phone} title="Call us" lines={[<a key="t" href={`tel:${COMPANY.phoneHref}`} className="hover:text-[var(--gold)]">{COMPANY.phone}</a>]} />
          <Card icon={Mail} title="Email" lines={[<a key="e" href={`mailto:${COMPANY.email}`} className="hover:text-[var(--gold)]">{COMPANY.email}</a>]} />
          <Card icon={MapPin} title="Visit" lines={[COMPANY.address]} />
        </div>
      </section>

      <section className="px-5 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          <div>
            <h2 className="font-display text-3xl">Send a note</h2>
            <p className="text-[var(--muted-sage)] mt-2 text-sm">Tell us a little about what you're looking for. We'll match you with the right member of the team.</p>
            <div className="mt-6">
              <InquiryForm defaultSubject="General Inquiry" />
            </div>
          </div>
          <div className="space-y-5">
            <div className="luxe-card rounded-xl overflow-hidden">
              <iframe
                title="Map"
                className="w-full h-80 grayscale-[0.4]"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.65%2C17.31%2C78.71%2C17.35&amp;layer=mapnik"
              />
            </div>
            <div className="luxe-card rounded-xl p-6 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[var(--gold)] mt-0.5" />
              <div>
                <div className="font-display text-lg">Business Hours</div>
                <div className="text-sm text-[var(--cream-2)]/85 mt-1">{COMPANY.hours}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Card({ icon: Icon, title, lines }: { icon: React.ElementType; title: string; lines: React.ReactNode[] }) {
  return (
    <div className="luxe-card rounded-xl p-6">
      <div className="w-11 h-11 grid place-items-center rounded-md border border-[var(--gold)]/40 text-[var(--gold)] bg-[var(--forest)]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="mt-4 font-display text-lg">{title}</div>
      <div className="mt-1 text-[var(--cream-2)]/90 text-sm space-y-1">
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data";

export function FloatingActions() {
  const waUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hi ${COMPANY.name}, I'm interested in your properties.`)}`;
  return (
    <>
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full grid place-items-center bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href={`tel:${COMPANY.phoneHref}`}
        aria-label="Call us"
        className="md:hidden fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full grid place-items-center bg-[var(--gold)] text-[var(--forest)] shadow-[0_10px_30px_-8px_rgba(212,165,116,0.6)]"
      >
        <Phone className="w-6 h-6" />
      </a>
    </>
  );
}

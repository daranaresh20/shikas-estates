import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data";

export function FloatingActions() {
  const waUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hi ${COMPANY.name}, I'm interested in your properties.`)}`;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full grid place-items-center bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-5.5 h-5.5 md:w-6 md:h-6" />
      </a>
      <a
        href={`tel:${COMPANY.phoneHref}`}
        aria-label="Call us"
        className="md:hidden w-12 h-12 rounded-full grid place-items-center bg-[var(--gold)] text-[var(--forest)] shadow-[0_10px_30px_-8px_rgba(28,28,30,0.3)] hover:scale-110 transition-transform"
      >
        <Phone className="w-5.5 h-5.5" />
      </a>
    </div>
  );
}

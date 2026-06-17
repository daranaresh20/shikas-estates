import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--gold)]/15 bg-[var(--forest)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-cream mb-3">{COMPANY.name}</div>
          <p className="text-sm text-[var(--muted-sage)] leading-relaxed">
            Crafting timeless residences and limited-edition plots for those who value provenance, craft and quiet luxury.
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
          <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-widest">Discover</h4>
          <ul className="space-y-2.5 text-sm text-[var(--cream-2)]/85">
            <li><Link to="/about" className="hover:text-[var(--gold)] block py-0.5">About Us</Link></li>
            <li><Link to="/plots" className="hover:text-[var(--gold)] block py-0.5">Available Plots</Link></li>
            <li><Link to="/plans" className="hover:text-[var(--gold)] block py-0.5">House Plans</Link></li>
            <li><Link to="/projects/ongoing" className="hover:text-[var(--gold)] block py-0.5">Ongoing Projects</Link></li>
            <li><Link to="/projects/completed" className="hover:text-[var(--gold)] block py-0.5">Completed Projects</Link></li>
            <li><Link to="/gallery" className="hover:text-[var(--gold)] block py-0.5">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-widest">Contact</h4>
          <ul className="space-y-3.5 text-sm text-[var(--cream-2)]/85">
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-[var(--gold)] shrink-0" /> <a href={`tel:${COMPANY.phoneHref}`} className="hover:text-[var(--gold)]">{COMPANY.phone}</a></li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-[var(--gold)] shrink-0" /> <a href={`mailto:${COMPANY.email}`} className="hover:text-[var(--gold)]">{COMPANY.email}</a></li>
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--gold)] shrink-0" /> <span>{COMPANY.address}</span></li>
          </ul>
          <p className="mt-4 text-xs text-[var(--muted-sage)]">{COMPANY.hours}</p>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-widest">Legal</h4>
          <ul className="space-y-2.5 text-sm text-[var(--cream-2)]/85">
            <li><a href="#" className="hover:text-[var(--gold)] block py-0.5">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[var(--gold)] block py-0.5">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-[var(--gold)] block py-0.5">RERA Disclosures</a></li>
          </ul>
        </div>
      </div>
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-[var(--muted-sage)] flex flex-col md:flex-row justify-between gap-3 text-center md:text-left">
        <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
        <span className="italic">Designed with restraint. Built with intent.</span>
      </div>
    </footer>
  );
}

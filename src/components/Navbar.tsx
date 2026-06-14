import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/data";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/plots", label: "Plots" },
  { to: "/plans", label: "House Plans" },
  { to: "/projects/ongoing", label: "Ongoing" },
  { to: "/projects/completed", label: "Completed" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--forest)]/85 border-b border-[var(--gold)]/15">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block w-7 h-7 rounded-sm rotate-45 border border-[var(--gold)] relative">
            <span className="absolute inset-1 bg-[var(--gold)]/80 rounded-[2px]" />
          </span>
          <span className="font-display text-xl tracking-wide text-cream">
            {COMPANY.name}
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`transition-colors ${active ? "text-[var(--gold)]" : "text-cream/80 hover:text-[var(--gold)]"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button asChild variant="gold" size="sm">
            <Link to="/contact">Enquire Now</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-cream"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-[var(--gold)]/15 bg-[var(--forest-2)]">
          <ul className="px-5 py-4 flex flex-col gap-2">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block py-2 ${active ? "text-[var(--gold)]" : "text-cream/85"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Button asChild variant="gold" className="w-full">
                <Link to="/contact" onClick={() => setOpen(false)}>Enquire Now</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

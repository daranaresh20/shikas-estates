import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/data";

const links = [
  { to: "/", label: "Index" },
  { to: "/about", label: "Atelier" },
  { to: "/plots", label: "Plots" },
  { to: "/plans", label: "Plans" },
  { to: "/projects/ongoing", label: "Ongoing" },
  { to: "/projects/completed", label: "Archive" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { role, user, logout } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 border-b border-slate-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1480px] mx-auto container-edge h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span aria-hidden className="relative inline-block w-6 h-6">
            <span className="absolute inset-0 border border-[var(--gold)] rotate-45" />
            <span className="absolute inset-[5px] bg-[var(--gold)] rotate-45" />
          </span>
          <span className="font-display text-2xl tracking-wide text-[var(--cream)]">
            {COMPANY.name}
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8 text-[13px] font-mono tracking-widest uppercase">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`relative transition-colors ${
                    active ? "text-[var(--gold)]" : "text-[var(--cream)]/75 hover:text-[var(--gold)]"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--gold)]" />
                  )}
                </Link>
              </li>
            );
          })}
          {role === "SuperUser" && (
            <li>
              <Link to="/admin" className="text-indigo-600 font-bold hover:text-indigo-800">
                Admin Panel
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {role === "Guest" ? (
            <Button asChild variant="gold-outline" size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--muted-sage)] max-w-[100px] truncate">
                {user?.fullName || user?.email}
              </span>
              <Button onClick={() => logout()} variant="outline" size="sm" className="h-8 py-0">
                Logout
              </Button>
            </div>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-[var(--cream)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-[var(--gold)]/15 bg-[var(--forest-2)]">
          <ul className="container-edge py-6 flex flex-col gap-1 font-mono text-sm uppercase tracking-widest">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block py-3 ${active ? "text-[var(--gold)]" : "text-[var(--cream)]/85"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
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

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", key: "navHome" as const },
  { to: "/about", key: "navAtelier" as const },
  { to: "/plots", key: "navPlots" as const },
  { to: "/plans", key: "navPlans" as const },
  { to: "/projects/ongoing", key: "navOngoing" as const },
  { to: "/projects/completed", key: "navArchive" as const },
  { to: "/gallery", key: "navGallery" as const },
  { to: "/contact", key: "navContact" as const },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { role, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "te" : "en");
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[#faf9f5]/85 border-b border-[#c5a880]/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1480px] mx-auto container-edge h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span aria-hidden className="relative inline-block w-6 h-6">
            <span className="absolute inset-0 border border-[var(--gold)] rotate-45 animate-pulse" />
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
                  {t(l.key)}
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
                {t("navAdminPanel")}
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {/* Beautiful Language Toggle with custom HSL-tailored colors */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 hover:border-[var(--gold)] bg-transparent text-xs font-mono tracking-wider text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--forest)] transition-all duration-300 active:scale-95 cursor-pointer shadow-sm group"
            title="Switch Language / భాషను మార్చండి"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--gold)] group-hover:text-inherit transition-colors" />
            <span className={language === "en" ? "font-bold text-[var(--gold)] group-hover:text-inherit" : "opacity-70"}>EN</span>
            <span className="text-[var(--gold)]/30">/</span>
            <span className={language === "te" ? "font-bold text-[var(--gold)] group-hover:text-inherit" : "opacity-70"}>తెలుగు</span>
          </button>

          <Button asChild variant="gold-outline" size="sm">
            <Link to="/contact">{t("navEnquire")}</Link>
          </Button>

          {role === "Guest" ? (
            <Link to="/auth" className="text-xs text-[var(--muted-sage)] hover:text-slate-800 transition-colors font-mono uppercase tracking-widest pl-2 border-l border-slate-200">
              {t("navAdminAccess")}
            </Link>
          ) : (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <span className="text-xs font-mono text-[var(--muted-sage)] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80">Admin</span>
              <Button onClick={() => logout()} variant="outline" size="sm" className="h-8 py-0">
                {t("navLogout")}
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          {/* Small Language Toggle for Mobile screen beside menu button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[var(--gold)]/30 text-[10px] font-mono tracking-wider text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--forest)] transition-all duration-300 cursor-pointer active:scale-95"
          >
            <Globe className="w-3 h-3 text-[var(--gold)]" />
            <span>{language === "en" ? "తెలుగు" : "EN"}</span>
          </button>

          <button
            aria-label="Toggle menu"
            className="p-2 text-[var(--cream)] z-50 relative min-w-11 min-h-11 flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Slide-over Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-[var(--gold)]/35 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />

        {/* Drawer content */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[380px] bg-[var(--forest)] shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-[var(--gold)]/10 pb-5">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <span aria-hidden className="relative inline-block w-5 h-5">
                  <span className="absolute inset-0 border border-[var(--gold)] rotate-45" />
                  <span className="absolute inset-[4px] bg-[var(--gold)] rotate-45" />
                </span>
                <span className="font-display text-xl tracking-wide text-[var(--cream)]">
                  {COMPANY.name}
                </span>
              </Link>
            </div>

            <ul className="mt-8 flex flex-col gap-1 font-mono text-sm uppercase tracking-widest">
              {links.map((l) => {
                const active = pathname === l.to;
                return (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`block py-3.5 border-b border-[var(--gold)]/5 transition-colors ${
                        active ? "text-[var(--gold)] font-medium pl-2" : "text-[var(--cream)]/75 hover:text-[var(--gold)]"
                      }`}
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--gold)]/10 pt-6">
            {/* Inline Language Selector in Mobile drawer */}
            <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[var(--forest-2)]/40 border border-[var(--gold)]/15">
              <span className="text-xs font-mono text-[var(--cream-2)] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[var(--gold)]" /> Language / భాష
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${language === "en" ? "bg-[var(--gold)] text-[var(--forest)] font-bold" : "text-[var(--cream)]/60"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("te")}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${language === "te" ? "bg-[var(--gold)] text-[var(--forest)] font-bold" : "text-[var(--cream)]/60"}`}
                >
                  తెలుగు
                </button>
              </div>
            </div>

            <Button asChild variant="gold" className="w-full h-12">
              <Link to="/contact" onClick={() => setOpen(false)}>{t("navEnquireNow")}</Link>
            </Button>
            
            {role === "Guest" ? (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="text-center py-2 text-xs font-mono uppercase tracking-widest text-[var(--muted-sage)] hover:text-slate-800"
              >
                {t("navAdminAccess")}
              </Link>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="text-center py-2 text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold"
                >
                  {t("navAdminDashboard")}
                </Link>
                <Button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full h-10"
                >
                  {t("navLogout")}
                </Button>
              </div>
            )}
            
            <div className="text-center text-[10px] text-[var(--muted-sage)] mt-2 font-mono">
              {t("navEstdShort")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

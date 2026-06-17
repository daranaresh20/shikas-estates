import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/data";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/projects/ongoing")({
  head: () => ({
    meta: [
      { title: "Ongoing Projects — Home" },
      { name: "description", content: "Active construction across our latest masterplans, with stage-wise progress and projected handover dates." },
      { property: "og:title", content: "Ongoing Projects — Home" },
      { property: "og:description", content: "Active masterplans currently under construction." },
    ],
  }),
  component: Ongoing,
});

function Ongoing() {
  const ongoing = PROJECTS.filter((p) => p.status === "Ongoing");
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {ongoing.map((p) => (
          <article key={p.id} className="luxe-card rounded-xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl leading-none">{p.name}</h3>
                    <p className="text-xs text-[var(--muted-sage)] flex items-center gap-1 mt-1 font-mono uppercase tracking-wider"><MapPin className="w-3.5 h-3.5" /> {p.location}</p>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest bg-[var(--copper)]/10 border border-[var(--copper)]/30 text-[var(--copper)] px-2.5 py-1 rounded font-mono font-medium self-start">Active Build</span>
                </div>
                <p className="mt-4 text-sm text-[var(--cream-2)]/85 leading-relaxed">{p.description}</p>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-[var(--muted-sage)] mb-2 font-mono uppercase tracking-wider">
                    <span>{p.progress}% Complete</span><span>{p.completion}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--forest)] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-rich)]" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>

                {p.stages && (
                  <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
                    {p.stages.map((s) => (
                      <div key={s.name} className="border border-[var(--gold)]/15 rounded-md p-2.5">
                        <div className="text-[var(--gold)] font-medium leading-none">{s.name}</div>
                        <div className="text-cream mt-1 font-medium">{s.pct}%</div>
                        <div className="text-[var(--muted-sage)] text-[9px] uppercase tracking-widest mt-1 font-mono">{s.status}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.amenities.map((a) => (
                    <span key={a} className="text-[10px] uppercase tracking-wider text-[var(--cream-2)]/85 border border-[var(--gold)]/25 px-2 py-0.5 rounded font-mono">{a}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 border-t border-[var(--gold)]/5 mt-2 flex gap-3">
              <Button variant="gold" size="sm" className="flex-1 h-10 justify-center">View Project</Button>
              <Button variant="gold-outline" size="sm" className="flex-1 h-10 justify-center">Schedule Visit</Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

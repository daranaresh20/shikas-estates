import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/data";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/projects/ongoing")({
  head: () => ({
    meta: [
      { title: "Ongoing Projects — Auralis Estates" },
      { name: "description", content: "Active construction across our latest masterplans, with stage-wise progress and projected handover dates." },
      { property: "og:title", content: "Ongoing Projects — Auralis Estates" },
      { property: "og:description", content: "Active masterplans currently under construction." },
    ],
  }),
  component: Ongoing,
});

function Ongoing() {
  const ongoing = PROJECTS.filter((p) => p.status === "Ongoing");
  return (
    <section className="px-5 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {ongoing.map((p) => (
          <article key={p.id} className="luxe-card rounded-xl overflow-hidden flex flex-col">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <p className="text-sm text-[var(--muted-sage)] flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest bg-[var(--copper)]/20 border border-[var(--copper)]/50 text-[var(--copper)] px-2 py-1 rounded">Under Construction</span>
              </div>
              <p className="mt-3 text-sm text-[var(--cream-2)]/85">{p.description}</p>

              <div className="mt-5">
                <div className="flex justify-between text-xs text-[var(--muted-sage)] mb-2">
                  <span>{p.progress}% Complete</span><span>{p.completion}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--forest)] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-rich)]" style={{ width: `${p.progress}%` }} />
                </div>
              </div>

              {p.stages && (
                <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
                  {p.stages.map((s) => (
                    <div key={s.name} className="border border-[var(--gold)]/15 rounded-md p-3">
                      <div className="text-[var(--gold)]">{s.name}</div>
                      <div className="text-cream mt-1">{s.pct}%</div>
                      <div className="text-[var(--muted-sage)] text-[10px] uppercase tracking-widest mt-1">{s.status}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.amenities.map((a) => (
                  <span key={a} className="text-[11px] uppercase tracking-wider text-[var(--cream-2)]/85 border border-[var(--gold)]/25 px-2 py-0.5 rounded">{a}</span>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="gold" size="sm" className="flex-1">View Project</Button>
                <Button variant="gold-outline" size="sm" className="flex-1">Schedule Visit</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

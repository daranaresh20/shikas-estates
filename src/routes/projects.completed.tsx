import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/data";
import { Check, MapPin } from "lucide-react";

export const Route = createFileRoute("/projects/completed")({
  head: () => ({
    meta: [
      { title: "Completed Projects — Home" },
      { name: "description", content: "Handed-over communities and residences across our portfolio." },
      { property: "og:title", content: "Completed Projects — Home" },
      { property: "og:description", content: "Our delivered communities, on time and on intent." },
    ],
  }),
  component: Completed,
});

function Completed() {
  const done = PROJECTS.filter((p) => p.status === "Completed");
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {done.map((p) => (
          <article key={p.id} className="luxe-card rounded-xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded bg-[var(--gold)] text-[var(--forest)] flex items-center gap-1 font-mono"><Check className="w-3 h-3" /> Completed</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl leading-tight">{p.name}</h3>
                <p className="text-xs text-[var(--muted-sage)] flex items-center gap-1 mt-1 font-mono uppercase tracking-wider"><MapPin className="w-3.5 h-3.5" /> {p.location}</p>
                <p className="text-sm text-[var(--cream-2)]/85 mt-3 line-clamp-3 leading-relaxed">{p.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="border border-[var(--gold)]/15 rounded-md p-2.5">
                    <div className="text-[var(--muted-sage)] font-mono uppercase tracking-wider text-[10px]">Handover</div>
                    <div className="text-cream mt-0.5 font-medium">{p.completion}</div>
                  </div>
                  <div className="border border-[var(--gold)]/15 rounded-md p-2.5">
                    <div className="text-[var(--muted-sage)] font-mono uppercase tracking-wider text-[10px]">Units</div>
                    <div className="text-cream mt-0.5 font-medium">{p.units}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-[10px] uppercase tracking-wider text-[var(--cream-2)]/85 border border-[var(--gold)]/25 px-2 py-0.5 rounded font-mono">{a}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 border-t border-[var(--gold)]/5 mt-2 flex gap-3">
              <Button variant="gold" size="sm" className="flex-1 h-10 justify-center">View Gallery</Button>
              <Button variant="gold-outline" size="sm" className="flex-1 h-10 justify-center">Schedule Visit</Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

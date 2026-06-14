import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/data";
import { Check, MapPin } from "lucide-react";

export const Route = createFileRoute("/projects/completed")({
  head: () => ({
    meta: [
      { title: "Completed Projects — Shika's Estates" },
      { name: "description", content: "Handed-over communities and residences across our portfolio." },
      { property: "og:title", content: "Completed Projects — Shika's Estates" },
      { property: "og:description", content: "Our delivered communities, on time and on intent." },
    ],
  }),
  component: Completed,
});

function Completed() {
  const done = PROJECTS.filter((p) => p.status === "Completed");
  return (
    <section className="px-5 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {done.map((p) => (
          <article key={p.id} className="luxe-card rounded-xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded bg-[var(--gold)] text-[var(--forest)] flex items-center gap-1"><Check className="w-3 h-3" /> Completed</span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="text-sm text-[var(--muted-sage)] flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</p>
              <p className="text-sm text-[var(--cream-2)]/85 mt-3 flex-1">{p.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="border border-[var(--gold)]/15 rounded-md p-2.5">
                  <div className="text-[var(--muted-sage)]">Handover</div>
                  <div className="text-cream mt-0.5">{p.completion}</div>
                </div>
                <div className="border border-[var(--gold)]/15 rounded-md p-2.5">
                  <div className="text-[var(--muted-sage)]">Units</div>
                  <div className="text-cream mt-0.5">{p.units}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.amenities.slice(0, 3).map((a) => (
                  <span key={a} className="text-[11px] uppercase tracking-wider text-[var(--cream-2)]/85 border border-[var(--gold)]/25 px-2 py-0.5 rounded">{a}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Button variant="gold" size="sm" className="flex-1">View Gallery</Button>
                <Button variant="gold-outline" size="sm" className="flex-1">Schedule Visit</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

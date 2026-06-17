import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/projects")({
  component: ProjectsLayout,
});

function ProjectsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Layout>
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-mono">Our Projects</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-2 leading-[1.05]">Our projects portfolio, on view.</h1>
          <div className="mt-8 flex gap-2 border-b border-[var(--gold)]/15">
            {[
              { to: "/projects/ongoing", label: "Ongoing" },
              { to: "/projects/completed", label: "Completed" },
            ].map((t) => {
              const active = pathname === t.to;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`px-4 py-3 text-xs sm:text-sm transition relative font-mono uppercase tracking-wider ${active ? "text-[var(--gold)] font-medium" : "text-cream/70 hover:text-cream"}`}
                >
                  {t.label}
                  {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[var(--gold)]" />}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Outlet />
    </Layout>
  );
}

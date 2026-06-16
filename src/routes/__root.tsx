import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Layout } from "../components/Layout";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-5 py-32 text-center">
        <p className="text-[var(--gold)] text-sm tracking-widest uppercase">404</p>
        <h1 className="font-display text-5xl mt-3">Page not found</h1>
        <p className="mt-4 text-[var(--muted-sage)]">The page you're looking for has moved or never existed.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-6 py-3 text-[var(--forest)] font-medium hover:bg-[var(--gold-rich)] transition">
            Return Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-5 py-32 text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-[var(--muted-sage)]">Please try again, or head back home.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-[var(--gold)] px-6 py-3 text-[var(--forest)] font-medium hover:bg-[var(--gold-rich)]"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-[var(--gold)]/40 px-6 py-3 text-cream hover:bg-[var(--forest-3)]">Go home</a>
        </div>
      </div>
    </Layout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shika Estates — Premium Plots & House Plans" },
      { name: "description", content: "Limited-edition residential plots, bespoke house plans and signature projects from Shika Estates." },
      { name: "author", content: "Shika Estates" },
      { property: "og:title", content: "Shika Estates — Premium Plots & House Plans" },
      { property: "og:description", content: "Limited-edition residential plots, bespoke house plans and signature projects from Shika Estates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shika Estates — Premium Plots & House Plans" },
      { name: "twitter:description", content: "Limited-edition residential plots, bespoke house plans and signature projects from Shika Estates." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/51e848fc-9579-46d2-86cb-30b6629d5fc3/id-preview-8d7d67af--70fb2225-93b6-465b-a582-ad1167486c73.lovable.app-1781439472295.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/51e848fc-9579-46d2-86cb-30b6629d5fc3/id-preview-8d7d67af--70fb2225-93b6-465b-a582-ad1167486c73.lovable.app-1781439472295.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { AuthProvider } from "@/hooks/useAuth";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

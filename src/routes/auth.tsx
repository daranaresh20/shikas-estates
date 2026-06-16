import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Shield, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return toast.error("Please enter email/username");
    
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success(`Welcome back! Logged in as Admin.`);
      navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message || "Invalid admin credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--forest)] via-[var(--forest-2)]/60 to-[var(--forest-3)]/40 pointer-events-none" />
        
        <div className="w-full max-w-sm space-y-6 relative z-10 animate-fade-up">
          <div className="text-center space-y-2">
            <h1 className="font-display text-4xl text-[var(--gold)]">Shika Estates</h1>
            <p className="text-sm font-mono uppercase tracking-widest text-[var(--muted-sage)]">Administrative Access</p>
          </div>

          <Card className="border border-[var(--gold)]/10 shadow-xl bg-white/90 backdrop-blur-md">
            <form onSubmit={handleLogin}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                  <Shield className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl font-display text-slate-800">Admin Sign In</CardTitle>
                <CardDescription>Provide administrator keys to manage system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">Username or Email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="shikaestatesadmin"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-white/50 border-[var(--gold)]/20 focus-visible:ring-[var(--gold)] text-sm"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-white/50 border-[var(--gold)]/20 focus-visible:ring-[var(--gold)] text-sm"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button type="submit" className="w-full bg-[var(--gold)] hover:bg-[var(--gold-rich)] text-white font-mono uppercase tracking-wider text-xs" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Enter Portal"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 text-[10px] font-mono text-slate-600 border border-slate-200">
              <span className={`w-1.5 h-1.5 rounded-full ${supabase ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              Database: {supabase ? "Connected to Supabase" : "Simulation Mode (Offline)"}
            </div>
            <Button variant="link" className="text-[var(--gold)] text-xs flex items-center gap-1 mx-auto" onClick={() => navigate({ to: "/" })}>
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

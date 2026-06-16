import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Shield, User, LogIn, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { login, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return toast.error("Please enter email/username");
    
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success(`Welcome back! Logged in successfully.`);
      navigate({ to: "/" });
    } catch (err) {
      toast.error("Failed to login. Please check email/username and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupName || !signupPhone) {
      return toast.error("Please fill in all fields");
    }
    
    setIsLoading(true);
    try {
      await signUp(signupEmail, signupName, signupPhone);
      toast.success("Welcome to Shika's Estates! Account created successfully.");
      navigate({ to: "/" });
    } catch (err) {
      toast.error("Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--forest)] via-[var(--forest-2)]/60 to-[var(--forest-3)]/40 pointer-events-none" />
        
        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <h1 className="font-display text-4xl text-[var(--gold)]">Shika's Estates</h1>
            <p className="text-sm font-mono uppercase tracking-widest text-[var(--muted-sage)]">Private Member Access</p>
          </div>

          <Card className="border border-[var(--gold)]/10 shadow-xl bg-white/80 backdrop-blur-md">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[var(--forest)]/40 p-1">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-[var(--gold)] data-[state=active]:shadow-sm">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-[var(--gold)] data-[state=active]:shadow-sm">
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle className="text-xl font-display text-slate-800">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">Email or Username</Label>
                      <Input
                        id="email"
                        type="text"
                        placeholder="you@example.com or shikaestatesadmin"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="bg-white/50 border-[var(--gold)]/20 focus-visible:ring-[var(--gold)]"
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
                        className="bg-white/50 border-[var(--gold)]/20 focus-visible:ring-[var(--gold)]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button type="submit" className="w-full bg-[var(--gold)] hover:bg-[var(--gold-rich)] text-white" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Continue"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignup}>
                  <CardHeader>
                    <CardTitle className="text-xl font-display text-slate-800">Request Invitation</CardTitle>
                    <CardDescription>Register to unlock premium listings and project updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="fullname" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">Full Name</Label>
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="bg-white/50 border-[var(--gold)]/20"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="signup-email" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">Email Address</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="bg-white/50 border-[var(--gold)]/20"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">WhatsApp / Mobile Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="bg-white/50 border-[var(--gold)]/20"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[var(--gold)] hover:bg-[var(--gold-rich)] text-white" disabled={isLoading}>
                      {isLoading ? "Registering..." : "Submit Registration"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="text-center">
            <Button variant="link" className="text-[var(--gold)] text-xs flex items-center gap-1 mx-auto" onClick={() => navigate({ to: "/" })}>
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website as Guest
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

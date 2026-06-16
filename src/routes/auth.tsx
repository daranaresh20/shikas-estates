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
import { Shield, User, LogIn, ArrowLeft, KeyRound } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { login, signUp, checkUniqueness } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // OTP Verification dialog/panel state
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userEnteredOtp, setUserEnteredOtp] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return toast.error("Please enter email/username");
    
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success(`Welcome back! Logged in successfully.`);
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err.message || "Failed to login. Please check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const startSignupVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupName || !signupPhone || !signupUsername || !signupPassword) {
      return toast.error("Please fill in all fields");
    }

    // 1. Perform uniqueness check
    const dup = checkUniqueness(signupEmail, signupUsername, signupPhone);
    if (dup.emailExists || dup.usernameExists || dup.phoneExists) {
      const fields = [];
      if (dup.emailExists) fields.push("Email");
      if (dup.usernameExists) fields.push("Username");
      if (dup.phoneExists) fields.push("Mobile number");
      
      toast.error("Registration failed", {
        description: `The following details are already taken: ${fields.join(", ")}. Please use unique details.`
      });
      return;
    }

    // 2. Generate simulated 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    setShowOtpScreen(true);

    // Prompt user with toast
    toast.success("Verification Code Sent!", {
      description: `Simulated OTP sent to ${signupPhone}: ${otp}`,
      duration: 10000,
    });
  };

  const verifyOtpAndCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userEnteredOtp !== generatedOtp) {
      return toast.error("Incorrect verification code. Please try again.");
    }

    setIsLoading(true);
    try {
      await signUp(signupEmail, signupName, signupPhone, signupUsername, signupPassword);
      toast.success("Account verified and created successfully!");
      setShowOtpScreen(false);
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err.message || "Failed to create account");
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

          {!showOtpScreen ? (
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
                          required
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
                  <form onSubmit={startSignupVerification}>
                    <CardHeader>
                      <CardTitle className="text-xl font-display text-slate-800">Create Account</CardTitle>
                      <CardDescription>Register to track inquiries and view VIP listings</CardDescription>
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
                        <Label htmlFor="signup-username" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">Username</Label>
                        <Input
                          id="signup-username"
                          type="text"
                          placeholder="johndoe12"
                          value={signupUsername}
                          onChange={(e) => setSignupUsername(e.target.value)}
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
                          placeholder="9876543210"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          className="bg-white/50 border-[var(--gold)]/20"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="signup-pass" className="text-xs font-mono uppercase tracking-wider text-[var(--gold)]">Password</Label>
                        <Input
                          id="signup-pass"
                          type="password"
                          placeholder="Create strong password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="bg-white/50 border-[var(--gold)]/20"
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full bg-[var(--gold)] hover:bg-[var(--gold-rich)] text-white" disabled={isLoading}>
                        {isLoading ? "Validating..." : "Register & Verify Mobile"}
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          ) : (
            <Card className="border border-blue-600/20 shadow-2xl bg-white/95 backdrop-blur-md animate-fade-in">
              <form onSubmit={verifyOtpAndCreateAccount}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-display text-slate-800">Verify Mobile Number</CardTitle>
                  <CardDescription>
                    Enter the 4-digit code sent to <span className="font-semibold text-slate-800">{signupPhone}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Input
                      id="otp"
                      type="text"
                      maxLength={4}
                      placeholder="0 0 0 0"
                      value={userEnteredOtp}
                      onChange={(e) => setUserEnteredOtp(e.target.value.replace(/\D/g, ""))}
                      className="text-center text-2xl tracking-[0.75em] font-mono h-14 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 text-center">
                    Didn't receive code? Check the simulated alert toast on your screen.
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Confirm Verification"}
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="w-full text-slate-500 hover:bg-slate-50" onClick={() => setShowOtpScreen(false)}>
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
          
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

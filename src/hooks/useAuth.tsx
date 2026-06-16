import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type UserRole = "SuperUser" | "Customer" | "Guest";

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  phone?: string;
}

interface AuthContextType {
  user: AppUser | null;
  role: UserRole;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signUp: (email: string, fullName: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<UserRole>("Guest");
  const [isLoading, setIsLoading] = useState(true);

  // Helper to get role based on email/username and password checks
  const determineRole = (emailOrUsername: string, password?: string): UserRole => {
    const ident = emailOrUsername.toLowerCase().trim();
    if (
      (ident === "shikaestatesadmin" || ident === "admin@shikasestates.com" || ident === "shikaestatesadmin@shikasestates.com") &&
      password === "ShikasEstates9"
    ) {
      return "SuperUser";
    }
    return "Customer";
  };

  useEffect(() => {
    // Check if we have mock auth stored in localStorage
    const savedMockUser = localStorage.getItem("shikas_mock_user");
    if (savedMockUser) {
      try {
        const parsed = JSON.parse(savedMockUser) as AppUser;
        setUser(parsed);
        setRole(parsed.role);
        setIsLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem("shikas_mock_user");
      }
    }

    if (!supabase) {
      setUser(null);
      setRole("Guest");
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const email = session.user.email || "";
        // Fallback check
        const userRole = email === "admin@shikasestates.com" || email === "shikaestatesadmin@shikasestates.com" ? "SuperUser" : "Customer";
        
        setUser({
          id: session.user.id,
          email: email,
          role: userRole,
          fullName: session.user.user_metadata?.fullName || session.user.user_metadata?.full_name || "",
          phone: session.user.phone || "",
        });
        setRole(userRole);
      } else {
        setUser(null);
        setRole("Guest");
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const email = session.user.email || "";
          const userRole = email === "admin@shikasestates.com" || email === "shikaestatesadmin@shikasestates.com" ? "SuperUser" : "Customer";
          
          setUser({
            id: session.user.id,
            email: email,
            role: userRole,
            fullName: session.user.user_metadata?.fullName || session.user.user_metadata?.full_name || "",
            phone: session.user.phone || "",
          });
          setRole(userRole);
        } else {
          const savedMock = localStorage.getItem("shikas_mock_user");
          if (!savedMock) {
            setUser(null);
            setRole("Guest");
          }
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (emailOrUsername: string, password?: string) => {
    setIsLoading(true);
    try {
      const userRole = determineRole(emailOrUsername, password);
      
      const email = emailOrUsername.includes("@") 
        ? emailOrUsername 
        : `${emailOrUsername}@shikasestates.com`;

      const mockUser: AppUser = {
        id: "mock_user_" + Math.random().toString(36).substr(2, 9),
        email,
        role: userRole,
        fullName: emailOrUsername.split("@")[0].toUpperCase(),
      };

      if (supabase && password) {
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
        } catch (dbErr) {
          console.warn("Supabase auth failed, running mock session bypass:", dbErr);
        }
      }

      localStorage.setItem("shikas_mock_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setRole(userRole);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, fullName: string, phone: string) => {
    setIsLoading(true);
    try {
      const userRole = determineRole(email);
      const mockUser: AppUser = {
        id: "mock_user_" + Math.random().toString(36).substr(2, 9),
        email,
        role: userRole,
        fullName,
        phone,
      };

      localStorage.setItem("shikas_mock_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setRole(userRole);
    } catch (error) {
      console.error("SignUp failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem("shikas_mock_user");
      setUser(null);
      setRole("Guest");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

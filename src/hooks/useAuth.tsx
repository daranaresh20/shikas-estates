import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type UserRole = "SuperUser" | "Guest";

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

interface AuthContextType {
  user: AppUser | null;
  role: UserRole;
  isLoading: boolean;
  login: (emailOrUsername: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<UserRole>("Guest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we have mock auth stored in localStorage
    const savedMockUser = localStorage.getItem("shikas_mock_user");
    if (savedMockUser) {
      try {
        const parsed = JSON.parse(savedMockUser) as AppUser;
        if (parsed.role === "SuperUser") {
          setUser(parsed);
          setRole("SuperUser");
        } else {
          localStorage.removeItem("shikas_mock_user");
        }
      } catch (e) {
        localStorage.removeItem("shikas_mock_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrUsername: string, password?: string) => {
    setIsLoading(true);
    try {
      const ident = emailOrUsername.toLowerCase().trim();
      let authenticatedUser: AppUser | null = null;

      // 1. Try real Supabase auth if connected
      if (supabase && password) {
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: ident,
            password: password,
          });

          if (!authError && authData.user) {
            const userEmail = authData.user.email || ident;
            
            // Query the user's role from user_roles
            const { data: roleData } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", authData.user.id)
              .maybeSingle();

            // Check if the role is 'admin'
            if (roleData && roleData.role === "admin") {
              authenticatedUser = {
                id: authData.user.id,
                email: userEmail,
                role: "SuperUser",
                fullName: authData.user.user_metadata?.full_name || "Admin User",
              };
            }
          }
        } catch (dbErr) {
          console.warn("Supabase auth check failed, falling back to mock check:", dbErr);
        }
      }

      if (authenticatedUser) {
        localStorage.setItem("shikas_mock_user", JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        setRole("SuperUser");
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
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

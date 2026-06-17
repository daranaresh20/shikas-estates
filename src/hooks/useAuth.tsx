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
      
      // Strict Admin credentials check
      if (
        (ident === "shikasadmin" || ident === "admin@shikas.online") &&
        password === "ShikaEstates9"
      ) {
        const adminUser: AppUser = {
          id: "admin_user_id",
          email: "admin@shikas.online",
          role: "SuperUser",
          fullName: "Shika Admin",
        };

        if (supabase && password) {
          try {
            await supabase.auth.signInWithPassword({
              email: "admin@shikas.online",
              password,
            });
          } catch (dbErr) {
            console.warn("Supabase admin login bypass:", dbErr);
          }
        }

        localStorage.setItem("shikas_mock_user", JSON.stringify(adminUser));
        setUser(adminUser);
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

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
  login: (email: string, password?: string, role?: UserRole) => Promise<void>;
  signUp: (email: string, fullName: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<UserRole>("Guest");
  const [isLoading, setIsLoading] = useState(true);

  // Helper to get role based on email or setting
  const getRoleFromEmail = (email: string): UserRole => {
    if (email.endsWith("@shikasestates.com") || email === "admin@shikasestates.com") {
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
      // No Supabase, default to Guest
      setUser(null);
      setRole("Guest");
      setIsLoading(false);
      return;
    }

    // Handle Supabase Auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const email = session.user.email || "";
        const userRole = getRoleFromEmail(email);
        
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
          const userRole = getRoleFromEmail(email);
          
          setUser({
            id: session.user.id,
            email: email,
            role: userRole,
            fullName: session.user.user_metadata?.fullName || session.user.user_metadata?.full_name || "",
            phone: session.user.phone || "",
          });
          setRole(userRole);
        } else {
          // Keep mock user check in case auth state cleared but mock user exists
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

  const login = async (email: string, password?: string, forceRole?: UserRole) => {
    setIsLoading(true);
    try {
      // Determine role
      let userRole = forceRole || getRoleFromEmail(email);

      // Explicit Admin Check
      if (
        (email.toLowerCase() === "shikaestatesadmin" || email.toLowerCase() === "admin@shikasestates.com") &&
        password === "ShikasEstates9"
      ) {
        userRole = "SuperUser";
      }
      
      const mockUser: AppUser = {
        id: "mock_user_" + Math.random().toString(36).substr(2, 9),
        email: email.includes("@") ? email : `${email}@shikasestates.com`,
        role: userRole,
        fullName: email.split("@")[0].toUpperCase(),
      };

      // Try actual Supabase login if configured
      if (supabase && password) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.includes("@") ? email : `${email}@shikasestates.com`,
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
      const userRole = getRoleFromEmail(email);
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

  const updateUserRole = (newRole: UserRole) => {
    if (user) {
      const updated = { ...user, role: newRole };
      localStorage.setItem("shikas_mock_user", JSON.stringify(updated));
      setUser(updated);
      setRole(newRole);
    } else if (newRole === "Guest") {
      logout();
    } else {
      // Create guest transitioning to role
      login("simulated_user@shikasestates.com", newRole);
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
        updateUserRole,
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

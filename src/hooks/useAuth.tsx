import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type UserRole = "SuperUser" | "Customer" | "Guest";

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  phone?: string;
  username?: string;
  password?: string;
}

interface AuthContextType {
  user: AppUser | null;
  role: UserRole;
  isLoading: boolean;
  login: (emailOrUsername: string, password?: string) => Promise<void>;
  signUp: (email: string, fullName: string, phone: string, username: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  checkUniqueness: (email: string, username: string, phone: string) => { emailExists: boolean; usernameExists: boolean; phoneExists: boolean };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<UserRole>("Guest");
  const [isLoading, setIsLoading] = useState(true);

  // Helper to determine role
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

  // Get all registered users from mock DB
  const getRegisteredUsers = (): AppUser[] => {
    const saved = localStorage.getItem("shikas_registered_users");
    if (!saved) {
      // Add default Admin user to database
      const defaultAdmin: AppUser = {
        id: "admin_user_id",
        email: "admin@shikasestates.com",
        username: "shikaestatesadmin",
        password: "ShikasEstates9",
        role: "SuperUser",
        fullName: "Shika Admin",
        phone: "+919177686822",
      };
      localStorage.setItem("shikas_registered_users", JSON.stringify([defaultAdmin]));
      return [defaultAdmin];
    }
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  };

  const checkUniqueness = (email: string, username: string, phone: string) => {
    const users = getRegisteredUsers();
    return {
      emailExists: users.some((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()),
      usernameExists: users.some((u) => u.username?.toLowerCase().trim() === username.toLowerCase().trim()),
      phoneExists: users.some((u) => u.phone?.trim() === phone.trim()),
    };
  };

  useEffect(() => {
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
      const ident = emailOrUsername.toLowerCase().trim();

      // Check registered users for credentials match
      const users = getRegisteredUsers();
      const matchedUser = users.find(
        (u) => 
          (u.email.toLowerCase().trim() === ident || u.username?.toLowerCase().trim() === ident) && 
          u.password === password
      );

      if (!matchedUser && userRole !== "SuperUser") {
        throw new Error("Invalid username or password");
      }

      const activeUser = matchedUser || {
        id: "mock_user_" + Math.random().toString(36).substr(2, 9),
        email: emailOrUsername.includes("@") ? emailOrUsername : `${emailOrUsername}@shikasestates.com`,
        role: userRole,
        fullName: emailOrUsername.split("@")[0].toUpperCase(),
      };

      if (supabase && password) {
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: activeUser.email,
            password,
          });
          if (error) throw error;
        } catch (dbErr) {
          console.warn("Supabase login bypass:", dbErr);
        }
      }

      localStorage.setItem("shikas_mock_user", JSON.stringify(activeUser));
      setUser(activeUser);
      setRole(activeUser.role);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, fullName: string, phone: string, username: string, password?: string) => {
    setIsLoading(true);
    try {
      // 1. Uniqueness check
      const dup = checkUniqueness(email, username, phone);
      if (dup.emailExists || dup.usernameExists || dup.phoneExists) {
        const errors = [];
        if (dup.emailExists) errors.push("email");
        if (dup.usernameExists) errors.push("username");
        if (dup.phoneExists) errors.push("phone number");
        throw new Error(`The following details are already taken: ${errors.join(", ")}`);
      }

      // 2. Determine role
      const userRole = determineRole(username, password);
      
      const newUser: AppUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        username,
        password,
        role: userRole,
        fullName,
        phone,
      };

      // 3. Save to registered database
      const users = getRegisteredUsers();
      users.push(newUser);
      localStorage.setItem("shikas_registered_users", JSON.stringify(users));

      // 4. Try Supabase signUp if active
      if (supabase && password) {
        try {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                fullName,
                phone,
                username,
              }
            }
          });
          if (error) throw error;
        } catch (dbErr) {
          console.warn("Supabase signup bypass:", dbErr);
        }
      }

      localStorage.setItem("shikas_mock_user", JSON.stringify(newUser));
      setUser(newUser);
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
        checkUniqueness,
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

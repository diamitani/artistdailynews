"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "Artist" | "Manager" | "Producer" | "Label" | "Press";
export type MembershipTier = "free" | "pro_insider" | "enterprise";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tier: MembershipTier;
  avatarUrl: string;
  savedArticleIds: string[];
  topicsOfInterest: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, role?: UserRole) => void;
  logout: () => void;
  upgradeTier: (tier: MembershipTier) => void;
  toggleSaveArticle: (articleId: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  id: "user-demo-01",
  email: "artist@adn.media",
  name: "Jordan Hayes",
  role: "Artist",
  tier: "free",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  savedArticleIds: ["art-01", "art-02"],
  topicsOfInterest: ["financial", "streaming", "opportunities"],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);

  useEffect(() => {
    const saved = localStorage.getItem("adn-user-session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveUserSession = (updatedUser: UserProfile | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("adn-user-session", JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem("adn-user-session");
    }
  };

  const login = (email: string, name?: string, role?: UserRole) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      name: name || email.split("@")[0],
      role: role || "Artist",
      tier: "free",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      savedArticleIds: ["art-01"],
      topicsOfInterest: ["financial", "streaming"],
    };
    saveUserSession(newUser);
  };

  const logout = () => {
    saveUserSession(null);
  };

  const upgradeTier = (tier: MembershipTier) => {
    if (user) {
      const updated = { ...user, tier };
      saveUserSession(updated);
    }
  };

  const toggleSaveArticle = (articleId: string) => {
    if (user) {
      const isSaved = user.savedArticleIds.includes(articleId);
      const newSaved = isSaved
        ? user.savedArticleIds.filter((id) => id !== articleId)
        : [...user.savedArticleIds, articleId];
      const updated = { ...user, savedArticleIds: newSaved };
      saveUserSession(updated);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updates };
      saveUserSession(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        upgradeTier,
        toggleSaveArticle,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

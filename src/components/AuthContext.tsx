"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

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
  isLoading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: "google" | "spotify") => Promise<void>;
  signUp: (email: string, password: string, name?: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  upgradeTier: (tier: MembershipTier) => Promise<void>;
  toggleSaveArticle: (articleId: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Fetch profile from Supabase
  const fetchProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) throw error;

      if (profile) {
        // Fetch saved articles
        const { data: savedArticles } = await supabase
          .from("user_saved_articles")
          .select("article_id")
          .eq("user_id", authUser.id);

        const userProfile: UserProfile = {
          id: profile.id,
          email: profile.email,
          name: profile.name || authUser.email?.split("@")[0] || "User",
          role: profile.role as UserRole,
          tier: profile.tier as MembershipTier,
          avatarUrl: profile.avatar_url || "",
          savedArticleIds: savedArticles?.map((a) => a.article_id) || [],
          topicsOfInterest: profile.topics_of_interest || [],
        };

        setUser(userProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          await fetchProfile(session.user);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signInWithOAuth = async (provider: "google" | "spotify") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const signUp = async (
    email: string,
    password: string,
    name?: string,
    role?: UserRole
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split("@")[0],
          role: role || "Artist",
        },
      },
    });
    if (error) throw error;

    // Profile will be created automatically via database trigger
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const upgradeTier = async (tier: MembershipTier) => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ tier })
      .eq("id", user.id);

    if (error) throw error;

    setUser({ ...user, tier });
  };

  const toggleSaveArticle = async (articleId: string) => {
    if (!user) return;

    const isSaved = user.savedArticleIds.includes(articleId);

    if (isSaved) {
      // Remove from saved
      const { error } = await supabase
        .from("user_saved_articles")
        .delete()
        .eq("user_id", user.id)
        .eq("article_id", articleId);

      if (error) throw error;

      setUser({
        ...user,
        savedArticleIds: user.savedArticleIds.filter((id) => id !== articleId),
      });
    } else {
      // Add to saved
      const { error } = await supabase
        .from("user_saved_articles")
        .insert({ user_id: user.id, article_id: articleId });

      if (error) throw error;

      setUser({
        ...user,
        savedArticleIds: [...user.savedArticleIds, articleId],
      });
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        name: updates.name,
        role: updates.role,
        avatar_url: updates.avatarUrl,
        topics_of_interest: updates.topicsOfInterest,
      })
      .eq("id", user.id);

    if (error) throw error;

    setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signInWithPassword,
        signInWithOAuth,
        signUp,
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

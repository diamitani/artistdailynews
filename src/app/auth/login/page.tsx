"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithPassword, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithPassword(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "spotify") => {
    try {
      await signInWithOAuth(provider);
    } catch (err: any) {
      setError(err.message || "Failed to sign in with OAuth");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#090A0F] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#121420] border border-[#272B3F] rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#D4FF00] to-emerald-400 flex items-center justify-center text-black font-black text-lg">
              A
            </div>
            <span className="font-black text-xl text-white tracking-tight">
              ARTIST DAILY <span className="text-[#D4FF00]">NEWS</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white pt-2">Sign in to ADN Terminal</h2>
          <p className="text-xs text-slate-400 font-mono">
            Access your saved intelligence, release roadmap & VIP briefings
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleOAuth("spotify")}
            type="button"
            className="w-full bg-[#1DB954] hover:bg-[#1aa34a] text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-transform active:scale-98 shadow"
          >
            <span>Continue with Spotify for Artists</span>
          </button>

          <button
            onClick={() => handleOAuth("google")}
            type="button"
            className="w-full bg-[#1C1E2D] hover:bg-slate-800 text-white font-medium text-xs py-2.5 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <div className="flex-1 h-px bg-slate-800" />
          <span>OR SIGN IN WITH EMAIL</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-xs font-mono">
              <label className="text-slate-400">Password</label>
              <a href="#" className="text-[#D4FF00] hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-transform active:scale-98 flex items-center justify-center space-x-1.5 shadow-lg shadow-[#D4FF00]/15"
          >
            <span>{loading ? "Authenticating..." : "Sign In & Enter Terminal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400 font-mono">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#D4FF00] hover:underline font-bold">
            Create Free Account
          </Link>
        </div>

      </div>
    </div>
  );
}

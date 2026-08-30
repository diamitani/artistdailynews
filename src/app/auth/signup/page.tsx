"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp(email, password, name || "Independent Creator", "Artist");
      // Show success message and redirect
      router.push("/auth/verify-email");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#090A0F] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#121420] border border-[#272B3F] rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#D4FF00] to-emerald-400 flex items-center justify-center text-black font-black text-lg">
              A
            </div>
            <span className="font-black text-xl text-white tracking-tight">
              ARTIST DAILY <span className="text-[#D4FF00]">NEWS</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white pt-2">Join the 35k+ Creator Network</h2>
          <p className="text-xs text-slate-400 font-mono">
            Get your free intelligence account and customized daily news feed
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Artist / Professional Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                placeholder="e.g. Maya Lin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                placeholder="artist@yourdomain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                placeholder="Create a strong password"
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
            <span>{loading ? "Creating Account..." : "Create Account & Customize Feed"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400 font-mono">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#D4FF00] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

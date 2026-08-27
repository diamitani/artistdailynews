"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/components/AuthContext";
import { CATEGORIES } from "@/lib/feeds-config";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>(user?.role || "Artist");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["financial", "streaming", "opportunities"]);

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: "Artist", title: "Independent Artist", desc: "Self-releasing singer, rapper, band, or instrumentalist." },
    { role: "Manager", title: "Artist Manager", desc: "Managing roster strategy, streaming data, and deal flow." },
    { role: "Producer", title: "Producer / Engineer", desc: "Beatmaker, mix/master engineer, or studio owner." },
    { role: "Label", title: "Indie Label Exec", desc: "A&R, catalogue acquisitions, and distribution operations." },
    { role: "Press", title: "Music Journalist", desc: "Covering live festivals, concert photo pits, and reviews." },
  ];

  const toggleTopic = (slug: string) => {
    setSelectedTopics((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleFinish = () => {
    updateProfile({
      role: selectedRole,
      topicsOfInterest: selectedTopics,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#090A0F] py-12">
      <div className="w-full max-w-2xl bg-[#121420] border border-[#272B3F] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
        
        <div className="text-center space-y-2">
          <span className="bg-[#D4FF00]/10 text-[#D4FF00] font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#D4FF00]/20">
            STEP 1 OF 1 // PERSONALIZE YOUR FEED
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            What is your primary music business role?
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            This calibrates your daily AI takeaway synthesis and grant opportunity alerts.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles.map((r) => {
            const isSelected = selectedRole === r.role;
            return (
              <div
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                  isSelected
                    ? "bg-[#181B2B] border-[#D4FF00] shadow-lg shadow-[#D4FF00]/10"
                    : "bg-[#0E1018] border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? "bg-[#D4FF00] border-[#D4FF00] text-black" : "border-slate-600"
                }`}>
                  {isSelected && <div className="w-2 h-2 bg-black rounded-full" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{r.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Topics of Interest */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Select Channels to Pin to Your Dashboard:
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedTopics.includes(cat.slug);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleTopic(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? "bg-[#D4FF00] text-black font-bold shadow"
                      : "bg-[#0E1018] text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>{cat.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleFinish}
          className="w-full bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-transform active:scale-98 flex items-center justify-center space-x-2 shadow-xl shadow-[#D4FF00]/15"
        >
          <span>Complete Setup & Enter Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}

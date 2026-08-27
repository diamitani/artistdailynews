"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Sparkles, Download, RotateCcw, ListChecks, Calendar, Rocket } from "lucide-react";

interface TaskItem {
  id: string;
  week: string;
  title: string;
  description: string;
  category: "DSP & Metadata" | "Content & TikTok" | "Marketing & Ads" | "PR & Pitching";
  completed: boolean;
}

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: "t1",
    week: "6 Weeks Out",
    title: "Master WAV Delivery & ISRC Verification",
    description: "Export 24-bit 44.1kHz WAVs with embedded ISRC codes and upload to distributor (DistroKid/Symphonic/TuneCore).",
    category: "DSP & Metadata",
    completed: false,
  },
  {
    id: "t2",
    week: "4 Weeks Out",
    title: "Spotify for Artists Editorial Pitch",
    description: "Submit official 500-word pitch in Spotify for Artists dashboard at least 21 days prior to ensure Release Radar indexing.",
    category: "DSP & Metadata",
    completed: false,
  },
  {
    id: "t3",
    week: "3 Weeks Out",
    title: "Seed 15 Micro-Creators with 7-Second Sound Hook",
    description: "Send early stems & 7-second audio loop to targeted TikTok and Reels creators for organic pre-release sound adds.",
    category: "Content & TikTok",
    completed: false,
  },
  {
    id: "t4",
    week: "2 Weeks Out",
    title: "Launch Meta Advantage+ Pre-Save Ad Funnel",
    description: "Set up $5/day Meta conversion ads driving traffic to a streamlined Feature.fm or Hypeddit pre-save landing page.",
    category: "Marketing & Ads",
    completed: false,
  },
  {
    id: "t5",
    week: "1 Week Out",
    title: "Submit ADN Press Pass & Media Pitch",
    description: "Send official EPK, high-res press photos, and private streaming link to indie blogs, tastemakers, and ADN Editorial.",
    category: "PR & Pitching",
    completed: false,
  },
  {
    id: "t6",
    week: "Release Day (0h)",
    title: "Blast Newsletter & Activate Spotify Marquee",
    description: "Send broadcast email to subscriber list, post release reel across all channels, and launch Spotify Marquee pop-up.",
    category: "Marketing & Ads",
    completed: false,
  },
];

export function ReleaseChecklistTool() {
  const [tasks, setTasks] = useState<TaskItem[]>(DEFAULT_TASKS);
  const [releaseTitle, setReleaseTitle] = useState("My Upcoming Single");
  const [releaseDate, setReleaseDate] = useState("2026-10-15");

  useEffect(() => {
    const saved = localStorage.getItem("adn-release-checklist");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    localStorage.setItem("adn-release-checklist", JSON.stringify(updated));
  };

  const resetTasks = () => {
    setTasks(DEFAULT_TASKS);
    localStorage.setItem("adn-release-checklist", JSON.stringify(DEFAULT_TASKS));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  const categoryColor = (cat: string) => {
    switch (cat) {
      case "DSP & Metadata": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Content & TikTok": return "bg-pink-500/10 text-pink-400 border-pink-500/30";
      case "Marketing & Ads": return "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/30";
      case "PR & Pitching": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default: return "bg-slate-800 text-slate-300";
    }
  };

  return (
    <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[#D4FF00] text-xs font-mono font-bold uppercase tracking-wider">
            <Rocket className="w-4 h-4" />
            <span>Interactive Release Blueprint</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            6-Week Algorithmic Pre-Release Roadmap
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Follow the exact sequence top independent labels use to trigger Release Radar & Discover Weekly
          </p>
        </div>

        {/* Progress Bar & Reset */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-white">
              {completedCount} / {tasks.length} Complete ({progressPct}%)
            </div>
            <div className="w-36 h-2 bg-slate-800 rounded-full overflow-hidden mt-1.5">
              <div
                style={{ width: `${progressPct}%` }}
                className="h-full bg-gradient-to-r from-[#D4FF00] to-emerald-400 rounded-full transition-all duration-300"
              />
            </div>
          </div>

          <button
            onClick={resetTasks}
            title="Reset Checklist"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 ${
              task.completed
                ? "bg-emerald-950/20 border-emerald-500/30 opacity-80"
                : "bg-[#161826] border-slate-800 hover:border-slate-700"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task.id);
              }}
              className="mt-0.5 text-slate-400 hover:text-[#D4FF00] transition-colors shrink-0"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-[#D4FF00] font-bold">{task.week}</span>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${categoryColor(task.category)}`}>
                  {task.category}
                </span>
              </div>

              <h4 className={`text-sm font-bold ${task.completed ? "text-slate-300 line-through" : "text-white"}`}>
                {task.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
        <span>Checklist progress is saved automatically in your browser.</span>
        <button
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "adn-release-roadmap.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
          className="text-[#D4FF00] hover:underline font-bold flex items-center space-x-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Roadmap JSON</span>
        </button>
      </div>

    </div>
  );
}

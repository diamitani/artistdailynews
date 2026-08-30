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
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const getCategoryColor = (cat: TaskItem["category"]) => {
    switch (cat) {
      case "DSP & Metadata": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Content & TikTok": return "bg-pink-100 text-pink-800 border-pink-200";
      case "Marketing & Ads": return "bg-purple-100 text-purple-800 border-purple-200";
      case "PR & Pitching": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="card-brand p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider">
            <ListChecks className="w-4 h-4" />
            <span>Interactive Strategy Blueprint</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            6-Week Algorithmic Release Countdown
          </h2>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Execute the exact 42-day cadence used by top independent labels to trigger Spotify editorial indexing.
          </p>
        </div>

        {/* Progress Display */}
        <div className="flex items-center space-x-4 bg-[var(--bg-secondary)] px-4 py-2.5 rounded-xl border border-[var(--border-color)]">
          <div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Readiness Score</div>
            <div className="text-lg font-bold text-[var(--text-primary)] font-mono">{progressPercent}% Completed</div>
          </div>
          <div className="w-24 h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent-primary)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <button
            onClick={resetTasks}
            title="Reset Checklist"
            className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Task List Items */}
      <div className="space-y-3">
        {tasks.map((task) => {
          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3.5 select-none ${
                task.completed
                  ? "bg-[var(--bg-secondary)]/50 border-[var(--border-color)] opacity-75"
                  : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 hover:shadow-sm"
              }`}
            >
              <button className="mt-0.5 shrink-0 text-[var(--accent-primary)]">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 fill-current text-[var(--accent-primary)]" />
                ) : (
                  <Circle className="w-5 h-5 text-[var(--text-muted)]" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-[var(--bg-secondary)] text-[var(--text-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                    {task.week}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCategoryColor(task.category)}`}>
                    {task.category}
                  </span>
                  <h4 className={`font-serif text-sm font-bold ${task.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>
                    {task.title}
                  </h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {task.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

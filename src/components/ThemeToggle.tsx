"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("adn-theme");
    if (saved === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("adn-theme", "dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("adn-theme", "light");
      setIsLight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
      aria-label="Toggle visual theme"
      className="p-2 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors border border-slate-800"
    >
      {isLight ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-yellow-400" />}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink/5 bg-void/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a
          href="#hero"
          className="font-display text-[15px] tracking-tight text-pearl"
        >
          Ruttvik&nbsp;Aron
        </a>
        <div className="flex items-center gap-6">
          <span className="kicker hidden text-fog/70 sm:inline">
            Design&nbsp;System&nbsp;Intelligence&nbsp;Engine
          </span>
          <span className="kicker text-accent-primary">2026</span>
          <button
            type="button"
            aria-label="Toggle light/dark theme"
            onClick={() => {
              const dark = document.documentElement.classList.toggle("dark");
              try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-pearl transition-colors hover:bg-ink/10"
          >
            <Sun className="hidden h-4 w-4 dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
}

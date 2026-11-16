"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "lumiere-theme";
const options: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: "light", label: "Light", icon: "☼" },
  { mode: "dark", label: "Dark", icon: "☾" },
  { mode: "system", label: "System", icon: "◐" },
];

const listeners = new Set<() => void>();

function readMode(): ThemeMode {
  const mode = document.documentElement.dataset.theme;
  return mode === "dark" || mode === "system" ? mode : "light";
}

function applyTheme(mode: ThemeMode) {
  const isDark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = mode;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (readMode() === "system") applyTheme("system");
  };
  media.addEventListener("change", onSystemChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
  };
}

export default function ThemeToggle() {
  // Server render and hydration use "light"; the real mode is read after hydration (no mismatch).
  const mode = useSyncExternalStore(subscribe, readMode, () => "light" as ThemeMode);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.mode === mode) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectMode = (nextMode: ThemeMode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {}
    applyTheme(nextMode);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Theme: ${current.label}`}
        title={`Theme: ${current.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full px-2 py-2 text-sm hover:bg-blush hover:text-rose-ink sm:px-3 ${open ? "bg-blush text-rose-ink" : ""}`}
      >
        <span aria-hidden="true" className="w-5 text-center text-[18px] leading-none">{current.icon}</span>
        <span className="hidden lg:inline">Theme</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-md border border-line bg-surface p-1 shadow-xl">
          {options.map((option) => (
            <button
              type="button"
              role="menuitemradio"
              aria-checked={mode === option.mode}
              key={option.mode}
              onClick={() => selectMode(option.mode)}
              className={`flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm ${mode === option.mode ? "bg-blush font-bold text-rose-ink" : "text-ink hover:bg-blush-soft"}`}
            >
              <span aria-hidden="true" className="w-4 text-center">{option.icon}</span>
              <span className="flex-1">{option.label}</span>
              {mode === option.mode && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

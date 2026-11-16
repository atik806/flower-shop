"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";

export default function AccountPage() {
  const [message, setMessage] = useState("");
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line px-5 py-5">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between">
          <Link href="/" className="display-font text-[24px] font-bold text-ink sm:text-[27px]">lumiere<span className="text-rose-ink">.</span></Link>
          <div className="flex items-center gap-3 sm:gap-5"><Link href="/shop" className="text-sm text-muted hover:text-rose-ink"><span className="sm:hidden">Shop</span><span className="hidden sm:inline">Continue shopping</span></Link><ThemeToggle /></div>
        </div>
      </header>
      <div className="mx-auto max-w-[1040px] px-5 py-10 sm:py-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-ink">Your Lumiere</p>
        <h1 className="display-font mt-2 text-4xl font-bold text-ink sm:text-5xl">Welcome back.</h1>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Recent orders", "Track a delivery or reorder a favourite.", "View orders →"],
            ["Saved addresses", "Make your next thoughtful delivery even easier.", "Manage addresses →"],
            ["Your wishlist", "Keep a little list of lovely things.", "View wishlist →"],
          ].map(([title, description, action]) => (
            <div key={title} className="border border-line bg-surface p-6">
              <h2 className="display-font text-2xl font-bold text-ink">{title}</h2>
              <p className="mt-3 min-h-12 text-sm leading-6 text-muted">{description}</p>
              <button onClick={() => setMessage(`${title} is ready for your connected account.`)} className="mt-6 text-xs font-bold uppercase tracking-widest text-rose-ink">{action}</button>
            </div>
          ))}
        </div>
        {message && <div role="status" className="mt-5 border border-sage-line bg-sage px-5 py-4 text-sm text-sage-ink">{message}</div>}
        <div className="mt-8 border border-dashed border-line bg-cream p-6 sm:p-8 text-center">
          <p className="text-2xl text-rose-ink">✿</p>
          <p className="mt-3 font-semibold text-ink">This is a demo account</p>
          <p className="mt-2 text-sm text-muted">Connect your authentication API here when the backend is ready.</p>
        </div>
      </div>
    </main>
  );
}

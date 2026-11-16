"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

function Icon({ children }: { children: React.ReactNode }) {
  return <span aria-hidden="true" className="text-[20px] leading-none">{children}</span>;
}

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Shop flowers", href: "/shop" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Journal", href: "#journal" },
];

function Header({ cartCount, onCart, onSearch }: { cartCount: number; onCart: () => void; onSearch: () => void }) {
  const iconButton = "flex h-10 min-w-10 items-center justify-center gap-2 rounded-full px-2 text-sm hover:bg-blush hover:text-rose-ink lg:px-3";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
      <div className="bg-bark px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#f9eee8]">
        Free delivery over $75<span className="hidden sm:inline"> <span className="mx-2 text-[#e7aab0]">•</span> Same-day delivery available</span>
      </div>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8 lg:py-4">
        <Link href="/" className="display-font shrink-0 text-[24px] font-bold tracking-[-0.04em] text-ink sm:text-[27px]">
          lumiere<span className="text-rose-ink">.</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[13px] font-semibold text-muted lg:flex xl:gap-8">
          {navLinks.map((link) => <Link key={link.label} href={link.href} aria-current={link.active ? "page" : undefined} className={link.active ? "text-rose-ink" : "hover:text-rose-ink"}>{link.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-0.5 text-ink sm:gap-1.5">
          <button type="button" onClick={onSearch} aria-label="Search products" title="Search products" className={iconButton}><Icon>⌕</Icon><span className="hidden lg:inline">Search</span></button>
          <Link aria-label="Open your account" title="Account" href="/account" className={iconButton}><Icon>♙</Icon><span className="hidden lg:inline">Account</span></Link>
          <ThemeToggle />
          <button type="button" onClick={onCart} aria-label={`Open basket with ${cartCount} items`} title="Open basket" className="relative ml-1 flex h-10 items-center gap-2 rounded-full bg-rose px-3 text-sm text-white hover:bg-rose-dark sm:px-4">
            <Icon>♧</Icon><span className="hidden sm:inline">Basket</span>
            {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-paper ring-2 ring-paper">{cartCount}</span>}
          </button>
        </div>
      </div>
      <nav aria-label="Main" className="hide-scrollbar flex gap-6 overflow-x-auto border-t border-line px-4 py-2.5 text-xs font-semibold text-muted sm:justify-center sm:px-5 lg:hidden">
        {navLinks.map((link) => <Link key={link.label} href={link.href} aria-current={link.active ? "page" : undefined} className={`shrink-0 whitespace-nowrap ${link.active ? "text-rose-ink" : "hover:text-rose-ink"}`}>{link.label}</Link>)}
      </nav>
    </header>
  );
}

export default function Storefront() {
  return <div className="min-h-screen bg-paper">
    <Header cartCount={0} onCart={() => {}} onSearch={() => {}} />
  </div>;
}

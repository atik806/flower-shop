"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories, formatPrice, products, type Product } from "@/lib/data";
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

function ProductCard({ product, onAdd, onSave, saved }: { product: Product; onAdd: (product: Product) => void; onSave: (product: Product) => void; saved: boolean }) {
  return (
    <article className="group">
      <div className="relative aspect-[0.88] overflow-hidden rounded-[4px] bg-cream shadow-[0_8px_24px_rgba(70,50,40,0.07)]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#a55261]">{product.badge}</span>}
        <button onClick={() => onSave(product)} aria-pressed={saved} aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${saved ? "from" : "to"} wishlist`} title={saved ? "Remove from wishlist" : "Save to wishlist"} className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-sm hover:bg-[#a55261] hover:text-white ${saved ? "bg-[#a55261] text-white" : "bg-white/90 text-[#a55261]"}`}>{saved ? "♥" : "♡"}</button>
        <button onClick={() => onAdd(product)} className="absolute bottom-3 left-3 right-3 translate-y-0 bg-white/95 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#4a3b36] opacity-100 shadow-sm transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 hover:bg-[#a55261] hover:text-white">Add to basket</button>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h3 className="display-font text-[19px] font-bold text-ink">{product.name}</h3>
          <p className="mt-1 text-xs text-subtle">{product.colors}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-ink">{formatPrice(product.price)}</p>
          {product.oldPrice && <p className="text-xs text-subtle line-through">{formatPrice(product.oldPrice)}</p>}
        </div>
      </div>
      <p className="mt-2 flex items-center gap-2 text-xs text-subtle"><span className="text-[#c4874f]">★ {product.rating}</span><span>·</span><span>{product.category}</span><span className="ml-auto text-rose-ink">Hand-tied</span></p>
    </article>
  );
}

function CartPanel({ items, onClose, onRemove }: { items: Product[]; onClose: () => void; onRemove: (id: string) => void }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="fixed inset-0 z-50 bg-[#342521]/35" onClick={onClose}>
      <aside onClick={(event) => event.stopPropagation()} className="absolute right-0 top-0 h-full w-full max-w-[420px] overflow-y-auto bg-paper p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between border-b border-line pb-5">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-ink">Your basket</p><h2 className="display-font mt-1 text-3xl font-bold">A little lovely.</h2></div>
          <button onClick={onClose} aria-label="Close basket" title="Close basket" className="text-2xl text-muted">×</button>
        </div>
        {items.length === 0 ? <div className="py-24 text-center"><p className="text-4xl">✿</p><p className="mt-5 font-semibold">Your basket is waiting.</p><p className="mt-2 text-sm text-subtle">Add a beautiful bunch to get started.</p></div> : <><div className="divide-y divide-line">{items.map((item, index) => <div key={`${item.id}-${index}`} className="flex gap-4 py-5"><img src={item.image} alt="" className="h-20 w-20 rounded object-cover" /><div className="flex-1"><div className="flex justify-between gap-2"><p className="display-font font-bold">{item.name}</p><p className="text-sm font-bold">{formatPrice(item.price)}</p></div><p className="mt-1 text-xs text-subtle">{item.colors}</p><button onClick={() => onRemove(item.id)} className="mt-3 text-[10px] font-bold uppercase tracking-widest text-rose-ink">Remove</button></div></div>)}</div><div className="mt-7 border-t border-line pt-5"><div className="flex justify-between text-sm"><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><p className="mt-2 text-xs text-subtle">Delivery calculated at checkout.</p><Link href="/checkout" onClick={onClose} className="mt-6 block bg-rose py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-rose-dark">Continue to checkout</Link></div></>}
      </aside>
    </div>
  );
}

export default function Storefront() {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const addToCart = (product: Product) => { setCart((current) => [...current, product]); setCartOpen(true); };
  const saveProduct = (product: Product) => setSavedIds((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]);
  return <div className="min-h-screen bg-paper">
    <Header cartCount={cart.length} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
    {searchOpen && <div className="fixed inset-0 z-40 bg-[#342521]/35 px-5 pt-24" onClick={() => setSearchOpen(false)}><div onClick={(event) => event.stopPropagation()} className="mx-auto max-w-[650px] bg-paper p-6 shadow-2xl"><div className="flex items-center gap-4 border-b border-line-strong pb-3"><span className="text-xl text-rose-ink">⌕</span><input autoFocus placeholder="Search bouquets, gifts, roses..." className="w-full bg-transparent text-lg outline-none" onKeyDown={(event) => { if (event.key === "Enter") router.push(`/shop?search=${encodeURIComponent(event.currentTarget.value)}`); }} /><button onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-xl text-muted">×</button></div><p className="mt-4 text-xs text-subtle">Try “roses”, “birthday”, or “gift set”, then press Enter.</p></div></div>}
    <main>
      <section className="hero-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-16 pt-10 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-24 lg:pt-24">
          <div className="relative z-10 max-w-[560px]">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.23em] text-rose-ink">Flowers for the feeling</p>
            <h1 className="display-font text-[44px] font-bold leading-[0.95] tracking-[-0.055em] text-ink sm:text-[58px] lg:text-[78px]">A little<br /><em className="font-normal text-rose-ink">more lovely</em><br />in every stem.</h1>
            <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-muted">Seasonal flowers, thoughtfully arranged and delivered with care. Make someone&apos;s ordinary day extraordinary.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/shop" className="bg-rose px-6 py-4 text-xs sm:px-7 font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_rgba(165,82,97,0.2)] hover:bg-rose-dark">Shop the collection</Link><a href="#how-it-works" className="border-b border-rose-ink pb-1 text-xs font-bold uppercase tracking-[0.14em] text-rose-ink">How it works →</a></div>
            <div className="mt-12 flex items-center gap-3 text-xs text-subtle"><span className="text-lg text-rose-ink">✦</span> Same-day delivery in Dhaka <span className="mx-1">·</span> Hand-tied with love</div>
          </div>
          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -right-5 -top-8 h-32 w-32 rounded-full bg-[#e6c6c1]/60 blur-2xl" />
            <div className="relative aspect-[0.9] overflow-hidden rounded-t-[48%] rounded-b-[10px] bg-cream shadow-2xl"><img src="/images/hero-garden-bouquet.jpg" alt="Fresh seasonal flowers arranged in a bright garden bouquet" className="h-full w-full object-cover object-center" /></div>
            <div className="absolute -bottom-5 left-3 bg-surface px-5 py-4 text-ink shadow-xl sm:-left-5"><p className="text-[10px] uppercase tracking-[0.18em] text-rose-ink">Today&apos;s arrangement</p><p className="display-font mt-1 text-xl font-bold">Lily Rose Melody</p></div>
          </div>
        </div>
      </section>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-[1240px] divide-y divide-line px-5 py-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          <div className="flex items-center gap-3 py-3 sm:px-6 sm:py-0 sm:first:pl-0"><span className="text-2xl text-rose-ink">✿</span><div><p className="text-xs font-bold text-ink">Fresh every morning</p><p className="mt-1 text-[11px] text-subtle">Seasonal stems, always.</p></div></div>
          <div className="flex items-center gap-3 py-3 sm:px-6 sm:py-0"><span className="text-2xl text-rose-ink">♡</span><div><p className="text-xs font-bold text-ink">Made with intention</p><p className="mt-1 text-[11px] text-subtle">Hand-tied by local florists.</p></div></div>
          <div className="flex items-center gap-3 py-3 sm:px-6 sm:py-0 sm:last:pr-0"><span className="text-2xl text-rose-ink">⌁</span><div><p className="text-xs font-bold text-ink">Delivered with care</p><p className="mt-1 text-[11px] text-subtle">A beautiful arrival, guaranteed.</p></div></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1240px] px-5 py-16 sm:py-20 lg:px-8">
        <div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-ink">Find your feeling</p><h2 className="display-font mt-2 text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl">Shop by occasion</h2></div><Link href="/shop" className="hidden text-xs font-bold uppercase tracking-widest text-rose-ink sm:block">View all flowers →</Link></div>
        <div className="hide-scrollbar mt-9 grid grid-cols-2 gap-3 overflow-x-auto sm:grid-cols-4 sm:gap-5">{categories.map((category) => <Link href={`/shop?category=${category.name}`} key={category.name} className="group relative aspect-[0.92] overflow-hidden rounded-[3px]"><img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="image-overlay absolute inset-0" /><span className="absolute bottom-5 left-5 display-font text-2xl font-bold text-white">{category.name}</span></Link>)}</div>
      </section>
      <section className="bg-cream py-16 sm:py-20"><div className="mx-auto max-w-[1240px] px-5 lg:px-8"><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-ink">Fresh this week</p><h2 className="display-font mt-2 text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl">The seasonal edit</h2></div><Link href="/shop" className="hidden text-xs font-bold uppercase tracking-widest text-rose-ink sm:block">Shop all →</Link></div>      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onSave={saveProduct} saved={savedIds.includes(product.id)} />)}</div></div></section>
    </main>
    {cartOpen && <CartPanel items={cart} onClose={() => setCartOpen(false)} onRemove={(id) => setCart((current) => { const index = current.findIndex((item) => item.id === id); return index < 0 ? current : current.filter((_, itemIndex) => itemIndex !== index); })} />}
  </div>;
}

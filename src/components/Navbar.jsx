import { Sun, Moon, Search, ShoppingBag, MapPin } from 'lucide-react'
import { useApp, useCart } from '../store'

export default function Navbar({ onSearch, onCart, ordering = true }) {
  const { theme, setTheme, table } = useApp()
  const count = useCart((s) => s.count(s))

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Brand mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--accent)] text-[var(--accent)]">
              <span className="font-display text-lg font-bold leading-none">S</span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-xl font-semibold tracking-wide text-[var(--ink)]">
                Sinan Cafe
              </span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Table chip (ordering only) */}
          {ordering && (
            <span className="mr-1 hidden items-center gap-1.5 text-xs font-medium text-[var(--muted)] md:flex">
              <MapPin size={13} className="text-[var(--accent)]" />
              {table ? `Table ${table}` : 'Choose your table'}
            </span>
          )}
          <button
            aria-label="Search menu"
            onClick={onSearch}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-transform active:scale-90"
          >
            <Search size={18} />
          </button>
          <button
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-transform active:scale-90"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {ordering && (
            <button
              aria-label="Open cart"
              onClick={onCart}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-transform active:scale-90"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white"
                  style={{ animation: 'pop-badge 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
                >
                  {count}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

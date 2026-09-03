import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart, useCheckout } from '../store'
import { formatETB } from '../data/menu'

export default function FloatingCart({ onOpenCheckout }) {
  const count = useCart((s) => s.count(s))
  const subtotal = useCart((s) => s.subtotal(s))
  const lastAdded = useCart((s) => s.lastAdded)
  const setOpen = useCheckout((s) => s.setOpen)

  if (count === 0) {
    // A placeholder that never shows if nothing has ever been added
    const everAdded = useCart.getState().lastAdded
    if (!everAdded) return null
    return (
      <FloatingCircle
        onOpen={() => setOpen(true)}
        count={count}
        lastAdded={lastAdded}
      />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4">
      <div className="pointer-events-auto mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[var(--shadow-lift)] ring-1 ring-[var(--line)]">
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
          aria-label={`View order, ${count} items, ${formatETB(subtotal)}`}
        >
          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
            <ShoppingBag size={20} />
            <span
              key={count}
              className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white"
              style={{ animation: 'pop-badge 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
            >
              {count}
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-sans text-sm font-semibold text-[var(--ink)]">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
            <span className="block font-sans text-xs text-[var(--muted)]">
              {formatETB(subtotal)}
            </span>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--espresso)] px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[var(--bg)] dark:bg-[var(--accent)] dark:text-[var(--espresso)]">
            View <ArrowRight size={14} />
          </span>
        </button>
      </div>
    </div>
  )
}

function FloatingCircle({ onOpen, count, lastAdded }) {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onOpen}
        aria-label="Open cart"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[var(--espresso)] text-[var(--bg)] shadow-[var(--shadow-lift)] transition-transform active:scale-90 dark:bg-[var(--accent)] dark:text-[var(--espresso)]"
      >
        <ShoppingBag size={22} />
        <span
          key={lastAdded?.at ?? 'x'}
          className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full border-2 border-[var(--bg)] bg-[var(--accent)] px-1 text-[11px] font-bold text-white"
          style={{ animation: 'pop-badge 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          {count}
        </span>
      </button>
    </div>
  )
}

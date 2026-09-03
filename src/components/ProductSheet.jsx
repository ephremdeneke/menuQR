import { useState } from 'react'
import { Minus, Plus, Heart, Check } from 'lucide-react'
import { formatETB } from '../data/menu'
import { useCart } from '../store'
import BottomSheet from './BottomSheet'

export default function ProductSheet({ product, onClose }) {
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [liked, setLiked] = useState(false)
  const [confirming, setConfirming] = useState(false)

  if (!product) return null

  const soldOut = product.soldOut

  const handleAdd = () => {
    if (soldOut) return
    add(product, qty, note.trim())
    setConfirming(true)
    const t = setTimeout(() => {
      setConfirming(false)
      onClose()
    }, 900)
    return () => clearTimeout(t)
  }

  return (
    <BottomSheet open={!!product} onClose={onClose} title="" maxWidth="max-w-2xl" showGrabber>
      <div className="relative -mx-5 -mt-2 h-64 overflow-hidden rounded-t-[28px] md:h-80">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover ${soldOut ? 'grayscale-[0.6] opacity-60' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <button
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-black/30 text-white backdrop-blur transition-transform active:scale-90"
        >
          <Heart
            size={20}
            className={liked ? 'fill-red-400 text-red-400' : ''}
            style={liked ? { animation: 'pop-badge 0.4s cubic-bezier(0.34,1.56,0.64,1)' } : {}}
          />
        </button>
        {soldOut && (
          <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur">
            Sold Out
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            {product.badge && <span className="eyebrow">{product.badge}</span>}
            <h3 className="mt-1 font-display text-3xl font-semibold leading-tight text-[var(--ink)]">
              {product.name}
            </h3>
            <p className="font-ethiopic text-base text-[var(--accent)]">{product.amharic}</p>
          </div>
          <div className="text-right">
            <span className="font-sans text-lg font-semibold text-[var(--ink)]">
              {formatETB(product.price)}
            </span>
            {product.prep && (
              <p className="font-sans text-xs text-[var(--muted)]">{product.prep}</p>
            )}
          </div>
        </div>

        <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--muted)]">
          {product.description}
        </p>

        {/* Quantity + Add (inline) */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 rounded-full border border-[var(--line)] p-1">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--ink)] transition-transform active:scale-90 disabled:opacity-30"
              disabled={qty <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-sans text-base font-semibold text-[var(--ink)]">
              {qty}
            </span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--ink)] transition-transform active:scale-90"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={soldOut}
            className="btn-primary flex-1 !py-3.5"
          >
            {confirming ? (
              <>
                <Check size={18} /> Added
              </>
            ) : soldOut ? (
              'Unavailable'
            ) : (
              `Add to Order · ${formatETB(product.price * qty)}`
            )}
          </button>
        </div>

        {/* Note */}
        <div className="mt-4">
          <label
            htmlFor="product-note"
            className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]"
          >
            Add a note
          </label>
          <input
            id="product-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Less sugar, extra shot…"
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 font-sans text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
      </div>
    </BottomSheet>
  )
}

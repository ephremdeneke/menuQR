import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import { formatETB } from '../data/menu'
import { useMenu } from '../menuStore'
import { useCart } from '../store'

// Highlight matching words in the product name
function Highlight({ text, query }) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[var(--accent-soft)] text-[var(--accent-strong)]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function SearchOverlay({ open, onClose, onOpenProduct }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  const products = useMenu((s) => s.products)
  const add = useCart((s) => s.add)

  useEffect(() => {
    if (open) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    if (!q.trim()) return []
    const term = q.trim().toLowerCase()
    return products.filter((p) =>
      (p.name + ' ' + p.amharic + ' ' + (p.description || '')).toLowerCase().includes(term)
    )
  }, [q])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)]"
      style={{ animation: 'backdropFade 0.25s ease both' }}
      role="dialog"
      aria-modal="true"
      aria-label="Search menu"
    >
      {/* Search bar */}
      <div className="border-b border-[var(--line)] px-4 pb-3 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-3 focus-within:border-[var(--accent)]">
            <Search size={18} className="text-[var(--muted)]" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="What are you craving?"
              className="w-full bg-transparent font-sans text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
              aria-label="Search menu items"
            />
            {q && (
              <button onClick={() => setQ('')} aria-label="Clear search" className="text-[var(--muted)]">
                <X size={16} />
              </button>
            )}
          </div>
          <button onClick={onClose} className="font-sans text-sm font-medium text-[var(--muted)]">
            Cancel
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {!q.trim() ? (
          <div className="py-16 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--surface)] shadow-[var(--shadow)]">
              <Search size={24} className="text-[var(--accent)]" />
            </div>
            <p className="mt-4 font-display text-2xl font-semibold text-[var(--ink)]">
              What are you craving?
            </p>
            <p className="mt-1 font-sans text-sm text-[var(--muted)]">
              Search coffee, food, tea and more.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-2xl font-semibold text-[var(--ink)]">
              Nothing found
            </p>
            <p className="mt-1 font-sans text-sm text-[var(--muted)]">
              Try a different craving.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--line)]">
            {results.map((p) => (
              <li key={p.id}>
                <div className="flex items-center gap-3 py-3">
                  <button
                    onClick={() => onOpenProduct(p)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    aria-label={`View ${p.name}`}
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-display text-lg font-semibold text-[var(--ink)]">
                        <Highlight text={p.name} query={q.trim()} />
                      </span>
                      <span className="block font-ethiopic text-xs text-[var(--muted)]">{p.amharic}</span>
                    </span>
                  </button>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-sans text-sm font-semibold text-[var(--ink)]">
                      {formatETB(p.price)}
                    </span>
                    <button
                      onClick={() => add(p)}
                      aria-label={`Add ${p.name} to order`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] active:scale-90"
                    >
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

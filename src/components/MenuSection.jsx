import { useMemo, useRef } from 'react'
import { Coffee } from 'lucide-react'
import { formatETB } from '../data/menu'
import { useMenu } from '../menuStore'
import { useInView } from '../lib/hooks'
import Reveal from './Reveal'

export default function MenuSection({ active, onSelect, onOpenProduct, skeleton }) {
  const barRef = useRef(null)
  const products = useMenu((s) => s.products)
  const categories = useMenu((s) => s.categories)

  const filterProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    return active === 'all' ? products : products.filter((p) => p.category === active)
  }, [active, products])

  const scrollToCategory = (id) => {
    onSelect(id)
    if (barRef.current) {
      const el = barRef.current.querySelector(`[data-cat="${id}"]`)
      el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    }
  }

  // Editorial layout: assign each product a visual treatment
  const withLayout = useMemo(() => {
    return filterProducts.map((p, i) => {
      if (i % 5 === 0) return { ...p, layout: 'feature' }
      if (i % 3 === 0) return { ...p, layout: 'wide' }
      return { ...p, layout: 'card' }
    })
  }, [filterProducts])

  if (skeleton) {
    return <MenuSkeleton />
  }

  return (
    <section id="menu" className="scroll-mt-24">
      {/* Sticky category bar */}
      <div className="sticky top-[57px] z-20 border-y border-[var(--line)] bg-[var(--bg)]/92 backdrop-blur-md">
        <div
          ref={barRef}
          className="no-scrollbar mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-3"
          role="tablist"
          aria-label="Menu categories"
        >
          {categories.map((cat) => {
            const activeCat = active === cat.id
            return (
              <button
                key={cat.id}
                data-cat={cat.id}
                role="tab"
                aria-selected={activeCat}
                onClick={() => scrollToCategory(cat.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  activeCat ? 'text-[var(--espresso)] dark:text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {activeCat && (
                  <span
                    className="absolute inset-0 rounded-full bg-[var(--accent)]/15"
                    style={{ animation: 'fadeIn 0.3s ease' }}
                  />
                )}
                <span className="relative">{cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Editorial grid */}
      <div className="mx-auto max-w-5xl px-4 py-10">
        {withLayout.length === 0 ? (
          <EmptyCategory />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {withLayout.map((p, i) =>
              p.layout === 'feature' ? (
                <FeatureCard key={p.id} p={p} i={i} onOpen={onOpenProduct} />
              ) : p.layout === 'wide' ? (
                <WideCard key={p.id} p={p} i={i} onOpen={onOpenProduct} />
              ) : (
                <Card key={p.id} p={p} i={i} onOpen={onOpenProduct} />
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function Img({ p }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={p.image}
        alt={p.name}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 ${
          p.soldOut ? 'grayscale-[0.6] opacity-60' : ''
        }`}
      />
    </div>
  )
}

function SoldOut({ p }) {
  if (!p.soldOut) return null
  return (
    <span className="absolute left-3 top-3 rounded-full bg-[var(--espresso)]/80 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
      Sold Out
    </span>
  )
}

function Card({ p, i, onOpen }) {
  return (
    <Reveal className="md:col-span-1" delay={(i % 3) * 90}>
      <button
        onClick={() => onOpen(p)}
        className="group block w-full overflow-hidden rounded-2xl bg-[var(--surface)] text-left shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        aria-label={`View ${p.name}`}
      >
        <div className="relative aspect-[4/5]">
          <Img p={p} />
          {p.popular && !p.soldOut && (
            <span className="absolute bottom-3 left-3 rounded-full bg-[var(--accent)] px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-widest text-white">
              Popular
            </span>
          )}
          <SoldOut p={p} />
        </div>
        <div className="p-3.5">
          <h3 className="font-display text-lg font-semibold leading-tight text-[var(--ink)]">
            {p.name}
          </h3>
          <span className="font-ethiopic text-[11px] text-[var(--muted)]">{p.amharic}</span>
          <p className="mt-1.5 font-sans text-sm font-semibold text-[var(--ink)]">
            {formatETB(p.price)}
          </p>
        </div>
      </button>
    </Reveal>
  )
}

function WideCard({ p, i, onOpen }) {
  return (
    <Reveal className="col-span-2" delay={(i % 3) * 90}>
      <button
        onClick={() => onOpen(p)}
        className="group flex w-full overflow-hidden rounded-2xl bg-[var(--surface)] text-left shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        aria-label={`View ${p.name}`}
      >
        <div className="relative w-1/2 self-stretch">
          <Img p={p} />
          <SoldOut p={p} />
        </div>
        <div className="flex flex-1 flex-col justify-center p-5">
          <h3 className="font-display text-2xl font-semibold leading-tight text-[var(--ink)]">
            {p.name}
          </h3>
          <span className="mt-0.5 font-ethiopic text-sm text-[var(--accent)]">{p.amharic}</span>
          {p.description && (
            <p className="mt-2 line-clamp-2 font-sans text-sm text-[var(--muted)]">{p.description}</p>
          )}
          <span className="mt-3 font-sans text-base font-semibold text-[var(--ink)]">
            {formatETB(p.price)}
          </span>
        </div>
      </button>
    </Reveal>
  )
}

function FeatureCard({ p, i, onOpen }) {
  return (
    <Reveal className="col-span-2 md:col-span-3" delay={(i % 3) * 90}>
      <button
        onClick={() => onOpen(p)}
        className="group relative flex h-64 w-full overflow-hidden rounded-2xl text-left shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-lift)] md:h-80"
        aria-label={`View ${p.name}`}
      >
        <div className="absolute inset-0">
          <Img p={p} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
        <SoldOut p={p} />
        <div className="relative z-10 mt-auto w-full p-5 text-[#f6f1e8]">
          {p.badge && <span className="eyebrow block !text-[#e0cfae]">{p.badge}</span>}
          <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">{p.name}</h3>
          <span className="font-ethiopic text-sm text-[#dcc9a8]">{p.amharic}</span>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-sans text-base font-semibold">{formatETB(p.price)}</span>
            <span className="font-sans text-xs text-white/70">{p.prep}</span>
          </div>
        </div>
      </button>
    </Reveal>
  )
}

function EmptyCategory() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--surface)] shadow-[var(--shadow)]">
        <Coffee size={26} className="text-[var(--muted)]" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-[var(--ink)]">
        Nothing brewing here yet
      </h3>
      <p className="mt-1 font-sans text-sm text-[var(--muted)]">
        Try another category while we prep.
      </p>
    </div>
  )
}

function MenuSkeleton() {
  return (
    <section className="mt-6">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-[var(--surface)]">
              <div className="skeleton aspect-[4/5] rounded-none" />
              <div className="space-y-2 p-4">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

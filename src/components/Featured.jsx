import { Plus } from 'lucide-react'
import { formatETB } from '../data/menu'
import { useMenu } from '../menuStore'
import { useCart } from '../store'
import Reveal from './Reveal'

function RevealableImg({ src, alt, className }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
      />
    </div>
  )
}

export default function Featured({ ordering = true, onOpenProduct }) {
  const add = useCart((s) => s.add)
  const products = useMenu((s) => s.products)
  const featured = products.filter((p) => p.featured)

  // Make the card wrapper open product detail (also used as view-only when ordering is off)
  const open = (p) => onOpenProduct && onOpenProduct(p)

  const [a, b, c] = featured

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <Reveal>
        <p className="eyebrow mb-3">Today at Sinan</p>
        <h2 className="font-display text-4xl font-semibold leading-tight text-[var(--ink)] md:text-6xl">
          What’s Brewing
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {a && (
          <Reveal className="col-span-2 row-span-2 md:col-span-1 md:col-start-1 md:row-start-1">
            <article
              className="group h-full min-h-[22rem] cursor-pointer overflow-hidden rounded-3xl bg-[var(--surface)] shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              onClick={() => open(a)}
            >
              <RevealableImg src={a.image} alt={a.name} className="relative h-[62%]" />
              <div className="p-5">
                {a.badge && <span className="eyebrow">{a.badge}</span>}
                <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--ink)]">
                  {a.name}
                </h3>
                <p className="font-ethiopic text-sm text-[var(--accent)]">{a.amharic}</p>
                <p className="mt-2 line-clamp-2 font-sans text-sm text-[var(--muted)]">
                  {a.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-sans text-sm font-semibold text-[var(--ink)]">
                    {formatETB(a.price)}
                  </span>
                  {ordering && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        add(a)
                      }}
                      aria-label={`Add ${a.name} to order`}
                      className="grid h-10 w-10 place-items-center rounded-full bg-[var(--espresso)] text-[var(--bg)] transition-transform active:scale-90 dark:bg-[var(--accent)] dark:text-[var(--espresso)]"
                    >
                      <Plus size={18} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {b && (
          <Reveal delay={120} className="md:col-start-2 md:row-start-1">
            <article
              className="group h-full cursor-pointer overflow-hidden rounded-3xl bg-[var(--surface)] shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              onClick={() => open(b)}
            >
              <RevealableImg src={b.image} alt={b.name} className="h-52" />
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                  {b.name}
                </h3>
                <p className="font-ethiopic text-xs text-[var(--accent)]">{b.amharic}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-sans text-sm font-semibold text-[var(--ink)]">
                    {formatETB(b.price)}
                  </span>
                  {ordering && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        add(b)
                      }}
                      aria-label={`Add ${b.name} to order`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] active:scale-90"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {c && (
          <Reveal delay={200} className="md:col-start-2 md:row-start-2">
            <article
              className="group h-full cursor-pointer overflow-hidden rounded-3xl bg-[var(--surface)] shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-lift)]"
              onClick={() => open(c)}
            >
              <RevealableImg src={c.image} alt={c.name} className="h-56" />
              <div className="p-5">
                <span className="eyebrow">{c.tag}</span>
                <h3 className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">
                  {c.name}
                </h3>
                <p className="font-ethiopic text-xs text-[var(--accent)]">{c.amharic}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-sans text-sm font-semibold text-[var(--ink)]">
                    {formatETB(c.price)}
                  </span>
                  {ordering && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        add(c)
                      }}
                      aria-label={`Add ${c.name} to order`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] active:scale-90"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  )
}

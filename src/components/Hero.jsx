import { useEffect, useRef, useState } from 'react'
import { formatETB } from '../data/menu'

// Circular rotating text — "ETHIOPIAN COFFEE EXPERIENCE • "
function RotatingBadge() {
  const text = 'ETHIOPIAN COFFEE EXPERIENCE • SINAN CAFE • '
  return (
    <div className="pointer-events-none absolute bottom-16 right-6 hidden h-32 w-32 items-center justify-center md:flex lg:right-16">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-[rgba(255,255,255,0.9)]" style={{ fontSize: '8.2px', letterSpacing: '1.6px', fontFamily: 'Manrope, sans-serif' }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white">
        <span className="font-display text-base font-semibold leading-none">S</span>
      </span>
    </div>
  )
}

// The hero image — expands/reduces subtly with scroll.
export default function Hero({ onExplore }) {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(1)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const h = ref.current ? ref.current.offsetHeight : window.innerHeight
        if (y < h) {
          setScale(1 + y / h * 0.25)
          setOpacity(Math.max(0, 1 - y / h * 0.9))
          if (imgRef.current) {
            imgRef.current.style.transform = `scale(${1 + y / h * 0.12})`
          }
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={ref}
      className={`relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[var(--espresso)] text-[#f6f1e8] transition-opacity`}
      style={{ opacity }}
    >
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={imgRef}
          className="absolute inset-[-6%] will-change-transform"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.2s ease' }}
        >
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80"
            alt=""
            onLoad={() => setLoaded(true)}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-[var(--espresso)]" />
      </div>

      <RotatingBadge />

      {/* Entrance content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 pt-24 md:pb-24" style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}>
        <p className="eyebrow mb-4 text-[#d9c9ab]" style={{ animation: 'fade-up 0.8s 0.3s cubic-bezier(0.22,1,0.36,1) both' }}>
          SINAN
        </p>
        <h1
          className="font-display text-[clamp(4.5rem,24vw,11rem)] font-semibold leading-[0.85] tracking-tight"
          style={{ animation: 'fade-up 1s 0.45s cubic-bezier(0.22,1,0.36,1) both', letterSpacing: '-0.02em' }}
        >
          Cafe
        </h1>
        <p
          className="mt-5 font-display text-2xl italic text-[#e9ddc7] md:text-3xl"
          style={{ animation: 'fade-up 1s 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          Coffee. Food. Moments.
        </p>
        <p
          className="mt-3 font-sans text-xs uppercase tracking-[0.35em] text-[#c9b89b]"
          style={{ animation: 'fade-up 1s 0.85s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          Addis Ababa, Ethiopia
        </p>

        <div
          className="mt-9 flex flex-wrap items-center gap-4"
          style={{ animation: 'fade-up 1s 1s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <button
            onClick={onExplore}
            className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#f6f1e8] backdrop-blur-sm transition-all hover:bg-white hover:text-[var(--espresso)] active:scale-95"
          >
            Explore Menu
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </button>
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#c9b89b]">
            {formatETB(100)} · from
          </span>
        </div>
      </div>
    </section>
  )
}

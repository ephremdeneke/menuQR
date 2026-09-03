import { MapPin, Clock, Phone, MessageCircle, Instagram, ExternalLink } from 'lucide-react'
import { cafeInfo } from '../data/menu'

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-5xl px-5 py-14 md:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-3xl font-bold tracking-wide text-[var(--ink)]">
            Sinan Cafe
          </span>
          <p className="mt-1 font-sans text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
            Coffee • Food • Moments
          </p>

          <div className="mt-8 flex flex-col items-center gap-2 font-sans text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-[var(--accent)]" />
              Addis Ababa
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-[var(--accent)]" />
              {cafeInfo.hours}
            </span>
          </div>

          {/* Social icon buttons */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Instagram size={19} />
            </a>
            <a
              href={cafeInfo.mapsUrl}
              aria-label="Google Maps"
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ExternalLink size={19} />
            </a>
            <a
              href={`tel:${cafeInfo.phone.replace(/[^+\d]/g, '')}`}
              aria-label="Call the cafe"
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Phone size={19} />
            </a>
            <a
              href={`https://wa.me/${cafeInfo.whatsapp.replace(/[^+\d]/g, '')}`}
              aria-label="Message on WhatsApp"
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <MessageCircle size={19} />
            </a>
          </div>

          <p className="mt-10 font-ethiopic text-sm text-[var(--muted)]">ሳናን ካፌ</p>
          <p className="mt-1 font-sans text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Sinan Cafe · Crafted in Addis Ababa
          </p>
        </div>
      </div>
    </footer>
  )
}

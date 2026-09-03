import { useRef } from 'react'
import { Check } from 'lucide-react'
import BottomSheet from './BottomSheet'

export default function OrderSuccess({ open, orderNo, table, onClose }) {
  const cupRef = useRef(null)

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title=""
      maxWidth="max-w-lg"
      showGrabber={false}
      hideClose
    >
      <div className="flex flex-col items-center px-2 pb-2 pt-4 text-center">
        {/* Checkmark */}
        <div
          className="relative grid h-20 w-20 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]"
          style={{ animation: 'pop-badge 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          <span
            className="absolute inset-0 rounded-full border border-[var(--accent)]"
            style={{ animation: 'fadeIn 0.5s 0.4s ease both' }}
          />
          <Check size={36} strokeWidth={2.5} />
        </div>

        {/* Steam cup illustration */}
        <div ref={cupRef} className="relative mt-8 h-16 w-24">
          {/* steam */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute bottom-16 left-1/2 h-8 w-1.5 rounded-full bg-[var(--muted)]/40"
              style={{
                transform: 'translateX(-50%)',
                marginLeft: `${(i - 1) * 16}px`,
                animation: `steam 2.8s ease-in-out ${i * 0.7}s infinite`,
              }}
            />
          ))}
          {/* cup */}
          <div className="absolute bottom-0 left-1/2 h-12 w-16 -translate-x-1/2 rounded-b-full rounded-t-lg border border-[var(--line)] bg-[var(--surface-2)]">
            <span className="absolute left-1/2 top-3 h-8 w-0.5 -translate-x-1/2 bg-[var(--ink)]/20" />
            <span className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--ink)]/30" />
          </div>
        </div>

        <h2
          className="mt-4 font-display text-4xl font-semibold text-[var(--ink)]"
          style={{ animation: 'fade-up 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          Order Received
        </h2>
        <p
          className="mt-2 font-sans text-sm text-[var(--muted)]"
          style={{ animation: 'fade-up 0.7s 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          Your coffee journey has started.
        </p>

        {/* Order details */}
        <div
          className="mt-6 w-full max-w-xs rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5"
          style={{ animation: 'fade-up 0.7s 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Order
            </span>
            <span className="font-display text-xl font-bold text-[var(--ink)]">{orderNo}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Table
            </span>
            <span className="font-sans text-sm font-semibold text-[var(--ink)]">
              {table || '—'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Status
            </span>
            <span className="flex items-center gap-1.5 font-sans text-sm font-semibold text-[var(--accent)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
              Preparing
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary mt-7 w-full max-w-xs"
          style={{ animation: 'fade-up 0.7s 0.65s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          Back to Menu
        </button>
      </div>
    </BottomSheet>
  )
}

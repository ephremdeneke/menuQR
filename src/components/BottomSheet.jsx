import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useBodyScrollLock } from '../lib/hooks'

// A smooth spring-like bottom sheet. Centered and max-w on desktop.
export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
  hideClose = false,
  showGrabber = true,
}) {
  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        style={{ animation: 'backdropFade 0.28s ease both' }}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[92vh] w-full overflow-hidden rounded-t-[28px] bg-[var(--surface)] shadow-2xl"
        style={{ animation: 'sheetUp 0.42s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <div className={`mx-auto w-full ${maxWidth}`}>
          {showGrabber && (
            <div className="flex justify-center pt-3">
              <span className="h-1.5 w-12 rounded-full bg-[var(--line)]" />
            </div>
          )}
          <div className="relative px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
            <div className="flex items-center justify-between">
              {title && (
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                  {title}
                </h2>
              )}
              {!hideClose && (
                <button
                  aria-label="Close panel"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-transform active:scale-90"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="mt-3 max-h-[72vh] overflow-y-auto pb-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

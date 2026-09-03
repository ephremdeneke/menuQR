import { useEffect, useState } from 'react'

// Elegant full-screen loading with a coffee cup mark
export default function Loader({ minimal = false }) {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const t = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '•'))
    }, 300)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-[var(--accent)] opacity-40" />
        <span className="absolute inset-2 rounded-full border border-dashed border-[var(--accent)] opacity-50" />
        <span
          className="h-3.5 w-3.5 rounded-full bg-[var(--accent)]"
          style={{ animation: 'fadeIn 1.4s ease-in-out infinite' }}
        />
      </div>
      {!minimal && (
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          Sinan Cafe{dots}
        </p>
      )}
    </div>
  )
}

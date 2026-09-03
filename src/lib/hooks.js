import { useEffect, useRef, useState } from 'react'

// Reveal-on-scroll via IntersectionObserver
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

// Read table from URL: ?table=T05 or path /:table
export function useTableParam() {
  const [table, setTable] = useState(null)
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    const fromQs = qs.get('table')
    const raw = fromQs || window.location.pathname.split('/').pop()
    if (raw && /^t/i.test(raw)) {
      setTable(raw.toUpperCase())
    }
  }, [])
  return table
}

// Lock body scroll while a sheet is open
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [active])
}

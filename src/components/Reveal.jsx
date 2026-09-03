import { useInView } from '../lib/hooks'

// Wraps content and performs a subtle reveal-on-scroll.
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
  as: Tag = 'div',
}) {
  const { ref, inView } = useInView()
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  )
}

import { useInView } from '../lib/hooks'
import Reveal from './Reveal'

const experiences = [
  {
    title: 'Ethiopian',
    sub: 'Coffee',
    amharic: 'ኢትዮጵያዊ',
    desc: 'Born in the highlands where coffee first grew wild.',
    icon: '🌱',
  },
  {
    title: 'Fresh',
    sub: 'Brewed',
    amharic: 'ትኩስ',
    desc: 'Roasted and poured to order, never left standing.',
    icon: '☕',
  },
  {
    title: 'Warm',
    sub: 'Moments',
    amharic: 'ሞቃት',
    desc: 'Slow mornings and shared conversations.',
    icon: '🍵',
  },
]

export default function Story() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <>
      {/* FROM ETHIOPIA TO YOUR CUP */}
      <section
        ref={ref}
        className="relative mx-auto my-10 max-w-5xl overflow-hidden rounded-[28px] px-5 md:my-16"
      >
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1600&q=80"
            alt="Ethiopian coffee lands"
            loading="lazy"
            className={`h-[26rem] w-full object-cover transition-transform duration-[1200ms] ease-out md:h-[32rem] ${
              inView ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-[#f6f1e8] md:p-10">
            <p className="eyebrow mb-2 !text-[#e0cfae]">The Coffee Story</p>
            <h2
              className="font-display text-4xl font-semibold leading-[1.05] md:text-6xl"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
              }}
            >
              From Ethiopia,
              <br />
              to your cup.
            </h2>
            <p
              className="mt-3 max-w-md font-sans text-sm leading-relaxed text-[#e6d8c0] md:text-base"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s',
              }}
            >
              Every cup begins with a story. Discover the taste, aroma and character of
              Ethiopian coffee — from the soil to your table.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE CARDS */}
      <section className="mx-auto max-w-5xl px-5 pb-10">
        <Reveal className="mb-8 text-center">
          <p className="eyebrow mb-2">The Sinan Experience</p>
          <h2 className="font-display text-3xl font-semibold text-[var(--ink)] md:text-5xl">
            Taste the feeling
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {experiences.map((e, i) => (
            <Reveal key={e.title} delay={i * 110}>
              <article className="group h-full overflow-hidden rounded-2xl bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="text-3xl">{e.icon}</span>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-[var(--ink)]">
                  {e.title}
                  <br />
                  <span className="text-[var(--accent)]">{e.sub}</span>
                </h3>
                <p className="font-ethiopic text-sm text-[var(--muted)]">{e.amharic}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--muted)]">
                  {e.desc}
                </p>
                <div className="mt-5 h-px w-10 bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'

const WEDDING_DATE = new Date('2026-11-16T18:00:00+05:00').getTime()

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function getRemaining(): Remaining {
  const diff = Math.max(WEDDING_DATE - Date.now(), 0)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const UNITS: { key: keyof Remaining; label: string }[] = [
  { key: 'days', label: 'Дней' },
  { key: 'hours', label: 'Часов' },
  { key: 'minutes', label: 'Минут' },
  { key: 'seconds', label: 'Секунд' },
]

export function CountdownSection() {
  const [remaining, setRemaining] = useState<Remaining | null>(null)

  useEffect(() => {
    setRemaining(getRemaining())
    const id = window.setInterval(() => setRemaining(getRemaining()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section aria-labelledby="date-heading" className="px-5 pb-16 pt-6">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-t-[200px] border border-gold-bright px-6 pb-12 pt-20 text-center text-ivory shadow-[0_24px_60px_rgba(110,85,61,0.35),inset_0_0_60px_rgba(243,229,171,0.12)]"
          style={{ background: 'linear-gradient(180deg, #79634b 0%, #6e553d 100%)' }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-t-[190px] border border-gold-bright/30" />

          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-beige/80">Save the date</p>
          <h2 id="date-heading" className="gold-text mt-4 font-script text-[clamp(2.4rem,11vw,3.2rem)] leading-tight">
            16 ноября 2026
          </h2>
          <p className="gold-text-static font-serif text-3xl font-medium tracking-[0.2em]">18:00</p>

          <p className="mt-8 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-beige">
            До нашей свадьбы осталось
          </p>

          <div className="mt-5 grid grid-cols-4 gap-2" role="timer" aria-live="off">
            {UNITS.map(({ key, label }) => (
              <div
                key={key}
                className="flex flex-col items-center rounded-xl border border-gold-bright/30 bg-white/15 px-1 py-3 backdrop-blur-[8px]"
              >
                <span className="font-serif text-3xl font-semibold tabular-nums leading-none text-white">
                  {remaining ? String(remaining[key]).padStart(2, '0') : '--'}
                </span>
                <span className="mt-2 font-sans text-[9px] font-medium uppercase tracking-[0.15em] text-beige/90">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-[30ch] text-pretty font-serif text-lg italic leading-relaxed text-beige">
            Каждая секунда приближает нас к дню, который мы проведём вместе с вами
          </p>
        </div>
      </Reveal>

      <Reveal delay={150} className="mt-8 flex flex-col items-center">
        <Image
          src="/images/dove.png"
          alt=""
          width={681}
          height={727}
          className="animate-float-soft relative z-10 h-auto w-28 mix-blend-multiply"
        />
        <div aria-hidden="true" className="mt-2 flex items-center gap-3 text-gold">
          <span className="gold-line h-px w-16" />
          <span className="font-script text-2xl">~</span>
          <span className="gold-line h-px w-16" />
        </div>
      </Reveal>
    </section>
  )
}

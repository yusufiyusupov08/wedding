import Image from 'next/image'
import { Cake, Gem, Wine, type LucideIcon } from 'lucide-react'
import { Ornament, Reveal } from './reveal'

const EVENTS: { time: string; title: string; icon: LucideIcon }[] = [
  { time: '17:30', title: 'Сбор гостей & Welcome Drink', icon: Wine },
  { time: '18:00', title: 'Торжественная церемония', icon: Gem },
  { time: '20:30', title: 'Свадебный торт & Шоу-программа', icon: Cake },
]

export function TimelineSection() {
  return (
    <section aria-labelledby="timeline-heading" className="relative overflow-hidden px-7 pb-20 pt-10">
      <Image
        src="/images/garland.png"
        alt=""
        width={1601}
        height={738}
        sizes="480px"
        className="pointer-events-none mx-auto h-auto w-[115%] max-w-none -translate-x-[6.5%] mix-blend-multiply"
      />

      <Reveal className="text-center">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-subtle">Program</p>
        <h2 id="timeline-heading" className="mt-2 font-script text-5xl text-cinnamon-deep">
          Программа дня
        </h2>
        <Ornament className="mt-5" />
      </Reveal>

      <ol className="relative mx-auto mt-12 max-w-[340px]">
        <span aria-hidden="true" className="gold-line absolute bottom-6 left-[27px] top-6 w-px" />
        {EVENTS.map(({ time, title, icon: Icon }, index) => (
          <Reveal as="li" key={time} delay={index * 150} className="relative flex items-center gap-5 py-5">
            <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-gold bg-ivory shadow-[0_0_0_5px_#fdfbf7,0_8px_20px_rgba(197,160,89,0.35)]">
              <Icon className="size-5 text-cinnamon" aria-hidden="true" />
            </span>
            <div className="text-left">
              <p className="gold-text-deep font-serif text-3xl font-semibold leading-none">{time}</p>
              <p className="mt-1.5 font-serif text-lg leading-snug text-ink">{title}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

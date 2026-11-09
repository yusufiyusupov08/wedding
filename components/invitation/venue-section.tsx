import Image from 'next/image'
import { CalendarHeart, MapPin, Navigation } from 'lucide-react'
import { Ornament, Reveal } from './reveal'

export function VenueSection() {
  return (
    <section aria-labelledby="venue-heading" className="paper-cream px-7 py-20 text-center">
      <Reveal>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-subtle">Location</p>
        <h2 id="venue-heading" className="mt-2 font-script text-5xl text-cinnamon-deep">
          Место проведения
        </h2>
        <Ornament className="mt-5" />
      </Reveal>

      <Reveal delay={150} className="mt-10">
        <div className="mx-auto w-[82%] max-w-[330px] rounded-t-[170px] border border-gold p-2 shadow-[0_20px_50px_rgba(110,85,61,0.2)]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[162px]">
            <img
  src="https://raw.githubusercontent.com/yusufiyusupov08/PP2_Practice/main/IMG_4086.JPG"
  alt="Фасад ресторана"
  className="w-full h-full object-cover"
/>          
</div>
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-10 flex flex-col items-center gap-4">
        <p className="font-serif text-2xl font-semibold uppercase tracking-[0.18em] text-cinnamon-deep">
          Ресторан «Дунё»
        </p>
        <p className="flex items-center gap-2 font-serif text-lg text-ink">
          <MapPin className="size-4 text-gold" aria-hidden="true" />
          г. Душанбе, ул. Яккатут
        </p>
        <div className="flex items-start gap-2 font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-subtle">
          <CalendarHeart className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          <span>
            16 ноября 2026
            <br />
            Сбор гостей в 17:30 · Начало в 18:00
          </span>
        </div>

        <a
          href="https://yandex.tj/maps/-/CXvbYANY"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-3 rounded-full border border-gold-bright bg-cinnamon px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory shadow-[0_10px_25px_rgba(110,85,61,0.35)] transition hover:bg-cinnamon-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <Navigation className="size-4" aria-hidden="true" />
          Открыть в навигаторе
          <span className="sr-only">(Яндекс Карты, откроется в новой вкладке)</span>
        </a>
      </Reveal>
    </section>
  )
}

import Image from 'next/image'
import { Ornament, Reveal } from './reveal'

export function WelcomeSection() {
  return (
    <section id="welcome" className="relative px-7 py-20 text-center">
      <Reveal>
        <Image
          src="/images/lily.png"
          alt=""
          width={846}
          height={866}
          className="mx-auto h-auto w-24 mix-blend-multiply"
        />
        <h2 className="mt-4 font-script text-5xl text-cinnamon-deep">Дорогие гости!</h2>
        <Ornament className="mt-5" />
      </Reveal>

      <Reveal delay={150}>
        <p className="mx-auto mt-8 max-w-[34ch] text-pretty font-serif text-xl leading-relaxed text-ink">
          С огромной радостью приглашаем вас разделить с нами самый важный и трепетный день нашей жизни — день,
          когда два сердца станут одной семьей. Ваше присутствие сделает этот праздник по-настоящему тёплым и
          незабываемым.
        </p>
      </Reveal>

      <Reveal delay={200} className="mt-12">
        <div className="mx-auto w-[78%] max-w-[320px] rounded-t-[180px] border border-gold p-2 shadow-[0_20px_50px_rgba(197,160,89,0.28)]">
          <div className="rounded-t-[172px] border border-gold/50 p-1.5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[164px]">
              <Image
                src="/images/couple.webp"
                alt="Жених и невеста держатся за руки, у невесты свадебный букет"
                fill
                sizes="(max-width: 480px) 75vw, 320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <p className="mt-10 font-serif text-lg italic text-subtle">С любовью,</p>
        <p className="font-script text-4xl text-cinnamon-deep">Абдулазиз & Малика</p>
      </Reveal>
    </section>
  )
}

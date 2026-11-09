import Image from 'next/image'
import { Reveal } from './reveal'

export function FooterSection() {
  return (
    <footer className="px-6 pb-14 pt-6 text-center">
      <Reveal>
        <Image
          src="/images/garland.png"
          alt=""
          width={1601}
          height={738}
          sizes="480px"
          className="mx-auto h-auto w-full mix-blend-multiply"
        />
        <p className="mt-4 font-serif text-lg italic text-subtle">Будем счастливы видеть вас!</p>
        <p className="mt-1 font-script text-5xl text-cinnamon-deep">Абдулазиз & Малика</p>
        <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-subtle">16 · 11 · 2026</p>
      </Reveal>
    </footer>
  )
}

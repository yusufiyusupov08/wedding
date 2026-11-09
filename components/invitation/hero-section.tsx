import Image from 'next/image'

export function HeroSection() {
  return (
    <section
      aria-label="Абдулазиз и Малика"
      className="relative flex min-h-svh flex-col items-center justify-between px-6 pb-10 pt-12"
    >
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-subtle">
        Wedding Day
      </p>

      <Image
        src="/images/arch.png"
        alt=""
        width={700}
        height={700}
        priority
        sizes="(max-width: 480px) 100vw, 420px"
        className="-my-4 h-auto w-[105%] max-w-[440px] mix-blend-multiply"
      />

      <div className="-mt-6 flex flex-col items-center gap-3 text-center">
        <h1 className="font-script text-[clamp(2.8rem,13vw,3.8rem)] leading-[1.1]">
          <span className="gold-text-deep inline-block px-2 pb-1">Абдулазиз</span>
          <span className="mx-1 inline-block font-script text-[0.7em] text-gold">&</span>
          <span className="gold-text-deep inline-block px-2 pb-1">Малика</span>
        </h1>
        <p className="font-serif text-2xl font-medium tracking-[0.35em] text-cinnamon-deep">16.11.2026</p>
        <p className="font-serif text-base italic text-subtle">Душанбе</p>
      </div>

      <a
        href="#welcome"
        className="mt-6 flex flex-col items-center gap-3 rounded-md text-cinnamon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <span aria-hidden="true" className="flex h-9 w-6 justify-center rounded-full border border-cinnamon/60 pt-2">
          <span className="animate-scroll-dot block size-1.5 rounded-full bg-gold" />
        </span>
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.35em]">Листайте вниз</span>
      </a>
    </section>
  )
}

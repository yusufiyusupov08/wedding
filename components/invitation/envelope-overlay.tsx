'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Stage = 'sealed' | 'opening' | 'gone'

const OPEN_DURATION = 3200

export function EnvelopeOverlay({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState<Stage>('sealed')

  if (stage === 'gone') return null

  const open = () => {
    if (stage !== 'sealed') return
    setStage('opening')
    onOpen()
    window.setTimeout(() => setStage('gone'), OPEN_DURATION)
  }

  return (
    <div
      className={cn('envelope fixed inset-0 z-[9999] flex justify-center bg-beige', stage === 'opening' && 'is-opening')}
      role="dialog"
      aria-modal="true"
      aria-label="Приглашение на свадьбу"
    >
      <div className="env-stage paper-cream relative h-full w-full max-w-[480px] overflow-hidden [perspective:1400px]">
        <div aria-hidden="true" className="env-glow pointer-events-none absolute inset-0 z-[5]" />

        <div className="env-letter relative z-[35] flex h-full flex-col items-center justify-center px-8 pb-40 text-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-subtle">
            Приглашение на свадьбу
          </p>
          <Image
            src="/images/dove.png"
            alt=""
            width={681}
            height={727}
            priority
            className="env-dove animate-float-soft my-6 h-auto w-36 mix-blend-multiply"
          />
          <h1 className="font-script text-5xl leading-tight text-cinnamon-deep">
            Абдулазиз
            <span className="block text-3xl text-gold">&</span>
            Малика
          </h1>
          <p className="mt-3 font-serif text-lg tracking-[0.3em] text-subtle">16 · 11 · 2026</p>
        </div>

        <div
          aria-hidden="true"
          className="env-left pointer-events-none absolute inset-0 z-20 bg-beige/70"
          style={{ clipPath: 'polygon(0 0, 50% 62%, 0 100%)' }}
        />
        <div
          aria-hidden="true"
          className="env-right pointer-events-none absolute inset-0 z-20 bg-beige/70"
          style={{ clipPath: 'polygon(100% 0, 50% 62%, 100% 100%)' }}
        />
        <div
          aria-hidden="true"
          className="env-bottom pointer-events-none absolute inset-0 z-20 bg-beige-deep/80"
          style={{ clipPath: 'polygon(0 100%, 50% 58%, 100% 100%)' }}
        />
        <div aria-hidden="true" className="env-flap pointer-events-none absolute inset-x-0 top-0 z-30 h-[62%]">
          <div
            className="paper h-full w-full opacity-90"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-40 flex justify-center pb-12">
          <button
            type="button"
            onClick={open}
            disabled={stage !== 'sealed'}
            className="group flex flex-col items-center gap-4 rounded-full focus-visible:outline-none"
          >
            <span
              className="env-seal relative flex size-24 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(110,85,61,0.35)] transition-transform duration-500 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-cream"
              style={{ background: 'radial-gradient(circle at 35% 30%, #a68560 0%, #79634b 45%, #5a4430 100%)' }}
            >
              <span className="absolute inset-2 rounded-full border border-dashed border-[#f3e5ab]/50" />
              <span className="gold-text-static font-script text-4xl">А&М</span>
            </span>
            <span className="env-hint block">
              <span className="animate-pulse-soft block font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-cinnamon">
                Нажмите, чтобы открыть
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

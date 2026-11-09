'use client'

import { Music, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Выключить музыку' : 'Включить музыку'}
      className="fixed right-4 top-4 z-50 flex size-12 items-center justify-center rounded-full border border-gold/60 bg-ivory/80 text-cinnamon shadow-[0_6px_20px_rgba(110,85,61,0.2)] backdrop-blur-md transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-[480px]:right-[calc(50%-240px+1rem)]"
    >
      {playing && (
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
      )}
      {playing ? (
        <Music className={cn('size-5', 'animate-pulse')} aria-hidden="true" />
      ) : (
        <VolumeX className="size-5" aria-hidden="true" />
      )}
    </button>
  )
}

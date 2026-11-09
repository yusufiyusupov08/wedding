'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { EnvelopeOverlay } from './envelope-overlay'
import { MusicToggle } from './music-toggle'
import { HeroSection } from './hero-section'
import { WelcomeSection } from './welcome-section'
import { CountdownSection } from './countdown-section'
import { VenueSection } from './venue-section'
import { TimelineSection } from './timeline-section'
import { RsvpSection } from './rsvp-section'
import { FooterSection } from './footer-section'

const TARGET_VOLUME = 0.55

export function Invitation() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeFrame = useRef<number | null>(null)
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)

  const fadeTo = useCallback((target: number, duration: number, onDone?: () => void) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current)
    const start = audio.volume
    const startTime = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      audio.volume = start + (target - start) * progress
      if (progress < 1) {
        fadeFrame.current = requestAnimationFrame(step)
      } else {
        fadeFrame.current = null
        onDone?.()
      }
    }
    fadeFrame.current = requestAnimationFrame(step)
  }, [])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    try {
      await audio.play()
      setPlaying(true)
      fadeTo(TARGET_VOLUME, 2500)
    } catch {
      setPlaying(false)
    }
  }, [fadeTo])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setPlaying(false)
    fadeTo(0, 600, () => audio.pause())
  }, [fadeTo])

  const handleOpen = useCallback(() => {
    setOpened(true)
    void play()
  }, [play])

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  return (
    <>
      <audio ref={audioRef} src="/audio/music.mp3" loop preload="auto" playsInline />
      <EnvelopeOverlay onOpen={handleOpen} />
      {opened && <MusicToggle playing={playing} onToggle={playing ? pause : play} />}

      <main
        className={`page-enter paper relative mx-auto min-h-svh w-full max-w-[480px] overflow-hidden shadow-[0_0_60px_rgba(110,85,61,0.18)] ${opened ? 'is-entered' : ''}`}
      >
        <HeroSection />
        <WelcomeSection />
        <CountdownSection />
        <VenueSection />
        <TimelineSection />
        <RsvpSection />
        <FooterSection />
      </main>
    </>
  )
}

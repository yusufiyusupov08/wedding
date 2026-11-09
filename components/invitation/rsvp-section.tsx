'use client'

import Image from 'next/image'
import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, Heart, Loader2, Mail, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Ornament, Reveal } from './reveal'

const OPTIONS = [
  { value: 'Обязательно приду', icon: Heart },
  { value: 'К сожалению, не смогу', icon: Mail },
] as const

type Toast = { type: 'success' | 'error'; message: string } | null

export function RsvpSection() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<string>('')
  const [wishes, setWishes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<Toast>(null)

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 5000)
    return () => window.clearTimeout(id)
  }, [toast])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    if (name.trim().length < 2) {
      setToast({ type: 'error', message: 'Пожалуйста, укажите имя и фамилию' })
      return
    }
    if (!attendance) {
      setToast({ type: 'error', message: 'Пожалуйста, выберите вариант ответа' })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, attendance, wishes }),
      })
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!response.ok || !data.ok) throw new Error(data.error || 'Не удалось отправить ответ')

      setSubmitted(true)
      setToast({ type: 'success', message: 'Спасибо! Ваш ответ получен' })
    } catch (error) {
      setToast({
        type: 'error',
        message: error instanceof Error ? error.message : 'Не удалось отправить ответ, попробуйте ещё раз',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="rsvp-heading" className="paper-cream px-6 py-20">
      <Reveal className="text-center">
        <Image
          src="/images/lily.png"
          alt=""
          width={846}
          height={866}
          className="mx-auto h-auto w-20 mix-blend-multiply"
        />
        <h2 id="rsvp-heading" className="mt-3 font-script text-5xl text-cinnamon-deep">
          Анкета гостя
        </h2>
        <Ornament className="mt-5" />
        <p className="mx-auto mt-6 max-w-[34ch] text-pretty font-serif text-lg leading-relaxed text-subtle">
          Пожалуйста, подтвердите свое присутствие, чтобы мы могли подготовить всё с наивысшим комфортом.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-10">
        {submitted ? (
          <div className="rounded-3xl border border-gold/60 bg-ivory px-6 py-12 text-center shadow-[0_20px_50px_rgba(110,85,61,0.12)]">
            <CheckCircle2 className="mx-auto size-10 text-gold" aria-hidden="true" />
            <p className="mt-4 font-script text-4xl text-cinnamon-deep">Спасибо!</p>
            <p className="mt-2 font-serif text-lg text-subtle">
              {attendance === OPTIONS[0].value
                ? 'Мы с нетерпением ждём встречи с вами!'
                : 'Нам будет вас не хватать. Спасибо, что сообщили.'}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 rounded-3xl border border-gold/50 bg-ivory px-5 py-8 shadow-[0_20px_50px_rgba(110,85,61,0.12)]"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="rsvp-name" className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-cinnamon">
                Ваше имя и фамилия <span aria-hidden="true">*</span>
              </label>
              <input
                id="rsvp-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Фарход Рахимов"
                className="h-12 rounded-xl border border-beige-deep bg-cream px-4 font-serif text-lg text-ink placeholder:text-subtle/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-cinnamon">
                Вы придёте? <span aria-hidden="true">*</span>
              </legend>
              {OPTIONS.map(({ value, icon: Icon }) => {
                const checked = attendance === value
                return (
                  <label
                    key={value}
                    className={cn(
                      'flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold/50',
                      checked
                        ? 'border-gold bg-cinnamon text-ivory shadow-[0_10px_24px_rgba(110,85,61,0.3)]'
                        : 'border-beige-deep bg-cream text-ink hover:border-gold/60',
                    )}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={value}
                      checked={checked}
                      onChange={() => setAttendance(value)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full border',
                        checked ? 'border-gold-bright/60 bg-white/10' : 'border-gold/40 bg-ivory',
                      )}
                    >
                      <Icon className={cn('size-4', checked ? 'text-[#f3e5ab]' : 'text-cinnamon')} aria-hidden="true" />
                    </span>
                    <span className="font-serif text-lg">{value}</span>
                  </label>
                )
              })}
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="rsvp-wishes" className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-cinnamon">
                Пожелания молодожёнам
              </label>
              <textarea
                id="rsvp-wishes"
                name="wishes"
                rows={4}
                maxLength={1000}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="Ваши тёплые слова…"
                className="resize-none rounded-xl border border-beige-deep bg-cream px-4 py-3 font-serif text-lg text-ink placeholder:text-subtle/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-14 items-center justify-center gap-3 rounded-full border border-gold-bright bg-cinnamon font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory shadow-[0_12px_28px_rgba(110,85,61,0.35)] transition hover:bg-cinnamon-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-70"
            >
              {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {submitting ? 'Отправляем…' : 'Отправить ответ'}
            </button>
          </form>
        )}
      </Reveal>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {toast && (
          <div
            role="status"
            className={cn(
              'animate-in fade-in slide-in-from-bottom-4 pointer-events-auto flex max-w-[400px] items-center gap-3 rounded-2xl border px-5 py-4 font-serif text-base shadow-[0_16px_40px_rgba(44,38,35,0.25)]',
              toast.type === 'success' ? 'border-gold bg-cinnamon text-ivory' : 'border-[#c9a9a0] bg-ivory text-ink',
            )}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="size-5 shrink-0 text-[#f3e5ab]" aria-hidden="true" />
            ) : (
              <XCircle className="size-5 shrink-0 text-[#a0524a]" aria-hidden="true" />
            )}
            {toast.message}
          </div>
        )}
      </div>
    </section>
  )
}

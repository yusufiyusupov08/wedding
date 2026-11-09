import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google'
import './globals.css'

const greatVibes = Great_Vibes({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Абдулазиз & Малика — Приглашение на свадьбу · 16.11.2026',
  description:
    'Приглашаем вас разделить с нами самый важный день нашей жизни. 16 ноября 2026, ресторан «Дунё», г. Душанбе.',
  generator: 'v0.app',
  openGraph: {
    title: 'Абдулазиз & Малика — 16.11.2026',
    description: 'Приглашение на свадьбу',
    images: ['/images/couple.webp'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FDFBF7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${greatVibes.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

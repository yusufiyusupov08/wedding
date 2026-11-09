const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwqiqSA5bBR_CM5mhpCv88jqJv4JsCzDRJb9hACZP3nzegDxcnsbHtAyHfCgh8fbNvq/exec'

const ATTENDANCE_OPTIONS = ['Обязательно приду', 'К сожалению, не смогу'] as const

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Некорректный запрос' }, { status: 400 })
  }

  const { name, attendance, wishes } = (payload ?? {}) as Record<string, unknown>
  const cleanName = typeof name === 'string' ? name.trim().slice(0, 120) : ''
  const cleanWishes = typeof wishes === 'string' ? wishes.trim().slice(0, 1000) : ''

  if (cleanName.length < 2) {
    return Response.json({ ok: false, error: 'Пожалуйста, укажите имя и фамилию' }, { status: 400 })
  }
  if (typeof attendance !== 'string' || !ATTENDANCE_OPTIONS.includes(attendance as (typeof ATTENDANCE_OPTIONS)[number])) {
    return Response.json({ ok: false, error: 'Пожалуйста, выберите вариант ответа' }, { status: 400 })
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: cleanName,
        attendance,
        wishes: cleanWishes,
        timestamp: new Date().toISOString(),
      }),
      redirect: 'follow',
      cache: 'no-store',
    })

    if (!response.ok) {
      return Response.json({ ok: false, error: 'Не удалось сохранить ответ' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'Сервис временно недоступен' }, { status: 502 })
  }
}

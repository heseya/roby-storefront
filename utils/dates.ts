import { format } from 'date-fns'
import pl from 'date-fns/locale/pl/index.js'

export const formatDate = (date: string | number | Date | null, pattern = 'dd.MM.yyyy') => {
  if (!date) return null
  return format(new Date(date), pattern, { locale: pl })
}

export const DAY_MONTH_YEAR_HOUR_MINUTE_PATTERN = 'dd.MM.yyyy HH:mm'

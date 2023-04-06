import { format } from 'date-fns'
import * as locale from 'date-fns/locale'

export const formatDate = (date: string | number | Date | null, pattern = 'dd.MM.yyyy') => {
  if (!date) return null
  return format(new Date(date), pattern, { locale: locale.pl })
}

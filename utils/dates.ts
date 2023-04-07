import { format } from 'date-fns'
// @ts-ignore // Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import 'node_modules/date-fns/locale' is not supported resolving ES modules imported
import { pl } from 'date-fns/locale/index.js'

export const formatDate = (date: string | number | Date | null, pattern = 'dd.MM.yyyy') => {
  if (!date) return null
  return format(new Date(date), pattern, { locale: pl })
}

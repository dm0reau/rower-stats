import { lightFormat } from 'date-fns'

export function getDefaultDateFormat(): string {
  return 'yyyy-MM-dd'
}

export function getFormattedDate(date: Date): string {
  return lightFormat(date, getDefaultDateFormat())
}

import { endOfMonth, startOfMonth } from 'date-fns'

export default function thisMonthWorkoutsUrl(): string {
  const beginDate = startOfMonth(new Date()).toISOString()
  const endDate = endOfMonth(new Date()).toISOString()

  return `workouts?beginDate=${beginDate}&endDate=${endDate}`
}

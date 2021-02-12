import moment from 'moment'
import { toNumber, toString } from 'lodash'

export const calculateDate = (period, ago) => {
  if (!period || !ago) return

  const formatExp = 'YYYY,MMM,DD|HH.mm.ss.SSS'
  const currentDate = moment()
  const from = currentDate
    .add(toNumber(-ago), toString(period))
    .format(formatExp)
  const to = currentDate.format(formatExp)

  return { from, to }
}

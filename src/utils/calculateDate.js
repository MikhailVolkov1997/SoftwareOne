import moment from 'moment'
import _ from 'lodash'

export const calculateDate = (period, ago) => {
  if (!_.isString(period) || !_.isNumber(ago)) return

  const formatExp = 'YYYY,MMM,DD|HH.mm.ss.SSS'

  const prevDate = moment().add(-ago, period).format(formatExp)
  const currentDate = moment().format(formatExp)

  return { from: prevDate, to: currentDate }
}

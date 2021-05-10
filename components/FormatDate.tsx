import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import ja from 'date-fns/locale/ja'
import { ReactElement } from 'react'

const FormatDate = ({ date }: { date: Date }): ReactElement => {
  const jstDate = utcToZonedTime(date, 'Asia/Tokyo')
  return (
    <time dateTime={jstDate.toString()}>
      {format(jstDate, 'yyyy/MM/dd HH:mm:ss', { locale: ja })}
    </time>
  )
}

export default FormatDate

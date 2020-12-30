import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

const FormatDate = ({ date }: { date: Date }) => {
  return <time dateTime={date.toString()}>{format(new Date(date), 'yyyy/MM/dd hh:mm:ss', { locale: ja})}</time>
}

export default FormatDate
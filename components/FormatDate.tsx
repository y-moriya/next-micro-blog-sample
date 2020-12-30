import { format } from 'date-fns'

const FormatDate = ({ date }: { date: Date }) => {
  return <time dateTime={date.toString()}>{format(date, 'yyyy/MM/dd HH:mm:ss')}</time>
}

export default FormatDate
import { render } from '@testing-library/react'
import FormatDate from '../../components/FormatDate'

describe('Date', () => {
  it('should convert to JST', () => {
    const date = new Date('2020-12-31T00:00:00.000Z')
    const result = render(<FormatDate date={date} />)
    expect(result.container.textContent).toEqual('2020/12/31 09:00:00') // GMT+9:00
  })
})
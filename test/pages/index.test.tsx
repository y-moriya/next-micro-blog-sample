import React from 'react'
import { render, fireEvent } from '../testUtils'
import { Home } from '../../pages/index'
import client, { Session } from "next-auth/client"
jest.mock("next-auth/client")

beforeAll(() => {
  const mockSession: Session = {
    expires: "1",
    user: { email: "euro21st@gmail.com", name: "Yu MORIYA", image: "c"}
  };

  (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false])
})

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   fireEvent.click(getByText('Test Button'))
  //   expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})

import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import WeatherApp from "./WeatherApp";

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<WeatherApp />)

  expect(screen.getByTestId('heading1')).toHaveTextContent('Input your zipcode');

  // expect(screen.getByText('Input your zipcode')).toBeInTheDocument()

  // await waitFor(() => screen.getByRole('heading'))
  //
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toBeDisabled()
})

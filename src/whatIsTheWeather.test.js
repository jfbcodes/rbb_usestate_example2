import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import WeatherApp from "./WeatherApp";

const server = setupServer(
  // TODO: figure out how to get this mock to work
  // http://api.openweathermap.org/data/2.5/forecast
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

  const zipInputElement = screen.getByTestId('zipInput')
  fireEvent.change(zipInputElement, {target: {value: '90046'}})
  const currentWeatherOutput = screen.getByTestId('currentWeatherOutput')

  expect(currentWeatherOutput).toHaveContent("")


  // await waitFor(() => screen.getByRole('heading'))
})

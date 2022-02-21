import React, {useState, useRef, useEffect} from 'react'

const WeatherApp = (props) => {
  const [zip, setZip] = useState(undefined);
  const [forecastSuccess, setForecastSuccess] = useState(false);
  const [forecast, setForecast] = useState(undefined);
  const [fahrenheit, setFahrenheit] = useState(undefined)

  // set this in .env
  const OPEN_WEATHER_MAP_API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY

  const fetchForecast = (zipCode) => {
    fetch(`//api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${OPEN_WEATHER_MAP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (Number(result.cod) === 200) {
            let k_temp = result.list[0].main.temp;

            setFahrenheit(Math.trunc((k_temp - 273.15) * 9 / 5 + 32))

            let condition = result['list'][0]['weather'][0]['description']
            setForecast(condition);
            setForecastSuccess(true);
          } else {
            setForecastSuccess(false);
            setFahrenheit(undefined);
            setForecast(undefined);
          }
        }
      )
  }

  useEffect(() => {
    fetchForecast(zip)
  }, [zip])

  return (
    <>
      <p data-testid={'heading1'}>Input your zipcode:</p>

      <input data-testid={'zipInput'}
             name={"zip"}
             onChange={(event) => setZip(event.target.value)}
      />


      <br />
      <h1 data-testid={'currentWeatherOutput'}>
        { forecastSuccess && `In ${zip}, the current weather is: ${forecast}`}
      </h1>
      <h2 data-testid={'forecastOutput'}>
        { forecastSuccess && `${fahrenheit} °F`}
      </h2>
      <br />
    </>
  )
}

export default WeatherApp
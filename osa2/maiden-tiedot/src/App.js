import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayFilter = ({ filter, handler }) =>
  <div>
    Find countries <input value={filter} onChange={handler}/>
  </div>

const DisplayCapital = ({ country }) => {
  if (country.capital !== undefined) { 
    return (
      <div>capital {country.capital.join(', ')}</div>
    )
  }
}

const DisplayLanguages = ({ country }) => {
  if (country.languages !== undefined) {
    return (
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li> )}
        </ul>
      </div>
    )
  }
}

const DisplayWeather = ({ country, weather, weatherHandler }) => {
  const api_key = process.env.REACT_APP_API_KEY
    
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => {
      weatherHandler(
        [ response.data.main.temp,
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`, 
          response.data.wind.speed
        ])
    })
  }, [])
    
  return (
    <div>
      <h2>weather in {country.capital[0]}</h2>
      <div>temperature {weather[0]} Celsius</div>
      <img src={weather[1]}/>
      <div>wind {weather[2]} m/s</div>
    </div>
  )
}

const DisplayCountry = ({ 
  country,  
  weather, 
  weatherHandler 
}) => {
  if (country.capital === undefined) {
    return (
      <div>
    <h2>{country.name.common}</h2>
    <DisplayCapital country={country}/>
    <div>area {country.area}</div>
    <DisplayLanguages country={country} />
    
    <img src={country.flags.png}/>
  </div>
    )
  } else {
    return (
      <div>
    <h2>{country.name.common}</h2>
    <DisplayCapital country={country}/>
    <div>area {country.area}</div>
    <DisplayLanguages country={country} />
    
    <img src={country.flags.png}/>

    <DisplayWeather 
      country={country} 
      weather={weather}
      weatherHandler={weatherHandler}
    />
  </div>
    )
  }
}

const DisplayCountries = ({ 
    countries, 
    filter, 
    clickHandler, 
    weather,
    weatherHandler
  }) => {
  const cntrsFlt = countries.filter(country => country.name.common.includes(filter))
  
  const len = cntrsFlt.length

  if (len > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (len > 1) { 
    return (
      cntrsFlt.map(country => 
        <div key={country.ccn3}>
          {country.name.common} <button onClick={() => clickHandler(country.name.common)}>show</button>
        </div>
      )
    )
  }

  if (len === 0) {
    return (
      <div>No matches, specify another filter</div>
    )
  }

  return (
    <div>
      <DisplayCountry 
        country={cntrsFlt[0]} 
        weather={weather}
        weatherHandler={weatherHandler}
      />
    </div>
  )
}
  

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([0,"",0])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <DisplayFilter filter={filter} handler={handleFilterChange} />
      <DisplayCountries 
        countries={countries} 
        filter={filter} 
        clickHandler={setFilter}
        weather={weather}
        weatherHandler={setWeather}
      />
    </div>
  )
}

export default App;

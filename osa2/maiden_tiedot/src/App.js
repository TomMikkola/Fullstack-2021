import axios from 'axios'
import { useState, useEffect } from 'react';

const Filter = ({filter, filterCountries}) => {
  return(
    <>
      find countries <input value={filter} onChange={filterCountries} />
    </>
  )
}

const Display = ({filter, countries, setFilter, forecast, setForecast}) => {
  let filteredCountries = countries.filter( country => country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) )
  let singleCountry = false

  if(filter !== ''){
    
    if(filteredCountries.length > 10){
      return( <div>Too many matches, specify another filter</div> )

    } else if (filteredCountries.length === 1){
      singleCountry = true
      return(
        <Country countries={filteredCountries} singleCountry={singleCountry} setFilter={setFilter} forecast={forecast} setForecast={setForecast} />
      )
    } else{
      return(
        <Country countries={filteredCountries} singleCountry={singleCountry} setFilter={setFilter} setForecast={setForecast} />
      )
    }
  } else{
    return <></>
  }
}

const Country = ({countries, singleCountry, setFilter, forecast, setForecast}) => {

  if(singleCountry){
    
    return(
      <>
        <div>
          <h1>{countries[0].name}</h1>
          <div>capital {countries[0].capital}</div>
          <div>population {countries[0].population} </div>

          <h3>Languages</h3>
          <ul>{countries[0].languages.map( language => <li key={language.name}>{language.name}</li>)}</ul>
          <img src={countries[0].flag} alt={`Flag of ${countries[0].name}`} width={150}></img>
        </div>
        <Forecast capital={countries[0].capital} forecast={forecast} setForecast={setForecast} />
      </>
    )
  } else{

    return(
      <div>
        {countries.map(country => {
          return(
            <div key={country.name} >{country.name} <button onClick={ () => setFilter(country.name) } >show</button></div>
          )}
        )}
      </div>
    )
  }
}

const Forecast = ({capital, forecast, setForecast}) => {
  const api_key = process.env.REACT_APP_API_KEY

  useEffect( () => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
    .then( (response) => {
      setForecast({
        capital: capital,
        temperature: response.data.current.temperature,
        img: response.data.current.weather_icons[0],
        wind_speed: response.data.current.wind_speed,
        wind_dir: response.data.current.wind_dir
      })
    })
  }, [])

  return (
    <div>
      <h3>Weather in {forecast.capital}</h3>
      <div><b>temperature:</b> {forecast.temperature} Celsius</div>
      <img src={forecast.img}></img>
      <div><b>wind:</b> {forecast.wind_speed} mph direction {forecast.wind_dir}</div>
    </div>
  )
}

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [forecast, setForecast] = useState({capital: '', temperature: '', img: '', wind_speed: '', wind_dir: ''})

  useEffect( () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then( response => {
      setCountries(response.data)
    })
  }, [])

  const filterCountries = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <Filter filter={filter} filterCountries={filterCountries} />
      <Display filter={filter} countries={countries} setFilter={setFilter} forecast={forecast} setForecast={setForecast}/>
    </>
  );
}

export default App;
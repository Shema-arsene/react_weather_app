import React, { useEffect, useRef, useState } from "react"
import "./weather.css"
import clearIcon from "../assets/clear.png"
import cloudIcon from "../assets/cloud.png"
import drizzleIcon from "../assets/drizzle.png"
import humidityIcon from "../assets/humidity.png"
import rainIcon from "../assets/rain.png"
import searchIcon from "../assets/search.png"
import snowIcon from "../assets/snow.png"
import windIcon from "../assets/wind.png"

const Weather = () => {
  const iconCode = "https://openweathermap.org/img/wn/10d@2x.png"

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }

  const search = async (cityName) => {
    if (cityName === "") {
      alert("Enter city name")
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`
      const response = await fetch(url)
      const data = await response.json()

      console.log(data)

      if (!response.ok) {
        alert(data.message)
        return
      }

      const icon = allIcons[data.weather[0].icon] || clearIcon

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        country: data.sys.country,
        icon: icon,
      })
      console.log(weatherData)
    } catch (error) {
      setWeatherData(false)
      console.error("Error fetching weather data:", error)
    }
  }

  useEffect(() => {
    search("Kigali")
  }, [])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search City" />
        <img
          src={searchIcon}
          alt="Search icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="Weather icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <div className="loc-details">
            <p className="location">{weatherData.location}</p>
            <p className="country">{weatherData.country}</p>
          </div>

          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="Humidity icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="Wind icon" />
              <div>
                <p>{weatherData.windSpeed} Km / h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="fetch-error">Error fetching data</h1>
        </>
      )}
    </div>
  )
}

export default Weather

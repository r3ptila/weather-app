import React, { useState, useEffect } from 'react'
import './Hero.css'
import '../App.css'
import search_icon from '../icons/search.png'
import clear_icon from '../icons/clear.png'
import clearn_icon from '../icons/clearn.png'
import cloud_icon from '../icons/cloud.png'
import cloudn_icon from '../icons/cloudn.png'
import cloudy_icon from '../icons/cloudy.png'
import drizzle_icon from '../icons/drizzle.png'
import humidity_icon from '../icons/humidity.png'
import rain_icon from '../icons/rain.png'
import thunder_icon from '../icons/thunder.png'
import mist_icon from '../icons/mist.png'
import snow_icon from '../icons/snow.png'
import wind_icon from '../icons/wind.png'
import min_icon from '../icons/min.png'
import max_icon from '../icons/max.png'
import temp_icon from '../icons/temp.png'
import pressure_icon from '../icons/pressure.png'
import sunrise_icon from '../icons/sunrise.png'
import sunset_icon from '../icons/sunset.png'
import visibility_icon from '../icons/visibility.png'
import timezone_icon from '../icons/time.png'

function Hero() {

  const api_key = '259d604876dd016ff3276491e45b0e4d';

  const [city, setCity] = useState('Bucharest');
  const [weatherIcon, setWeatherIcon] = useState(clear_icon);

  const [weatherData, setWeatherData] = useState({
    visibility: '0 km/h',
    sunset: '0',
    time: '0',
    sunrise: '0',
    pressure: '0',
    description: '',
    humidity: '0%',
    windSpeed: '0 km/h',
    ftemp: '0°C',
    temp: '0°C',
    mintemp: '0°C',
    maxtemp: '0°C',
    location: 'Bucharest'
  });

  useEffect(() => {
    const getWeatherData = async (cityName) => {
    
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;
  
      try {
  
        const response = await fetch(url);
        const data = await response.json();
  
        if(!response.ok) {
          throw new Error("City not found");
        }
  
        setWeatherData({
          time: convertTimezone(data.timezone),
          description: data.weather[0].description,
          visibility: data.visibility + 'm',
          sunrise: convertTime(data.sys.sunrise),
          sunset: convertTime(data.sys.sunset),
          pressure: data.main.pressure + 'mbar',
          humidity: data.main.humidity + '%',
          windSpeed: data.wind.speed + ' km/h',
          ftemp: data.main.feels_like.toFixed(1) + '°C',
          temp: data.main.temp.toFixed(1) + '°C',
          location: data.name,
          mintemp: data.main.temp_min.toFixed(1) + '°C',
          maxtemp: data.main.temp_max.toFixed(1) + '°C'
        });

        switch(data.weather[0].icon) {
          case '01d':
            setWeatherIcon(clear_icon);
          break;
          case '01n':
            setWeatherIcon(clearn_icon);
          break;
          case '02d':
            setWeatherIcon(cloud_icon);
          break;
          case '02n':
            setWeatherIcon(cloudn_icon);
          break;
          case '03d':
            setWeatherIcon(cloudy_icon);
          break;
          case '03n':
            setWeatherIcon(cloudy_icon);
          break;
          case '04d':
            setWeatherIcon(cloudy_icon);
          break;
          case '04n':
            setWeatherIcon(cloudy_icon);
          break;
          case '09d':
            setWeatherIcon(drizzle_icon);
          break;
          case '09n':
            setWeatherIcon(drizzle_icon);
          break;
          case '10d':
            setWeatherIcon(rain_icon);
          break;
          case '10n':
            setWeatherIcon(rain_icon);
          break;
          case '11d':
            setWeatherIcon(thunder_icon);
          break;
          case '11n':
            setWeatherIcon(thunder_icon);
          break;
          case '13d':
            setWeatherIcon(snow_icon);
          break;
          case '13n':
            setWeatherIcon(snow_icon);
          break;
          case '50d':
            setWeatherIcon(mist_icon);
          break;
          case '50n':
            setWeatherIcon(mist_icon);
          break;
        }
      } catch(error) {
        setWeatherIcon(clear_icon);

        setWeatherData({
          visibility: '0m',
          sunset: '0',
          time: '0',
          sunrise: '0',
          pressure: '0',
          description: '',
          humidity: '0%',
          windSpeed: '0 km/h',
          ftemp: '0°C',
          temp: '0°C',
          mintemp: '0°C',
          maxtemp: '0°C',
          location: 'City not found'
        });
  
      }
    };
    document.addEventListener('keydown', keySearch);
    getWeatherData(city);
  }, [city, api_key]);
  
  const search = () => {
    const input = document.querySelector('.cityInput');
    if (input && input.value !== '') {
      setCity(input.value);
    }
  }

  const keySearch = (event) => {
    const input = document.querySelector('.cityInput');
    if (input && input.value !== '' && event.keyCode === 13) {
      setCity(input.value)
    }
  }

  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`; 
  }

  const convertTimezone = (timezone) => {
    const hours = Math.floor(Math.abs(timezone) / 3600);
    const minutes = Math.floor((Math.abs(timezone) % 3600) / 60);
    const sign = timezone >= 0 ? '+' : '-';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input type='text' className='cityInput' placeholder='Search' />
        <div className="search-icon" onClick={()=>{search()}}>
           <img src={search_icon} alt='search' />
         </div>
      </div>
      <div className="div-container">
        <div className="left">
          <div className="weather-image">
            <img src={weatherIcon} alt='' />
            <p className="description">{weatherData.description}</p>
          </div>
          <div className="weather-temp">{weatherData.temp}</div>
          <div className="weather-location">{weatherData.location}</div>
          <div className="data-container">
            <div className="element">
              <img src={min_icon} alt='' className='icon' />
              <div className="data">
                <div className="text">Min: {weatherData.mintemp}</div>
              </div>
            </div>
            <div className="element">
              <img src={max_icon} alt='' className='icon' />
              <div className="data">
                <div className="text">Max: {weatherData.maxtemp}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="element">
          <img src={temp_icon} alt='' className='icon' />
            <div className="data">
              <div className='text'>Feels like: {weatherData.ftemp}</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt='' className='icon' />
            <div className="data">
              <div className="text">Wind Speed: {weatherData.windSpeed}</div>
            </div>
          </div>
          <div className="element">
            <img src={humidity_icon} alt='' className='icon' />
            <div className="data">
              <div className="text">Humidity: {weatherData.humidity}</div>
            </div>
          </div>
          <div className="element">
            <img src={pressure_icon} alt='' className='icon' />
            <div className="data">
              <div className="text">Pressure: {weatherData.pressure}</div>
            </div>
          </div>
          <div className="element">
            <img src={sunrise_icon} alt='' className='icon' />
            <div className="data">
              <div className="text">Sunrise: {weatherData.sunrise}</div>
            </div>
          </div>
          <div className="element">
            <img src={sunset_icon} alt='' className='icon' />
            <div className="data">
              <div className="text">Sunset: {weatherData.sunset}</div>
            </div>
          </div>
          <div className="element">
            <img src={visibility_icon} alt='' className='icon' />
            <div className="data">
              <div className="text">Visibility: {weatherData.visibility}</div>
            </div>
          </div>
          <div className="element">
            <img src={timezone_icon} alt='' className='icon' />
            <div className="data">
              <div className="text">Timezone: {weatherData.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
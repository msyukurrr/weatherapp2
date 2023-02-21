import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';


export default function Home() {

  const apiKey = '0f8737785ea210faf1df040f9f441e1d';
  const location = 'vancouver';
  const units = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;

  const [ data, setData ] = useState();
  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8,2), 10))
      let num = parseInt(weather.dt_txt.substr(8,2), 10);

      if(num !== arrayOfDays.find(element => element === num)){
        arrayOfDays.push(num);
        console.log('Here');
        console.log(response.data.list[index])
        var month = '';
        var icon = '';

        if(weather.dt_txt.substr(5,2) == 1){
          month = "January"
        } else if (weather.dt_txt.substr(5,2) == 2){
          month = "February"
        } else if (weather.dt_txt.substr(5,2) == 3){
          month = "March"
        } else if (weather.dt_txt.substr(5,2) == 4){
          month = "April"
        } else if (weather.dt_txt.substr(5,2) == 5){
          month = "May"
        } else if (weather.dt_txt.substr(5,2) == 6){
          month = "June"
        } else if (weather.dt_txt.substr(5,2) == 7){
          month = "July"
        } else if (weather.dt_txt.substr(5,2) == 8){
          month = "August"
        } else if (weather.dt_txt.substr(5,2) == 9){
          month = "September"
        } else if (weather.dt_txt.substr(5,2) == 10){
          month = "October"
        } else if (weather.dt_txt.substr(5,2) == 11){
          month = "November"
        } else if (weather.dt_txt.substr(5,2) == 12){
          month = "December"
        }

        if(weather.weather[0].main == 'Clouds') {
          icon = '/icons/broken-clouds.png'
        } else if(weather.weather[0].main == 'Clear'){
          icon = '/icons/clear-sky.png'
        } else if(weather.weather[0].main == 'Atmosphere'){
          icon = '/icons/mist.png'
        } else if(weather.weather[0].main == 'Rain'){
          icon = '/icons/rain.png'
        } else if(weather.weather[0].main == 'Drizzle'){
          icon = '/icons/shower-rain.png'
        } else if(weather.weather[0].main == 'Snow'){
          icon = '/icons/snow.png'
        } else if(weather.weather[0].main == 'Thunderstorm'){
          icon = '/icons/thunderstorm.png'
        } 

        var now = new Date(weather.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var day = days[now.getDate()];

        return (
            <div key={index}>
              <Image
              src={icon}
              alt={icon}
              width={180}
              height={180}
              priority/>
            <p>
              {day} <br/> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0, 4)}
            </p>
            <div>{weather.main.temp.toFixed(1)} °C</div>
            <div>{weather.weather[0].main}</div>
            </div>
        );
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  };

  useEffect(() => {
    if(grabWeather.current === true) {
        fetchWeather();
    }

    return () => {
      grabWeather.current = true;
    }
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <>
      <main>
        <div>
            <p>Vancouver,BC Weather: <br/>
                Last Update: {date}
            </p>
        </div>

        <div>
            <a>By{''} Megan</a>
        </div>

        <div>
            <Image
            className={styles.logo}
            src="/../public/weather-forecast-logo.png"
            alt="Logo"
            width={300}
            height={100}
            />
        </div>

        <div className={styles.grid}>
          {data}
        </div>

      </main>
    </>
  )
}

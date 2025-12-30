import React, {useState, useEffect} from "react";
import { useOutletContext,useLocation } from "react-router-dom";
import { API_KEY } from '../ApiKey.jsx'
import Sun from '../img/sun (1).png';
import Clouds from "../img/sun (7).png";
import Rain from "../img/sun (6).png";
import Snow from "../img/sun (4).png";
import Mist from "../img/sun (3).png";
import Squall from "../img/sun (5).png";
import def from "../img/sun (2).png";
import './s.css';
import s from './s.module.css';

export default function PogodaSeychas() {
    const [weather, setWeather] = useState({});
    const [error, setError] = useState(null);
    const { searchCity } = useOutletContext();
    const location = useLocation();
    const city = location.state?.city || searchCity;


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error('Город не найден');
                }
                const data = await response.json();
                setWeather(data);
                setError(null);

            } catch (error) {
                setError(error);
            }
        };
        if (city) {
            fetchWeather();
        }
    }, [city]);

    const getWeatherIcon = (main) => {
        switch(main) {
            case 'Clear':
                return Sun;
            case 'Clouds':
                return Clouds;
            case 'Rain':
            case 'Drizzle':
            case 'Thunderstorm':
                return Rain;
            case 'Snow':
                return Snow;
            case 'Mist':
            case 'Smoke':
            case 'Haze':
            case 'Dust':
            case 'Fog':
            case 'Sand':
            case 'Ash':
                return Mist;
            case 'Squall':
            case 'Tornado':
            case 'Volcanic Ash':
                return Squall;
            default:
                return def;
        }
    };

    const iconUrl = weather?.weather?.length > 0
        ? getWeatherIcon(weather.weather[0].main)
        : def;

    return (
        <div className={s.wrapper}>
            {error && <p style={{color: 'red'}}>{error.message}</p>}
            {weather?.name !== undefined && (
                <div className='columns is-multiline is-flex is-align-items-stretch'>
                    <div  className="column is-half"
                          style={{
                              margin: '0',
                          }}>
                        <div className={s.container}>
                            <h2 className='title is-1'>{weather.name}</h2>
                            <p>🌡 {Math.round(weather.main.temp)}°C</p>
                            <p>{weather.weather?.[0]?.description
                                ? weather.weather[0].description.charAt(0).toUpperCase() +
                                weather.weather[0].description.slice(1)
                                : ""}

                                <img className={s.image}
                                     src={`${iconUrl}`}
                                     alt={weather.weather?.[0]?.main || "Погода"}
                                     />
                            </p>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="box">
                            <h2 className="title is-5">💨 Ветер</h2>
                            <p>Скорость: {weather.wind?.speed} м/с</p>
                            <p>Направление: {weather.wind?.deg}°</p>
                        </div>

                        <div className="box">
                            <h2 className="title is-5">🌡 Давление</h2>
                            <p>{weather.main?.pressure} гПа</p>
                        </div>

                        <div className="box">
                            <h2 className="title is-5">💧 Влажность</h2>
                            <p>{weather.main?.humidity}%</p>
                        </div>

                        <div className="box">
                            <h2 className="title is-5">☔ Осадки</h2>
                            <p>Дождь: {weather.rain?.["1h"] || 0} мм</p>
                            <p>Снег: {weather.snow?.["1h"] || 0} мм</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
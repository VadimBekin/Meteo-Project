import React, {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {API_KEY} from "../ApiKey.jsx";
import s from './s.module.css'


export default function FiveDays() {
    const { searchCity } = useOutletContext();
    const [cityName, setCityName] = useState("");
    const [error, setError] = useState(null);
    const [weatherFiveDays, setWeatherFiveDays] = useState([]);

    useEffect(() => {
        if (!searchCity) {
            setWeatherFiveDays([]);
            setCityName('');
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&lang=ru&appid=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error('Город не найден');
                }
                const data = await response.json();


                const daily = [];
                const map = {};
                data.list.forEach((item) => {
                    const [date, time] = item.dt_txt.split(' ');
                    if (time === '12:00:00' && !map[date]) {
                        map[date] = true;
                        daily.push(item)
                    }
                });


                setCityName(data.city.name);
                setWeatherFiveDays(daily);
                setError(null);
            } catch (err) {
                setError(err.message);
                setWeatherFiveDays([]);
            }
        }
        if (searchCity) {
            fetchData();
        }
    }, [searchCity]);
    if (!searchCity) return null;


    return (
        <div className={s.container}>
            <div className='box'>
                <h1 className='title is-1 has-text-centered'>
                    {cityName}
                </h1>
            </div>
            <div className="columns is-multiline">
                {error &&
                    <p>{error}</p>
                }
                {!error && weatherFiveDays.map((day) => (
                    <div className="column is-one-fifth" key={day.dt}>
                        <div className='box has-text-centered'
                        style={{
                            height: 170
                        }}>
                            <p className="title is-6">
                                {new Date(day.dt_txt).toLocaleDateString("ru-RU")}
                            </p>
                            <p className="subtitle is-6">
                                {day.weather?.[0]?.description ?
                                    day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1) : ''}
                            </p>
                            <p>🌡 {day.main ? Math.round(day.main.temp) : "--"} °C</p>
                            <p>💨 {day.wind ? day.wind.speed : "--"} м/с</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
import React, {useState, useEffect} from "react";
import {useLocation, useOutletContext, useNavigate} from "react-router-dom";
import {API_KEY} from "../ApiKey.jsx";
import s from './s.module.css'

export default function PogodaSutki() {
    const { searchCity } = useOutletContext();
    const [cityName, setCityName] = useState("");
    const [error, setError] = useState(null);
    const [hoursWeather, setHoursWeather] = useState([]);

    useEffect(() => {
        if (!searchCity) {
            setHoursWeather([]);
            setCityName('');
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&lang=ru&appid=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error('Город не найден');

                }
                const data = await response.json();

                const now = Date.now();
                const future = data.list.filter(item => new Date(item.dt_txt).getTime() > now);
                const daysHours = future.slice(0, 8);

                setCityName(data.city.name);
                setHoursWeather(daysHours);
                setError(null);

            } catch (err) {
                setError(err.message);
                setHoursWeather([]);
            }
        };
        fetchData();

    }, [searchCity]);
    if (!searchCity) return null;


    return (
        <div className={s.container}>
            <div className="box">
                <h1 className="title is-1 has-text-centered">
                    {cityName} — прогноз на 24 часа
                </h1>
            </div>
            <div className="columns is-multiline">
                {error && <p>{error}</p>}
                {!error && hoursWeather.map((hour) => (
                    <div className="column is-one-quarter" key={hour.dt}>
                        <div className="box has-text-centered"
                        style={{
                            height: 160,
                        }}>
                            <p className="title is-6">
                                {new Date(hour.dt_txt).toLocaleTimeString("ru-RU", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </p>
                            <p className="subtitle is-6">
                                {hour.weather?.[0]?.description
                                    ? hour.weather[0].description.charAt(0).toUpperCase() +
                                    hour.weather[0].description.slice(1)
                                    : ""}
                            </p>
                            <p>🌡 {hour.main ? Math.round(hour.main.temp) : "--"} °C</p>
                            <p>💨 {hour.wind ? hour.wind.speed : "--"} м/с</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}


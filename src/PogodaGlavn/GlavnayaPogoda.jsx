import React, { useState, useEffect } from "react";
import {useOutletContext, useLocation, useNavigate} from "react-router-dom";
import {API_KEY} from "../ApiKey.jsx";
import './s.css';
import s from './s.module.css';
import {logEvent} from "firebase/analytics";
import {analytics} from "../Firebase.js";


export default function PogodaGlavn() {
    const { searchCity, setSearchCity } = useOutletContext();

    const [error, setError] = useState(null);
    const [weather, setWeather] = useState({});
    const location = useLocation();
    const navigate = useNavigate();



    const cities = ['Брест', 'Минск', 'Гродно', 'Витебск', 'Гомель', 'Могилёв',
        'Москва', 'Питер', 'Париж', 'Варшава', 'Берлин', "Нью-Йорк"];

    const handleCityClick = (city) => {
        setSearchCity(city);
        logEvent(analytics, 'city_button_click', {city: city});
        navigate('/now');
    }

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&lang=ru&appid=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error('Город не найден');
                }
                const data = await response.json();
                setWeather(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        };

        if (searchCity) {
            fetchWeather();
        }
    }, [searchCity]);



    return (
        <div className={s.container}>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {location.pathname === '/' && (
                <div className="columns is-multiline is-centered">
                    {cities.map((city) => (
                        <div key={city} className="column is-one-quarter">
                            <div
                                className="card box has-text-centered"
                                onClick={() => handleCityClick(city)}
                                style={{ cursor: "pointer",
                                height: 120,
                                }}
                            >
                                <div className="card-content">
                                    <h3 className="title is-4">{city}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
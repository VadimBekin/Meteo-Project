import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { API_KEY } from "../ApiKey.jsx";
import s from './s.module.css';

export default function PogodaEightDays() {
    return (
        <div style={{ height: "80vh", width: "99%" }} className={s.container}>
            <MapContainer center={[53.9, 27.5667]} zoom={5} style={{ height: "100%", width: "100%" }}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />



                <TileLayer
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    opacity={0.6}
                />

                <TileLayer
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                    url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    opacity={1}
                />

            </MapContainer>
        </div>
    );
}
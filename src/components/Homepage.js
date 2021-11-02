import React, { useState } from 'react';
import { WeatherApi } from './weatherAPI';

function Homepage() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const fetchWeather = (event) => {
        if (event.key === "Enter") {
            fetch(`${WeatherApi.base}weather?q=${query}&units=metric&APPID=${WeatherApi.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'landing warm' : 'landing') : 'landing'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={fetchWeather}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    );
}

export default Homepage

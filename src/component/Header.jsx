import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaClock, FaCloudSun } from "react-icons/fa";

const Header = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_API_KEY";
  const LOCATION = "Bengaluru";

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (err) {
        setError("Weather unavailable");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex justify-between items-center w-full px-6 py-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm">

      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500">HRMS Dashboard</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Weather */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
          <FaCloudSun className="text-yellow-500" />

          {weather ? (
            <span className="text-sm">
              {weather.main.temp}°C • {weather.weather[0].main}
            </span>
          ) : error ? (
            <span className="text-sm text-red-400">{error}</span>
          ) : (
            <span className="text-sm text-gray-500">Loading...</span>
          )}
        </div>

        {/* Clock */}
        <div className="flex items-center gap-2 bg-green-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
          <FaClock className="text-green-600" />
          <span className="font-medium">
            {time.toLocaleTimeString()}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Header;
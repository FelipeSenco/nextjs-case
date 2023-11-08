"use client";
import { FC, useContext } from "react";
import WeatherContext from "../Contexts/WeatherContext";

const WeatherDisplay: FC = () => {
  const { weather } = useContext(WeatherContext);

  if (!weather) return null;

  return (
    <div className="text-center p-4 rounded bg-blue-50 border border-blue-200">
      <p className="text-lg text-gray-700">Weather in Brasília:</p>
      <p className="text-xl font-semibold text-gray-800">
        {weather.temp_c}° Celsius, {weather.condition.text}
      </p>
    </div>
  );
};

export default WeatherDisplay;

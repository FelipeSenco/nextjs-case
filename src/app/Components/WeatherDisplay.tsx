import { FC } from "react";

type WeatherDisplayProps = {
  weatherData: Weather | null;
};

const WeatherDisplay: FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="text-center p-4 rounded bg-blue-50 border border-blue-200">
      <p className="text-lg text-gray-700">Weather in Brasília:</p>
      <p className="text-xl font-semibold text-gray-800">
        {weatherData.temp_c}° Celsius, {weatherData.condition.text}
      </p>
    </div>
  );
};

export default WeatherDisplay;

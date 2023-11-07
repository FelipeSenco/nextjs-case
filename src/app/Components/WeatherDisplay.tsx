import { FC } from "react";

type WeatherDisplayProps = {
  data: Weather;
};

const WeatherDisplay: FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div className="text-center p-4 rounded bg-blue-50 border border-blue-200">
      <p className="text-lg text-gray-700">Weather in Brasília:</p>
      <p className="text-xl font-semibold text-gray-800">
        {data.temp_c}° Celsius, {data.condition.text}
      </p>
    </div>
  );
};

export default WeatherDisplay;

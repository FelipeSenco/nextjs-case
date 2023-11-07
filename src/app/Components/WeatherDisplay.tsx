import { FC } from "react";

type WeatherDisplayProps = {
  data: Weather;
};

const WeatherDisplay: FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div>
      Weather in Brasília is: {data.temp_c} degree celsius,{" "}
      {data.condition.text}
    </div>
  );
};

export default WeatherDisplay;

"use client";

import { getWeatherData } from "@/utils/getWeather";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

type WeatherContextType = {
  weather: Weather | null;
};

const WeatherContext = createContext<WeatherContextType>(
  {} as WeatherContextType
);

type WeatherContextProviderProps = {
  children: ReactNode;
};

export const WeatherContextProvider: FC<WeatherContextProviderProps> = ({
  children,
}) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  // useEffect(() => {
  //   getWeatherData()
  //     .then((res) => setWeather(res))
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <WeatherContext.Provider value={{ weather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;

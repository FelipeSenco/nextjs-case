import React from "react";
import WeatherDisplay from "./Components/WeatherDisplay";
import { getWeatherData } from "@/utils/getWeather";

export default async function Home() {
  const data = await getWeatherData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Welcome to my NextJs case. Thank you for this opportunity!</p>
      <WeatherDisplay data={data} />
    </main>
  );
}

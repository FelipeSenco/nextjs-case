import React from "react";
import { getWeatherData } from "@/utils/getWeather";
import WeatherDisplay from "./Components/WeatherDisplay";
import Header from "./Components/Header";

export default async function Home() {
  const data = await getWeatherData();
  return (
    <>
      <Header />
      <main className="flex min-h-screen p-24 items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for this opportunity to present my Next.js case.
          </p>
          <WeatherDisplay data={data} />
        </div>
      </main>
    </>
  );
}

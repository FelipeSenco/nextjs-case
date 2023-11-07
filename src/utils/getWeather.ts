import axios from "axios";

export async function getWeatherData(): Promise<Weather> {
  const response = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=brasilia`
  );
  return response.data?.current;
}

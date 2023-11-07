import axios from "axios";

export async function getWeatherData(): Promise<Weather> {
  const response = await axios.get(
    "http://api.weatherapi.com/v1/current.json?key={yourKey}&q=brasilia"
  );
  return response.data?.current;
}

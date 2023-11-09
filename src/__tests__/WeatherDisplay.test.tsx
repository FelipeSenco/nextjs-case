import WeatherDisplay from "../app/Components/WeatherDisplay";
import { render, screen } from "@testing-library/react";

describe("WeatherDisplay component", () => {
  test("Doesn't render if there is no weather data", () => {
    render(<WeatherDisplay weatherData={null} />);

    const weatherDisplay = document.querySelector(
      `[data-testid="weather-display"]`
    );

    expect(weatherDisplay).toBeNull();
  });

  test("Renders if there is weather data", () => {
    render(
      <WeatherDisplay
        weatherData={{ temp_c: 22, condition: { text: "Cloudy" } }}
      />
    );

    const weatherDescription = screen.getByTestId("weather-description");

    expect(weatherDescription.textContent).toContain("Cloudy");
    expect(weatherDescription.textContent).toContain("22");
  });
});

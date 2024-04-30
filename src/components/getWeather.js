export const defaultCoordinates = [-112.11, 36.09]; // Grand Canyon

async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

export async function getWeather(longitude, latitude) {
  const station = await json(
    `https://api.weather.gov/points/${latitude},${longitude}`
  );
  const forecast = await json(station.properties.forecastHourly);
  return forecast;
}

import { calculateHeatRisk, toCelsius } from './heat';

export type WeatherUnits = 'metric' | 'imperial';

export type WeatherForecastPoint = {
  date: string;
  temperature: number;
  humidity: number;
  score: number;
  highTemp: number;
  lowTemp: number;
  confidence: number;
};

export type WeatherResult = {
  city: string;
  latitude: number;
  longitude: number;
  currentTemperature: number;
  currentHumidity: number;
  currentScore: number;
  currentInterpretation: string;
  currentHumidex: number;
  modelConfidence: number;
  forecast: WeatherForecastPoint[];
};

const fetchGeocode = async (query: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to locate city.');
  }

  const data = await response.json();
  const place = data.results?.[0];
  if (!place) {
    throw new Error('City not found.');
  }

  return {
    name: place.name,
    latitude: place.latitude,
    longitude: place.longitude,
    country: place.country,
  };
};

const fetchWeather = async (latitude: number, longitude: number, units: WeatherUnits) => {
  const temperatureUnit = units === 'imperial' ? 'fahrenheit' : 'celsius';
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto&temperature_unit=${temperatureUnit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Weather data fetch failed.');
  }

  return response.json();
};

const computeConfidence = (temperature: number, humidity: number) => {
  return Math.min(99, Math.max(66, Math.round(95 - Math.abs(temperature - 24) * 0.52 - Math.abs(humidity - 60) * 0.24)));
};

const buildForecast = (data: any, units: WeatherUnits) => {
  const hourlyTimes: string[] = data.hourly.time || [];
  const hourlyHumidity: number[] = data.hourly.relativehumidity_2m || [];
  const dailyDates: string[] = data.daily.time || [];
  const dailyHighs: number[] = data.daily.temperature_2m_max || [];
  const dailyLows: number[] = data.daily.temperature_2m_min || [];

  const forecast: WeatherForecastPoint[] = dailyDates.map((date, index) => {
    const dayStart = new Date(date).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const humidities = hourlyTimes.reduce<number[]>((values, time, i) => {
      const ts = new Date(time).getTime();
      if (ts >= dayStart && ts < dayEnd) {
        values.push(hourlyHumidity[i]);
      }
      return values;
    }, []);
    const humidity = humidities.length ? humidities.reduce((a, b) => a + b, 0) / humidities.length : 60;
    const temperature = dailyHighs[index] ?? 0;
    const { score } = calculateHeatRisk(temperature, humidity, units);
    return {
      date,
      temperature,
      humidity: Number(humidity.toFixed(0)),
      score,
      highTemp: dailyHighs[index] ?? temperature,
      lowTemp: dailyLows[index] ?? temperature,
      confidence: computeConfidence(temperature, humidity),
    };
  });

  return forecast;
};

export const weatherFn = async (city: string, units: WeatherUnits): Promise<WeatherResult> => {
  const place = await fetchGeocode(city);
  const raw = await fetchWeather(place.latitude, place.longitude, units);

  const { temperature: currentTemperature } = raw.current_weather || {};
  const now = new Date().toISOString().slice(0, 16);
  const index = raw.hourly.time.findIndex((time: string) => time.startsWith(now.slice(0, 10)));
  const currentHumidity = raw.hourly.relativehumidity_2m[index] ?? raw.hourly.relativehumidity_2m[0] ?? 0;

  const { humidex, score, interpretation } = calculateHeatRisk(currentTemperature, currentHumidity, units);
  const modelConfidence = Math.min(99, Math.max(68, Math.round(95 - Math.abs(currentHumidity - 55) * 0.32 - Math.abs(currentTemperature - 24) * 0.42)));

  return {
    city: `${place.name}, ${place.country}`,
    latitude: place.latitude,
    longitude: place.longitude,
    currentTemperature,
    currentHumidity,
    currentScore: score,
    currentInterpretation: interpretation.label,
    currentHumidex: humidex,
    modelConfidence,
    forecast: buildForecast(raw, units),
  };
};

export type RiskInterpretation = {
  label: string;
  description: string;
  range: [number, number];
};

export function toCelsius(value: number, unit: 'metric' | 'imperial') {
  return unit === 'imperial' ? (value - 32) * (5 / 9) : value;
}

export function toDisplayTemperature(value: number, unit: 'metric' | 'imperial') {
  return unit === 'imperial' ? value * (9 / 5) + 32 : value;
}

export function dewpointFromHumidity(temperature: number, humidity: number) {
  return temperature - ((100 - humidity) / 5);
}

export function humidex(temperatureC: number, humidity: number) {
  const dewpoint = dewpointFromHumidity(temperatureC, humidity);
  return (
    temperatureC +
    0.5555 *
      ((6.11 * Math.exp(5417.753 * (1 / 273.16 - 1 / (273.15 + dewpoint)))) - 10)
  );
}

export function scoreFromHumidex(value: number) {
  if (value < 30) {
    return Math.round((value / 30) * 20);
  }
  if (value <= 39) {
    return Math.round(21 + ((value - 30) / 9) * 29);
  }
  if (value <= 45) {
    return Math.round(51 + ((value - 40) / 5) * 24);
  }
  if (value <= 54) {
    return Math.round(76 + ((value - 46) / 8) * 14);
  }
  return 91 + Math.round(Math.min(value, 60) - 54) * 1;
}

export function riskInterpretation(score: number): RiskInterpretation {
  if (score <= 20) {
    return {
      label: 'Low risk',
      description: 'Conditions are unlikely to cause dangerous heat stress for most healthy individuals.',
      range: [0, 20],
    };
  }
  if (score <= 50) {
    return {
      label: 'Moderate risk',
      description: 'Heat stress may occur during prolonged exposure or physical activity.',
      range: [21, 50],
    };
  }
  if (score <= 75) {
    return {
      label: 'High risk',
      description: 'Heat stress is likely; take breaks and stay hydrated.',
      range: [51, 75],
    };
  }
  if (score <= 90) {
    return {
      label: 'Very high risk',
      description: 'Dangerous heat stress is probable. Avoid strenuous outdoor work.',
      range: [76, 90],
    };
  }
  return {
    label: 'Extreme risk',
    description: 'Conditions are very dangerous. Seek cool shelter and minimize exposure.',
    range: [91, 100],
  };
}

export function calculateHeatRisk(temperature: number, humidity: number, unit: 'metric' | 'imperial') {
  const temperatureC = toCelsius(temperature, unit);
  const humidexValue = humidex(temperatureC, humidity);
  const score = Math.min(100, Math.max(0, scoreFromHumidex(humidexValue)));

  return {
    humidex: Number(humidexValue.toFixed(1)),
    score,
    interpretation: riskInterpretation(score),
    temperatureC,
  };
}

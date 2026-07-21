# Heat Risk Predictor

A minimal research prototype that estimates dangerous heat stress using temperature and humidity.

## Installation

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

## Screenshots

![Home page](./screenshot-home.png)
![Model page](./screenshot-model.png)

## Model explanation

The app uses a simplified humidex-style formula to combine temperature and relative humidity into a single risk score.

- `dewpoint = temperature - ((100 - humidity) / 5)`
- `humidex = temperature + 0.5555 * ((6.11 * exp(5417.7530 * (1/273.16 - 1/(273.15 + dewpoint)))) - 10)`

The humidex value is mapped to a 0–100 score and interpreted as low, moderate, high, very high, or extreme heat stress risk.

## Folder structure

```
src/
  routes/
    __root.tsx
    index.tsx
    model.tsx
    data.tsx
    about.tsx
  components/
    ui/
    RiskGauge.tsx
    ForecastCard.tsx
    LocationMap.tsx
    SearchBox.tsx
    UnitToggle.tsx
  lib/
    heat.ts
    weather.ts
  styles.css
  main.tsx
```

## Roadmap

- Add a results summary card with current humidity and humidex explanation
- Improve the forecast panel with a chart visualization
- Add caching logic for repeated city searches

## License

MIT

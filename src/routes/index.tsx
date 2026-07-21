import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { weatherFn, WeatherResult } from '../lib/weather';
import { SearchBox } from '../components/SearchBox';
import { UnitToggle } from '../components/UnitToggle';
import { RiskGauge } from '../components/RiskGauge';
import { ForecastCard } from '../components/ForecastCard';
import { LocationMap } from '../components/LocationMap';
import { ArrowRight } from 'lucide-react';

const fetchWeather = async (city: string, units: 'metric' | 'imperial'): Promise<WeatherResult> => {
  return weatherFn(city, units);
};

const featureContributions = [
  { label: 'Apparent temperature', value: 18.5, tone: 'positive' },
  { label: 'Wind cooling', value: -5.9, tone: 'negative' },
  { label: 'Solar radiation', value: 5.2, tone: 'positive' },
  { label: 'Urban heat island', value: 3.2, tone: 'positive' },
];

export const IndexRoute = () => {
  const [selectedCity, setSelectedCity] = useState('San Francisco');
  const [searchQuery, setSearchQuery] = useState('San Francisco');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const query = useQuery({
    queryKey: ['weather', selectedCity, units],
    queryFn: () => fetchWeather(selectedCity, units),
    enabled: !!selectedCity,
  });

  const metrics = useMemo(
    () =>
      query.data
        ? [
            {
              label: 'Apparent temperature',
              value: `${query.data.currentHumidex.toFixed(1)}°`,
              subtext: 'Thermal load estimate',
            },
            {
              label: 'Air temperature',
              value: `${query.data.currentTemperature.toFixed(1)}°`,
              subtext: 'Ambient temperature',
            },
            {
              label: 'Model confidence',
              value: `${query.data.modelConfidence}%`,
              subtext: 'Prediction certainty',
            },
          ]
        : [],
    [query.data],
  );

  return (
    <main className="max-w-8xl mx-auto px-6 py-10 space-y-10 lg:px-8">
      <section className="space-y-4 text-left">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">
          EXPLAINABLE AI · HEAT STRESS PREDICTION
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-serif font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          How likely is dangerous heat stress at this location — and why?
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
          A clean research prototype that converts weather, humidity, and context into a concise heat risk score, ranked feature contributions, and a five-day outlook.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Location analysis</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Search a place to inspect heat stress risk.</h2>
          </div>
          <UnitToggle value={units} onChange={setUnits} />
        </div>

        <div className="mt-8">
          <SearchBox
            initialValue={searchQuery}
            onSearch={(value) => {
              setSearchQuery(value);
              setSelectedCity(value);
            }}
            disabled={query.isFetching}
          />
        </div>
      </section>

      {query.data && (
        <section className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
            <RiskGauge score={query.data.currentScore} label={query.data.currentInterpretation} />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{metric.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Why this score</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Feature contributions</h2>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                Ranked
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {featureContributions.map((item) => (
                <div key={item.label} className="space-y-3">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-700">
                    <span>{item.label}</span>
                    <span className={`font-semibold ${item.tone === 'negative' ? 'text-sky-600' : 'text-emerald-700'}`}>
                      {item.tone === 'negative' ? '' : '+'}
                      {item.value} pts
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.tone === 'negative' ? 'bg-sky-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, Math.max(12, Math.abs(item.value) * 4))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {query.data && (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Forecast</p>
              <h2 className="text-3xl font-semibold text-slate-900">5-day heat risk outlook</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <ArrowRight size={16} /> Daily score
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4">
            {query.data.forecast.map((point) => (
              <ForecastCard key={point.date} point={point} />
            ))}
          </div>
        </section>
      )}

      {query.data && (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Location map</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Heat stress at a glance</h2>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{query.data.city}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">Risk level</p>
              <p className="mt-1 text-sm text-slate-700">{query.data.currentInterpretation}</p>
            </div>
          </div>
          <LocationMap
            latitude={query.data.latitude}
            longitude={query.data.longitude}
            location={query.data.city}
            risk={query.data.currentInterpretation}
          />
        </section>
      )}

      <footer className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Research prototype. Not a substitute for official heat advisories.</p>
        <div className="flex flex-wrap items-center gap-4 text-slate-600">
          <a href="/model" className="transition hover:text-slate-900">Model card</a>
          <a href="/data" className="transition hover:text-slate-900">Data sources</a>
          <a href="/about" className="transition hover:text-slate-900">About</a>
        </div>
      </footer>
    </main>
  );
};

export function head() {
  return {
    title: 'Heat Risk Predictor',
    description: 'Estimate dangerous heat stress risk with temperature and humidity data.',
  };
}

export default IndexRoute;

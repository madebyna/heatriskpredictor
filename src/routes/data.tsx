import React from 'react';

export const DataRoute = () => {
  return (
    <main className="space-y-10">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Data sources</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Weather data powering the risk estimate
        </h1>
      </section>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Primary source</h2>
        <p className="text-sm leading-7 text-slate-600">
          This app uses Open-Meteo for free global weather observations and forecasts. Open-Meteo provides hourly temperature and humidity estimates without requiring an API key.
        </p>
      </article>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Freshness and update frequency</h2>
        <p className="text-sm leading-7 text-slate-600">
          Weather data is requested live for each city search. The underlying forecast is refreshed frequently by Open-Meteo, but the app does not cache long-term historical data.
        </p>
      </article>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Limitations</h2>
        <ul className="list-disc space-y-3 pl-6 text-sm leading-7 text-slate-600">
          <li>Open-Meteo is a weather forecast service, not a heat stress medical data provider.</li>
          <li>Local conditions such as direct sun, shade, and air movement are not captured.</li>
          <li>Forecast daily scores are based on modelled humidity averages, not minute-by-minute observations.</li>
        </ul>
      </article>
    </main>
  );
};

export function head() {
  return {
    title: 'Data Sources',
    description: 'Information about the Open-Meteo weather data and its limitations.',
  };
}

export default DataRoute;

import React from 'react';
import { Info, Sparkles, Shield } from 'lucide-react';

export const ModelRoute = () => {
  return (
    <main className="space-y-10">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Model card</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          How the heat risk score is calculated
        </h1>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <div className="mb-4 flex items-center gap-3 text-sky-600">
            <Info size={20} />
            <h2 className="text-xl font-semibold text-slate-900">Inputs</h2>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            The model uses current temperature and relative humidity for the selected city. Ambient temperature is converted into humidex using a simplified dew point estimate.
          </p>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <div className="mb-4 flex items-center gap-3 text-sky-600">
            <Sparkles size={20} />
            <h2 className="text-xl font-semibold text-slate-900">Formula</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl bg-slate-50 p-4">
            <pre className="whitespace-pre-wrap break-words text-sm text-slate-700">
humidex = temperature + 0.5555 * ((6.11 * exp(5417.7530 * (1/273.16 - 1/(273.15 + dewpoint)))) - 10)
dewpoint = temperature - ((100 - humidity) / 5)
            </pre>
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <div className="mb-4 flex items-center gap-3 text-sky-600">
          <Shield size={20} />
          <h2 className="text-xl font-semibold text-slate-900">Assumptions and limitations</h2>
        </div>
        <ul className="list-disc space-y-3 pl-6 text-sm leading-7 text-slate-600">
          <li>The humidex formula is a simplified proxy and may not reflect local microclimates.</li>
          <li>Relative humidity is estimated from Open-Meteo hourly observations, which may lag actual conditions.</li>
          <li>This score is for broad risk interpretation only and is not a medical recommendation.</li>
        </ul>
      </article>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Confidence notes</h2>
        <p className="text-sm leading-7 text-slate-600">
          The model provides a transparent, reproducible estimate using open weather data. Confidence is moderate for typical weather patterns and lower when humidity or temperature readings are sparse.
        </p>
        <p className="mt-4 text-sm text-slate-500">Data source: Open-Meteo API.</p>
      </article>
    </main>
  );
};

export function head() {
  return {
    title: 'Heat Risk Model',
    description: 'Explanation of the heat risk formula, inputs, and limitations.',
  };
}

export default ModelRoute;

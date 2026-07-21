import React from 'react';
import { WeatherForecastPoint } from '../lib/weather';

const statusStyles = {
  low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  moderate: 'border-amber-200 bg-amber-50 text-amber-700',
  high: 'border-rose-200 bg-rose-50 text-rose-700',
};

const getRiskLevel = (score: number) => {
  if (score < 40) return { label: 'Low', style: statusStyles.low };
  if (score < 75) return { label: 'Moderate', style: statusStyles.moderate };
  return { label: 'High', style: statusStyles.high };
};

export function ForecastCard({ point }: { point: WeatherForecastPoint }) {
  const { label, style } = getRiskLevel(point.score);
  const date = new Date(point.date);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
      <div className="space-y-2 text-sm uppercase tracking-[0.24em] text-slate-500">
        <div>{date.toLocaleDateString(undefined, { weekday: 'short' })}</div>
        <div className="text-slate-400">{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
      </div>
      <div className="mt-4 text-3xl font-semibold text-slate-900">{point.score}/100</div>
      <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${style}`}>{label}</span>
      <div className="mt-4 space-y-2 text-sm text-slate-700">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span>High</span>
          <strong>{point.highTemp.toFixed(0)}°</strong>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span>Low</span>
          <strong>{point.lowTemp.toFixed(0)}°</strong>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
        Confidence <span className="font-semibold text-slate-900">{point.confidence}%</span>
      </div>
    </article>
  );
}

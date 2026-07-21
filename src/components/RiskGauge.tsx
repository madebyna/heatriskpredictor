import React from 'react';

type RiskGaugeProps = {
  score: number;
  label: string;
};

const statusStyles = {
  low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  moderate: 'border-amber-200 bg-amber-50 text-amber-700',
  high: 'border-rose-200 bg-rose-50 text-rose-700',
};

const getStatus = (score: number) => {
  if (score < 40) return { label: 'Low risk', style: statusStyles.low };
  if (score < 75) return { label: 'Moderate risk', style: statusStyles.moderate };
  return { label: 'High risk', style: statusStyles.high };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [`M ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`].join(' ');
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export function RiskGauge({ score, label }: RiskGaugeProps) {
  const { label: statusLabel, style } = getStatus(score);
  const radius = 114;
  const progressLength = Math.PI * radius;
  const progress = (Math.max(0, Math.min(100, score)) / 100) * progressLength;
  const path = describeArc(120, 120, radius, 180, 0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mx-auto mb-8 max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Current risk score</p>
        <h2 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">{score}</h2>
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500 mt-1">/ 100</p>
        <span className={`mt-5 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${style}`}>
          {statusLabel}
        </span>
      </div>

      <div className="mx-auto mb-6 w-full max-w-[280px]">
        <svg viewBox="0 0 240 140" className="w-full">
          <path d={path} fill="none" stroke="#E2E8F0" strokeWidth="16" />
          <path
            d={path}
            fill="none"
            stroke="url(#gauge-gradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${progressLength}`}
            strokeDashoffset={progressLength}
          />
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className="text-center text-sm text-slate-500">{label}</p>
    </div>
  );
}

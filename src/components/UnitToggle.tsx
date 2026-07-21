import React from 'react';

type UnitToggleProps = {
  value: 'metric' | 'imperial';
  onChange: (value: 'metric' | 'imperial') => void;
};

export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <fieldset className="flex gap-2 rounded-2xl border border-border bg-surface p-3 text-sm text-muted">
      <legend className="sr-only">Temperature units</legend>
      {(['metric', 'imperial'] as const).map((unit) => (
        <label key={unit} className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition hover:bg-background/50">
          <input
            type="radio"
            name="units"
            value={unit}
            checked={value === unit}
            onChange={() => onChange(unit)}
            className="h-4 w-4 text-primary ring-offset-background focus:ring-primary"
          />
          <span className="capitalize">{unit === 'metric' ? '°C' : '°F'}</span>
        </label>
      ))}
    </fieldset>
  );
}

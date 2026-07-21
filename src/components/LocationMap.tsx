import React from 'react';

type LocationMapProps = {
  latitude: number;
  longitude: number;
  location: string;
  risk: string;
};

export function LocationMap({ latitude, longitude, location, risk }: LocationMapProps) {
  const bboxMargin = 0.2;
  const left = longitude - bboxMargin;
  const bottom = latitude - bboxMargin;
  const right = longitude + bboxMargin;
  const top = latitude + bboxMargin;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <iframe
        title="Selected location map"
        src={mapSrc}
        className="h-[350px] w-full border-0"
      />
      <div className="absolute left-6 top-6 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm">
        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{location}</div>
        <div className="mt-1 font-semibold">{risk}</div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

type SearchBoxProps = {
  initialValue: string;
  onSearch: (value: string) => void;
  disabled?: boolean;
};

export function SearchBox({ initialValue, onSearch, disabled }: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query.trim() || initialValue);
      }}
      className="flex w-full flex-col gap-3"
    >
      <div className="grid gap-3 sm:grid-cols-[1.6fr_0.9fr]">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="San Francisco, London, Nairobi"
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          aria-label="City name"
          disabled={disabled}
        />
        <button
          type="submit"
          className="h-14 rounded-2xl bg-sky-600 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled}
        >
          Search
        </button>
      </div>
      <p className="text-sm text-slate-500">
        Enter a location to visualize heat stress risk and forecast contribution factors.
      </p>
    </form>
  );
}

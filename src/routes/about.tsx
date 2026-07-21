import React from 'react';

export const AboutRoute = () => {
  return (
    <main className="space-y-10">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">About</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          A lightweight prototype for understanding heat stress risk
        </h1>
      </section>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-8">
        <p className="text-sm leading-7 text-slate-600">
          Heat Risk Predictor is designed to clarify how temperature and humidity combine to influence dangerous heat stress. It is built as a minimal research tool with transparent formula details and forecast risk scores.
        </p>
      </article>
    </main>
  );
};

export function head() {
  return {
    title: 'About Heat Risk Predictor',
    description: 'Learn the purpose of this heat risk research prototype.',
  };
}

export default AboutRoute;

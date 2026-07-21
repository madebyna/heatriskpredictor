import React from 'react';
import { Outlet, createRootRoute, createRoute } from '@tanstack/react-router';
import { lazy } from 'react';

export const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <nav className="flex items-center justify-between py-4 border-b border-slate-200 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Heat Risk Predictor v0.1</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Explainable heat risk forecasting</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="/" className="transition hover:text-slate-900">Predict</a>
            <a href="/model" className="transition hover:text-slate-900">Model</a>
            <a href="/data" className="transition hover:text-slate-900">Data</a>
            <a href="/about" className="transition hover:text-slate-900">About</a>
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazy(() => import('./index')),
});

const modelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/model',
  component: lazy(() => import('./model')),
});

const dataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/data',
  component: lazy(() => import('./data')),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: lazy(() => import('./about')),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  modelRoute,
  dataRoute,
  aboutRoute,
]);

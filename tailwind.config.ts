import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-strong': 'var(--surface-strong)',
        text: 'var(--text)',
        'text-alt': 'var(--text-alt)',
        primary: 'var(--primary)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
} satisfies Config;

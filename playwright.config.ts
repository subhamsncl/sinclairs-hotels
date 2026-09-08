import { defineConfig, devices } from '@playwright/test';

// Needed by specs that log in as staff (ADMIN_PASSWORD) or clean up rows they
// created (DATABASE_URL) — Playwright doesn't load .env.local on its own the
// way Next's dev/start process does. Each worker process re-requires this
// config, so this runs per-worker; a missing file (e.g. in CI, which injects
// real env vars instead) is expected, not an error.
try {
  process.loadEnvFile('.env.local');
} catch {}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

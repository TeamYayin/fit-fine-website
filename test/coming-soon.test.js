import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  getRemainingTime,
  formatTimeUnit,
  resolveLaunchDate,
} from '../src/utils/countdown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Countdown utility - calculates correct remaining time for future date', () => {
  const baseTime = new Date('2026-01-01T00:00:00Z').getTime();
  // 5 days, 4 hours, 30 minutes, 15 seconds ahead
  const target = new Date(baseTime + ((5 * 24 + 4) * 60 + 30) * 60 * 1000 + 15 * 1000);

  const result = getRemainingTime(target, baseTime);
  assert.equal(result.days, 5);
  assert.equal(result.hours, 4);
  assert.equal(result.minutes, 30);
  assert.equal(result.seconds, 15);
  assert.ok(result.totalMs > 0);
});

test('Countdown utility - clamps past date to 0', () => {
  const baseTime = new Date('2026-06-01T00:00:00Z').getTime();
  const pastTarget = new Date('2026-01-01T00:00:00Z');

  const result = getRemainingTime(pastTarget, baseTime);
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
  assert.equal(result.totalMs, 0);
});

test('Countdown utility - handles invalid target gracefully', () => {
  const result = getRemainingTime('invalid-date-format', Date.now());
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
  assert.equal(result.totalMs, 0);
});

test('Countdown utility - formats time unit with 2-digit padding', () => {
  assert.equal(formatTimeUnit(0), '00');
  assert.equal(formatTimeUnit(7), '07');
  assert.equal(formatTimeUnit(14), '14');
  assert.equal(formatTimeUnit(59), '59');
  assert.equal(formatTimeUnit(-5), '00');
});

test('Countdown utility - resolves launch date from environment cascading priority', () => {
  // Test PUBLIC_LAUNCH_DATE priority
  const env1 = {
    PUBLIC_LAUNCH_DATE: '2026-12-01T00:00:00+05:30',
    LAUNCH_DATE: '2026-11-01T00:00:00+05:30',
  };
  assert.equal(resolveLaunchDate(env1), '2026-12-01T00:00:00+05:30');

  // Test LAUNCH_DATE fallback
  const env2 = {
    LAUNCH_DATE: '2026-11-01T00:00:00+05:30',
    VITE_LAUNCH_DATE: '2026-09-01T00:00:00+05:30',
  };
  assert.equal(resolveLaunchDate(env2), '2026-11-01T00:00:00+05:30');

  // Test VITE_LAUNCH_DATE backwards compatibility
  const env3 = {
    VITE_LAUNCH_DATE: '2026-09-01T00:00:00+05:30',
  };
  assert.equal(resolveLaunchDate(env3), '2026-09-01T00:00:00+05:30');

  // Test default fallback
  assert.equal(resolveLaunchDate({}), '2026-10-01T00:00:00+05:30');
});

test('Project structure - required Astro files exist', () => {
  const files = [
    'astro.config.mjs',
    'tailwind.config.mjs',
    'src/pages/index.astro',
    'src/layouts/Layout.astro',
    'src/components/Hero.astro',
    'src/components/Countdown.astro',
    'src/components/BackgroundEffect.astro',
    'src/utils/countdown.js',
    'public/assets/eugen-fnf-hero.png',
  ];

  for (const file of files) {
    const fullPath = path.join(rootDir, file);
    assert.ok(fs.existsSync(fullPath), `Expected ${file} to exist`);
  }
});

test('Astro config - outputs static site for Cloudflare Pages', () => {
  const astroConfig = fs.readFileSync(path.join(rootDir, 'astro.config.mjs'), 'utf-8');
  assert.match(astroConfig, /output:\s*['"]static['"]/);
  assert.match(astroConfig, /tailwind\(\)/);
});


/**
 * Computes remaining time breakdown until target date.
 *
 * @param {Date | string | number} target
 * @param {number} [now=Date.now()]
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, totalMs: number }}
 */
export function getRemainingTime(target, now = Date.now()) {
  const targetDate = target instanceof Date ? target : new Date(target);
  const targetMs = isNaN(targetDate.getTime()) ? 0 : targetDate.getTime();
  const distance = Math.max(0, targetMs - now);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    totalMs: distance,
  };
}

/**
 * Formats a unit number into two-digit string.
 *
 * @param {number} value
 * @returns {string}
 */
export function formatTimeUnit(value) {
  return String(Math.max(0, Math.floor(value || 0))).padStart(2, '0');
}

/**
 * Resolves configured launch date from environment or returns default.
 *
 * @param {Record<string, any>} [env={}]
 * @returns {string}
 */
export function resolveLaunchDate(env = {}) {
  const nodeEnv = typeof process !== 'undefined' && process?.env ? process.env : {};
  return (
    env?.PUBLIC_LAUNCH_DATE ||
    nodeEnv.PUBLIC_LAUNCH_DATE ||
    env?.LAUNCH_DATE ||
    nodeEnv.LAUNCH_DATE ||
    env?.VITE_LAUNCH_DATE ||
    nodeEnv.VITE_LAUNCH_DATE ||
    '2026-10-01T00:00:00+05:30'
  );
}


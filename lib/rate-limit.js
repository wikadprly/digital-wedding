const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 6;
const PRUNE_EVERY = 256;

const buckets = new Map();
let operations = 0;

export function rateLimit(
  key,
  { windowMs = WINDOW_MS, max = MAX_REQUESTS } = {},
) {
  const now = Date.now();
  operations += 1;

  if (operations % PRUNE_EVERY === 0) {
    for (const [bucketKey, entry] of buckets) {
      if (now > entry.resetAt) buckets.delete(bucketKey);
    }
    operations = 0;
  }

  const current = buckets.get(key) || { count: 0, resetAt: now + windowMs };
  if (now > current.resetAt) {
    current.count = 0;
    current.resetAt = now + windowMs;
  }
  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: current.count <= max,
    remaining: Math.max(0, max - current.count),
    resetAt: current.resetAt,
  };
}
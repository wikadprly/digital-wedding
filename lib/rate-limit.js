import { query } from "@/lib/db";

const DEFAULT_WINDOW_MS = 60 * 1000;
const DEFAULT_MAX = 6;
const PRUNE_EVERY = 128;

let operations = 0;

export async function rateLimit(
  key,
  { windowMs = DEFAULT_WINDOW_MS, max = DEFAULT_MAX } = {},
) {
  operations += 1;

  if (operations % PRUNE_EVERY === 0) {
    try {
      await query(
        "DELETE FROM rate_limits WHERE reset_at < now() - interval '6 hours'",
      );
    } catch {
      // pruning is best-effort
    }
  }

  const { rows } = await query(
    `INSERT INTO rate_limits (key, count, reset_at, created_at)
     VALUES ($1, 1, now() + make_interval(secs => $2 / 1000.0), now())
     ON CONFLICT (key) DO UPDATE
     SET count = CASE
           WHEN rate_limits.reset_at <= now() THEN 1
           ELSE rate_limits.count + 1
         END,
         reset_at = CASE
           WHEN rate_limits.reset_at <= now()
           THEN now() + make_interval(secs => $2 / 1000.0)
           ELSE rate_limits.reset_at
         END
     RETURNING count, reset_at`,
    [key, windowMs],
  );

  const current = rows[0];
  const count = Number(current.count);

  return {
    allowed: count <= max,
    remaining: Math.max(0, max - count),
    resetAt: new Date(current.reset_at).getTime(),
  };
}
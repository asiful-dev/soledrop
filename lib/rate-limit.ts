import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let rateLimiter: Ratelimit | null = null;

function getRateLimiter() {
  if (rateLimiter) {
    return rateLimiter;
  }

  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }

  rateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"),
    analytics: true,
    prefix: "soledrop",
  });

  return rateLimiter;
}

export async function applyRateLimit(identifier: string) {
  const limiter = getRateLimiter();

  if (!limiter) {
    return { error: false };
  }

  const { success, limit, reset, remaining } = await limiter.limit(identifier);

  if (!success) {
    return {
      error: true,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    };
  }

  return { error: false };
}

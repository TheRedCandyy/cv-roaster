import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store for rate limiting
// Note: In production, use Redis or other distributed cache instead
interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Rate limit configuration
const RATE_LIMIT = 5; // requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

export async function rateLimit(req: NextRequest) {
  // Get client IP
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const now = Date.now();

  // Clean up expired entries
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });

  // Initialize or get current user's rate limit info
  if (!store[ip]) {
    store[ip] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
  }

  // Check if user has exceeded rate limit
  if (store[ip].count >= RATE_LIMIT) {
    const secondsToReset = Math.ceil((store[ip].resetTime - now) / 1000);
    return {
      limited: true,
      response: NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `Too many requests. Please try again in ${secondsToReset} seconds.`,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": RATE_LIMIT.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(
              store[ip].resetTime / 1000
            ).toString(),
            "Retry-After": secondsToReset.toString(),
          },
        }
      ),
    };
  }

  // Increment request count
  store[ip].count++;

  // Return rate limit info
  return {
    limited: false,
    rateLimit: {
      limit: RATE_LIMIT,
      remaining: RATE_LIMIT - store[ip].count,
      reset: store[ip].resetTime,
    },
  };
}

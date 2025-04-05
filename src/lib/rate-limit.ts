import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store for rate limiting
// Note: In production, use Redis or other distributed cache instead
interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
    day: string; // Track the current day
  };
}

const store: RateLimitStore = {};

// Rate limit configuration
const RATE_LIMIT = 5; // requests per day

// Get the current day in YYYY-MM-DD format
function getCurrentDay(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;
}

// Get milliseconds until midnight
function getMillisecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

export async function rateLimit(req: NextRequest) {
  // Get client IP
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const currentDay = getCurrentDay();
  const millisecondsUntilMidnight = getMillisecondsUntilMidnight();

  // Reset count if it's a new day
  if (store[ip] && store[ip].day !== currentDay) {
    store[ip] = {
      count: 0,
      resetTime: now + millisecondsUntilMidnight,
      day: currentDay,
    };
  }

  // Initialize or get current user's rate limit info
  if (!store[ip]) {
    store[ip] = {
      count: 0,
      resetTime: now + millisecondsUntilMidnight,
      day: currentDay,
    };
  }

  // Check if user has exceeded rate limit
  if (store[ip].count >= RATE_LIMIT) {
    const secondsToReset = Math.ceil((store[ip].resetTime - now) / 1000);
    // Convert seconds to a more human-readable format for daily limits
    const hoursToReset = Math.floor(secondsToReset / 3600);
    const minutesToReset = Math.floor((secondsToReset % 3600) / 60);

    // Format the time message based on when the limit resets
    let timeMessage;
    if (hoursToReset > 0) {
      timeMessage = `${hoursToReset} hours and ${minutesToReset} minutes`;
    } else if (minutesToReset > 0) {
      timeMessage = `${minutesToReset} minutes`;
    } else {
      timeMessage = "a few seconds";
    }

    return {
      limited: true,
      response: NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `Daily limit reached. You can upload ${RATE_LIMIT} CVs per day. Please try again in ${timeMessage}.`,
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

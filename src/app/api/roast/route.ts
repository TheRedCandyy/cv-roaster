import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { promises as fs } from "fs";
import * as path from "path";
import { parseForm } from "@/lib/parse-form";
import { Language } from "@/contexts/language-context";
import { translations } from "@/lib/translations";
import { rateLimit } from "@/lib/rate-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Maximum CV size in bytes (5MB)
const MAX_CV_SIZE = 5 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export async function POST(req: NextRequest) {
  try {
    // Check for CSRF protection
    const referer = req.headers.get("referer");
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");

    // If referer/origin doesn't match our host, reject the request
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "CSRF check failed" }, { status: 403 });
    }

    // Apply rate limiting
    const rateLimitResult = await rateLimit(req);

    // If rate limited, return the rate limit response
    if (rateLimitResult.limited) {
      return rateLimitResult.response;
    }

    const { fields, files } = await parseForm(req);

    if (!files.cv || !files.cv[0]) {
      return NextResponse.json(
        { error: "No CV was uploaded" },
        { status: 400 }
      );
    }

    const file = files.cv[0];

    // Security checks for the file
    if (file.size > MAX_CV_SIZE) {
      return NextResponse.json(
        { error: "File too large, maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Validate MIME type (with null check)
    if (!file.mimetype || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.",
        },
        { status: 400 }
      );
    }

    // Get language from the form data
    const language = (fields.language?.[0] || "en") as Language;

    // Get translations for the selected language
    const t = translations[language];

    const buffer = await fs.readFile(file.filepath);
    const fileContent = buffer.toString();

    // Sanitize the content by limiting length
    const sanitizedContent = fileContent.slice(0, 50000); // Limit to 50K characters

    const systemPrompt = `${t.systemPrompt} Keep your response concise, around 2000 characters maximum.`;

    const prompt = `
      ${t.userPrompt}
      ${sanitizedContent}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 800, // This should yield roughly 2000 characters
    });

    // Cleanup temp file
    await fs.unlink(file.filepath);

    // Add rate limit headers to the response
    const headers: Record<string, string> = {};

    // Only add rate limit headers if the rate limit info is available
    if (rateLimitResult.rateLimit) {
      headers["X-RateLimit-Limit"] = rateLimitResult.rateLimit.limit.toString();
      headers["X-RateLimit-Remaining"] =
        rateLimitResult.rateLimit.remaining.toString();
      headers["X-RateLimit-Reset"] = Math.ceil(
        rateLimitResult.rateLimit.reset / 1000
      ).toString();
    }

    // Add security headers
    headers["Content-Security-Policy"] = "default-src 'self'";
    headers["X-Content-Type-Options"] = "nosniff";
    headers["X-Frame-Options"] = "DENY";
    headers["Referrer-Policy"] = "strict-origin-when-cross-origin";

    return NextResponse.json(
      { roast: response.choices[0].message.content },
      { headers }
    );
  } catch (error) {
    console.error("Error processing CV:", error);
    return NextResponse.json(
      { error: "Failed to process CV" },
      { status: 500 }
    );
  }
}

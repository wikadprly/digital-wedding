import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const MAX_NAME_LENGTH = 80;

export async function GET(request, { params }) {
  try {
    const { uid, name } = await params;
    const decodedName = decodeURIComponent(name).trim();

    if (!decodedName || decodedName.length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    if (decodedName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Name is too long" },
        { status: 400 },
      );
    }

    const ip =
      request.headers.get("x-real-ip")?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const ipLimit = await rateLimit(`wish-check:${uid}:ip:${ip}`);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          code: "RATE_LIMITED",
        },
        { status: 429 },
      );
    }

    const existingWish = await query(
      "SELECT id FROM wishes WHERE invitation_uid = $1 AND name = $2",
      [uid, decodedName],
    );

    return NextResponse.json({
      success: true,
      hasSubmitted: existingWish.rows.length > 0,
    });
  } catch (error) {
    console.error("Error checking wish:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
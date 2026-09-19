import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { isAllowedUid } from "@/lib/allowed-uids";

const MAX_NAME_LENGTH = 80;

function decodeName(raw) {
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  try {
    const { uid, name } = await params;

    if (!isAllowedUid(uid)) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 },
      );
    }

    const decodedName = decodeName(name);
    if (!decodedName) {
      return NextResponse.json(
        { success: false, error: "Invalid name" },
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
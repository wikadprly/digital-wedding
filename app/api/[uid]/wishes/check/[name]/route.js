import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { uid, name } = await params;
    const decodedName = decodeURIComponent(name);

    if (!decodedName || decodedName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    const existingWish = await query(
      "SELECT id FROM wishes WHERE invitation_uid = $1 AND name = $2",
      [uid, decodedName.trim()],
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

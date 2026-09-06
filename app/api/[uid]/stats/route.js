import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { uid } = await params;

    const result = await query(
      `SELECT
            COUNT(*) FILTER (WHERE attendance = 'ATTENDING') as attending,
            COUNT(*) FILTER (WHERE attendance = 'NOT_ATTENDING') as not_attending,
            COUNT(*) FILTER (WHERE attendance = 'MAYBE') as maybe,
            COUNT(*) as total
       FROM wishes
       WHERE invitation_uid = $1`,
      [uid],
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

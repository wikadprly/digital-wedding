import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { uid } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

    const invitation = await query(
      "SELECT uid FROM invitations WHERE uid = $1",
      [uid],
    );
    if (invitation.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 },
      );
    }

    const result = await query(
      `SELECT id, name, message, attendance,
              created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta' as created_at
       FROM wishes
       WHERE invitation_uid = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [uid, limit, offset],
    );

    const countResult = await query(
      "SELECT COUNT(*) FROM wishes WHERE invitation_uid = $1",
      [uid],
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count, 10),
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Error fetching wishes:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { uid } = await params;
    const body = await request.json();
    const { name, message, attendance = "attending" } = body;

    if (!name || !name.trim() || !message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 },
      );
    }

    const invitation = await query(
      "SELECT uid FROM invitations WHERE uid = $1",
      [uid],
    );
    if (invitation.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 },
      );
    }

    const dbAttendance = {
      attending: "ATTENDING",
      notAttending: "NOT_ATTENDING",
      maybe: "MAYBE",
    }[attendance] || "ATTENDING";

    const existingWish = await query(
      "SELECT id FROM wishes WHERE invitation_uid = $1 AND name = $2",
      [uid, name],
    );
    if (existingWish.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already submitted a wish. Each guest can only send one wish.",
          code: "WISH_ALREADY_EXISTS",
        },
        { status: 409 },
      );
    }

    try {
      const result = await query(
        `INSERT INTO wishes (invitation_uid, name, message, attendance, created_at)
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Jakarta')
         RETURNING id, name, message, attendance,
                   created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta' as created_at`,
        [uid, name, message, dbAttendance],
      );
      return NextResponse.json(
        { success: true, data: result.rows[0] },
        { status: 201 },
      );
    } catch (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            error: "You have already submitted a wish. Each guest can only send one wish.",
            code: "WISH_ALREADY_EXISTS",
          },
          { status: 409 },
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Error creating wish:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

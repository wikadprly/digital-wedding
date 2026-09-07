import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { z } from "zod";

const wishSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  message: z.string().trim().min(1, "Message is required").max(1000),
  attendance: z
    .enum(["attending", "not_attending", "maybe"])
    .default("attending"),
});

export async function GET(request, { params }) {
  try {
    const { uid } = await params;
    const searchParams = request.nextUrl.searchParams;
    const rawLimit = parseInt(searchParams.get("limit") || "50", 10);
    const rawOffset = parseInt(searchParams.get("offset") || "0", 10);
    const limit = Number.isNaN(rawLimit) ? 50 : Math.min(rawLimit, 100);
    const offset = Number.isNaN(rawOffset) ? 0 : Math.max(rawOffset, 0);

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
      `SELECT id, name, message,
              LOWER(attendance) as attendance,
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
    const body = await request.json().catch(() => null);

    const parsed = wishSchema.safeParse(body ?? {});
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            parsed.error.issues[0]?.message || "Invalid request body",
        },
        { status: 400 },
      );
    }
    const { name, message, attendance } = parsed.data;

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
      not_attending: "NOT_ATTENDING",
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
         RETURNING id, name, message, LOWER(attendance) as attendance, edit_token,
                   created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta' as created_at`,
        [uid, name, message, dbAttendance],
      );
      const wish = result.rows[0];
      return NextResponse.json(
        {
          success: true,
          data: {
            id: wish.id,
            name: wish.name,
            message: wish.message,
            attendance: wish.attendance,
            created_at: wish.created_at,
            editToken: wish.edit_token,
          },
        },
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

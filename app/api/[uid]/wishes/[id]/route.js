import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { uid, id } = await params;
    const token = request.headers.get("x-wish-token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing edit token" },
        { status: 401 },
      );
    }

    const result = await query(
      "DELETE FROM wishes WHERE id = $1 AND invitation_uid = $2 AND edit_token = $3 RETURNING id",
      [id, uid, token],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Wish not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Wish deleted" });
  } catch (error) {
    console.error("Error deleting wish:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
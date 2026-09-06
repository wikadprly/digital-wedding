import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { uid, id } = await params;

    const result = await query(
      "DELETE FROM wishes WHERE id = $1 AND invitation_uid = $2 RETURNING id",
      [id, uid],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Wish not found" },
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

import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { uid } = await params;

    const invitationResult = await query(
      "SELECT * FROM invitations WHERE uid = $1",
      [uid],
    );

    if (invitationResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 },
      );
    }

    const invitation = invitationResult.rows[0];

    const agendaResult = await query(
      "SELECT id, title, date, start_time, end_time, location, address FROM agenda WHERE invitation_uid = $1 ORDER BY order_index, date",
      [uid],
    );

    const banksResult = await query(
      "SELECT id, bank, account_number, account_name FROM banks WHERE invitation_uid = $1 ORDER BY order_index",
      [uid],
    );

    const data = {
      title: invitation.title,
      description: invitation.description,
      groomName: invitation.groom_name,
      brideName: invitation.bride_name,
      parentGroom: invitation.parent_groom,
      parentBride: invitation.parent_bride,
      date: invitation.wedding_date,
      time: invitation.time,
      location: invitation.location,
      address: invitation.address,
      maps_url: invitation.maps_url,
      maps_embed: invitation.maps_embed,
      ogImage: invitation.og_image,
      favicon: invitation.favicon,
      audio: invitation.audio,
      agenda: agendaResult.rows.map((a) => ({
        title: a.title,
        date: a.date,
        startTime: a.start_time,
        endTime: a.end_time,
        location: a.location,
        address: a.address,
      })),
      banks: banksResult.rows.map((b) => ({
        bank: b.bank,
        accountNumber: b.account_number,
        accountName: b.account_name,
      })),
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching invitation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

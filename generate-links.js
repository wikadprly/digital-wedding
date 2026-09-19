/**
 * Script to generate personalized invitation links
 *
 * Usage:
 *   npm run generate-links
 *
 * This will output personalized invitation links for each guest
 */

import config from "./config/config.js";

function generateInvitationLink(
  uid,
  guestName,
  baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
) {
  const encodedName = encodeURIComponent(guestName);
  return `${baseUrl}/${uid}?to=${encodedName}`;
}

// ===== CONFIGURATION =====
const INVITATION_UID = config.data.uid; // diatur di config/config.js
// Untuk link produksi, set NEXT_PUBLIC_SITE_URL (contoh: https://domain-anda.com)
// atau ubah fallback di bawah ini.
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

// List of guests
const guestList = [
  "Rema",
  "Ahmad Abdullah",
  "Sarah Johnson",
  "Bapak Rudi & Keluarga",
  "Ibu Siti & Keluarga",
  "Keluarga Besar Hartono",
];

// ===== GENERATE LINKS =====
console.log(
  "\n╔══════════════════════════════════════════════════════════════╗",
);
console.log("║          PERSONALIZED WEDDING INVITATION LINKS               ║");
console.log(
  "╚══════════════════════════════════════════════════════════════╝\n",
);

console.log(`Invitation UID: ${INVITATION_UID}`);
console.log(`Base URL: ${BASE_URL}\n`);
console.log("─".repeat(70) + "\n");

guestList.forEach((guestName, index) => {
  const link = generateInvitationLink(INVITATION_UID, guestName, BASE_URL);
  console.log(`${index + 1}. ${guestName}`);
  console.log(`   ${link}\n`);
});

console.log("─".repeat(70));
console.log(`\nTotal guests: ${guestList.length}`);
console.log("\nHow to use:");
console.log("1. Share each personalized link with the corresponding guest");
console.log("2. When they open the link, their name will be pre-filled");
console.log("3. They can still edit their name if needed\n");

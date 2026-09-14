const MONTHS_ID = {
  January: "Januari",
  February: "Februari",
  March: "Maret",
  April: "April",
  May: "Mei",
  June: "Juni",
  July: "Juli",
  August: "Agustus",
  September: "September",
  October: "Oktober",
  November: "November",
  December: "Desember",
};

const DAYS_ID = {
  Sunday: "Minggu",
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jumat",
  Saturday: "Sabtu",
};

export function toJakartaEpoch(dateStr, timeStr = "00:00", timeZone = "Asia/Jakarta") {
  const [year, month, day] = (dateStr || "").split("-").map(Number);
  const [hour, minute] = (timeStr || "00:00").split(":").map(Number);
  if (!year || !month || !day) return NaN;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date(year, month - 1, day, hour, minute));

  const values = {};
  for (const part of parts) values[part.type] = part.value;

  return Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour) % 24,
    Number(values.minute),
    Number(values.second),
  );
}

function getJakartaParts(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const values = {};
  for (const part of parts) values[part.type] = part.value;

  return {
    weekday: DAYS_ID[values.weekday] || values.weekday,
    day: String(Number(values.day)),
    month: MONTHS_ID[values.month] || values.month,
    year: values.year,
    hour: String(Number(values.hour) % 24).padStart(2, "0"),
    minute: values.minute,
  };
}

export const formatEventDate = (isoString, format = "full", isJakartaTime = false) => {
  let date = new Date(isoString);

  if (isJakartaTime && isoString && !isoString.endsWith("Z")) {
    date = new Date(isoString + "Z");
  }

  if (Number.isNaN(date.getTime())) return "";

  const { weekday, day, month, year, hour, minute } = getJakartaParts(date);
  const dayMonthYear = `${day} ${month} ${year}`;

  switch (format) {
    case "short":
      return dayMonthYear;
    case "time":
      return `${hour}:${minute}`;
    case "full":
    default:
      return `${weekday}, ${dayMonthYear}`;
  }
};
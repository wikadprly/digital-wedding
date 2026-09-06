export const formatEventDate = (
  isoString,
  format = "full",
  isJakartaTime = false,
) => {
  let date = new Date(isoString);

  if (isJakartaTime && isoString && !isoString.endsWith("Z")) {
    date = new Date(isoString + "Z");
  }

  const formats = {
    full: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    },
    short: {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    },
  };

  const monthsIndonesian = {
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

  const daysIndonesian = {
    Sunday: "Minggu",
    Monday: "Senin",
    Tuesday: "Selasa",
    Wednesday: "Rabu",
    Thursday: "Kamis",
    Friday: "Jumat",
    Saturday: "Sabtu",
  };

  let formatted = date.toLocaleDateString("en-US", formats[format]);

  if (format === "time") {
    return date.toLocaleTimeString("en-US", formats[format]);
  }

  Object.keys(monthsIndonesian).forEach((english) => {
    formatted = formatted.replace(english, monthsIndonesian[english]);
  });

  Object.keys(daysIndonesian).forEach((english) => {
    formatted = formatted.replace(english, daysIndonesian[english]);
  });

  if (format === "full") {
    const parts = formatted.split(", ");
    if (parts.length === 2) {
      formatted = `${parts[0]}, ${parts[1]}`;
    }
  }

  return formatted;
};

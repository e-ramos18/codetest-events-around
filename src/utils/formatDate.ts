// src/utils/formatDate.ts
export const formatEventDate = (startStr: string, endStr?: string) => {
  if (!startStr) return "";

  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : null;

  // Options for date and time
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = start.toLocaleDateString(undefined, dateOptions);
  const formattedStartTime = start.toLocaleTimeString(undefined, timeOptions);

  if (end) {
    // Same day?
    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();

    const formattedEndTime = end.toLocaleTimeString(undefined, timeOptions);

    return sameDay
      ? `${formattedDate} • ${formattedStartTime} - ${formattedEndTime}`
      : `${formattedDate} • ${formattedStartTime} - ${formatEventDate(endStr)}`;
  }

  return `${formattedDate} • ${formattedStartTime}`;
};
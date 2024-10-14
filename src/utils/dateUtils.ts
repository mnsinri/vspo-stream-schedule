export const toJST = (utcDate: Date) => {
  utcDate.setHours(utcDate.getHours() + 9);
  return utcDate;
};

export const toYYYYMMDD = (date: Date) =>
  date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export const toJstHHMM = (date: Date) =>
  date.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
  });

export const parseToJST = (utcmilisec: number) =>
  new Date(utcmilisec + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);

export const getFormattedDate = (date: Date) => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");

  return `${y}/${m}/${d}`.replace(/\n|\r/g, "");
};

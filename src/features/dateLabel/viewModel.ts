import { toYYYYMMDD } from "@/lib/utils";

export function useDateHeader(dateString: string) {
  const dataForDisplay = (() => {
    const today = new Date();
    if (toYYYYMMDD(today) === dateString) {
      return "Today";
    }

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (toYYYYMMDD(tomorrow) === dateString) {
      return "Tomorrow";
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (toYYYYMMDD(yesterday) === dateString) {
      return "Yesterday";
    }

    return dateString;
  })();

  return { dataForDisplay };
}

export * from "./defineConfig";
export * from "./sortStreams";

export const calcTTL = (from: string, period = 7): Date => {
  const date = new Date(from);
  date.setDate(date.getDate() + period);
  return date;
};

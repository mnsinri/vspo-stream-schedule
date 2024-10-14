export const deduplication = (array: any[]) => {
  return Array.from(new Set(array));
};

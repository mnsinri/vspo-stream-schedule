import { z } from "zod";

export const SettingSchema = z.object({
  theme: z.enum(["dark", "light", "system"]).default("system"),
  isMarqueeTitle: z.boolean().default(false),
  isDisplayHistory: z.boolean().default(false),
  filteredStreamerIds: z.array(z.string()).default([]),
  filteredTitle: z.string().default(""),
});

export type Setting = z.infer<typeof SettingSchema>;

type Action<K extends keyof Setting> = {
  target: K;
  payload: Setting[K];
};

type FilterAction<K extends keyof Setting> = {
  target: K;
  type: "add" | "delete";
  payload: Setting[K];
};

type ClearAction<K extends keyof Setting> = {
  target: K;
  type: "clear";
};

export type SettingAction =
  | Action<"theme" | "isMarqueeTitle" | "isDisplayHistory" | "filteredTitle">
  | FilterAction<"filteredStreamerIds">
  | ClearAction<"filteredStreamerIds">;

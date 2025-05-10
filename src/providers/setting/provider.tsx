import { ReactNode, useCallback, useEffect, useReducer } from "react";
import { settingContext, settingDispatchContext } from "./context";
import { Setting, SettingAction, SettingSchema } from "./schema";

const storageKey = "vss-settings";

function getLocalSettings() {
  try {
    const item = localStorage.getItem(storageKey) ?? "{}";
    return SettingSchema.parse(JSON.parse(item));
  } catch {
    return SettingSchema.parse({});
  }
}

function setLocalSettings(settings: Setting) {
  localStorage.setItem(storageKey, JSON.stringify(settings));
}

export function SettingProvider({ children }: { children: ReactNode }) {
  const settingReducer = useCallback((prev: Setting, action: SettingAction) => {
    if (action.target === "filteredStreamerIds") {
      if (action.type === "clear") return { ...prev, [action.target]: [] };

      const { target, type, payload } = action;
      const set = new Set(prev[target]);
      payload.forEach((v) => set[type](v));
      return { ...prev, [target]: [...set] };
    }

    const { target, payload } = action;
    return { ...prev, [target]: payload };
  }, []);

  const [settings, dispatch] = useReducer(settingReducer, getLocalSettings());

  useEffect(() => {
    const onUnmount = () => setLocalSettings(settings);
    onUnmount();
    // window.addEventListener("beforeunload", onUnmount);

    return () => {
      onUnmount();
      // window.removeEventListener("beforeunload", onUnmount);
    };
  }, [settings]);

  return (
    <settingContext.Provider value={settings}>
      <settingDispatchContext.Provider value={dispatch}>
        {children}
      </settingDispatchContext.Provider>
    </settingContext.Provider>
  );
}

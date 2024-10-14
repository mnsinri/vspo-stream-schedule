import React from "react";
import { MainContainer } from "./components";
import {
  DisplaySizeProvider,
  SettingProvider,
  ThemeProvider,
  VspoStreamProvider,
} from "./providers";

export const App: React.FC = () => {
  return (
    <DisplaySizeProvider>
      <SettingProvider>
        <ThemeProvider>
          <VspoStreamProvider>
            <MainContainer />
          </VspoStreamProvider>
        </ThemeProvider>
      </SettingProvider>
    </DisplaySizeProvider>
  );
};

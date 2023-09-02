import React from "react";
import {
  VspoStreamingProvider,
  WindowSizeProvider,
  ThemeProvider,
  MainContainer,
  ConfigProvider,
  Background,
} from "./components";

export const App: React.FC = () => {
  return (
    <WindowSizeProvider>
      <ThemeProvider>
        <Background>
          <ConfigProvider>
            <VspoStreamingProvider>
              <MainContainer />
            </VspoStreamingProvider>
          </ConfigProvider>
        </Background>
      </ThemeProvider>
    </WindowSizeProvider>
  );
};

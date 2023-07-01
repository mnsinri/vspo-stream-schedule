import React from "react";
import {
  VspoStreamingProvider,
  WindowSizeProvider,
  ThemeProvider,
  MainContainer,
  Background,
} from "./components";

export const App: React.FC = () => {
  return (
    <WindowSizeProvider>
      <ThemeProvider>
        <Background>
          <VspoStreamingProvider>
            <MainContainer />
          </VspoStreamingProvider>
        </Background>
      </ThemeProvider>
    </WindowSizeProvider>
  );
};

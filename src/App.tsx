import React from "react";
import {
  VspoStreamingProvider,
  ThemeProvider,
  MainContainer,
  Background,
} from "./components";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Background>
        <VspoStreamingProvider>
          <MainContainer />
        </VspoStreamingProvider>
      </Background>
    </ThemeProvider>
  );
};

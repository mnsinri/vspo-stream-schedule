import React from "react";
import {
  VspoStreamingProvider,
  ThemeProvider,
  StreamingView,
  Background,
} from "./components";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Background>
        <VspoStreamingProvider>
          <StreamingView />
        </VspoStreamingProvider>
      </Background>
    </ThemeProvider>
  );
};

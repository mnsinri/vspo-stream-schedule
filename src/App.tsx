import React from "react";
import {
  VspoStreamingProvider,
  ThemeProvider,
  TimeProvider,
  StreamingView,
  Background,
} from "./components";
// import { Test } from "./Test";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Background>
        <TimeProvider>
          <VspoStreamingProvider>
            <StreamingView />
          </VspoStreamingProvider>
        </TimeProvider>
      </Background>
    </ThemeProvider>
    // <Test />
  );
};

import { SettingProvider } from "@/providers/setting";
import { VspoStreamProvider } from "@/providers/vspoStream";
import { Main } from "@/features/main";

function App() {
  return (
    <SettingProvider>
      <VspoStreamProvider>
        <Main />
      </VspoStreamProvider>
    </SettingProvider>
  );
}

export default App;

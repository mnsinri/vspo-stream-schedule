import { useTheme } from "@/hooks/useTheme";
import { Header } from "../header";
import { StreamGridList } from "../streamGridList";

export function Main() {
  useTheme();

  return (
    <>
      <Header />
      <StreamGridList />
    </>
  );
}

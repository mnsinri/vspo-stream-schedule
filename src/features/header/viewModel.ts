import { useEffect, useState } from "react";

export function useHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = document.scrollingElement;
    if (!el) return;

    const onScroll = () => setIsScrolled(el.scrollTop > 0);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onClickGithubIcon() {
    window.open("https://github.com/mnsinri/vspo-stream-schedule");
  }

  return { isScrolled, onClickGithubIcon };
}

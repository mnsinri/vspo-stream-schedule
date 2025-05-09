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

  return { isScrolled };
}

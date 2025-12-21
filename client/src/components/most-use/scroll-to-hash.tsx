// TODO : FUTURE DEVELOPMENT ->Navigate tp specific direction
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    let attempts = 0;

    const interval = setInterval(() => {
      // hash includes '#', getElementById expects raw id
      const el = document.getElementById(hash.slice(1));

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(interval);
        return;
      }

      attempts++;
      if (attempts > 20) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [hash]);

  return null;
}

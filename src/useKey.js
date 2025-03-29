import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        console.log(e.key);
        action?.();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [action, key]);
}

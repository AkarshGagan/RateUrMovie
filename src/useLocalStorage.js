import { useEffect, useState } from "react";

export function useLocalStorage(initialstate, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : initialstate;
  });
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}

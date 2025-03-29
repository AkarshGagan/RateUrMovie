import { useRef } from "react";
import { useKey } from "../useKey";

export default function Search({ query, setQuery }) {
  const inputRef = useRef(null);

  useKey("Enter", handle);

  function handle() {
    if (document.activeElement === inputRef.current) return;
    console.log("key");
    inputRef.current.focus();
    setQuery(" ");
  }

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleSearch}
        ref={inputRef}
      />
    </>
  );
}

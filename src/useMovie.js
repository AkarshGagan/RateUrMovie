import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const KEY = `bd203da7`;

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setMovies([]);
      setError("Please search for a movie!!");
      return;
    } else {
      setError("");
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error before fetching
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery.trim()}`
        );

        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search || []);
      } catch (error) {
        setError(error.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return { movies, loading, error };
}

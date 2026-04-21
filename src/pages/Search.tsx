import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchSearchMovies } from "../features/movies/moviesSlice";
import SearchBar from "../components/SearchBar";
import MovieRow from "../components/MovieRow";

export default function Search() {
  const dispatch = useAppDispatch();
  const { searchResults, loading, error } = useAppSelector((s) => s.movies);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        dispatch(fetchSearchMovies(query));
      }
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  return (
    <div className="p-6">
      <SearchBar onSearch={setQuery} />

      {loading && <p className="text-gray-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && searchResults.length === 0 && query.length > 2 && (
        <p className="text-gray-500">No movies found</p>
      )}

      <MovieRow movies={searchResults} />
    </div>
  );
}
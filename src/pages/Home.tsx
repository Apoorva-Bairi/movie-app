import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCategorizedMovies } from "../features/movies/moviesSlice";
import MovieRow from "../components/MovieRow";

export default function Home() {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((s) => s.movies);

  useEffect(() => {
    dispatch(fetchCategorizedMovies());
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <MovieRow title="⭐ Top Rated" movies={categories.topRated} />
      <MovieRow title="🔥 Action" movies={categories.action} />
      <MovieRow title="👻 Horror" movies={categories.horror} />
      <MovieRow title="😂 Comedy" movies={categories.comedy} />
    </div>
  );
}
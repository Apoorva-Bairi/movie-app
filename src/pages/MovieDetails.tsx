import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMovieDetails } from "../features/movies/moviesSlice";

export default function MovieDetails() {
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((s) => s.movies.selected);

  useEffect(() => {
    if (id) dispatch(fetchMovieDetails(id));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="flex justify-end">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
          className="mb-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
           Back
        </button>
      </div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} />
      <p>{movie.Plot}</p>

      {movie.Ratings?.map((r: any) => (
        <p key={r.Source}>
          {r.Source}: {r.Value}
        </p>
      ))}
    </div>
  );
}
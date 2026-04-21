import { useNavigate } from "react-router-dom";
export default function MovieCard({ movie }: any) {
  const nav = useNavigate();

  return (
    <div
  onClick={() => nav(`/movie/${movie.imdbID}`)}
  className="
    w-[160px] flex-shrink-0 
    bg-gray-100 dark:bg-gray-800 
    text-black dark:text-white 
    rounded-xl overflow-hidden 
    cursor-pointer 
    shadow-md hover:shadow-xl 
    hover:scale-105 transition duration-300
  "
>
      {/* IMAGE */}
      <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE FIXED HEIGHT */}
      <div className="p-2 h-[48px]">
        <h2 className="text-sm font-medium line-clamp-2 leading-tight">
          {movie.Title}
        </h2>
      </div>
    </div>
  );
}
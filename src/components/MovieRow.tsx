import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      {/* ✅ Fallback */}
      {movies.length === 0 ? (
      <div className="text-gray-400 text-sm italic px-2">
         No movies found
     </div> 
      ) : (
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {movies.map((m: any) => (
            <div key={m.imdbID} className="hover:shadow-lg hover:shadow-black/40">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
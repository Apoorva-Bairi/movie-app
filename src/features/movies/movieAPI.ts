const API = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMoviesWithDetails = async () => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API}&s=movie`
  );
  const data = await res.json();

  if (!data.Search) return [];

  const limited = data.Search.slice(0, 10);

  const detailed = await Promise.all(
    limited.map(async (m: any) => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API}&i=${m.imdbID}`
      );
      return res.json();
    })
  );

  return detailed;
};
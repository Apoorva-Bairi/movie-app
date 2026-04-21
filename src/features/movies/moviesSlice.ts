import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMoviesWithDetails } from "./movieAPI";
import type { Movie, MovieDetail } from "./types";

const API = import.meta.env.VITE_OMDB_API_KEY;

interface Categories {
  topRated: MovieDetail[];
  action: MovieDetail[];
  horror: MovieDetail[];
  comedy: MovieDetail[];
  
}

interface MovieState {
  categories: Categories;
  searchResults: Movie[];
  selected: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

export const fetchSearchMovies = createAsyncThunk<Movie[], string>(
  "movies/fetchSearch",
  async (query) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API}&s=${query}`
    );
    const data = await res.json();

    if (data.Response === "False") return [];

    return data.Search as Movie[];
  }
);


export const fetchMovieDetails = createAsyncThunk<MovieDetail, string>(
  "movies/fetchDetails",
  async (id) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API}&i=${id}`
    );
    return (await res.json()) as MovieDetail;
  }
);

const getMoviesByGenre = (movies: MovieDetail[], genre: string) => {
  const filtered = movies.filter((m) =>
    m.Genre?.toLowerCase().includes(genre.toLowerCase())
  );

  
  if (filtered.length < 8) {
    const fallback = movies
      .filter((m) => !filtered.includes(m))
      .slice(0, 10 - filtered.length);

    return [...filtered, ...fallback];
  }

  return filtered.slice(0, 10);
};
export const fetchCategorizedMovies = createAsyncThunk<Categories>(
  "movies/fetchCategorized",
  async () => {
    const movies = (await fetchMoviesWithDetails()) as MovieDetail[];

    return {
      topRated: movies
        .filter((m) => m.imdbRating && m.imdbRating !== "N/A")
        .sort(
          (a, b) =>
            Number(b.imdbRating || 0) - Number(a.imdbRating || 0)
        )
        .slice(0, 10),

      action: getMoviesByGenre(movies, "Action"),
      horror: getMoviesByGenre(movies, "Horror"),
      comedy: getMoviesByGenre(movies, "Comedy"),
    };
  }
);

const initialState: MovieState = {
  categories: {
    topRated: [],
    action: [],
    horror: [],
    comedy: [],
    
  },
  searchResults: [],
  selected: null,
  loading: false,
  error: null,
};


const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCategorizedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategorizedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching categories";
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error searching movies";
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching details";
      })

      .addCase(
        fetchCategorizedMovies.fulfilled,
        (state, action: PayloadAction<Categories>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        fetchSearchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(
        fetchMovieDetails.fulfilled,
        (state, action: PayloadAction<MovieDetail>) => {
          state.loading = false;
          state.selected = action.payload;
        }
      );
  },
});

export default movieSlice.reducer;
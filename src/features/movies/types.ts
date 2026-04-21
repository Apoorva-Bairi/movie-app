export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Plot?: string;
  Genre?: string;
  Actors?: string;
  imdbRating?: string;
  Ratings?: { Source: string; Value: string }[];
}
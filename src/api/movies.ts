import axios from "axios";

const api_key = import.meta.env.VITE_IMDB_API_KEY;

export async function getAllMovies(): Promise<Movie[]> {

  const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
  return res.data.results;
}



export async function getAllCategories(): Promise<Genre[]> {
  const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);
  return res.data.genres;

}

export async function getSearchResults(query: string): Promise<Movie[]> {
  const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`);
  return res.data.results;

}

export async function getMovieData(id: number): Promise<Movie> {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
  return res.data;


}



type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number
}

export type Genre = {
  id: number;
  name: string;
}






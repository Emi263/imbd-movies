import { getAllCategories, getSearchResults } from '../api/movies';
import { useQuery } from '@tanstack/react-query';
import { getGenresNames } from '../components/MovieList/MovieList';
import MoviePoster from '../components/MoviePoster/MoviePoster';
import { useParams } from 'react-router-dom';

function Search() {

  const params = useParams();

  const { data: movieData, isPending, isError } = useQuery({
    queryKey: ['movie-search'],
    queryFn: () => getSearchResults(params.query || "")
  });

  const { data: genresData } = useQuery({
    queryKey: ['movie-genres'],
    queryFn: getAllCategories
  });

  if (isError) {
    return <p>Something is wrong</p>
  }

  if (isPending) return 'Loading...';


  return (
    <section className='movie-list'>
      {movieData?.map((movie) => {
        const categories = getGenresNames(movie.genre_ids, genresData)
        return <MoviePoster id={movie.id} categories={categories} release_date={movie.release_date} rating={movie.vote_average} title={movie.title} description={movie.overview} image={movie.poster_path} key={movie.id} />
      })}
      {movieData.length === 0 && !isPending && <p>No results found</p>}

    </section>
  )
}

export default Search
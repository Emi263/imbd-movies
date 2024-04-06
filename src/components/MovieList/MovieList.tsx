import { useQuery } from '@tanstack/react-query';
import { Genre, getAllCategories, getAllMovies } from '../../api/movies'
import MoviePoster from '../MoviePoster/MoviePoster';

function MovieList() {
  const { data: movieData, isPending, isError } = useQuery({
    queryKey: ['movie-list'],
    queryFn: getAllMovies
  });

  const { data: genresData } = useQuery({
    queryKey: ['movie-genres'],
    queryFn: getAllCategories
  });

  if (isError) {
    return <p>Something is wrong</p>
  }

  if (isPending) return 'Loading...'

  return (

    <section className='movie-list'>
      {movieData?.map((movie) => {
        const categories = getGenresNames(movie.genre_ids, genresData)

        return <MoviePoster id={movie.id} categories={categories} release_date={movie.release_date} rating={movie.vote_average} title={movie.title} description={movie.overview} image={movie.poster_path} key={movie.id} />
      })}

    </section>
  )
}

export default MovieList


export function getGenresNames(genres_ids: number[], genresData: Genre[] | undefined) {
  if (!genresData) return [""];

  const finalCategories: string[] = [];


  genres_ids.forEach((genre_id) => {
    genresData.forEach((genre_from_api) => {
      if (genre_from_api.id === genre_id) {
        finalCategories.push(genre_from_api.name)
      }
    })
  })
  return finalCategories
}



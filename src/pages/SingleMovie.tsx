import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import { getMovieData } from '../api/movies';

const SingleMovie = () => {
  const params = useParams();

  const { data: movieData, isPending, isError } = useQuery({
    queryKey: ['movie-search', params.id],
    queryFn: () => getMovieData(parseInt(params.id || ""))
  });

  return (
    <div>
      <h1>
        {movieData?.title}
      </h1>
      <p>{movieData?.overview}</p>
    </div>
  )
}

export default SingleMovie
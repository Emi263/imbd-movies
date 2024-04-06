import moment from "moment";
import "./MoviePoster.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { WatchLaterContext } from "../../App";

type MoviePosterProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: number;
  release_date: string;
  categories: string[];
}

function MoviePoster(props: MoviePosterProps) {

  const imageSource = props.image ? "https://image.tmdb.org/t/p/w500" + props.image : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg=";
  const context = useContext(WatchLaterContext)
  const nav = useNavigate()
  function handleGoToSingleMovie() {
    nav(`/movie/${props.id}`)
  }

  function addToWatchLater(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    context.setWatchLaterMoviesIds([...context.watchLaterMoviesIds, props.id])

  }

  const movie_ids_from_local_storage: number[] = JSON.parse(localStorage.getItem("watch_later_movies_ids") || "[]");

  return (
    <article className="movie-poster" onClick={handleGoToSingleMovie}>
      <img src={imageSource} />
      <h1>{props.title}</h1>
      <p className="movie-description">{truncateDescription(props.description)}</p>
      <div className="movies-genres">
        {props.categories.map((category) => {
          return <span>{category}</span>
        })}
        <span>Action</span>
        <span>Comedy</span>
      </div>
      <p>Rating: <b>{props.rating.toFixed(1)}</b></p>
      <p className="release-date">{formatDate(props.release_date)}</p>

      {movie_ids_from_local_storage.includes(props.id) ? "Movie exists in watch later history" : ""}
      <button onClick={addToWatchLater}>Add to watch later</button>
    </article>
  )
}

export default MoviePoster;




function truncateDescription(description: string) {

  if (description.length <= 150) {
    return description;
  }

  const formattedDescription = description.substring(0, 150) + " ...";

  return formattedDescription;

}


function formatDate(date: string) {

  if (!date) return "";

  return moment(date).format("dddd, MMMM Do YYYY")

}
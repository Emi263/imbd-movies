import { createContext, useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import MovieSearch from "./components/MovieSearch/MovieSearch";

type WatchLaterMoviesContextType = {
  watchLaterMoviesIds: number[];
  setWatchLaterMoviesIds: React.Dispatch<React.SetStateAction<number[]>>
}

export const WatchLaterContext = createContext<WatchLaterMoviesContextType>({
  watchLaterMoviesIds: [],
  setWatchLaterMoviesIds: () => { }
});



function App() {
  const movie_ids_from_local_storage = JSON.parse(localStorage.getItem("watch_later_movies_ids") || "[]");

  const [watchLaterMoviesIds, setWatchLaterMoviesIds] = useState<number[]>(movie_ids_from_local_storage);

  useEffect(() => {
    localStorage.setItem("watch_later_movies_ids", JSON.stringify(watchLaterMoviesIds))
  }, [watchLaterMoviesIds]);


  return (
    <>
      <WatchLaterContext.Provider value={{
        watchLaterMoviesIds,
        setWatchLaterMoviesIds
      }}>

        <MovieSearch />
        <MovieList />;
      </WatchLaterContext.Provider>
    </>
  );
}

export default App;

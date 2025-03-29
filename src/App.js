import { useState } from "react";
import Box from "./Box";
import ListOfMovies from "./BoxComponent1/ListOfMovies";
import Summary from "./BoxComponent1/Summary";
import SelectedMovie from "./BoxComponent2/SelectedMovie";
import WatchedListofMovies from "./BoxComponent2/WatchedListofMovies";
import Errormessgae from "./Errorfile/Errormessage";
import Loader from "./Loader";
import Main from "./Main";
import Logo from "./Navbar/Logo";
import Navbar from "./Navbar/Navbar";
import Numresults from "./Navbar/Numresults";
import Search from "./Navbar/Search";
import { useKey } from "./useKey";
import { useLocalStorage } from "./useLocalStorage";
import { useMovie } from "./useMovie";
const KEY = `bd203da7`;
export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("Interstellar");
  const [watched, setWatched] = useLocalStorage([], "watched");

  const { movies, loading, error } = useMovie(query, handleClose);

  function handleSelectMovie(id) {
    setSelectedId((prev) => (id === prev ? null : id));
  }
  function handleClose() {
    console.log("called");
    setSelectedId(null);
  }
  function hanldeWatchedMovie(movie) {
    const isMovieExist = watched
      .map((prevMovie) => prevMovie.imdbId)
      .includes(movie.imdbId);

    if (!isMovieExist) {
      setWatched((prevWatchedMovies) => [...prevWatchedMovies, movie]);
    }
  }
  function handleWatchedDelete(movie) {
    const filtered = watched.filter((movies) => movies.imdbId !== movie.imdbId);
    setWatched(filtered);
  }
  useKey("Escape", handleClose);

  return (
    <>
      <Navbar>
        <Logo></Logo>
        <div className="search__container">
          <Search query={query} setQuery={setQuery}></Search>
          <Numresults movie={movies}></Numresults>
        </div>
      </Navbar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <ListOfMovies
              movies={movies}
              onSelectMovie={handleSelectMovie}
            ></ListOfMovies>
          )}
          {error && <Errormessgae message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              handleClose={handleClose}
              onAddWatched={hanldeWatchedMovie}
              watched={watched}
              KEY={KEY}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedListofMovies
                watched={watched}
                handleClose={handleClose}
                handleWatchedDelete={handleWatchedDelete}
                KEY={KEY}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

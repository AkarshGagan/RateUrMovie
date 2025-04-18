import Movie from "./Movie";

export default function ListOfMovies({ movies, onSelectMovie }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          ></Movie>
        ))}
      </ul>
    </>
  );
}

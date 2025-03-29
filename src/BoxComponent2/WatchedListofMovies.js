import WatchedListofMoviesSUB from "./WatchedListofMoviesSUB";

export default function WatchedListofMovies({
  watched,
  handleClose,
  handleWatchedDelete,
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedListofMoviesSUB
          movie={movie}
          key={crypto.randomUUID()}
          handleClose={handleClose}
          handleWatchedDelete={handleWatchedDelete}
        ></WatchedListofMoviesSUB>
      ))}
    </ul>
  );
}

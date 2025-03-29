export default function WatchedListofMoviesSUB({ movie, handleWatchedDelete }) {
  return (
    <div className="rating__box">
      <button className="remove-btn" onClick={() => handleWatchedDelete(movie)}>
        -
      </button>
      <li key={movie.imdbId}>
        <img src={movie.poster} alt={`${movie.title} poster`} />

        <h3>{movie.title}</h3>

        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{!movie.runtime ? 0 : movie.runtime} min</span>
          </p>
        </div>
      </li>
    </div>
  );
}

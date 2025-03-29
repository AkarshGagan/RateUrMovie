export default function Summary({ watched }) {
  const moviesArray = Object.values(watched);
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = average(moviesArray.map((movie) => movie.imdbRating));
  const avgUserRating = Math.floor(
    average(moviesArray.map((movie) => movie.userRating))
  );
  const avgRuntime = average(moviesArray.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies You Watched</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>📊 Metric</th>
            <th>📌 Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Watched</td>
            <td>
              <span>#️⃣</span> {watched.length} movies
            </td>
          </tr>
          <tr>
            <td>Avg IMDb Rating</td>
            <td>
              <span>⭐️</span> {Math.floor(avgImdbRating)}
            </td>
          </tr>
          <tr>
            <td>Avg User Rating</td>
            <td>
              <span>🌟</span> {Math.floor(avgUserRating)}
            </td>
          </tr>
          <tr>
            <td>Avg Runtime</td>
            <td>
              <span>⏳</span> {Math.ceil(avgRuntime)} min
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

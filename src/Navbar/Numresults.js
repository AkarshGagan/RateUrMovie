export default function Numresults({ movie }) {
  let length = movie.length;
  return (
    <>
      <p className="num-results">
        Found <strong>{length}</strong> results
      </p>
    </>
  );
}

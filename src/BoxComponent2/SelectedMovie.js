import { useRef } from "react";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import StarRating from "./StarRating";
import { FaArrowLeft } from "react-icons/fa";

export default function SelectedMovie({
  selectedId,
  handleClose,
  onAddWatched,
  watched,
  KEY,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [avgrating, setavgrating] = useState(0);
  const [numStars, setNumStars] = useState(10);
  const [starSize, setStarSize] = useState(25);
  const countRef = useRef(0);
  let count = 0;

  useEffect(() => {
    const updateStars = () => {
      setNumStars(window.innerWidth <= 900 ? 5 : 10);
      setStarSize(window.innerWidth <= 900 ? 15 : 20);
    };

    updateStars();
    window.addEventListener("resize", updateStars);

    return () => window.removeEventListener("resize", updateStars);
  }, []);
  useEffect(
    function () {
      if (rating) {
        countRef.current++;
        count++;
      }
    },
    [rating, count]
  );
  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
  console.log(isWatched);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: releaseddate,
    Actors: actors,
    Director: directors,
    Genre: genre,
  } = movie;

  console.log(poster);
  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const result = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await result.json();
        console.log(data);
        setMovie(data);
        setLoading(false);
      }

      getMovieDetails();
    },
    [selectedId]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      userRating: rating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      countRating: countRef.current,
      count: count,
    };
    onAddWatched(newWatchedMovie);
    setavgrating(Number(imdbRating));
    handleClose();

    // setavgrating((imdbRating) => (imdbRating + rating) / 2);
  }
  function PageTitle() {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "usePopcorn";
    };
  }
  useEffect(PageTitle, [title]);
  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header className="detailes__header">
            <FaArrowLeft className="btn-back" onClick={handleClose} />

            <img src={poster} alt={`Poste of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {releaseddate} <span>&#x25cf;</span> {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    newRating={numStars}
                    color={`gold`}
                    size={starSize}
                    onSetRating={setRating}
                  ></StarRating>
                  {rating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated this movie</p>
              )}
            </div>
            <p className="description">
              <em>{plot}</em>
              <p>Starring {actors}</p>
              <p>Directed By {directors}</p>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

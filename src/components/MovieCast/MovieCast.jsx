import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../api/tmdb-api";
import defaultImage from "../../assets/noImage.jpg";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const result = await fetchMovieCredits(movieId);
        setCast(result.cast);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCredits();
  }, [movieId]);

  return (
    <div className={css.movieCast}>
      <hr />
      <h2>Cast</h2>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Oops...Something went wrong!</h1>}
      {cast.length > 0 ? (
        <ul className={css.castFlex}>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defaultImage
                }
                alt={actor.name}
                width="100"
                height="150"
              />
              <div className={css.actorNameFlex}>
                <p className={css.actorName}>{actor.name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No cast available</p>
      )}
    </div>
  );
};

export default MovieCast;

import { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb-api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backPath = useRef(location.state ?? "/movies");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const result = await fetchMovieDetails(movieId);
        setMovie(result);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div>
      <Link to={backPath.current} className={css.backLink}>
        ← Go back
      </Link>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Oops...Something went wrong!</h1>}
      <div className={css.mainFlex}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
          width="400"
        ></img>
        <div className={css.overview}>
          <h2>{movie.title}</h2>
          <p>{movie.overview ? movie.overview : "No overview available"}</p>
        </div>
      </div>
      <nav className={css.additionalLinks}>
        <Link to="cast" className={css.additionalLink}>
          Cast
        </Link>
        <Link to="reviews" className={css.additionalLink}>
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

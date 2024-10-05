import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import defaultImage from "../../assets/noImage.jpg";
import star from "../../assets/star.svg";
import calendar from "../../assets/calendar.svg";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.listItems}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.itemFlex}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={css.itemLink}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImage
              }
              alt={movie.title}
              width="250"
              height="350"
            />

            <div className={css.itemOverview}>
              <div className={css.itemTitle}>
                <h3>{movie.title}</h3>
              </div>

              <div className={css.itemDetails}>
                <div className={css.rating}>
                  <img src={star} alt="star" className={css.starIcon} />
                  <p>{movie.vote_average.toFixed(1)}</p>
                </div>

                <div className={css.releaseDate}>
                  <img src={calendar} alt="star" className={css.calendarIcon} />
                  <p>
                    {movie.release_date
                      ? movie.release_date
                      : "No release date"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

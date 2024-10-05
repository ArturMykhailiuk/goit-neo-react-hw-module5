import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb-api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const result = await fetchMovieReviews(movieId);
        setReviews(result.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);

  return (
    <div className={css.movieReviews}>
      <hr />
      <h2>Reviews</h2>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Oops...Something went wrong!</h1>}
      {reviews.length > 0 ? (
        <ul className={css.reviewsFlex}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={css.author}>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default MovieReviews;

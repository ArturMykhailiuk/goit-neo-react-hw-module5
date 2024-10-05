import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const result = await fetchTrendingMovies();
        setMovies(result);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Oops...Something went wrong!</h1>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;

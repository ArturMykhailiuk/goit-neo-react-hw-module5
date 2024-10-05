import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState(query);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMoviesByQuery = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const result = await fetchMoviesByQuery(query);
        setMovies(result);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesByQuery();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newQuery = inputValue;
    setSearchParams({ query: newQuery });
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>Search Movies</h1>

      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          name="query"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && query && <h1>Loading...</h1>}
      {error && <h1>Oops...Something went wrong!</h1>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;

import axios from "axios";

const API_TOKEN =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGJiZWI0N2IyYWI1MWJiNzRiMmV" +
  "lMWUwZDcwMzM5NiIsIm5iZiI6MTcyNzg5OTUyNi4xMzIwNTEsInN1YiI6IjY" +
  "2ZmRhNWY0NzgzMGMxMzAxZTdjNjAyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJ" +
  "dLCJ2ZXJzaW9uIjoxfQ.lvi5lX3Tkw2qRrMXtuBrISCaDfj0oQRHHiTnryZZYQk";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const fetchTrendingMovies = async () => {
  const response = await axios(`/trending/movie/day`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data.results;
};

const fetchMoviesByQuery = async (query) => {
  const response = await axios(`/search/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data.results;
};

const fetchMovieDetails = async (movieId) => {
  const response = await axios(`/movie/${movieId}`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data;
};

const fetchMovieCredits = async (movieId) => {
  const response = await axios(`/movie/${movieId}/credits`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data;
};

const fetchMovieReviews = async (movieId) => {
  const response = await axios(`/movie/${movieId}/reviews`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data;
};

export {
  fetchTrendingMovies,
  fetchMoviesByQuery,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};

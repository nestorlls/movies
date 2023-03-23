import { useState } from 'react';
import MovieList from './components/MovieList';
import SearchForm from './components/pages/SearchForm';
import { getMovies } from './services/MovieService';

function parsedMovies(movies) {
  return movies.map((movie) => parseMovie(movie));
}

function parseMovie(movie) {
  const {
    id,
    original_title,
    release_date,
    vote_average,
    overview,
    poster_path,
    genre_ids,
  } = movie;
  return {
    id,
    title: original_title,
    year: release_date.substr(0, 4),
    vote_average,
    overview,
    poster: `https://image.tmdb.org/t/p/w200/${poster_path}`,
    genres: genre_ids,
  };
}

function sort(movies, sortBy) {
  movies.sort((a, b) => (a[sortBy] <= b[sortBy] ? 1 : -1));
}

function App() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState('');
  sort(movies, sortBy);

  async function searchMovies(query) {
    // LLamar a la api
    try {
      const data = await getMovies(query);

      const parseMovies = parsedMovies(data.results);
      setMovies(parseMovies);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>🎥 Movies workshop 🎥</h1>
      <SearchForm onSubmit={searchMovies} />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value=''>Sort By</option>
        <option value='title'>Title</option>
        <option value='year'>Year</option>
        <option value='vote_average'>score</option>
      </select>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;

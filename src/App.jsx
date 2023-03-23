import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import SearchForm from './components/pages/SearchForm';
import { getGenres, getMovies } from './services/MovieService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  max-width: 780px;
  padding: 16px;
  margin: 0 auto;
`;

function parsedMovies(movies, genres) {
  return movies.map((movie) => parseMovie(movie, genres));
}

function parseMovie(movie, genres) {
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
    genres: genre_ids.map((genre_id) => genres[genre_id]),
  };
}

function sort(movies, sortBy) {
  if (!sortBy) return;

  const order = {
    title: 'asc',
    year: 'desc',
    vote_average: 'asc',
  };

  if (order[sortBy] === 'desc') {
    movies.sort((a, b) => (a[sortBy] <= b[sortBy] ? 1 : -1));
  } else {
    movies.sort((a, b) => (a[sortBy] <= b[sortBy] ? -1 : 1));
  }
}

function App() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [genres, setGenres] = useState({});
  sort(movies, sortBy);

  async function searchMovies(query) {
    // LLamar a la api
    try {
      const data = await getMovies(query);

      const parseMovies = parsedMovies(data.results, genres);
      setMovies(parseMovies);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGenres().then((data) => {
      const genresObject = {};
      for (const genre of data.genres) {
        genresObject[genre.id] = genre.name;
      }
      setGenres(genresObject);
    });
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>🎥 Movies workshop 🎥</h1>
      <SearchForm onSubmit={searchMovies} />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value=''>Sort By</option>
        <option value='title'>Title</option>
        <option value='year'>Year</option>
        <option value='vote_average'>score</option>
      </select>
      <MovieList movies={movies} />
    </Container>
  );
}

export default App;

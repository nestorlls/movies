import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import SearchForm from './components/pages/SearchForm';
import { getGenres, getMovies } from './services/MovieService';
import {
  filterMovies,
  getUniqueGenres,
  getUniqueYears,
  sort,
} from './utils/filters';
import CheckBox from './components/CheckBox';

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

function App() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [genres, setGenres] = useState({});
  const [filter, setFilter] = useState({
    genres: [],
    years: [],
    score: { min: 0, max: Infinity },
  });

  async function searchMovies(query) {
    // LLamar a la api
    try {
      const data = await getMovies(query);

      const parseMovies = parsedMovies(data.results, genres);
      setMovies(parseMovies);
      setSortBy('');
      setFilter({
        genres: [],
        years: [],
        score: { min: 0, max: Infinity },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const filteredMovies = filterMovies(movies, filter);
  const uniqueGenres = getUniqueGenres(movies);
  const uniqueYears = getUniqueYears(movies);
  sort(filteredMovies, sortBy);

  function handleCheck(e) {
    const genreName = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFilter({ ...filter, genres: [...filter.genres, genreName] });
    } else {
      setFilter({
        ...filter,
        genres: filter.genres.filter((genre) => genre !== genreName),
      });
    }
  }

  function handleYear(e) {
    const year = e.target.name;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFilter({ ...filter, years: [...filter.years, year] });
    } else {
      setFilter({
        ...filter,
        years: filter.years.filter((year) => year !== year),
      });
    }
  }

  function handleScore(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFilter({ ...filter, score: { ...filter.score, [name]: value } });
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
      <h1 style={{ textAlign: 'center' }}>🎥 Movies 🎥</h1>
      <SearchForm onSubmit={searchMovies} />
      <CheckBox
        title="Genres"
        uniqueItems={uniqueGenres}
        handleCheck={handleCheck}
        filter={filter}
      />
      <CheckBox
        title="Release year"
        uniqueItems={uniqueYears}
        handleCheck={handleCheck}
        filter={filter}
      />
      <div>
        <p>Score</p>
        <label htmlFor="min">
          MIN
          <input
            type="number"
            name="min"
            id="min"
            placeholder="min"
            onChange={handleScore}
          />
        </label>
        <span>-</span>
        <label htmlFor="max">
          MAX
          <input
            type="number"
            name="max"
            id="max"
            placeholder="max"
            onChange={handleScore}
          />
        </label>
      </div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="year">Year</option>
        <option value="vote_average">score</option>
      </select>
      <MovieList movies={filteredMovies} />
    </Container>
  );
}

export default App;

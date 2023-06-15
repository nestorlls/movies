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

function filterMovies(movies, filters) {
  const moviesByGenres = filterByGenres(movies, filters.genres);
  const moviesByYears = filterByYears(moviesByGenres, filters.years);
  return moviesByYears;
}

function getUniqueGenres(movies) {
  const genres = new Set();
  for (const movie of movies) {
    for (const genre of movie.genres) {
      genres.add(genre);
    }
  }
  return [...genres];
}

function getUniqueYears(movies) {
  const years = new Set();
  for (const movie of movies) {
    years.add(movie.year);
  }
  return [...years];
}

function filterByGenres(movies, genres) {
  if (!genres.length) return movies;

  const filteredMovies = movies.filter((movie) =>
    movie.genres.some((genre) => genres.includes(genre.toLowerCase()))
  );
  return filteredMovies;
}

function filterByYears(movies, years) {
  if (!years.length) return movies;

  const filteredMovies = movies.filter((movie) => years.includes(movie.year));
  return filteredMovies;
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
      <div>
        <p>Genre</p>
        {uniqueGenres.map((genre) => (
          <label htmlFor={genre.toLowerCase()} key={genre}>
            {genre}
            <input
              type="checkbox"
              name={genre.toLowerCase()}
              id={genre.toLowerCase()}
              onChange={handleCheck}
              checked={filter.genres.includes(genre.toLowerCase())}
            />
          </label>
        ))}
      </div>
      <div>
        <p>Release year</p>
        {uniqueYears.map((year) => (
          <label htmlFor={year.toLowerCase()} key={year}>
            {year}
            <input
              type="checkbox"
              name={year.toLowerCase()}
              id={year.toLowerCase()}
              onChange={handleYear}
              checked={filter.years.includes(year.toLowerCase())}
            />
          </label>
        ))}
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

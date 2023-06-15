function filterMovies(movies, filters) {
  const moviesByGenres = filterByGenres(movies, filters.genres);
  const moviesByYears = filterByYears(moviesByGenres, filters.years);
  const moviesByScore = filterByScore(moviesByYears, filters.score);
  return moviesByScore;
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

function filterByScore(movies, score) {
  if (!score.max) return movies;
  const filteredMovies = movies.filter(
    (movie) =>
      movie.vote_average >= score.min && movie.vote_average <= score.max
  );
  return filteredMovies;
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

export { filterMovies, sort, getUniqueGenres, getUniqueYears };

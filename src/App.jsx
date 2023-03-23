import { useState } from 'react';
import SearchForm from './components/pages/SearchForm';
import { getMovies } from './components/services/MovieService';

function App() {
  const [movies, setMovies] = useState([]);

  function searchMovies(query) {
    getMovies(query).then((data) => setMovies(data.results));
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>🎥 Movies workshop 🎥</h1>
      <SearchForm onSubmit={searchMovies} />
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.original_title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

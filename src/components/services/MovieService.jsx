// https://api.themoviedb.org/3/search/movie?api_key=bcda35c0e7e14bdb26e82db57bc15ff4&language=en-US&query=terminator/search/movie?api_key=bcda35c0e7e14bdb26e82db57bc15ff4&language=en-US&query=terminator
const BASE_URI = 'https://api.themoviedb.org/3';
const API_KEY = 'bcda35c0e7e14bdb26e82db57bc15ff4';

export function getMovies(query) {
  return fetch(
    `${BASE_URI}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
  )
    .then((response) => response.json())
    .catch(console.log);
}

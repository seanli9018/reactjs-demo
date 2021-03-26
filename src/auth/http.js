// import axios xmlhttprequest package;
import axios from 'axios';

const BASE_URL = 'https://movie-database-imdb-alternative.p.rapidapi.com/';

class Http {
  constructor() {
    this.http = axios.create({
      baseURL: BASE_URL,
      headers: {
        'x-rapidapi-key': '7bcdffca53mshc9777202b8cd038p1cacd0jsn68293560e7cc',
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      }
    })
  }

  getMovies(url, params) {
    this.http.params = params;
    return this.http.get(url);
  }
}

export default new Http();

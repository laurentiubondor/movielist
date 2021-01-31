import { BASE_URL_SERVER } from "../../shared/api.js";
console.log(BASE_URL_SERVER);

class Movie {
  constructor(Title, imdbRating, Poster, Genre, _id) {
    this.Title = Title;
    this.imdbRating = imdbRating;
    this.Poster = Poster;
    this.Genre = Genre;
    this.movieDOM = document.createElement("div");
  }

  renderMovies() {
    this.movieDOM.classList.add('movieDOM-style');

    this.movieDOM.innerHTML = `
            <h4 class="movieDOM-title-style">${this.Title}</h4>
            <img src="${this.Poster}" class="movieDOM-poster-style"></img>
            <div id="movieDOM-rating-style">
              <img src="..//search/star.png"></img>
              <div>${this.imdbRating}</div>
            </div>
            <div id="genre">${this.Genre}</div>`;
            

    return this.movieDOM;
  }
}

async function getMovies() {
  const response = await fetch(BASE_URL_SERVER);
  return response.json();
}

const moviesContainer = document.querySelector("#moviesContainer");

moviesContainer.classList.add('movie-container');

function redirectMovieDetails(movieId) {
  const url = "../movieDetails/movieDetails.html";
  console.log(movieId);
  //closure:
  return function (event) {
    window.location.href = `${url}?id=${movieId}`;
    console.log(event);
  };
}
async function displayMoviesInHTML() {
  try {
    const movies = await getMovies();
    console.log(movies);

    movies.results.forEach((movie) => {
      const movieDOM = new Movie(
        movie.Title,
        movie.imdbRating,
        movie.Poster,
        movie.Genre
      ).renderMovies();

      movieDOM.addEventListener("click", redirectMovieDetails(movie._id));

      moviesContainer.appendChild(movieDOM);
    });
  } catch (e) {
    console.log(e);
    moviesContainer.innerHTML = "Server Error";
  }
}
displayMoviesInHTML();
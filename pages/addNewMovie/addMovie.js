let tokenId = JSON.parse(localStorage.getItem('token'));
console.log(tokenId)

let token = tokenId.accessToken 
console.log(tokenId.accessToken);


async function addMovie(moviePost) {
  const response = await fetch("https://movies-api-siit.herokuapp.com/movies", {
    method: "POST",
    headers: {
      "X-Auth-Token": `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(moviePost),
  });

  return response.json();
}

async function addMovieInApi(moviePost) {
  try {
    const postMovie = getMovieDataFromHtmlForm(moviePost);

    const resp = await addMovie(postMovie);

    if (resp._id) {
      window.location.href = ` ../movieDetails/movieDetails.html?id=${resp._id}`;
    }
  } catch (e) {
    console.log(e);
    container.innerHTML = "Server error";
  }
}

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", addMovieInApi);

function getMovieDataFromHtmlForm() {
  const postTitle = document.querySelector("#postTitle").value;
  const postGenre = document.querySelector("#postGenre").value;
  const postImdbRating = document.querySelector("#postImdbRating").value;
  const postYear = document.querySelector("#postYear").value;
  const postPosterUrl = document.querySelector("#postposter").value;

  return {
    Title: postTitle,
    Genre: postGenre,
    imdbRating: postImdbRating,
    Year: postYear,
    Poster: postPosterUrl,
  };
}

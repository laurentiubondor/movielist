const idPost = window.location.search.substring(4);
const container = document.querySelector("#moviesContainer");

let tokenId = JSON.parse(localStorage.getItem("token"));
console.log(tokenId);

/*let token = tokenId.authenticated;
console.log(tokenId.authenticated);*/

function redirectMovie(movieId) {
  const url = "../EditMovie/editmovie.html";
  return function (event) {
    window.location.href = `${url}?id=${movieId}`;
    console.log(event);
  };
}

function goToAddMoviePage() {
  //directionare spre pagina de adaugare film
  return () => {
    window.location.href = "../addNewMovie/addMovie.html";
  };
}

function afisazaFilmul(post) {
  const movie = document.createElement("div");

  movie.id = "film";

  movie.innerHTML = `<div >
            <h4 id="maintitle">${post.Title}</h4>
            <img src="${post.Poster}"   style="width: 300px; height: 450px;"></img> 
            </div>
<div id="descriere">
            <h6 ">Genre:  ${post.Genre}</h6>
            <h6 ">Rating:  ${post.imdbRating}</h6>
            <h6 " id="plot">Description: Tim Burton's Batman is,in my opinion,is the greatest superhero and comic book film ever made and is one of the films that set the standard for comic book adaptations. Filled with Amazing Action,Excellent performances,great direction and a brilliant score,Batman is one of my favorite movies of all time,a true classic and is Tim Burton at his best.</h6>
</div>
            <button type="button" id="editmovie">Edit Movie</button>
            <button type="button" id="addMovie">Add Movie</button>`; //creare buton directionare spre addMovie

  return movie;
}

async function getPostById(idPost) {
  const response = await fetch(
    `https://movies-api-siit.herokuapp.com/movies/${idPost}`
  );
  return response.json();
}

async function displayPostInHtml() {
  try {
    const post = await getPostById(idPost);

    if (idPost) {
      container.appendChild(afisazaFilmul(post));
      document
        .getElementById("editmovie")
        .addEventListener("click", redirectMovie(idPost));
    } else {
      window.location.href = "../home/home.html";
    }
    document
      .getElementById("addMovie")
      .addEventListener("click", goToAddMoviePage());

    hideButons();//ascunde butoanele daca nu suntem logati
  } catch (e) {
    console.log(e);
    container.innerHTML = "Server error";
  }
}

displayPostInHtml();

function hideButons() {
  const editmovie = document.getElementById("editmovie");
  const addMovie = document.getElementById("addMovie");
  if (!tokenId) {
    editmovie.style.display = "none";
    addMovie.style.display =  "none";
  }
  else if(tokenId)
  {
    editmovie.style.display = "block";
    addMovie.style.display = "block";
  }

  console.log(localStorage)
}
console.log("1"+2+3)
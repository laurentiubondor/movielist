const movieId = window.location.search.substring(4);
let tokenId = JSON.parse(localStorage.getItem('token'));
console.log(tokenId)

let token = tokenId.accessToken
console.log(tokenId.accessToken);

async function getMovie() {
    const response = await fetch("https://movies-api-siit.herokuapp.com/movies/" + movieId, {
        method: "GET"
    });

    return response.json();
}

async function getMoviePost() {
    try {
        const movie = await getMovie();
        console.log(movie);
        document.getElementById("postTitle").value = movie.Title;
        document.getElementById("postGenre").value = movie.Genre;
        document.getElementById("postImdbRating").value = movie.imdbRating;
        document.getElementById("postYear").value = movie.Year;
        document.getElementById("postposter").value = movie.Poster;
    } catch (e) {
        console.log(e);

    }
}
getMoviePost();

async function deleteMovie() {
    const response = await fetch("https://movies-api-siit.herokuapp.com/movies/" + movieId, {
        method: "DELETE",
        headers: {
            "X-Auth-Token": `${token}`,
            "Content-Type": "application/json"
        }
    })
    return response;
}

async function deleteMoviePost() {
    try {
        if (confirm("Are you sure you want to delete the movie?")) {
            await deleteMovie();
            window.location.href = "../home/home.html";
        }
    } catch (e) {
        console.log(e);
    }
}


async function editMovie(movie) {
    const response = await fetch("https://movies-api-siit.herokuapp.com/movies/" + movieId, {
        method: "PUT",
        headers: {
            "X-Auth-Token": `${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });

    return response.json();
}

async function editMoviePost() {
    try {
        const movie = getMovieDataFromHtmlForm();
        console.log(movie);
        await editMovie(movie);
        window.location.href = `../movieDetails/movieDetails.html?id=${movieId}`
    } catch (e) {
        console.log(e);

    }
}

const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", editMoviePost);

const delButton = document.getElementById("deleteButton");
delButton.addEventListener("click", deleteMoviePost);

function getMovieDataFromHtmlForm() {
    const postTitle = document.querySelector("#postTitle").value;
    const postGenre = document.querySelector("#postGenre").value;
    const postImdbRating = document.querySelector("#postImdbRating").value;
    const postYear = document.querySelector("#postYear").value;

    return {
        Title: postTitle,
        Genre: postGenre,
        imdbRating: postImdbRating,
        Year: postYear,
    };
}

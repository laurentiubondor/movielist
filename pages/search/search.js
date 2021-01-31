const BASE_URL_SERVER = "https://movies-api-siit.herokuapp.com/movies";

let searchParams = ""; 
let pageskip = "";
let selectedPage= null;

const filters = [
  {
    filterOption: "Title",
    elementTag: "INPUT",
    type: "text",
    attributes: {
      placeholder: "ex: Batman",
    },
  },
  {
    filterOption: "Genre",
    elementTag: "SELECT",
    type: null,
    attributes: [
      "Animation",
      "Action",
      "Adventure",
      "Crime",
      "Drama",
      "Fantasy",
      " Family",
      "Horror",
      "Mistery",
      "Sci-Fi",
      "Thriller",
    ],
  },
  {
    filterOption: "Year",
    elementTag: "INPUT",
    type: "range",
    attributes: {
      min: 1900,
      max: 2020,
      value: 2020,
      step: 1,
    },
    hasRenderedValue: true,
  },
  {
    filterOption: "Runtime",
    elementTag: "INPUT",
    type: "number",
    attributes: {
      min: 1,
      max: 300,
      placeholder: "min",
    },
  },
  {
    filterOption: "Language",
    elementTag: "SELECT",
    type: null,
    attributes: ["English", "German", "France", "Italian", "Romanian"],
  },
  {
    filterOption: "Country",
    elementTag: "SELECT",
    type: null,
    attributes: ["UK", "Germany", "France", "Italy", "Romania"],
  },
  {
    filterOption: "imdbRating",
    elementTag: "INPUT",
    type: "number",
    attributes: {
      min: 1,
      max: 10,
      step: ".1",
    },
  },
];

let filterOptionsContainer = document.getElementById("filterOptionsContainer");
let searchMovieButton = document.getElementById("searchMovieButton");
let pageButtonContainer = document.getElementById("pageButtonContainer");

searchMovieButton.addEventListener("click", function () {
  displayLoader();
  searchResults();
});

setupFilter();
searchResults();

function setupFilter() {
  filters.forEach((filter) => {
    addFilterChoice(filter);
  });
}

function addFilterChoice(filter) {
  const { filterOption, hasRenderedValue } = filter;
  let filterOptionContainer = document.createElement("div");
  filterOptionContainer.setAttribute("class", "filterOption");

  filterOptionContainer.appendChild(createCheckboxesForFilter(filterOption));
  filterOptionContainer.appendChild(createsLabelForFilter(filterOption));
  if (hasRenderedValue)
    filterOptionContainer.appendChild(
      createsRenderedValue(filterOption, hasRenderedValue)
    );
  filterOptionContainer.appendChild(createsInputForFilter(filter));
  filterOptionsContainer.appendChild(filterOptionContainer);
}

function filterChoiceClicked(e) {
  const value = e.target.value;
  const filterElement = document.getElementById(`${value}Element`);
  const renderedValue = document.querySelectorAll(
    `[data-from=${value}Element]`
  );
  filterElement.style.visibility = e.target.checked ? "visible" : "hidden";
  if (renderedValue.length) {
    renderedValue[0].style.visibility = e.target.checked ? "visible" : "hidden";
  }
}

function populateRenderedValue(e) {
  const renderedValue = document.querySelectorAll(`[data-from=${e.target.id}]`);
  if (renderedValue.length) {
    renderedValue[0].innerHTML = e.target.value;
  }
}

class Movie {
  constructor(Title, imdbRating, Poster, Genre, _id) {
    this.Title = Title;
    this.imdbRating = imdbRating;
    this.Poster = Poster;
    this.Genre = Genre;
  }

  renderMovies() {
    const movieDOM = document.createElement("div");
    movieDOM.setAttribute("class", "renderMovies");

    movieDOM.innerHTML = `
        <img src="${this.Poster}"></img>
        <div class="title">${this.Title}</div>
        <div id="rate">
            <img src="./star.png"></img>
            <div>${this.imdbRating}</div>
        </div>
        <div id="genre">${this.Genre}</div>`;

    return movieDOM;
  }
}
async function getMovies() {
  const response = await fetch(
    `${BASE_URL_SERVER}?${searchParams}${
      searchParams.length > 0 ? "&take=10" : "take=10"
    }${pageskip ? "&skip=" + pageskip : ""}`
  );
  return response.json();
}

const moviesContainer = document.querySelector("#moviesContainer");
moviesContainer.setAttribute("class", "moviesContainerClass");

function redirectMovieDetailsV2(movieId) {
  const url = "../movieDetails/movieDetails.html";

  return function () {
    window.location.href = `${url}?id=${movieId}`;
  };
}

async function searchResults() {
  let firstParamAdded = false;
  const checkBoxInputs = Array.from(
    document.getElementsByClassName("filterState")
  );
  searchParams = "";
  if (checkBoxInputs) {
    checkBoxInputs.forEach((element) => {
      if (element.checked) {
        const targetElement = document.getElementById(
          `${element.value}Element`
        );
        searchParams += `${firstParamAdded ? "&" : ""}${element.value}=${
          targetElement.value
        }`;
        firstParamAdded = true;
      }
    });
  }
  try {
    const movies = await getMovies();
    const nrOfPages = movies.pagination.numberOfPages;

    pageButtonContainer.innerHTML="";
    if (nrOfPages>1) {
      pageskip= 0;
      for(i=1; i<=nrOfPages; i++) {
        const buttonPages = document.createElement("button")
        buttonPages.setAttribute("class", "buttonPagesId");
        buttonPages.setAttribute("pageskip", `${(i-1)*10}`) 
        buttonPages.addEventListener("click", event => handlePageButtonClick(event));
        buttonPages.innerText=i
        pageButtonContainer.appendChild(buttonPages);
      }
    }
    setPageButtonsClass(movies.pagination.currentPage);
    
    document.getElementById("moviesContainer").innerHTML = "";
    if (movies.results.length >= 1) {
      movies.results.forEach((movie) => {
        let movieDOM = new Movie(
          movie.Title,
          movie.imdbRating,
          movie.Poster,
          movie.Genre
        ).renderMovies();
        movieDOM.addEventListener("click", redirectMovieDetailsV2(movie._id));
        moviesContainer.appendChild(movieDOM);
        hideLoader();
      });
    } else {
      hideLoader();
      moviesContainer.innerHTML =
        "Sorry, We couldn't find any movies with the criteria that you choose!";
    }
  } catch (e) {
    console.log(e);
    moviesContainer.innerHTML = "Server Error";
    hideLoader();
  }
}

function createCheckboxesForFilter(filterOption) {
  let filterState = document.createElement("input");
  filterState.setAttribute("class", "filterState");
  filterState.setAttribute("type", "checkbox");
  filterState.setAttribute("name", `${filterOption}Checkbox`);
  filterState.setAttribute("value", filterOption);
  filterState.onclick = (event) => filterChoiceClicked(event);
  return filterState;
}

function createsLabelForFilter(filterOption) {
  let label = document.createElement("label");
  label.setAttribute("class", "filterChoiceLabel");
  label.setAttribute("for", `${filterOption}Checkbox`);
  label.innerHTML = filterOption;
  return label;
}
function createsRenderedValue(filterOption) {
  const valueContainer = document.createElement("div");
  valueContainer.setAttribute("class", `${filterOption}RenderedValue`);
  valueContainer.setAttribute("data-from", `${filterOption}Element`);
  valueContainer.style.visibility = "hidden";
  return valueContainer;
}
function createsInputForFilter(filter) {
  const {
    filterOption,
    elementTag,
    type,
    attributes,
    hasRenderedValue,
  } = filter;
  let element = document.createElement(elementTag);
  element.setAttribute("class", "filterChoiceElement");
  element.setAttribute("id", `${filterOption}Element`);
  element.style.visibility = "hidden";
  element.style.display = "block";
  if (type) element.setAttribute("type", type);
  if (attributes) {
    if (attributes.length) {
      element.style.height = "36px";
      attributes.forEach((option) => {
        let optionElement = document.createElement("option");
        optionElement.text = option;
        element.add(optionElement);
      });
    } else {
      if (attributes.min) element.setAttribute("min", attributes.min);
      if (attributes.max) element.setAttribute("max", attributes.max);
      if (attributes.value) element.setAttribute("value", attributes.value);
      if (attributes.step) element.setAttribute("step", attributes.step);
      if (attributes.placeholder)
        element.setAttribute("placeholder", attributes.placeholder);
    }
  }
  if (hasRenderedValue)
    element.oninput = (event) => populateRenderedValue(event);
  return element;
}

function displayLoader() {
  let loader = document.getElementsByClassName("loader")[0];
  var filterContainer = document.getElementsByClassName("filterContainer")[0];
  filterContainer.style.opacity = 0.5;
  loader.style.display = "block";
}

function hideLoader() {
  let loader = document.getElementsByClassName("loader")[0];
  var filterContainer = document.getElementsByClassName("filterContainer")[0];
  filterContainer.style.opacity = 1;
  loader.style.display = "none";
}

function handlePageButtonClick(e) {
  pageskip = e.target.attributes["pageskip"].value;
  setPageButtonsClass(e.target.innerText);
  searchResults();
}

function setPageButtonsClass(selectedPageNumber) {
  const buttons = Array.from(document.getElementsByClassName("buttonPagesId"));
  buttons.forEach(button => {
    if(button.innerText == selectedPageNumber) {
      button.classList.add("selectedPage");
    }else {
      button.classList.remove("selectedPage");
    }
  })
}
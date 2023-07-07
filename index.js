src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
integrity =
  "sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz";
crossorigin = "anonymous";
let card;
let btn = document.getElementById("getDataButton");
btn.addEventListener("click", getMovie);

let sbmt = document.getElementById("btn1");
sbmt.addEventListener("click", getsearch);

let tv = document.getElementById("gettvshow");
tv.addEventListener("click", tv_show);

let container1 = document.getElementById("contaner1");
let url =
  "https://api.themoviedb.org/3/discover/movie?api_key=e9097b137e5e9bacd6efb85111071284&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const img_url = "https://image.tmdb.org/t/p/w500";

function getMovie() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTA5N2IxMzdlNWU5YmFjZDZlZmI4NTExMTA3MTI4NCIsInN1YiI6IjY0OWRiMjc5YzlkYmY5MDE0OGNlOWEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OMrSVb7yTmFJTVyFiLDodnLvc2g91bLOLKpzRoWvWy0",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.results.length; i++) {
        let title = response.results[i].title;
        let release_date = response.results[i].release_date;
        let poster_pat = response.results[i].poster_path;
        let overvei = response.results[i].overview;
        card = document.createElement("div");
        card.style = 'style="width: 18rem';
        card.setAttribute("class", "col-lg-3 col-md-3 col-sm-3 m-1  card");

        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = img_url + poster_pat;

        let mtitle = document.createElement("h5");
        mtitle.setAttribute("class", "card-title");
        mtitle.textContent = title;

        let mrd = document.createElement("h7");
        mrd.setAttribute("class", "card-title");
        mrd.textContent = "Date: " + release_date;
        let button = document.createElement("button");
        button.textContent = "veiw casts";

        button.className = "my-button";

        button.id = "my-button";

        let closeButton = document.createElement("button");
        closeButton.textContent = "Close Cast";
        closeButton.className = "close-button";
        closeButton.style.display = "none";

        button.addEventListener("click", function () {
          console.log("Button clicked!");
          const movieId = response.results[i].id;
          console.log(movieId);
          const currentCard = button.closest(".card");

          getCast(movieId, currentCard);
        });

        let overveiw = document.createElement("h7");
        overveiw.setAttribute("class", "card-title");
        overveiw.textContent = overvei;

        card.append(img);
        card.append(mtitle);
        card.append(mrd);
        card.append(overveiw);
        card.append(button);
        container1.append(card);
      }
      function getCast(movieId, currentCard) {
        const apiKey = "e9097b137e5e9bacd6efb85111071284";
        const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
        fetch(castUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const cast = data.cast;
            const castContainer = document.createElement("div");

            cast.forEach((actor) => {
              const name = actor.name;
              const character = actor.character;
              const actorInfo = document.createElement("p");
              actorInfo.textContent = `${name} as ${character}`;
              castContainer.appendChild(actorInfo);
            });

            // Append the cast container to the card or any desired HTML element
            currentCard.appendChild(castContainer);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    })
    .catch((err) => console.error(err));
}

function getsearch() {
  let user_input = document.getElementById("search").value;
  console.log(user_input);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTA5N2IxMzdlNWU5YmFjZDZlZmI4NTExMTA3MTI4NCIsInN1YiI6IjY0OWRiMjc5YzlkYmY5MDE0OGNlOWEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OMrSVb7yTmFJTVyFiLDodnLvc2g91bLOLKpzRoWvWy0",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      user_input +
      "&include_adult=false&language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < response.results.length; i++) {
        console.log(response);
        let title = response.results[i].title;
        let release_date = response.results[i].release_date;
        let poster_pat = response.results[i].poster_path;
        let overvei = response.results[i].overview;
        let card = document.createElement("div");
        card.style = 'style="width: 18rem';
        card.setAttribute("class", "col-lg-3 col-md-3 col-sm-3 m-1  card");

        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = img_url + poster_pat;

        let mtitle = document.createElement("h5");
        mtitle.setAttribute("class", "card-title");
        mtitle.textContent = title;

        let mrd = document.createElement("h7");
        mrd.setAttribute("class", "card-title");
        mrd.textContent = "Date: " + release_date;

        let overveiw = document.createElement("h7");
        overveiw.setAttribute("class", "card-title");
        overveiw.textContent = overvei;

        card.append(img);
        card.append(mtitle);
        card.append(mrd);
        card.append(overveiw);
        container1.append(card);
      }
    })
    .catch((err) => console.error(err));
}

function tv_show() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTA5N2IxMzdlNWU5YmFjZDZlZmI4NTExMTA3MTI4NCIsInN1YiI6IjY0OWRiMjc5YzlkYmY5MDE0OGNlOWEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OMrSVb7yTmFJTVyFiLDodnLvc2g91bLOLKpzRoWvWy0",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=e9097b137e5e9bacd6efb85111071284&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < response.results.length; i++) {
        console.log(response);
        let title = response.results[i].title;
        let vote = response.results[i].vote_average;
        let poster_pat = response.results[i].poster_path;
        let overvei = response.results[i].overview;
        let card = document.createElement("div");
        card.style = 'style="width: 18rem';
        card.setAttribute("class", "col-lg-3 col-md-3 col-sm-3 m-1  card");

        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = img_url + poster_pat;

        let mtitle = document.createElement("h5");
        mtitle.setAttribute("class", "card-title");
        mtitle.textContent = title;

        let mrd = document.createElement("h7");
        mrd.setAttribute("class", "card-title");
        mrd.textContent = "Avg vote: " + vote;

        let overveiw = document.createElement("h7");
        overveiw.setAttribute("class", "card-title");
        overveiw.textContent = overvei;

        card.append(img);
        card.append(mtitle);
        card.append(mrd);
        card.append(overveiw);
        container1.append(card);
      }
    })
    .catch((err) => console.error(err));
}

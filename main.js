const requestURL = "json/a24movies.json";

//funcion asincrona

async function fetchMoviesJson() {
  const response = await fetch(requestURL);
  const movies = await response.json();
  return movies;
}

fetchMoviesJson().then( movies => {
  for (let index = 0; index < movies.a24movies.length; index++) {
    const movieSection = document.getElementById("movieSection");

    let id = movies.a24movies[index].id;
    let poster = movies.a24movies[index].poster;
    let title = movies.a24movies[index].title;
    let year = movies.a24movies[index].year;
    let length = movies.a24movies[index].length;
    let director = movies.a24movies[index].director;
    let synopsis = movies.a24movies[index].synopsis;

    movieSection.innerHTML += `
        <div class="col-md-4 mb-4">
        <div class="card h-100" style="width: 24rem;">
            <img src="${poster}" class="card-img-top" alt="documentary poster" style="height: 32rem;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-title><span class="h6">${year}</span> . ${length}</p>
                <h6 class="card-title">${director}</h6>
                <p class="card-text mb-4">${synopsis}</p>
            </div>
        </div>
        </div>
        `;
  }
});

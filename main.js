const requestURL = '../json/A24movies';

// función asíncroma

async function fetchMoviesJson() {
  const response = await fetch(requestURL);
  const movies = await response.json();
  return movies;
}

fetchMoviesJson().then(movies => {
  for (let index = 0; index < movies.A24movies.length; index++) {
    const moviesSection = document.getElementsById("movieSection");
    let id = movies.A24movies[index].id;
    let poster = movies.A24movies[index].poster;
    let title = movies.A24movies[index].title;
    let year = movies.A24movies[index].year;
    let length = movies.A24movies[index].length;
    let director = movies.A24movies[index].director;
    let synopsis = movies.A24movies[index].synospsis;

    moviesSection.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src="${poster}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${synopsis}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    `
  }
});

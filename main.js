const requestURL = "json/a24movies.json";

// Función asincrónica para obtener las películas
async function fetchMoviesJson() {
  const response = await fetch(requestURL);
  const movies = await response.json();
  return movies.a24movies;
}

// Función para mostrar las películas en el HTML
function displayMovies(movies) {
  const movieSection = document.getElementById("movieSection");
  movieSection.innerHTML = ""; 

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('col-md-4', 'mb-4');

    // Crea el HTML de la tarjeta
    movieCard.innerHTML = `
      <div class="card mx-auto" style="width: 24rem;">
        <div class="">
          <img src="${movie.poster}" class="card-img-top" alt="${movie.title} poster" style="height: 32rem; cursor: pointer;">
          <div class="trailer-text" style="position: absolute; bottom: 10px; left: 10px; color: white; background-color: rgba(0, 0, 0, 0.7); padding: 5px; display: none;">
            Ver el trailer
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-title"><span class="h6">${movie.year}</span> . ${movie.length}</p>
          <h6 class="card-title">${movie.director}</h6>
          <p class="card-text mb-4">${movie.synopsis}</p>
        </div>
      </div>
    `;

    // Añade eventos de mouse para mostrar/ocultar el texto
    const image = movieCard.querySelector('.card-img-top');
    const trailerText = movieCard.querySelector('.trailer-text');

    // Mostrar el texto al pasar el ratón
    image.addEventListener('mouseenter', () => {
      trailerText.style.display = 'block'; 
    });

    // Ocultar el texto al salir el ratón
    image.addEventListener('mouseleave', () => {
      trailerText.style.display = 'none'; 
    });

    // Evento de clic en la imagen para abrir el enlace del tráiler en una nueva ventana
    image.addEventListener('click', () => {
      window.open(movie.trailer, '_blank'); 
    });

    movieSection.appendChild(movieCard);
  });
}

// Función de búsqueda
function searchMovies(query, movies) {
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
}

// Ejecución al cargar la página
fetchMoviesJson().then(movies => {
  displayMovies(movies); 

  // Agregar evento al botón de búsqueda
  const searchButton = document.querySelector("button[type='submit']");
  const searchInput = document.querySelector("input[type='search']");

  searchButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el envío del formulario
    const query = searchInput.value.trim();
    const filteredMovies = searchMovies(query, movies);
    displayMovies(filteredMovies); 
  });
});

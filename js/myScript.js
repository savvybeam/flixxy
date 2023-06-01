import { api } from "./env.js";

//
//VARIABLE DECLARATIONS
// 

// [1] - correct
const global = {
    currentPage: window.location.pathname,
    search: {
        type : '',
        term : ''
    },
    api : {
        url : api.url,
        key : api.key
    },
    pages : {
        current : '',
        totalPages : '',
        totalResults : ''
    }
}



//
//FUNCTIONS
//

//[2] - correct
//implented a router
const router = (page) =>{

    switch (page){
        case "/":
        case "/index.html":
            displayPopularMovies();
            break;
        
        case "/search.html":
            search();
            break;
        
        case "/shows.html":
            displayTVShows();
            break;

        case "/tv-details.html":
            displayShowDetails();
            break;
        
        case "/movie-details.html":
            displayMovieDetails(page);
            break;
    }

    highlightActiveLink(page);

    displaySlider();

}

//[3] - correct
//highlight active links
const highlightActiveLink = (page) =>{
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        if(link.getAttribute('href') === page){
            link.classList.add('active');
        }         
    });

}


//get Shows

const displayTVShows = async () =>{

    const { results } = await fetchAPIData('tv/popular');
    
    console.log(results)

    results.forEach(show =>{

        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="${show.name}"
        />`
            : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
      />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${show.first_air_date}</small>
        </p>
      </div>
        `;

        document.querySelector('#popular-shows').appendChild(div);

    })

}


//get Popular Movies

const displayPopularMovies = async () =>{

    const { results } = await fetchAPIData('movie/popular');
    
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
              <a href="movie-details.html?id=${movie.id}">
                ${
                  movie.poster_path
                    ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                    : `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
              </div>
            `;
    
        document.querySelector('#popular-movies').appendChild(div);
      });

}

const displayBackdropImage = (type, imagePath) =>{

    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${imagePath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type === "movie"){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }

}


//get Single Movie Details

const displayMovieDetails = async () =>{

const movieId = window.location.search.split('=')[1];

const movie  = await fetchAPIData(`movie/${movieId}`);

displayBackdropImage('movie', movie.backdrop_path);

const div = document.createElement('div');
div.innerHTML = `
<div class="details-top">
    <div>
        ${
        movie.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
        />`
            : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
        />`
        }
    </div>
    <div>
        <h2>${movie.title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
            ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${
            movie.homepage
        }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
</div>
<div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
    <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
    <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
    <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
</div>
`;

document.querySelector('#movie-details').appendChild(div);

}


// display single show details

const displayShowDetails = async () =>{

    const showId = window.location.search.split('=')[1];

    const show = await fetchAPIData(`tv/${showId}`);

    console.log(show);

    displayBackdropImage('tv',show.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
    <div>
        ${
        show.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
        />`
            : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
        />`
        }
    </div>
    <div>
        <h2>${show.name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Air Date: ${show.first_air_date}</p>
        <p>
            ${show.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${
            show.homepage
        }" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
</div>
<div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
</div>
    `;

    document.querySelector('#show-details').appendChild(div);
}

const showSpinner = () =>{
    document.querySelector('.spinner').classList.add('show');
}

const hideSpinner = () =>{
    document.querySelector('.spinner').classList.remove('show');
}




// Search

const search = async () =>{

    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    global.search.type = params.get('type');
    global.search.term = params.get('search-term');

    //search data from API

    const {results, total_pages, total_results} = await searchAPIData();

    global.pages.totalPages = total_pages;
    global.pages.totalResults = total_results;

    console.log(results);

    displaySearchResults(results);

}

const displaySearchResults = (results) =>{
    
    results.forEach(result=>{
    
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="${global.search.type}-details.html?id=${result.id}">
            <img
            src="https://image.tmdb.org/t/p/w500${result.poster_path}"
            class="card-img-top"
            alt="${result.title}"
            />
        </a>
        <div class="card-body">
            <h5 class="card-title">${global.search.type === "movie" ? result.title : result.name}</h5>
            <p class="card-text">
            <small class="text-muted">${global.search.type === "movie" ? "Release" : "Air Date"} : ${global.search.type === "movie" ? result.release_date : result.first_air_date}</small>
            </p>
        </div>
     `;
    
     document.querySelector('#search-results').appendChild(div);
    })
    
}


const searchAPIData = async () =>{
    const response = await fetch(`${global.api.url}search/${global.search.type}?query=${global.search.term}&api_key=${global.api.key}&language=en-US`);

    return await response.json();
}






// Display Slider

const displaySlider = async () =>{
    const { results } = await fetchAPIData(`movie/now_playing`);

    results.forEach(movie =>{
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
            </a>
            <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${movie.vote_average}/10
            </h4>
            
        `;

        if(global.currentPage === '/' || global.currentPage === '/index.html'){

            document.querySelector('.swiper-wrapper').appendChild(div);
            initSwiper();
        }


    });

}

const initSwiper = () =>{
    const swiper = new Swiper('.swiper',{
        slidesPerView : 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnOnteraction: false
        },
        breakpoints: {
            500 : {
                slidesPerView: 2
        },
        700 : {
            slidesPerView: 3
    },1200 : {
        slidesPerView: 4
    }
}});

}


//get data from TMDB API
const fetchAPIData = async (endpoint) =>{

    showSpinner();

    const response = await fetch(`${global.api.url}${endpoint}?api_key=${global.api.key}&language=en-US`);
    const results = await response.json();
    
    hideSpinner();

    return results;

}





//
//EVENT HANDLERS
//










//FUNCTION CALLS ON LOAD

router(global.currentPage);
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
        total_pages : '',
        total_results : ''
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
            console.log("Home");
            break;
        
        case "/search.html":
            console.log("Search");
            break;
        
        case "/shows.html":
            console.log("Shows");
            break;

        case "/tv-details.html":
            console.log("TV Details")
            break;
        
        case "/movie-details.html":
            console.log("Movies Details")
            break;
    }

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


//get Now Playing Movies

const getNowPlayingMovies = async () =>{

    const results = await fetchAPIData('movie/now_playing');
    console.log(results)
    return results;

}


//get data from TMDB API
const fetchAPIData = async (endpoint) =>{

    const response = await fetch(`${global.api.url}${endpoint}?api_key=${global.api.key}&language=en-US`);
    const results = await response.json();
    
    return results;

}





//
//EVENT HANDLERS
//










//FUNCTION CALLS ON LOAD

router(global.currentPage);

highlightActiveLink(global.currentPage);

fetchAPIData('');

getNowPlayingMovies();
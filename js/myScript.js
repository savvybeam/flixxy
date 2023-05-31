import { api } from "./env";

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



//
//EVENT HANDLERS
//










//FUNCTION CALLS ON LOAD

router(global.currentPage);

highlightActiveLink(global.currentPage)
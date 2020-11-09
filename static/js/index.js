import Login from "./pages/login/Login.js";
import Register from "./pages/Register/Register.js";

/*
*    Title: single-page-app-vanilla-js source code
*    Author: Domenic(dcode-youtube)
*    Date: 11/6/2020
*    Availability: https://github.com/dcode-youtube/single-page-app-vanilla-js
*
*/
function router(){

    // set all the routes
    const routes = [
        {path: "/register", page: Register, isActive: false},
        {path: "/", page: Login, isActive: false},
    ]

    // passing the reference of matching route to curretnRoute
    let currentRoute = routes.find(route=> route.path === window.location.pathname);
    
    if(!currentRoute){
        currentRoute = routes[0];
    }

    const currentPage = new currentRoute.page();

    // Show current page html content
    document.querySelector("#app").innerHTML = currentPage.getHtml();

    // Load all the event listeners for current page
    currentPage.loadEventListeners();

}

window.addEventListener('DOMContentLoaded', ()=>{
    router();
})
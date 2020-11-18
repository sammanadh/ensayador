import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Dashboard from "./pages/dashboard/Dashboard.js";

/*
*    Title: single-page-app-vanilla-js source code
*    Author: Domenic(dcode-youtube)
*    Date: 11/6/2020
*    Availability: https://github.com/dcode-youtube/single-page-app-vanilla-js
*
*/
async function router(){

    // set all the routes
    const routes = [
        {path: "/", page: Login, isActive: false},
        {path: "/register", page: Register, isActive: false},
        {path: "/dashboard", page: Dashboard, isActive: false},
    ]

    // passing the reference of matching route to curretnRoute
    let currentRoute = routes.find(route=> route.path === window.location.pathname);
    
    if(!currentRoute){
        currentRoute = routes[0];
    }

    const currentPage = new currentRoute.page();

    // Show current page html content
    document.querySelector("#app").innerHTML = await currentPage.getHtml();

    // Load all the event listeners for current page
    currentPage.loadEventListeners();

}

window.addEventListener('DOMContentLoaded', ()=>{
    router();
})
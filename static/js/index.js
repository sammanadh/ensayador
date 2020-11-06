import Login from "./pages/login/Login.js";
import Dashboard from "./pages/dashboard/Dashboard.js";

function router(){

    // set all the routes
    const routes = [
        {path: "/dashboard", page: Dashboard, isActive: false},
        {path: "/", page: Login, isActive: false},
    ]

    // passing the reference of matching route to curretnRoute
    let currentRoute = routes.find(route=> route.path === window.location.pathname);
    
    if(!currentRoute){
        currentRoute = routes[0];
    }

    const currentPage = new currentRoute.page();

    document.querySelector("#app").innerHTML = currentPage.getHtml();

}

window.addEventListener('DOMContentLoaded', ()=>{
    router();
})
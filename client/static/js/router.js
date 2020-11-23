import Login from "./components/login/Login.js";
import Register from "./components/register/Register.js";
import Surveys from "./components/surveys/Surveys.js";
import Questionnaire from "./components/questionnaire/Questionnaire.js";

// helpers
import { getToken } from "./helpers.js";

// Generates regular expression for every route path to which the current location is to be compaired
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// Extracts parameters and parameter keys from route and return an object by maping every parameter key to the value 
const getParams = route => {
    const values = route.result.slice(1);
    const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((k,i) => {
        return [k, values[i]]
    }))
}

async function router(){

    // set all the routes
    const routes = [
        {path: "/login", component: Login, result: null, allow: true},
        {path: "/surveys", component: Surveys, result: null, allow: guardRoute()},
        {path: "/surveys/:id", component: Questionnaire, result: null, allow: guardRoute()},
        {path: "/register", component: Register, result: null, allow: true},
    ]

    /*
        passing the reference of matching route to currentRoute and 
        populating the result key with the match result so that later on prameters can be extracted
    */
    let currentRoute = routes.find(route=> {
        route.result = window.location.pathname.match(pathToRegex(route.path))
        return route.result != null;
    });

    
    if(!currentRoute && getToken()){
        return navigateTo("/surveys");
    }else if(!currentRoute || !currentRoute.allow){
        return navigateTo("/login");
    }


    const currentComp = new currentRoute.component(getParams(currentRoute));

    // Show current component html content
    document.querySelector("#app").innerHTML = await currentComp.getHtml();

    // Load all the event listeners for current component
    currentComp.onload();

}

function guardRoute(role=null){
    if(!getToken()){
        return false
    }else{
        return true
    }
}


function navigateTo(url){
    history.pushState(null, null, url);
    router();
}

export {router, navigateTo};
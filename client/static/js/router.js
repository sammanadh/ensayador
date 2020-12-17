import Login from "./components/login/Login.js";
import Register from "./components/register/Register.js";
import Surveys from "./components/surveys/Surveys.js";
import Questionnaire from "./components/questionnaire/Questionnaire.js";
import Navbar from "./components/navbar/Navbar.js";
import TestersList from "./components/testers_list/TestersList.js";
import NewSurveyForm from "./components/newSurveyForm/NewSurveyForm.js";
import SurveyResponses from "./components/surveyResponses/SurveyResponses.js";

// helpers
import { getRole, getToken, handleError } from "./helpers.js";

/**
 * Generates regular expression for every route path so that current location can be compaired
 * @param {string} path 
 */
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

/**
 * Extracts parameter from a url route
 * @param {string} route 
 */
const getParams = route => {
    const values = route.result.slice(1);
    const keys = route.path.match(/:(\w+)/g) || [];
    return Object.fromEntries(keys.map((k,i) => {
        return [k.split(":")[1], values[i]]
    }))
}

/**
 * Handles front end routing
 * It will look into the url and load corresponding component
 * It will also call onload method of the current componenet after it loads
 */
async function router(){

    // set all the routes
    const routes = [
        {path: "/login", component: Login, result: null, allow: true},
        {path: "/surveys", component: Surveys, result: null, allow: guardRoute()},
        {path: "/surveys/:id", component: Questionnaire, result: null, allow: guardRoute(["tester"])},
        {path: "/add_survey", component: NewSurveyForm, result:null, allow: guardRoute(["admin"])},
        {path: "/register", component: Register, result: null, allow: true},
        {path: "/testers", component: TestersList, result: null, allow: guardRoute(["admin"])},
        {path: "/responses/:id", component: SurveyResponses, result: null, allow: guardRoute(["admin"])},
    ]

    /*
        passing the reference of matching route to currentRoute and 
        populating the result key with the match result so that later on prameters can be extracted
    */
    let currentRoute = routes.find(route=> {
        route.result = window.location.pathname.match(pathToRegex(route.path))
        return route.result != null;
    });

    if(currentRoute && !currentRoute.allow){
        return handleError("Sorry! You do not have access to this page.", "/");
    }

    if(!currentRoute && getToken()){
        return navigateTo("/surveys");
    }else if(!currentRoute){
        return navigateTo("/login");
    }
    
    // If the current component is not Login
    if(currentRoute.component!==Login){
        // Display the navbar
        const navbar = await new Navbar();
        document.querySelector("#navbar").innerHTML =  await navbar.getHtml();   
        
        // Run additional setup for navbar
        navbar.onload();
    }else{
        // This is neccessary because it will remove the navbar if a user logs out 
        document.querySelector("#navbar").innerHTML =  null;
    }
    
    const currentComp = new currentRoute.component(getParams(currentRoute));
    
    // Display current component
    document.querySelector("#app").innerHTML = await currentComp.getHtml();
    
    // Run additional setup for current component
    currentComp.onload();
    
}

/**
 * Guards route agains unauthenticated or unauthorized user
 * It will only return true if token exists and role of the user is one of the roles that are allowed
 * @param {Array<string>} roles 
 * @returns {boolean}
 */
function guardRoute(roles=null){
    if(getToken() && (!roles || roles.includes(getRole())) ){
        return true;
    }else{
        return false;
    }
}

/**
 * Allows routing from one componenet to another without reloading entire application
 * It is what enables the single page behavour of this application
 * @param {string} url 
 */
function navigateTo(url){
    history.pushState(null, null, url);
    router();
}

window.addEventListener("popstate", ()=>{
    router();
})

export {router, navigateTo};
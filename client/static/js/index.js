// console.log("Hello from wine testers");

import Login from "./components/login/Login.js";
import Register from "./components/register/Register.js";
import Surveys from "./components/surveys/Surveys.js";
import Questionnaire from "./components/questionnaire/Questionnaire.js";
/*
*    Title: single-component-app-vanilla-js source code
*    Author: Domenic(dcode-youtube)
*    Date: 11/6/2020
*    Availability: https://github.com/dcode-youtube/single-component-app-vanilla-js
*
*/

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = route => {
    const values = route.result.slice(1);
    // Extract param name from the route
    const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((k,i) => {
        return [k, values[i]]
    }))
}

async function router(){

    // set all the routes
    const routes = [
        {path: "/login", component: Login, result: null},
        {path: "/surveys", component: Surveys, result: null},
        {path: "/surveys/:id", component: Questionnaire, result: null},
        {path: "/register", component: Register, result: null},
    ]

    /*
        passing the reference of matching route to currentRoute and 
        populating the result key with the match result so that later on prameters can be extracted
    */
    let currentRoute = routes.find(route=> {
        route.result = window.location.pathname.match(pathToRegex(route.path))
        return route.result != null;
    });

    if(!currentRoute){
        if(localStorage.getItem('token')){
            return window.location.href = "/surveys"
        }else{
            currentRoute = routes[0];
        }
    }

    const currentComp = new currentRoute.component(getParams(currentRoute));

    // Show current component html content
    document.querySelector("#app").innerHTML = await currentComp.getHtml();

    // Load all the event listeners for current component
    currentComp.onload();

}

window.addEventListener('DOMContentLoaded', ()=>{
    router();
})


// import Login from "./components/login/Login.js";
// import Register from "./components/register/Register.js";
// import Surveys from "./components/surveys/Surveys.js";
// import Questionnaire from "./components/questionnaire/Questionnaire.js";

// const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// const getParams = match => {
//     const values = match.result.slice(1);
//     const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

//     return Object.fromEntries(keys.map((key, i) => {
//         return [key, values[i]];
//     }));
// };

// const navigateTo = url => {
//     history.pushState(null, null, url);
//     router();
// };

// const router = async () => {
//     console.log("Hello from router");
//     // const routes = [
//     //     { path: "/login", component: Login },
//     //     { path: "/register", component: Register },
//     //     { path: "/surveys", component: Surveys },
//     //     { path: "/survey", component: Questionnaire },
//     // ];

//     // // Test each route for potential match
//     // const potentialMatches = routes.map(route => {
//     //     return {
//     //         route: route,
//     //         result: location.pathname.match(pathToRegex(route.path))
//     //     };
//     // });

//     // let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

//     // if (!match) {
//     //     match = {
//     //         route: routes[0],
//     //         result: [location.pathname]
//     //     };
//     // }

//     // const currentComponent = new match.route.component(getParams(match));

//     // document.querySelector("#app").innerHTML = await currentComponent.getHtml();

//     // currentComponent.onload();
// };

// window.addEventListener("popstate", router);

// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("[data-link]")) {
//             e.preventDefault();
//             navigateTo(e.target.href);
//         }
//     });

//     router();
// });
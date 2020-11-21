import config from "../config.js";

async function getSurveys(){

    const token = window.localStorage.getItem("token");

    fetch(`${config.BASEURL}surveys/liveSurveysToBeFilled`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'token': `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
        // if(res.ok){
        //     return res.json();
        // }else{
        //     throw new Error('Something went very wrong');
        // }
    }).then(data => console.log(data)).catch(err => console.log(err));
}

export {getSurveys}
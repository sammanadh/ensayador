import config from "../config.js";

async function getLiveSurveys(token){

    return fetch(`${config.BASEURL}/surveys/liveSurveysToBeFilled`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

async function getAllSurveys(token){

    return fetch(`${config.BASEURL}/surveys`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

async function participate(token, survey_id){

    return fetch(`${config.BASEURL}/surveys/participate/${survey_id}`, {
        method: "POST",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

export { getLiveSurveys, getAllSurveys, participate }
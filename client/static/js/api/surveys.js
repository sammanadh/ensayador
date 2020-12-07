import config from "../config.js";

function getLiveSurveys(token){

    return fetch(`${config.BASEURL}/surveys/liveSurveysToBeFilled`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

function getAllSurveys(token){

    return fetch(`${config.BASEURL}/surveys`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

function participate(token, survey_id){

    return fetch(`${config.BASEURL}/surveys/participate/${survey_id}`, {
        method: "POST",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

function postSurvey(token, data){
    return fetch(`${config.BASEURL}/surveys/store`, {
        method: "POST",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
}

export { getLiveSurveys, getAllSurveys, participate, postSurvey }
import config from "../config.js";

function storeResponses(token, survey_id, responses){
    return fetch(`${config.BASEURL}/responses/store/${survey_id}`, {
        method: "POST",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            responses: responses
        })
    })
}

function getSurveyResponses(token, surveyId){
    return fetch(`${config.BASEURL}/responses/bySurveyId/${surveyId}`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { storeResponses, getSurveyResponses};
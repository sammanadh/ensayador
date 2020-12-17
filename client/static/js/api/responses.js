import config from "../config.js";

/**
 * Makes api request to store responses for a survey
 * 
 * @param {string} token 
 * @param {string} survey_id 
 * @param {Array} responses 
 * @returns {Promise}
 */
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

/**
 * Makes request to get reponses for a survey
 * 
 * @param {string} token 
 * @param {string} surveyId 
 * @returns {Promise}
 */
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
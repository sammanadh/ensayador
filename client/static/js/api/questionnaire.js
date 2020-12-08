import config from "../config.js";

function getQuestionsWithOptions(token, id){
    return fetch(`${config.BASEURL}/questionnaire/questionsWithOptions/${id}`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

function submitQuestionnaire(token, survey_id, responses){
    return fetch(`${config.BASEURL}/questionnaire/storeResponses/${survey_id}`, {
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
    return fetch(`${config.BASEURL}/questionnaire/responses/${surveyId}`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { getQuestionsWithOptions, submitQuestionnaire, getSurveyResponses};
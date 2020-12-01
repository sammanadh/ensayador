import config from "../config.js";

async function getQuestionsWithOptions(token, id){
    return fetch(`${config.BASEURL}/questionnaire/questionsWithOptions/${id}`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

async function submitQuestionnaire(token, survey_id, responses){
    // return fetch(`${config.BASEURL}/questionnaire/questionsWitOptions/${survey_id}`, {
    //     method: "GET",
    //     headers: {
    //         'Content_Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     // body: JSON.stringify({
    //     //     responses: [...responses]
    //     // })
    // })
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

export { getQuestionsWithOptions, submitQuestionnaire};
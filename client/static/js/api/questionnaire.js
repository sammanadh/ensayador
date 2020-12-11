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

export { getQuestionsWithOptions };
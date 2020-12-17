import config from "../config.js";

/**
 * Makes request to get questions and options for a survey
 * 
 * @param {string} token 
 * @param {string} id 
 * @returns {Promise}
 */
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
import config from "../config.js";

/**
 * Makes api request to retreive all the live surveys
 * 
 * @param {string} token 
 * @returns {Promise}
 */
function getLiveSurveys(token){

    return fetch(`${config.BASEURL}/surveys/liveSurveysToBeFilled`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

/**
 * Makes api request to retreive all surveys
 * 
 * @param {string} token 
 * @returns {Promise}
 */
function getAllSurveys(token){

    return fetch(`${config.BASEURL}/surveys`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

/**
 * Makes api request for a user to participate in a survey
 * 
 * @param {string} token 
 * @param {string} survey_id 
 */
function participate(token, survey_id){

    return fetch(`${config.BASEURL}/surveys/participate/${survey_id}`, {
        method: "POST",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

/**
 * Makes api request to post new survey
 * 
 * @param {string} token 
 * @param {object} data 
 */
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
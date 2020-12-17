import config from "../config.js";

/**
 * Makes api request to get all testers
 * 
 * @param {string} token 
 * @returns {Promise}
 */
function getTesters(token){
    return fetch(`${config.BASEURL}/users/byRole/tester`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

/**
 * Makes api request to remove a tester
 * 
 * @param {string} tester_id
 * @param {string} token 
 * @returns {Promise}
 */
function removeTester(tester_id, token){
    return fetch(`${config.BASEURL}/users/delete/${tester_id}`, {
        method: "DELETE",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { getTesters, removeTester }
import config from "../config.js";

/**
 * Makes request for loggin in
 * 
 * @param {string} user_id 
 * @param {string} password 
 * @returns {Promise}
 */
function login(user_id, password){
    return fetch(`${config.BASEURL}/auth/login`, {
        method: "POST",
        body:JSON.stringify({
            user_id,
            password
        })
    })
}

/**
 * Makes request for registering a new tester
 * @param {object} userData 
 * @returns {Promise}
 */
function registerNewTester(userData){
    return fetch(`${config.BASEURL}/auth/registerTester`, {
        method: "POST",
        body:JSON.stringify(userData)
    })
}

export { login, registerNewTester }
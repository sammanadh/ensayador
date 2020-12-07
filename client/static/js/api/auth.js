import config from "../config.js";

function login(user_id, password){
    return fetch(`${config.BASEURL}/auth/login`, {
        method: "POST",
        body:JSON.stringify({
            user_id,
            password
        })
    })
}

function registerNewTester(userData){
    return fetch(`${config.BASEURL}/auth/registerTester`, {
        method: "POST",
        body:JSON.stringify(userData)
    })
}

export { login, registerNewTester }
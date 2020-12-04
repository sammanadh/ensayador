import config from "../config.js";

async function login(user_id, password){
    return await fetch(`${config.BASEURL}/auth/login`, {
        method: "POST",
        body:JSON.stringify({
            user_id,
            password
        })
    })
}

async function registerNewTester(userData){
    return await fetch(`${config.BASEURL}/auth/registerTester`, {
        method: "POST",
        body:JSON.stringify(userData)
    })
}

export { login, registerNewTester }
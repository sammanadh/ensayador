import config from "../config.js";

async function getTesters(token){
    return fetch(`${config.BASEURL}/users/byRole/tester`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { getTesters }
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

async function removeTester(tester_id, token){
    return fetch(`${config.BASEURL}/users/remove/${tester_id}`, {
        method: "DELETE",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { getTesters, removeTester }
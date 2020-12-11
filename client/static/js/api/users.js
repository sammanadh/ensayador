import config from "../config.js";

function getTesters(token){
    return fetch(`${config.BASEURL}/users/byRole/tester`, {
        method: "GET",
        headers: {
            'Content_Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

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
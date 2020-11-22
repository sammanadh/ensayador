import config from "../config.js";

async function login(user_id, password){
    return await fetch(`${config.BASEURL}auth/login`, {
        method: "POST",
        body:JSON.stringify({
            user_id,
            password
        })
    })
}

function register(){

    fetch(`${config.BASEURL}auth/register`).then(res=>{
        return res.json();
    }).then(data => console.log(data)).catch(err => console.log(err));

}

export { login, register }
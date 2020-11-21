import config from "../config.js";

async function login(user_id, password){
    fetch(`${config.BASEURL}auth/login`, {
        method: "POST",
        body:JSON.stringify({
            user_id,
            password
        })
    }).then(res => {
        return res.json();
    }).then(jsonRes => 
        localStorage.setItem('token', jsonRes.data.token)
    ).catch(err => 
        console.log(err)
    );
}

function register(){

    fetch(`${config.BASEURL}auth/register`).then(res=>{
        return res.json();
    }).then(data => console.log(data)).catch(err => console.log(err));

}

export { login, register }
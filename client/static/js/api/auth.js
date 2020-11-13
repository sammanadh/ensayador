import config from "../config.js";

function login(){

}

function register(){

    fetch(`${config.BASEURL}users/register`).then(res=>{
        if(res.ok){
            return res.json();
        }else{
            console.log("Sorry! an error occured")
        }
    }).then(data => console.log(data)).catch(err => console.log(err));

}

export { login, register }
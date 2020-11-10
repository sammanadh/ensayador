import Page from "../Page.js";
import template from "../../api/template.js";

export default class Login extends Page{

    constructor(){
        super();

        // Initialize the properties
        this.title = "Login"
        this.data = {
            username : "",
            password : ""
        }

        this.setTitle(this.title);
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/Login/Login.html")+'`');
    }

    loadEventListeners(){
        document.querySelector("form").addEventListener("submit", (evt)=>{
            evt.preventDefault();
            console.log(this.data);
        })
        document.querySelectorAll("input").forEach(e => e.addEventListener("input", (evt)=>{
            if(evt.target.name in this.data){
                this.data[evt.target.name] = evt.target.value
            }
            })
        )
    }

}
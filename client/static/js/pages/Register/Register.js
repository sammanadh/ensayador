import Page from "../Page.js";
import template from "../../api/template.js";
import { register } from "../../api/auth.js";

export default class Register extends Page{

    constructor(){
        super();

        // Initialize the 
        this.title = "Register"
        this.username = "";
        this.password = "";
        this.email = "";
        this.first_name = "";
        this.last_name = "";
        this.contact_no = "";

        this.setTitle(this.title);
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        register();
        return eval('`'+await template("/template/Register/Register.html")+'`');
    }

    loadEventListeners(){
        document.querySelector("form").addEventListener("submit", (evt)=>{
            
        })
    }

}
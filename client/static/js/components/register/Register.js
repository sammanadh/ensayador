import Page from "../Page.js";
import template from "../../api/template.js";
import { register } from "../../api/auth.js";

export default class Register extends Page{

    constructor(){
        super();

        this.setTitle("Register");
        
        // Initialize the properties
        this.data = {
            first_name: "",
            last_name: "",
            user_id : "",
            email: "",
            password : "",
            confirm_password: "",
            address: "",
            contact_no : "",
            role: "",
            dob: null,
        }

        this.setTitle(this.title);
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/register/Register.html")+'`');
    }

    onload(){


        // document.querySelector("form").addEventListener("submit", (evt)=>{
        //     evt.preventDefault();

        //     // Check if the passwords matches
        //     if(this.data.password !== this.data.confirm_password){
                
        //     }

        //     console.log(this.data);
        // });

        // document.querySelectorAll("input").forEach(e => e.addEventListener("input", (evt)=>{
        //     if(evt.target.name in this.data){
        //         this.data[evt.target.name] = evt.target.value
        //     }
        //     })
        // )
    }

}
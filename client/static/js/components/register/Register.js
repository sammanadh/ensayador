import Page from "../Page.js";
import template from "../../api/template.js";
import { registerNewTester } from "../../api/auth.js";
import { navigateTo } from "../../router.js";
import { displayMessage } from "../../helpers.js";

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
            dob: null,
        }

        this.setTitle(this.title);
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/register/Register.html")+'`');
    }

    onload(){
        this.loadEventListeners();
    }

    loadEventListeners(){

        const form = document.getElementById("registration-form");
        // Event listener for form submission
        form.addEventListener("submit", async (evt)=>{
            evt.preventDefault();
            // If form is invalid return
            if(! form.checkValidity()){
                return form.classList.add("was-validated");
            };
            
            try{
                delete this.data.confirm_password;
                const res = await registerNewTester(this.data);

                 // Proper error handeling
                if( Math.floor(res.status/100) === 4 ){
                    throw new Error(res.message)
                }else if( Math.floor(res.status/100) === 5 ){
                    throw new Error("Internal server error. Server failed to respond")
                }
     
                 // Display success message
                 displayMessage("Tester has been successfully registered.", "message", "/register");
                 
            }catch(err){
                const errorMsg = err.message;
                const alert = document.getElementById("error-alert");
                alert.innerHTML = errorMsg;
                alert.removeAttribute("hidden");
            }

        })

        document.getElementById("cancel-btn").addEventListener("click", ()=>{
            navigateTo("/testers");
        })

        // Event listeners to bind all the inputs in form to their respective key in data attribute
        document.querySelectorAll(".registration-form-input").forEach(e => e.addEventListener("input", (evt)=>{
            if(evt.target.name in this.data){
                this.data[evt.target.name] = evt.target.value
            }
            })
        )

    }

}
import Page from "../Page.js";
import template from "../../api/template.js";
import { login } from "../../api/auth.js";

// For navigation
import { navigateTo } from "../../router.js";
import { setRole, setToken } from "../../helpers.js";

/**
 * Class for login component
 */
export default class Login extends Page{

    /**
     * Does all initial setups like setting the page title and initializing property
     */
    constructor(){
        super();
        this.setTitle("Login");
        
        // Initialize the properties
        this.data = {
            user_id : "",
            password : ""
        }

    }

    /**
     * Returns the html template for Login component
     * @returns {string}
     */
    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/login/Login.html")+'`');
    }

    /**
     * Does what needs to be done after a Login componenet renders
     */
    onload(){
        this.loadEventListeners();
    }
    
    /**
     * Loads all necessary event handlers for Login compoenent
     */
    async loadEventListeners(){
        document.querySelector("form").addEventListener("submit", async(evt)=>{
            evt.preventDefault();
            try{
    
                let res = await login(this.data.user_id, this.data.password);
                
                res = await res.json();

                // Proper error handeling
                if(res.status_code == 404){
                    throw new Error("Incorrect id or password");
                }else if( Math.floor(res.status_code/100) === 4){
                    throw new Error(res.message);
                }else if( Math.floor(res.status_code/100) === 5){
                    throw new Error("Internal server error. Server failed to respond")
                }
    
                // Storing the token and role in local storage
                setToken(res.data.token);
                setRole(res.data.role);
    
                // Redirecting to surveys
                navigateTo('/surveys');
    
            }catch(err){
                const errorMsg = err.message;
                const alert = document.getElementById("error-alert");
                alert.innerHTML = errorMsg;
                alert.removeAttribute("hidden");
            }
        })

        document.querySelectorAll("input").forEach(e => e.addEventListener("input", (evt)=>{
            if(evt.target.name in this.data){
                this.data[evt.target.name] = evt.target.value
            }
            })
        )
    }

}
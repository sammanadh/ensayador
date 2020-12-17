import template from "../../api/template.js";
import { getRole, removeToken, removeRole } from "../../helpers.js";
import { navigateTo } from "../../router.js";

/**
 * Class for Navbar component
 */
export default class Navbar{

    /**
     * Returns the html template for Navbar component
     * @returns {string}
     */
    async getHtml(){
        const role = getRole();
        // eval converts the string into temp String so that string interpolation can be used
        return eval('`'+await template("/template/navbar/Navbar.html")+'`');
    }

    /**
     * Does what needs to be done after a Navbar componenet renders
     */    
    async onload(){
        this.loadEventHandlers();
    }

    /**
     * Loads all necessary event handlers for Navbar compoenent
     */
    async loadEventHandlers(){

        // Return to dashboard
        document.getElementById("dashboard-link").addEventListener("click", ()=>navigateTo("/"))
        document.getElementById("home-link").addEventListener("click", ()=>navigateTo("/"))

        const testersLink = document.getElementById("testers-link")
        
        if(testersLink){
            // View testers table
            document.getElementById("testers-link").addEventListener("click", ()=>navigateTo("/testers"));
        }

        // Logout
        document.getElementById("logout-link").addEventListener("click", () => {
            removeRole();
            removeToken();
            navigateTo("/login");
        })

    }

}
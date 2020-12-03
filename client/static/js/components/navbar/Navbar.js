import template from "../../api/template.js";
import { getRole, removeToken, removeRole } from "../../helpers.js";
import { navigateTo } from "../../router.js";

export default class Questionnaire{

    async getHtml(){
        const role = getRole();
        // eval converts the string into temp String so that string interpolation can be used
        return eval('`'+await template("/template/navbar/Navbar.html")+'`');
    }

    async onload(){
        this.loadEventHandlers();
    }

    async loadEventHandlers(){

        // Return to dashboard
        document.getElementById("dashboard-link").addEventListener("click", ()=>navigateTo("/"))

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
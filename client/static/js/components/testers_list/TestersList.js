import Page from "../Page.js";
import template from "../../api/template.js";
import { removeTester } from "../../api/users.js";
import { getTesters } from "../../api/users.js";
import { handleError, getToken, displayMessage } from "../../helpers.js";
import { navigateTo } from "../../router.js";

/**
 * Class for TestersList component
 */
export default class TestersList extends Page{

    /**
     * Does all initial setups like setting the page title and initializing property
     */
    constructor(){
        super();
        this.setTitle("Testers List");
    }

    /**
     * Returns the html template for TestersList component
     * @returns {string}
     */
    async getHtml(){
        return eval('`'+await template("/template/testers_list/TestersList.html")+'`');
    }

    /**
     * Does what needs to be done after a TestersList componenet renders
     */
    async onload(){
        
        try{
            var res = await getTesters(getToken());
            res = await res.json();

            if( Math.floor(res.status_code/100) === 4 ){
                throw new Error(res.message);
            }else if(Math.floor(res.status_code/100) === 5){
                throw new Error("Internal server error. Server failed to respond")   
            }

            if(!res.data.length){
                const message = "No Testers";
                const emptyTemplate = eval('`'+await template("/template/shared/NothingHere.html")+'`');
                document.getElementById("testers-table").innerHTML = emptyTemplate;
            }

            await this.loadListItems(res.data);
        }catch(err){
            handleError(err.message);
        }

        this.loadEventHandlers();
    }

    async loadListItems(listItems){

        const itemTemplate = await template("/template/testers_list/TestersListItem.html");

        for(let item of listItems){
            const tr = document.createElement("tr");
            tr.innerHTML = eval('`' + itemTemplate +'`');
            document.getElementById('testers-list-body').append(tr);
        }

    }

    /**
     * Loads all event handlers for TestersList compoenent
     */
    loadEventHandlers(){

        const removeBtns = document.getElementsByClassName("remove-user");

        for(let removeBtn of removeBtns){
            removeBtn.addEventListener("click", (evt)=>{
                displayMessage("Are you sure you want to remove this user?", "confirmation", null, async () => {
                    const res = await removeTester(evt.target.getAttribute("for"), getToken());

                     // Proper error handeling
                    if( Math.floor(res.status/100) === 4 ){
                        throw new Error(res.message)
                    }else if( Math.floor(res.status/100) === 5 ){
                        throw new Error("Internal server error. Server failed to respond")
                    }
        
                    // Display success message
                    return displayMessage("Tester removed successfully.", "message", "/testers");
                });
            })
        }

        document.getElementById("add-tester-button").addEventListener("click", ()=>{
            navigateTo("/register");
        })

    }

}
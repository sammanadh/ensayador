import Page from "../Page.js";
import template from "../../api/template.js";
import { getTesters } from "../../api/users.js";
import { handleError, getToken, displayMessage } from "../../helpers.js";

export default class TestersList extends Page{

    constructor(){
        super();
        this.setTitle("Testers List");
    }

    async getHtml(){
        return eval('`'+await template("/template/testers_list/TestersList.html")+'`');
    }

    async onload(){
        
        try{
            var res = await getTesters(getToken());
            res = await res.json();

            if( Math.floor(res.status_code/100) === 4 ){
                throw new Error(res.message);
            }else if(Math.floor(res.status_code/100) === 5){
                throw new Error("Internal server error. Server failed to respond")   
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

    loadEventHandlers(){

        document.getElementById("remove-user").addEventListener("click", (evt)=>{
            displayMessage("Are you sure you want to remove this user?", "confirmation", null, () => {
                console.log("confirm");
            });
        })

    }

}
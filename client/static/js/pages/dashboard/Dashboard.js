import Page from "../Page.js";
import template from "../../api/serveys.js";

export default class Dashboard extends Page{

    constructor(){
        super();
        this.setTitle(this.title);

        // Call the api to retreive surveys
        // this.surveys = 
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/Dashboard/Survey.html")+'`');
    }

    loadEventListeners(){
    }

}
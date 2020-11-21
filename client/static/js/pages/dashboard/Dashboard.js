import Page from "../Page.js";
import template from "../../api/template.js";
import { getSurveys } from "../../api/surveys.js";

export default class Dashboard extends Page{

    constructor(){
        super();
        this.setTitle("Dashboard");

        // Call the api to retreive surveys
        // this.surveys = 
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/Dashboard/Survey.html")+'`');
        // const message = "No Surveys";
        // return eval('`'+await template("/template/Shared/NothingHere.html")+'`');
    }

    onload(){
        getSurveys();
    }

}
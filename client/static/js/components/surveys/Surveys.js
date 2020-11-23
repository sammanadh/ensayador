import Page from "../Page.js";
import template from "../../api/template.js";
import { getSurveys } from "../../api/surveys.js";

export default class Surveys extends Page{

    constructor(){
        super();
        this.setTitle("Surveys");

        // Call the api to retreive surveys
        // this.surveys = 
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/surveys/Surveys.html")+'`');
        // const message = "No Surveys";
        // return eval('`'+await template("/template/Shared/NothingHere.html")+'`');
    }

    async onload(){

        const surveys = document.getElementById('surveys');
        const token = window.localStorage.getItem("token");

        try{
            
            if(!token){
                throw new Error("You are not authorized");
            }

            let res = await getSurveys(token);

            // Proper error handeling
            if(res.status == 401){
                throw new Error("You are not authorized");
            }else if( Math.floor(res.status/100) === 4 && res.status.toString().startsWith("4") ){
                throw new Error("Something went wrong")
            }else if( Math.floor(res.status/100) === 4 && res.status.toString().startsWith("5") ){
                throw new Error("Internal server error. Server failed to respond")
            }
            res = await res.json();
            // If no surveys are left
            if(res.data.length == 0){
                const message = "No Surveys"
                const nothingHere = eval('`'+await template("/template/shared/NothingHere.html")+'`');
                surveys.innerHTML = nothingHere;
            }

            // Get template for displaying surveys
            const surveyTemplate = await template("/template/surveys/Survey.html");
            
            // Add surveys from the api request to the surveys list
            for(let survey of res.data){
                let survey_title = survey.survey_title;
                let survey_for = survey.survey_for;
                let ends_at = survey.ends_at;
                let surveyTemplateStr = eval('`'+surveyTemplate+'`');
                let dom = document.createElement('div');
                dom.innerHTML = surveyTemplateStr;
                surveys.append(dom);
            }

        }catch(err){
            location.href = "/";
        }
    }

}
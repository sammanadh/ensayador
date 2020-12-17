import Page from "../Page.js";
import template from "../../api/template.js";
import { getLiveSurveys, getAllSurveys } from "../../api/surveys.js";
import { navigateTo } from "../../router.js";
import { getToken, getRole, handleError, removeRole, removeToken } from "../../helpers.js";

/**
 * Class for SurveyResponses component
 */
export default class Surveys extends Page{

    /**
     * Does all initial setups like setting the page title and initializing property
     */
    constructor(){
        super();
        this.setTitle("Surveys");
    }

    /**
     * Returns the html template for Surveys component
     * @returns {string}
     */
    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/surveys/Surveys.html")+'`');
    }

    /**
     * Does what needs to be done after a Surveys componenet renders
     */
    async onload(){

        const surveys = document.getElementById('surveys');
        const token = getToken();
        const role = getRole();

        try{
            if(role === "company"){
                var res = await getAllSurveys(token);
            }else{
                var res = await getLiveSurveys(token);
            }
            
            res = await res.json();

            // Proper error handeling
            if( Math.floor(res.status_code/100) === 4 ){
                throw new Error(res.message);
            }else if( Math.floor(res.status_code/100) === 5 ){
                throw new Error("Internal server error. Server failed to respond")
            }

            // Before adding surveys add a button to create new survey if user is company
            if(role == "company"){
                const addNew = document.createElement("button");
                addNew.className = "btn btn-success rounded shadow";
                addNew.id = "new-survey-btn"
                addNew.innerHTML = "New Survey";
                surveys.append(addNew);
            }

            // If no surveys are left
            if(res.data.length == 0){
                const message = "No Surveys"
                const nothingHere = eval('`'+await template("/template/shared/NothingHere.html")+'`');
                const nothingHereDiv = document.createElement("div");
                nothingHereDiv.innerHTML = nothingHere;
                surveys.append(nothingHereDiv);
            }

            // Get template for displaying surveys
            const surveyTemplate = await template("/template/surveys/Survey.html");
            
            // Add surveys from the api request to the surveys list
            for(let survey of res.data){
                let survey_id = survey.survey_id;
                let survey_title = survey.survey_title;
                let survey_for = survey.survey_for;
                let ends_at = survey.ends_at;

                // Get the current date and time
                var present = new Date();
                var date = present.getFullYear()+'-'+(present.getMonth()+1)+'-'+present.getDate();
                var time = present.getHours() + ":" + present.getMinutes() + ":" + present.getSeconds();
                var currentDateTime = date+' '+time;

                // Compair the expiration date with current date
                let hasEnded = new Date(ends_at) < new Date(currentDateTime);

                let surveyTemplateStr = eval('`'+surveyTemplate+'`');
                let dom = document.createElement('div');
                dom.innerHTML = surveyTemplateStr;
                surveys.append(dom);
            }

            this.loadEventHandlers();
        }catch(err){
            console.log(err);
            handleError(err.message, "/", ()=>{removeRole();  removeToken()});
        }
    }

    /**
     * Loads all event handlers for Surveys compoenent
     */
    loadEventHandlers(){
        
        // Event handlers for participate buttons
        const participantBtns = document.getElementsByClassName('participate-btn');
        for(let btn of participantBtns){
            btn.addEventListener("click", (evt)=>{
                navigateTo(`/surveys/${evt.target.getAttribute("survey_id")}`);
            })
        }

        // Event handlers for view result buttons
        const resultBtns = document.getElementsByClassName('result-btn');
        for(let btn of resultBtns){
            btn.addEventListener("click", (evt)=>{
                navigateTo(`/responses/${evt.target.getAttribute("survey_id")}`);
            })
        }

        const newSurveyBtn = document.getElementById("new-survey-btn");
        if(newSurveyBtn){
            newSurveyBtn.addEventListener("click", ()=>navigateTo("/add_survey"))
        }

    }

}
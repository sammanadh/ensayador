import Page from "../Page.js";
import template from "../../api/template.js";
import { getQuestionsWithOptions } from "../../api/questionnaire.js";
import { storeResponses } from "../../api/responses.js";
import { getToken, handleError, displayMessage, removeToken, removeRole } from "../../helpers.js";

/**
 * Class for Questionnaire component
 */
export default class Questionnaire extends Page{

    /**
     * Does all initial setups like setting the page title and initializing property
     */
    constructor(params){
        super();
        this.setTitle("Questionnaire");
        
        // Initialize the properties
        this.id = params.id;
        this.questionsWithOptions = [];
        this.selectedOptions = {};
    }

    /**
     * Returns the html template for Questionnaire component
     * @returns {string}
     */
    async getHtml(){
        // eval converts the string into temp String so that string interpolation can be used
        return eval('`'+await template("/template/questionnaire/Questionnaire.html")+'`');
    }

    /**
     * Does what needs to be done after a Questionnaire componenet renders
     */
    async onload(){
        const token = getToken();
        try{
            let res = await getQuestionsWithOptions(token, this.id);
            res = await res.json();

            // Proper error handeling
            if( Math.floor(res.status_code/100) === 4 ){
                throw new Error(res.message);
            }else if( Math.floor(res.status_code/100) === 4 ){
                throw new Error("Internal server error. Server failed to respond")
            }

            this.questionsWithOptions = res.data;
            this.selectedOptions = Object.fromEntries(this.questionsWithOptions.map(q => [q.question_id, null]));
    
            // Load questions onto the page
            await this.loadQuestions();
            
            // Add options to the question;
            await this.loadOptions();
    
            this.loadEventHandlers();
        }catch(err){
            handleError(err.message, "/", ()=>{ removeToken(); removeRole()});
        }

    }
    
    /**
     * Loads questions to the questionnaire form
     */
    async loadQuestions(){
        const temp = await template("/template/questionnaire/Question.html");
        
        for(let qtn of this.questionsWithOptions){
            let questionContainer = document.createElement("div");
            questionContainer.className = "question form-group";
            questionContainer.id = qtn.question_id;
            questionContainer.innerHTML = eval("`" + temp + "`");
            document.getElementById("questionnaire").append(questionContainer);

        }
    }

    /**
     * Loads options
     */
    async loadOptions(){
        const temp = await template("/template/questionnaire/Option.html");
        for(let qtn of this.questionsWithOptions){
            let options = "";
            
            for(let opt of qtn.options){
                let optionsStr = eval("`" + temp + "`");    
                options += optionsStr;            
            }
            
            const optionsContainer = document.getElementById(qtn.question_id).getElementsByClassName("options")[0]
            optionsContainer.innerHTML = options;
        }
    }

    /**
     * Loads all event handlers for Questionnaire component
     */
    async loadEventHandlers(){

        var form = document.getElementById('questionnaire-form');
        form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            var res = await storeResponses(getToken(),this.id, Object.values(this.selectedOptions).filter(x => x));
            res = await res.json();
            if(Math.floor(res.status_code/100) === 2){
                return displayMessage("Your survey has been submitted. Thank You!", "message", "/");
            }else{
                return handleError(res.message);
            }
        })

        document.querySelector(".cancel").addEventListener("click", ()=>{
            return displayMessage("Are you sure you want to cancel?", "confirmation", "/");
        })

        document.querySelectorAll("input").forEach(e => 
            e.addEventListener("input", (evt)=>{
                this.selectedOptions[evt.target.getAttribute("for")] = evt.target.value;
            })
        )

    }

}
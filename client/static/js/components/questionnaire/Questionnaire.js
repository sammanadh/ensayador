import Page from "../Page.js";
import template from "../../api/template.js";
import { getQuestionsWithOptions, submitQuestionnaire } from "../../api/questionnaire.js";
import { getToken, setToken } from "../../helpers.js";
import { navigateTo } from "../../router.js";

export default class Questionnaire extends Page{

    constructor(params){
        super();
        this.setTitle("Questionnaire");
        
        // Initialize the properties
        this.id = params.id;
        this.questionsWithOptions = [];
        this.selectedOptions = {};
    }

    async getHtml(){
        // eval converts the string into temp String so that string interpolation can be used
        return eval('`'+await template("/template/questionnaire/Questionnaire.html")+'`');
    }

    async onload(){

        const token = getToken();

        let res = await getQuestionsWithOptions(token, this.id);
        console.log(await res.json());
        try{
            // Fetch questions and their options from api

            // // Proper error handeling
            // if(res.status == 401){
            //     throw new Error("You are not authorized");
            // }else if( Math.floor(res.status/100) === 4 && res.status.toString().startsWith("4") ){
            //     throw new Error("Something went wrong")
            // }else if( Math.floor(res.status/100) === 4 && res.status.toString().startsWith("5") ){
            //     throw new Error("Internal server error. Server failed to respond")
            // }

            // res = await res.json();
            // this.questionsWithOptions = res.data;
            // this.selectedOptions = Object.fromEntries(this.questionsWithOptions.map(q => [q.question_id, null]));
    
            // // Load questions onto the page
            // await this.loadQuestions();
            
            // // Add options to the question;
            // await this.loadOptions();
    
            // this.loadEventHandlers();
        }catch(e){
            // erase the token
            // setToken("");
            // navigateTo("/");
            console.log(e);
        }

    }
    
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

    async loadEventHandlers(){

        var form = document.getElementById('questionnaire-form');
        form.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            var res = await submitQuestionnaire(getToken(),this.id, Object.values(this.selectedOptions).filter(x => x));
            console.log(res);
            // console.log(await res.json());
        })

        document.querySelectorAll("input").forEach(e => 
            e.addEventListener("input", (evt)=>{
                this.selectedOptions[evt.target.getAttribute("for")] = evt.target.value;
            })
        )

    }

}
import Page from "../Page.js";
import template from "../../api/template.js";
import { postSurvey } from "../../api/surveys.js";
import { navigateTo } from "../../router.js";
import { getToken, displayMessage, handleError } from "../../helpers.js";

/**
 * Class for NewSurveyForm component
 */
export default class NewSurveyForm extends Page{

    /**
     * Does all initial setups like setting the page title and initializing property
     */
    constructor(){
        super();
        this.setTitle("New Survey");
        this.survey = {
            survey_title: "",
            survey_for: "",
            starts_at: null,
            ends_at: null,
            questionsWithOptions: []
        }
        this.questionTemplate = null;
        this.optionTemplate = null;
        this.questionWithOptions = null;
        // holds reference to the questions and their options
        this.questionsAndOptionsRef = {};
    }

    /**
     * Returns the html template for NewSurveyFrom component
     * @returns {string}
     */
    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/newSurveyForm/SurveysForm.html")+'`');

    }

    /**
     * Does what needs to be done after a NewSurveyForm componenet renders
     */  
    async onload(){

        this.loadSurveyFormEventHandlers();

    }

    /**
     * Loads all event handlers for survey form
     */
    async loadSurveyFormEventHandlers(){

            const form = document.getElementById("new-survey-form");

            form.addEventListener("submit", (evt) => {

                evt.preventDefault();

                if(! form.checkValidity()){
                    return form.classList.add("was-validated");
                };

                this.setSurveyDetails();

                this.dispalyQuestionnaireForm();
            })

            // Event handler to bind all the inputs in form to their respective key in survey attribute
            document.querySelector("#new-survey-form").addEventListener("input", (evt)=>{
                if(evt.target.name in this.survey){
                    this.survey[evt.target.name] = evt.target.value
                }
            })

            // Event handler for cancelling the process
            document.querySelector(".cancel").addEventListener("click", (evt)=>{
                navigateTo("/");
            })

    }
    
    /**
     * Renders questionnaire form
     */
    async dispalyQuestionnaireForm(){
        const questionsForm = await eval('`'+await template("/template/newSurveyForm/QuestionsForm.html")+'`');
        document.getElementById("new-survey").innerHTML = questionsForm;

        // load a first question
        await this.addNewQuestion();
        
        // load event listener
        this.loadQuestionsFormEventHandlers();
    }

    /**
     * Loads all event handlers for questions form
     */
    async loadQuestionsFormEventHandlers(){

        const questionsForm = document.getElementById("questions-form");
        // Submit survey questionnaire event handler
        questionsForm.addEventListener("submit", async (evt)=>{
            evt.preventDefault();
            
            if(! questionsForm.checkValidity()){
                return questionsForm.classList.add("was-validated");
            };
            
            // If validation passes
            this.setQuestionsAndOptions();

            // Post the survey
            let res = await postSurvey(getToken(), this.survey);
            res = await res.json();

            if(Math.floor(res.status_code/100) === 2){
                return displayMessage("New survey successfully created.", "message", "/");
            }else{
                return handleError(res.message);
            }

        })

        // Go back event handler
        document.querySelector(".return").addEventListener("click", ()=>{
            navigateTo("/add_survey");
        })
        
        // Event listener to add question
        document.getElementById("add-qtn-btn").addEventListener("click", (evt)=>{
            this.addNewQuestion();
        })
    }   
    
    /**
     * Loads all event handlers a question when it renders
     */ 
    loadQuestionEventHandler(questionElement){
        // Event listener to remove question
        questionElement.questionRef.querySelector(".remove-qtn-btn").addEventListener("click", (evt)=>{
            this.removeQuestion(evt.target.getAttribute("questionNo"));
        })
        
    }
    
    /**
     * Loads all event handlers for an option
     */
    loadOptionEventHandlers(optionElement){

        const addOptionButton = optionElement.querySelector(".add-option");
        const removeOptionButton = optionElement.querySelector(".remove-option");
        
        // Add option
        addOptionButton.addEventListener("click", (evt)=>{
            this.addNewOption(evt.target.getAttribute("questionNo"));
        })

        // Remove option
        if(removeOptionButton){
            removeOptionButton.addEventListener("click", (evt)=>{
                this.removeOption(evt.target.getAttribute("questionNo"), evt.target.getAttribute("optionNo"))
            })
        }

    }
    
    /**
     * Adds new question to the questionnaire form
     */
    async addNewQuestion(){
        const questionsContainer = document.getElementById("questions-and-options");

        // For fetching the question template for the first time
        if(this.questionTemplate === null){
            this.questionTemplate = await template("/template/newSurveyForm/QuestionWithOptions.html");
        }
        
        const questionNo = Object.keys(this.questionsAndOptionsRef).length + 1
        const questionsForm = await eval('`'+ this.questionTemplate +'`');
        
        const questionContainer = document.createElement("div");
        questionContainer.className = "questionWithOptions"
        questionContainer.id = `questionWithOptions-${questionNo}`;
        questionContainer.innerHTML = questionsForm;
        
        // Add the question to questionAndOptionsRef after appending it to the container
        this.questionsAndOptionsRef[questionNo] = { questionRef : questionsContainer.appendChild(questionContainer), options: {} };
        
        this.loadQuestionEventHandler(this.questionsAndOptionsRef[questionNo]);
        
        // For each question load at least two options field
        await this.addNewOption(questionNo);
        await this.addNewOption(questionNo);
        
    }
    
    /**
     * Removes a question from the questionnaire form
     * @param {number} questionNo 
     */
    removeQuestion(questionNo){
        
        const questionElement = this.questionsAndOptionsRef[questionNo].questionRef;
        questionElement.parentNode.removeChild(questionElement);
        delete this.questionsAndOptionsRef[questionNo];

    }
    
    /**
     * Adds anw option to a question
     */
    async addNewOption(questionNo){
        const optionsContainer = document.getElementById(`questionWithOptions-${questionNo}`).querySelector(".options");
        
        if(this.optionTemplate === null){
            this.optionTemplate = await template("/template/newSurveyForm/Option.html");
        }
        
        const optionNo = Object.keys(this.questionsAndOptionsRef[questionNo].options).length + 1;
        const optionInput = await eval('`'+ this.optionTemplate +'`');
        
        const optionContainer = document.createElement("div");
        optionContainer.className = "question"
        optionContainer.id = `question-${optionNo}`;
        optionContainer.innerHTML = optionInput;
        
        // Add the option to questionAndOptionsRef after appending it to the container
        const newOption = optionsContainer.appendChild(optionContainer);
        this.questionsAndOptionsRef[questionNo].options[optionNo] = newOption;
        
        this.loadOptionEventHandlers(newOption);
    }
    
    removeOption(questionNo, optionNo){
        
        const optionElement = this.questionsAndOptionsRef[questionNo].options[optionNo];
        optionElement.parentNode.removeChild(optionElement);
        delete this.questionsAndOptionsRef[questionNo].options[optionNo];
        
    }
    
    
    /**
     * Extracts survey details from survey form and set them in survey property
     */
    setSurveyDetails(){
        var formData = {questionsWithOptions: []}

        for(let formControl of document.getElementById("new-survey").getElementsByClassName("form-control")){
            formData[formControl.name] = formControl.value;
        }
        
        // Combine date and time together
        formData.starts_at = `${formData.start_date} ${formData.start_time}`;
        formData.ends_at = `${formData.end_date} ${formData.end_time}`;
        
        // Delete individual date and time
        delete formData.start_date;
        delete formData.end_date;
        delete formData.start_time;
        delete formData.end_time;
        
        this.survey = formData;
    }
    
    /**
     * Extracts questions with their options and set them in questionsWithOptions key of survey property 
     */
    setQuestionsAndOptions(){
        for(let val of Object.values(this.questionsAndOptionsRef)){
            let question = val.questionRef.querySelector(".qtn-form-control").value;
            let options = Object.values(val.options).map(option => option.querySelector("#opt-form-control").value)
            this.survey.questionsWithOptions.push({question, options})
        }
    }
    
}
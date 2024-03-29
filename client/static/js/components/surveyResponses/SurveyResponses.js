import Page from "../Page.js";
import template from "../../api/template.js";
import { getSurveyResponses } from "../../api/responses.js";
import { navigateTo } from "../../router.js";
import { getToken, handleError, removeRole, removeToken } from "../../helpers.js";

/**
 * Class for SurveyResponses component
 */
export default class SurveyResponses extends Page{

    /**
     * Does all initial setups like setting the page title and initializing property
     */
    constructor(params){
        super();
        this.setTitle("Responses");
        this.surveyId = params.id;
    }

    /**
     * Returns the html template for SurveyResponses component
     * @returns {string}
     */
    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/surveyResponses/SurveyResponses.html")+'`');
    }

    /**
     * Does what needs to be done after a SurveyResponses componenet renders
     */
    async onload(){
        try{
            var res = await getSurveyResponses(getToken(), this.surveyId);
            res = await res.json();

            // Proper error handeling
            if( Math.floor(res.status_code/100) === 4 ){
                throw new Error(res.message);
            }else if( Math.floor(res.status_code/100) === 5 ){
                throw new Error("Internal server error. Server failed to respond")
            }

            // Load the Visualization API and the corechart package.
            google.charts.load('current', {'packages':['corechart']});
    
            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(()=>this.drawChart(res.data));

            this.loadEventHandlers();
        }catch(err){
            console.log(err);
            handleError(err.message, "/", ()=>{removeRole();  removeToken()});
        }
    }

    /**
     * Title: Google Charts
     * Date: 12/03/2020
     * Availability: https://developers.google.com/chart/interactive/docs/quick_start
     * @param {object} qtnData 
     * Callback that creates and populates a data table, instantiates the pie chart, passes in the data and draws it.
     */
    async drawChart(qtnData) {
        for(let qtn of qtnData){
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Options');
            data.addColumn('number', 'Response Counts');

            var options  = [];
            for(let opt of qtn.options){
                options.push([opt.option, opt.count*1])
            }
            
            data.addRows(options);

            // Set chart options   
            var options = {'title': qtn.question,
                        'width':500,
                        'height':400};

            // Create a new div to place the chart
            const piechartDiv = document.createElement("div");
            piechartDiv.className = "piechart mb-4 shadow p-3 mb-5 bg-white rounded";
            piechartDiv.id = qtn.question_id;
            document.getElementById('piecharts').appendChild(piechartDiv);

            // Handles if there is no response for a question
            if(qtn.options.every(o => o.count*1===0)){
                let message = "No Response"
                let nothingHere = eval('`'+await template("/template/shared/NothingHere.html")+'`');
                document.getElementById(qtn.question_id).innerHTML = `
                <h5>${qtn.question}</h5>
                ${nothingHere}
                `;
                continue;
            }
            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById(qtn.question_id));
            chart.draw(data, options);
        }
        
    }

    /**
     * Loads all necessary event handlers for SurveyResponses compoenent
     */
    loadEventHandlers(){
        
        document.querySelector(".return").addEventListener("click", () => {
            navigateTo("/");
        })

    }

}
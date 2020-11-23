<?php

class Surveys extends Controller{

    public function __construct(){
        $this->survey = $this->model("Survey");
    }
    
    // Returns all the surveys
    public function index(){
    }

    // Returns only those surveys which are live and haven't been filled    
    public function liveSurveysToBeFilled(){
        // protect();
        return $this->survey->getRemaningLiveSurveys();
    }   

    public function surveyQuestions($survey_id){
        return $this->survey->getQuestions();
    }

}

?>
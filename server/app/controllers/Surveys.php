<?php

class Surveys extends Controller{

    public function __construct(){
        $this->survey = $this->model("Survey");
        $this->participants = $this->model("Participants");
    }
    
    // Returns all the surveys
    public function index(){
        if(protect()){
            $surveys = $this->survey->getAllSurveys();
            handleResponse(200, $surveys);
        }
    }

    // Returns only those surveys which are live and haven't been filled    
    public function liveSurveysToBeFilled(){
        if(protect()){
            $surveys = $this->survey->getRemaningLiveSurveys();
            handleResponse(200, $surveys);
        }
    }   

    public function participate($survey_id){
        $user = protect();
        $this->participants->participate($user->user_id, $survey_id);
        handleResponse(200);
    }

}

?>
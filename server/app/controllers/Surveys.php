<?php

class Surveys extends Controller{

    public function __construct(){
        $this->survey = $this->model("Survey");
        $this->participants = $this->model("Participants");
    }
    
    // Returns all the surveys
    public function index(){
        if(protect("admin")){
            $surveys = $this->survey->getAllSurveys();
            handleResponse(200, $surveys);
        }
    }

    // Returns only those surveys which are live and haven't been filled    
    public function liveSurveysToBeFilled(){
        $user = protect();
        if(restrictTo($user->role, ["tester"])){
            $surveys = $this->survey->getRemaningLiveSurveys($user->user_id);
            handleResponse(200, $surveys);
        }
    }   

}

?>
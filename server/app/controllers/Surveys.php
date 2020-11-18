<?php

class Surveys extends Controller{

    public function __construct(){
        $this->survey = $this->model("Survey");
        protect();
    }

    // Returns all the surveys
    public function index(){
        echo "authentication success";
    }

    // Returns only those surveys which are live and haven't been filled
    public function liveSurveysToBeFilled(){
        $this->survey->getRemaningLiveSurveys();
    }   

}

?>
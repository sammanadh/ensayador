<?php

/**
 * Controller class for Questionnaire
 */
class Questionnaire extends Controller{

    public function __construct(){
        $this->question = $this->model("Question");
        $this->participant = $this->model("Participant");
        $this->response = $this->model("Response");
    }

    public function index(){}

    /**
     * Sends only those surveys which are live and haven't been filled  
     */  
    public function questionsWithOptions($survey_id){
        if(protect(["tester"])){
            $row = $this->question->getQuestionsAndOptions($survey_id);
            handleResponse(200, $row);
        }
    }

}

?>
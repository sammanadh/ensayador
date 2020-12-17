<?php

/**
 * Controller for Surveys
 */
class Surveys extends Controller{

    public function __construct(){
        $this->survey = $this->model("Survey");
        $this->question = $this->model("Question");
    }
    
    /**
     * Sends all the surveys
     */
    public function index(){
        if(protect(["admin"])){
            $surveys = $this->survey->getAllSurveys();
            handleResponse(200, $surveys);
        }
    }

    /**
     * Sends only those surveys which are live and haven't been filled    
     */
    public function liveSurveysToBeFilled(){
        $user = protect();
        if(restrictTo($user->role, ["tester"])){
            $surveys = $this->survey->getRemaningLiveSurveys($user->user_id);
            handleResponse(200, $surveys);
        }
    }   

    /**
     *  Create new survey
     */
    public function store(){

        $body = json_decode(file_get_contents('php://input'), true);

        // Check if any of the required fields are missing or unique fileds are unique
        if(!$this->survey->checkRequiredFields($body) || !$this->survey->checkUniqueFields($body)){
            return; 
        }

        if(protect(["admin"])){
            $survey_id = $this->survey->storeSurvey($body);
            if(isset($survey_id) && $this->question->storeQuestionsWithOptions($survey_id, $body["questionsWithOptions"])){
                handleResponse(201);
            }
        }

    }
}

?>
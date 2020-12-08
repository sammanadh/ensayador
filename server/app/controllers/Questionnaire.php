<?php

class Questionnaire extends Controller{

    public function __construct(){
        $this->questionnaire = $this->model("Questions");
        $this->participants = $this->model("Participants");
    }
    
    // Returns all the surveys
    public function index(){
    }

    // Returns only those surveys which are live and haven't been filled    
    public function questionsWithOptions($survey_id){
        if(protect(["tester"])){
            $row = $this->questionnaire->getQuestionsAndOptions($survey_id);
            handleResponse(200, $row);
        }
    }   

    //Save resoponses
    public function storeResponses($survey_id){
        
        $user = protect();

        if(restrictTo($user->role, ["tester"])){

            // Set the user as participant
            $hasParticipated = $this->participants->participate($user->user_id, $survey_id);

            if(!$hasParticipated){
                handleResponse(400, "Something went wrong. User could not participate.");
            }

            // Get the participant details;
            $participant= $this->participants->getParticipant($user->user_id, $survey_id);
            $body = json_decode(file_get_contents('php://input'), true);
    
            if($this->questionnaire->storeResponses($participant->participation_id, $body["responses"])){
                return handleResponse(200);
            }
        }
    }

    public function responses($survey_id){
        if(protect(["admin"])){
            $responses = $this->questionnaire->getResponsesCount($survey_id);
            return handleResponse(200, $responses);
        }
    }

}

?>
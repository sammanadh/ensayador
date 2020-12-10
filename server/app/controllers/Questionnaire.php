<?php

class Questionnaire extends Controller{

    public function __construct(){
        $this->question = $this->model("Question");
        $this->participant = $this->model("Participant");
        $this->response = $this->model("Response");
    }
    
    // Returns all the surveys
    public function index(){
    }

    // Returns only those surveys which are live and haven't been filled    
    public function questionsWithOptions($survey_id){
        if(protect(["tester"])){
            $row = $this->question->getQuestionsAndOptions($survey_id);
            handleResponse(200, $row);
        }
    }   

    //Save resoponses
    public function storeResponses($survey_id){
        
        $user = protect();

        if(restrictTo($user->role, ["tester"])){

            // Set the user as participant
            $hasParticipated = $this->participant->participate($user->user_id, $survey_id);

            if(!$hasParticipated){
                handleResponse(400, "Something went wrong. User could not participate.");
            }

            // Get the participant details;
            $participant= $this->participant->getParticipant($user->user_id, $survey_id);
            $body = json_decode(file_get_contents('php://input'), true);
    
            if($this->response->storeResponses($participant->participation_id, $body["responses"])){
                return handleResponse(200);
            }
        }
    }

    public function responses($survey_id){
        if(protect(["admin"])){
            $responses = $this->response->getResponsesCount($survey_id);
            return handleResponse(200, $responses);
        }
    }

}

?>
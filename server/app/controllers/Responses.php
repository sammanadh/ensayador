<?php

/**
 * Contoller for reponses
 */
class Responses extends Controller{

    public function __construct(){
        $this->participant = $this->model("Participant");
        $this->response = $this->model("Response");
    }

    public function index(){}

    /**
     * Saves resoponses
     */
    public function store($survey_id){
        
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

    /**
     * Sends survey responses by survey id
     */
    public function bySurveyId($survey_id){
        if(protect(["company"])){
            $responses = $this->response->getResponsesCount($survey_id);
            return handleResponse(200, $responses);
        }
    }

}

?>
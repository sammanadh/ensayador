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
        // if(protect()){
        // }else{
        //     handleResponse(200);
        // }
        protect();
        // $row = $this->questionnaire->getQuestionsAndOptions($survey_id);
        // handleResponse(200, $row);
        
    }   

    //Save resoponses
    public function storeResponses($survey_id){
        
        $user = protect();
        $participant= $this->participants->getParticipant($user->user_id, $survey_id);
        $body = json_decode(file_get_contents('php://input'), true);

        if(!empty($participant)){
            // $this->questionnaire->storeResponses($participant->participation_id, $body["responses"]);
            if($this->questionnaire->storeResponses($participant->participation_id, $body["responses"])){
                return handleResponse(200);
            }
        }else{
            return handleResponse(404, "User is not a participant in the survey");
        }
    }

}

?>
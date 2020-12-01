<?php

    class Questions extends Model{
        
        public function __construct(){
            // Get the database object
            parent::__construct(
                "questions",   //Table name
            );
        }

        public function getQuestionsAndOptions($survey_id){
            //Fetch questions
            $questions = $this->db
                ->query("SELECT * FROM $this->table WHERE survey_id=:survey_id")
                ->bind("survey_id", $survey_id)->fetchAll();

            // Fetch options
            foreach($questions as $question){
                $question_id = $question->question_id;
                $question->options = $this->db
                    ->query("SELECT * FROM options WHERE question_id=:question_id")
                    ->bind("question_id", $question_id)
                    ->fetchAll();
            }

            return $questions;
        }

        public function storeResponses($participant, $responses){
            try{
                foreach($responses as $response){
                    $this->db->query("INSERT INTO responses(response_id, participation_id, option_id) VALUES (:response_id, :participation_id, :option_id)")
                        ->bind("response_id", generateUUID())
                        ->bind("participation_id", $participant)
                        ->bind("option_id", $response);
                    $this->db->execute();
                }
                return true;
            }catch(Exception $e){
                handleResponse(400, "Failed to save response");
                return false;
            }
        }
    }

?>
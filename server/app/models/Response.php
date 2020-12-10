<?php

    class Response extends Model{
        
        public function __construct(){
            // Get the database object
            parent::__construct(
                "responses",   //Table name
            );
        }

        public function storeResponses($participant, $responses){
            try{
                foreach($responses as $response){
                    $this->db->query("INSERT INTO $this->table(response_id, participation_id, option_id) VALUES (:response_id, :participation_id, :option_id)")
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

        public function getResponsesCount($survey_id){
            // Fetch all questions
            $questions = $this->db->query("SELECT * FROM questions WHERE survey_id=:survey_id")
                ->bind("survey_id", $survey_id)
                ->fetchAll();

            // Fetch all options to a question and inject them inside their question object
            foreach($questions as $question){
                $question->options = $this->db->query(
                    "SELECT *, (SELECT COUNT(*) FROM $this->table r WHERE r.option_id=o.option_id) as count FROM options o WHERE o.question_id=:question_id"
                    )
                    ->bind("question_id", $question->question_id)
                    ->fetchAll();
            }

            return $questions;
        }

    }

?>
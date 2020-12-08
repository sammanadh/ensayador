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

        public function getResponsesCount($survey_id){
            // Fetch all questions
            $questions = $this->db->query("SELECT * FROM questions WHERE survey_id=:survey_id")
                ->bind("survey_id", $survey_id)
                ->fetchAll();

            // Fetch all options to a question and inject them inside their question object
            foreach($questions as $question){
                $question->options = $this->db->query(
                    "SELECT *, (SELECT COUNT(*) FROM responses r WHERE r.option_id=o.option_id) as count FROM options o WHERE o.question_id=:question_id"
                    )
                    ->bind("question_id", $question->question_id)
                    ->fetchAll();
            }

            return $questions;
        }

        public function storeQuestionsWithOptions($surveyId, $qtnsWithOpts){
            foreach($qtnsWithOpts as $qtnWithOpt){;
                $question = $qtnWithOpt["question"];
                $question_id = generateUUID();
                $inserted = $this->db->query("INSERT INTO $this->table(question_id, question, survey_id) VALUES(:question_id, :question, :survey_id)")
                    ->bind("question_id", $question_id)
                    ->bind("question", $question)
                    ->bind("survey_id", $surveyId)
                    ->execute();
                if($inserted){
                    $options = $qtnWithOpt["options"];
                    foreach($options as $option){
                        $this->db->query("INSERT INTO options(option_id, `option`, question_id) VALUES (:option_id, :option, :question_id)")
                            ->bind("option_id", generateUUID())
                            ->bind("option", $option)
                            ->bind("question_id", $question_id)
                            ->execute(); 
                    }
                    return true;
                }
                return false;
            }
        }
    }

?>
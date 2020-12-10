<?php

    class Question extends Model{
        
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

        public function storeQuestionsWithOptions($surveyId, $qtnsWithOpts){
            try{
                foreach($qtnsWithOpts as $qtnWithOpt){
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
                    }
                }
                return true;
            }catch(Exception $e){
                handleResponse(400, "Failed to store survey questions and options");
                return false;
            }
        }
    }

?>
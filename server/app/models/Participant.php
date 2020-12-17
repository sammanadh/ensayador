<?php

    /**
     * Model for participants table
     */
    class Participant extends Model{

        public function __construct(){
            // Get the database object
            parent::__construct(
                "participants",   //Table name
                ["participation_id", "user_id", "survey_id"], //Required fields
            );
        }

        /**
         * Stores given users as a participant in given survey
         * 
         * @param string $user_id ID of the user
         * @param string $survey_id ID of the survey
         * @return object
         */        
        public function participate($user_id, $survey_id){
            return $this->db->query("INSERT INTO $this->table(participation_id, user_id, survey_id) VALUES (:participation_id, :user_id, :survey_id)")
                ->bind(":participation_id", generateUUID())
                ->bind(":user_id", $user_id)
                ->bind(":survey_id", $survey_id)
                ->execute();
        }

        /**
         * Retrieves a row form participants table using on user id and survey id
         * 
         * @param string $user_id ID of the user
         * @param string $survey_id ID of the survey
         * @return object
         */
        public function getParticipant($user_id, $survey_id){
            $this->db->query("SELECT * FROM $this->table WHERE user_id=:user_id AND survey_id=:survey_id")
                ->bind("user_id", $user_id)
                ->bind("survey_id", $survey_id);
            return $this->db->single();
        }

    }

?>
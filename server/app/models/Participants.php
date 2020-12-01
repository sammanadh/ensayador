<?php

    class Participants extends Model{

        public function __construct(){
            // Get the database object
            parent::__construct(
                "participations",   //Table name
                ["participation_id", "user_id", "survey_id"], //Required fields
            );
        }

        public function participate($user_id, $survey_id){
            return $this->db->query("INSERT INTO participants(participation_id, user_id, survey_id) VALUES (:participation_id, :user_id, :survey_id)")
                ->bind(":participation_id", generateUUID())
                ->bind(":user_id", $user_id)
                ->bind(":survey_id", $survey_id)
                ->execute();
        }

        public function getParticipant($user_id, $survey_id){
            $this->db->query("SELECT * FROM participants WHERE user_id=:user_id AND survey_id=:survey_id")
                ->bind("user_id", $user_id)
                ->bind("survey_id", $survey_id);
            return $this->db->single();
        }

    }

?>
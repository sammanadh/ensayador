<?php

    class Survey extends Model{

        private $requiredFields = ["survey_for", "survey_title", "starts_at", "ends_at"];
        private $uniqueFields = ["survey_title"];
        
        public function __construct(){
            // Get the database object
            parent::__construct('surveys');
        }

        // Check if all required fields are present
        public function requiredFieldsExists($body){
            return $this->checkRequiredFields($this->requiredFields, $body);
        }

        // Check if all unique fields are unique
        public function uniqueFieldsAreUnique($body){
            return $this->checkUniqueFields($this->uniqueFields, $body);
        }

        public function getRemaningLiveSurveys(){
            $this->db->query('SELECT * FROM surveys WHERE starts_at <= NOW() AND NOW() < ends_at');
            $rows = $this->db->fetchAll();
            return handleResponse(200, $rows);
        }
    }

?>
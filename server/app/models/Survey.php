<?php

    class Survey extends Model{
        
        public function __construct(){
            // Get the database object
            parent::__construct(
                "surveys",   //Table name
                ["survey_for", "survey_title", "starts_at", "ends_at"], //Required fields
                ["survey_title"]    //Unique fields
            );
        }

        public function getRemaningLiveSurveys(){
            $this->db->query("SELECT * FROM $this->table WHERE starts_at <= NOW() AND NOW() < ends_at");
            $rows = $this->db->fetchAll();
            return $rows;
        }

        public function getAllSurveys(){
            // Order by condition will order all live surveys first and then the once that have ended
            $this->db->query("SELECT * FROM $this->table ORDER BY (NOW() > ends_at)");
            $rows = $this->db->fetchAll();
            return $rows;
        }
    }

?>
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
            $this->db->query("SELECT * FROM surveys WHERE survey_id NOT IN (SELECT survey_id IN participants WHERE user_id = :user_id)");
            
        }

        public function register($data){
            $this->db->query("INSERT INTO $this->table VALUES (:user_id, :first_name, :last_name, :email, :password, :contact_no, :address, :role)");
            foreach($data as $key=>$value){
                $this->db->bind($key, $value);
            };
            //Execute
            return $this->db->execute();
        }

        // Login a user
        public function login($user_id, $password){
            $row = $this->findByUserId($user_id);
            if(!$row){
                return handleResponse(404, "Incorrect user_id or password");
            }else{
                $hashedPassword = $row->password;
                if(password_verify($password, $hashedPassword)){
                    return $row;
                }else{
                    return handleResponse(404, "Incorrect user_id or password");
                }
            }
        }
    }

?>
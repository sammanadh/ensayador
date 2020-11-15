<?php

    class User extends Model{

        private $table = "users";
        private $requiredFields = ["user_id", "first_name", "last_name", "email", "password", "address", "contact_no", "role"];
        private $uniqueFields = ["user_id", "email", "contact_no"];
        
        public function __construct(){
            // Get the database object
            $this->db = Database::getDatabase();
            parent::__construct($this->db, $this->table);
        }

        // Check if all required fields are present
        public function requiredFieldsExists($body){
            return $this->checkRequiredFields($this->requiredFields, $body);
        }

        // Check if all unique fields are unique
        public function uniqueFieldsAreUnique($body){
            return $this->checkUniqueFields($this->uniqueFields, $body);
        }

    }

?>
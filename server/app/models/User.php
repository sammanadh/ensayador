<?php

    class User extends Model{

        private $requiredFields = ["user_id", "first_name", "last_name", "email", "password", "address", "contact_no", "role"];
        private $uniqueFields = ["user_id", "email", "contact_no"];
        
        public function __construct(){
            parent::__construct('users');
        }

        // Check if a user with a particular email exists or 
        // Return the user if exists
        private function findByUserId($user_id){
            $user = $this->db->query("SELECT * FROM users WHERE user_id=:user_id")->bind("user_id", $user_id);
            $user = $user->single();
            if($user){
                return $user;
            }else{
                return false;
            }
        }

        // Check if all required fields are present
        public function requiredFieldsExists($body){
            return $this->checkRequiredFields($this->requiredFields, $body);
        }

        // Check if all unique fields are unique
        public function uniqueFieldsAreUnique($body){
            return $this->checkUniqueFields($this->uniqueFields, $body);
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
                return false;
            }else{
                $hashedPassword = $row->password;
                if(password_verify($password, $hashedPassword)){
                    return $row;
                }else{
                    return false;
                }
            }
        }

    }

?>
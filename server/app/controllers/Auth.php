<?php

    class Auth extends Controller{

        // private required_fields = ["user_id", "first_name", "last_name", "email", "password"]

        public function __construct(){
            // Initialize the model here
            $this->user = $this->model("User");
        }

        public function login(){
            if($this->user->findByEmail()){
                
            }
        }
        
        public function register(){

            $body = json_decode(file_get_contents('php://input'));

            // Check if any of the required fields are missing or unique fileds are unique
            if(!$this->user->requiredFieldsExists($body) || !$this->user->uniqueFieldsAreUnique($body)){
                return;
            }

            echo "All passed";

        }

    }
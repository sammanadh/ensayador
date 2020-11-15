<?php

    class Auth extends Controller{

        public function __construct(){
            // Initialize the model here
            $this->user = $this->model("User");
        }

        public function login(){
            if($this->user->findByEmail()){
                
            }
        }
        
        public function register(){

            $body = json_decode(file_get_contents('php://input'), true);

            // Check if any of the required fields are missing or unique fileds are unique
            if(!$this->user->requiredFieldsExists($body) || !$this->user->uniqueFieldsAreUnique($body)){
                return; 
            }

            // Hash password
            $body["password"] = password_hash($body["password"], PASSWORD_DEFAULT);

            // Register the user
            if($this->user->register($body)){
                return handleResponse(201, "Users successfully registered.");
            }else{
                handleResponse(400, "Something went wrong while registering.");
            }
        }

    }

?>
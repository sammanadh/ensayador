<?php

    class Auth extends Controller{

        public function __construct(){
            // Initialize the model here
            $this->user = $this->model("User");
            $this->session = $this->model("session");
        }

        public function login(){

            if(session_status() == PHP_SESSION_ACTIVE)
            {

            }

            $body = json_decode(file_get_contents('php://input'), true);

            if(!isset($body["user_id"]) || !isset($body["password"])){
                return handleResponse(400, "User id and password are required!");
            }

            $loggedIn = $this->user->login($body["user_id"], $body["password"]);

            // Create a new session
            $this->session->createSession($loggedIn->user_id);

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
                return handleResponse(201, "Users successfully registered!");
            }else{
                handleResponse(400, "Something went wrong while registering!");
            }
        }

    }

?>
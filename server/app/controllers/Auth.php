<?php

    /**
     * Controller class for logging in and registering
     */
    class Auth extends Controller{

        public function __construct(){
            // Initialize the model here
            $this->user = $this->model("User");
        }

        public function index(){}

        /**
         * Method for logging in
         */
        public function login(){

            $body = json_decode(file_get_contents('php://input'), true);

            if(!isset($body["user_id"]) || !isset($body["password"])){
                return handleResponse(400, "User id and password are required!");
            }

            $loggedIn = $this->user->login($body["user_id"], $body["password"]);

            if($loggedIn){
                // Create a new JWT token
                $token  = createToken($loggedIn->user_id, $loggedIn->role);
    
                // Send response to client with the token
                return handleResponse(200, ["token"=>$token, "role"=>$loggedIn->role]);
            }else{
                return handleResponse(404, "Incorrect user_id or password");
            }

        }
        
        /**
         * Method for registering new tester
         */
        public function registerTester(){

            $body = json_decode(file_get_contents('php://input'), true);

            // Check if any of the required fields are missing or unique fileds are unique
            if(!$this->user->checkRequiredFields($body) || !$this->user->checkUniqueFields($body)){
                return; 
            }

            $body["role"] = "tester";
            // Hash password
            $body["password"] = password_hash($body["password"], PASSWORD_DEFAULT);

            // Register the user
            if($this->user->register($body)){
                // Create a new jwt token
                $token  = createToken($body["user_id"], $body["role"]);

                // Send response to client with the token
                return handleResponse(200, ["token"=>$token]);
            }else{
                return handleResponse(400, "Something went wrong while registering!");
            }
        }

    }

?>
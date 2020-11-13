<?php

    class Users extends Controller{
        public function __construct(){
            // Initialize the model here
            $this->user = $this->model("User");
        }

        public function login(){
            if($this->user->findByEmail()){
                
            }
        }

        public function register(){

            $users = [
                [
                    "name" => "samman",
                    "age" => 20
                ]
            ];

            echo json_encode($users, JSON_PRETTY_PRINT);

        }
    }

?>
<?php

    class User{

        private $db;

        public function __construct(){
            $this->db = new Database();
        }

        public function findByEmail($email){
            $this->db->query("SELECT * FROM users WHERE email = :email");
            $this->db->bind("email", $email);
            $data = $this->db->single();
            if(empty($data)){
                return false;
            }else{
                return true;
            }
        }

    }

?>
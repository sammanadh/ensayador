<?php

    class User extends Model{
        
        public function __construct(){
            // Get the database object
            parent::__construct(
                "users",   //Table name
                ["user_id", "first_name", "last_name", "email", "password", "address", "contact_no", "role"], //Required fields
                ["user_id", "email", "contact_no"]    //Unique fields
            );
        }

        // Check if a user with a particular email exists or 
        // Return the user if exists
        private function findByUserId($user_id){
            $user = $this->db->query("SELECT * FROM $this->table WHERE user_id=:user_id")->bind("user_id", $user_id);
            $user = $user->single();
            if($user){
                return $user;
            }else{
                return false;
            }
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

        public function findByRole($role){
            $users = $this->db->query("SELECT user_id, first_name, last_name, email, contact_no, `address` FROM users WHERE role=:role")
                ->bind("role", $role)
                ->fetchAll();
            return $users;
        }

    }

?>
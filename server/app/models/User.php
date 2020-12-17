<?php

    /**
     * Model for users table
     */
    class User extends Model{
        
        public function __construct(){
            // Get the database object
            parent::__construct(
                "users",   //Table name
                ["user_id", "first_name", "last_name", "email", "password", "address", "contact_no"], //Required fields
                ["user_id", "email", "contact_no"]    //Unique fields
            );
        }

        /**
         * Retrives a user by ID
         * 
         * @param string $user_id ID of the user
         * @return object
         */
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
            $this->db->query("INSERT INTO $this->table(
                user_id,
                first_name,
                last_name,
                email,
                password,
                contact_no,
                dob,
                address,
                role
            ) VALUES (
                :user_id, 
                :first_name, 
                :last_name, 
                :email, 
                :password, 
                :contact_no, 
                :dob,
                :address, 
                :role
            )");

            foreach($data as $key=>$value){
                $this->db->bind($key, $value);
            };
            //Execute
            return $this->db->execute();
        }

        /**
         * Logs in a user
         * 
         * @param string $user_id ID of the user
         * @param string $password Password of the user
         * @return object
         */
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

        /**
         * Retrieves users by role
         * 
         * @param string $role Role to use for retrieving users
         * @return object
         */
        public function findByRole($role){
            $users = $this->db->query("SELECT user_id, first_name, last_name, email, contact_no, `address` FROM $this->table WHERE role=:role")
                ->bind("role", $role)
                ->fetchAll();
            return $users;
        }

        public function delete($user_id){
            return $this->db->query("DELETE FROM $this->table WHERE user_id=:user_id")
                ->bind("user_id", $user_id)
                ->execute();
        }

    }

?>
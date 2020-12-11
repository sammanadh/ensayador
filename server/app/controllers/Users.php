<?php

class Users extends Controller{

    public function __construct(){
        $this->users = $this->model("User");
    }
    
    // Returns all the users
    public function index(){
    }
  
    public function byRole($role){
        if(protect(["admin"])){
            $rows = $this->users->findByRole($role);
            handleResponse(200, $rows);
        }
    }

    // Remove a user
    public function delete($user_id){
        if(protect["admin"]){
            $this->users->delete($user_id);
            handleResponse(200);
        }
    }

}

?>
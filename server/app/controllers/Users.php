<?php

/**
 * Class for Users controller
 */
class Users extends Controller{

    public function __construct(){
        $this->users = $this->model("User");
    }
    
    public function index(){
    }
  
    /**
     * Sends users by role
     */
    public function byRole($role){
        if(protect(["admin"])){
            $rows = $this->users->findByRole($role);
            handleResponse(200, $rows);
        }
    }

    /**
     * Removes a user
     */
    public function delete($user_id){
        if(protect["admin"]){
            $this->users->delete($user_id);
            handleResponse(200);
        }
    }

}

?>
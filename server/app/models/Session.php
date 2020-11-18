<?php

class Session extends Model{

    private $requiredFields = ["session_id", "user_id", "login_time"];
    private $uniqueFields = ["session_id"];

    public function __construct(){
        parent::__construct('sessions');
    }

    // Check if all required fields are present
    public function requiredFieldsExists($body){
        return $this->checkRequiredFields($this->requiredFields, $body);
    }

    // Check if all unique fields are unique
    public function uniqueFieldsAreUnique($body){
        return $this->checkUniqueFields($this->uniqueFields, $body);
    }

    // Generate new session for a user
    public function createSession($userid){
        if(session_status() == PHP_SESSION_ACTIVE){
            $this->db->query("REPLACE INTO sessions VALUES (:session_id, :user_id, NOW())")
                ->bind('session_id', session_id())
                ->bind('user_id', $userid);
            $this->db->execute();
        }
    }

    public function session_login(){
        // check if the session has already been started
        if(session_staus() == PHP_SESSION_ACTIVE){
            $query = 'SELECT FROM sessions INNER JOIN users ON sessions.user_id = users.user_id' . 
            'WHERE (sessions.session_id = :session_id) ' . 
            'AND (sessions.login_time >= (NOW() - INTERVAL 7 DAY))';
            $this->db->query($query)->bind("session_id", session_id());
            $row = $this->db->single();
            if($row){
                return true;
            }
        }

        return false;
    }
    
}

?>
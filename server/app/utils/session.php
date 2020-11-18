<?php

    session_start();

    function protect(){

        // Database connection
        $db = Database::getDatabase();

        // Get the session id from the header
        $session_id = getallheaders()['session_id'];

        // check if the session has already been started
        if(!isset($session_id) || session_status() == PHP_SESSION_ACTIVE){
            $query = 'SELECT * FROM sessions INNER JOIN users ON sessions.user_id = users.user_id' . 
            ' WHERE (sessions.session_id = :session_id) ' . 
            ' AND (sessions.login_time >= (NOW() - INTERVAL 7 DAY))';
            $db->query($query)->bind("session_id", $session_id);
            $row = $db->single();
            if($row){
                return;
            }
        }

        // Respond with unauthticated error if authentication fails
        return handleResponse(401, "User authentication failed");

    }

?>
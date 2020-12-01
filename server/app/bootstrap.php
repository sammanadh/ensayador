<?php

    /* 
        I have defined app root here rather than in config file because app root is dynamic 
        and is going to change based on the location of the project
    */

    define('APPROOT', __DIR__);
    
    // Load all the libraries
    require_once APPROOT."/libraries/Core.php";
    require_once APPROOT."/libraries/Controller.php";
    require_once APPROOT."/libraries/Database.php";
    require_once APPROOT."/libraries/Model.php";
    
    // Load the utilities
    require_once APPROOT."/utils/handleResponse.php";
    require_once APPROOT."/utils/JWT.php";
    require_once APPROOT."/utils/UUID.php";

?>
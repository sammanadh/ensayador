<?php

    // Loading autoload.php from vendor folder for using installed packages in our application
    require '../vendor/autoload.php';

    // Configuring environment variables
    use Dotenv\Dotenv;

    $dotenv = DotEnv::createImmutable(dirname(dirname(__FILE__)));
    
    $dotenv->load();
    
    // Initialize the core library
    require_once "../app/bootstrap.php";
    new Core;
?>
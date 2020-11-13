<?php
    // Super class for every other controllers
    // Base controller
    // Loads modals and views

    class Controller {

        public function model($model){
            // Require model file
            if(file_exists('../app/models/' . $model . '.php')){
                require_once '../app/models/' . $model . '.php';
                // Instatiate model
                return new $model();
            }else{
                echo $model." doesn't exist";
            }
          }
    }
 
 ?>
<?php
    // Super class for every controller
    // Sub class can call model method inside this Controller class to load a modal

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
<?php
    // Super class for every controller
    // Sub class can call model method inside this Controller class to load a modal

    class Controller {

        protected function model($model){
            // Require model file
            if(file_exists('../app/models/' . $model . '.php')){
                require_once '../app/models/' . $model . '.php';
                // Instatiate model
                return new $model();
            }else{
                handleResponse(404, "$model model not found");
            }
          }
    }
 
 ?>
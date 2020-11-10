<!-- 
    Super class for every other controllers
    Base controller
    Loads modals and views
 -->

<?php

    class Controller {

        // load model
        public function model($model){

            // require modal file
            require_once '../app/models/' . $model . '.php';
            
            // instantiate the modal
            return new $model();
        }

    }
 
 ?>
<?php

    /**
     * Super class for every controller
     */
    class Controller {

        /**
         * Loads model
         * 
         * @param strign $model Name of the model
         * @return object
         */
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
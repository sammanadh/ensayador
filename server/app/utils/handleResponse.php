<?php

    /**
     * Sends response to the client
     * 
     * @param int $statusCode Status code of the reponse
     * @param mixed $payload Data or message to send with the reponse
     */
    function handleResponse($statusCode, $payload=null){

        
        $beginsWith = floor($statusCode/100);
        $isException = $beginsWith == 4 || $beginsWith == 5; 

        if($isException){
            $data = [
                "status_code"=>$statusCode,
                "status" => "error",
                "message" => str_replace("_", " ", $payload)
            ];
        }else{
            if(isset($payload)){
                $data = [
                    "status_code"=>$statusCode,
                    "status"=> "success",
                    "data"=> $payload
                ];
            }else{
                $data = [
                    "status_code"=>$statusCode,
                    "status"=> "success"
                ];
            }
        }
        
        
        header("Content-Type: application/json");
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: *');
        header('Access-Control-Allow-Credentials', 'true');
        http_response_code(200);
        echo(json_encode($data));
        exit();
    }

?>
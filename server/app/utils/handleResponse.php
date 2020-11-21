<?php

    function handleResponse($statusCode, $payload=null){

        
        $beginsWith = floor($statusCode/100);
        $isException = $beginsWith == 4 || $beginsWith == 5; 

        if($isException){
            $data = [
                "status" => "error",
                "message" => $payload
            ];
        }else{
            if(isset($payload)){
                $data = [
                    "status"=> "success",
                    "data"=> $payload
                ];
            }else{
                $data = [
                    "status"=> "success"
                ];
            }
        }
        
        
        header("Content-Type: application/json");
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: *');
        header('Access-Control-Allow-Credentials', 'true');
        // ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        // ->withHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token')
        // ->withHeader('Access-Control-Allow-Credentials', 'true')
        // ->withHeader('Access-Control-Expose-Headers', 'Content-Length, X-Kuma-Revision')
        // ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        http_response_code($statusCode);
        echo(json_encode($data));
    }

?>
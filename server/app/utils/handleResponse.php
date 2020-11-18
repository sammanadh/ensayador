<?php

    function handleResponse($statusCode, $payload=null){

        if(floor($statusCode/100) == 4){
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

        http_response_code($statusCode);

        die(json_encode($data));

    }

?>
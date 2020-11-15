<?php

    function handleError($msg, $statusCode){

        $data = [
            "status"=> "error",
            "message"=> $msg
        ];

        http_response_code($statusCode);

        echo json_encode($data);

    }

?>
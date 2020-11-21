<?php
    /*
        *    Title: firsbase / php-jwt
        *    Author: bshaffer
        *    Date: 11/20/2020
        *    Availability: https://github.com/firebase/php-jwt
    */

    use \Firebase\JWT\JWT;
    use Firebase\JWT\SignatureInvalidException;
    use \Carbon\Carbon;

    function protect(){
        $token = getallheaders()['Authorization'];
        
        // Check if the token exists and starts with the word Bearer
        if(!isset($token) || strpos($token, 'Bearer') === 1) {
            handleResponse(400, 'Authentication failed. Please provide a valid authentication key');
            return false;
        }

        // Removing Bearer from token
        $token = explode(" ", $token)[1];

        $secret = $_ENV['JWT_SECRET'];

        try{
            $decoded = json_decode(JWT::decode($token, $secret, array('HS256')), true);
            // Check if the token has expired or not
            if(time() > $decoded['exp']){
                throw new Exception("Token has expired");
            }
            return;
        }catch(SignatureInvalidException $e){
            handleResponse(401, "Invalid token");
        }catch(Exception $e){
            handleResponse(401, $e->getMessage());
        }
    }

    function createToken($user_id, $role){ 
        $secret = $_ENV['JWT_SECRET'];
        $iat = time();
        $exp = $iat + (60*60*24); // 7 days from now
        $payload = json_encode([
            'user_id' => $user_id,
            'role' => $role,
            'iat' => $iat,    //issued time
            'exp' => $exp     //expiration time
        ]);
        $jwt = JWT::encode($payload, $secret);

        return $jwt;
    }

?>
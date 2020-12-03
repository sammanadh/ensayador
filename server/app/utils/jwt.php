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

    // Function authentication and authorization
    function protect($roles = null){

        // Get the request headers
        $headers = getallheaders();
        $token = $headers['Authorization'];

        
        // If token isn't send
        if(!isset($token)){
                handleResponse(200, 'Authentication failed. Please provide a valid authentication token');
                return false;
        }

        $token = $headers['Authorization'];
        $db = Database::getDatabase();
        
        // Check if the token exists and starts with the word Bearer
        if(!isset($token) || strpos($token, 'Bearer') === 1) {
            handleResponse(400, 'Authentication failed. Please provide a valid authentication token');
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

            //

            // Return user details;
            $user = $db->query("SELECT * from users WHERE user_id = :user_id")->bind("user_id", $decoded['user_id'])->single();

            /*
                * If roles are passed, this function itself calles restrictTo function.
                * This makes it simple to implement both authorization and authentication by just calling this function.
                * In some cases the consumer of this function may need the user details.
                * In those cases restrictTo function must be called seperately.
            */
            if(isset($roles)){
                return restrictTo($user->role, $roles);
            }else{
                return $user;
            }
            
        }catch(SignatureInvalidException $e){
            handleResponse(401, "Invalid token");
            return false;
        }catch(Exception $e){
            handleResponse(401, $e->getMessage());
            return false;
        }
    }

    // For authorization
    function restrictTo($userRole, $allowedRoles = null){
        if($allowedRoles){
            if(!in_array($userRole, $allowedRoles)){
                handleResponse(401, "Authorization failed. You do not have proper permission to perform this action.");
                return false;
            }
        }
        return true;
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
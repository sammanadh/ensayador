 <?php
    // This library look into the url and breaks it down into an array and decides with method of which controller to run

    class Core{
        private $controller;
        private $method;
        private $parameters = [];

        public function __construct(){

            $url = $this->getUrlParams();
            
            // Checking for controller
            if(isset($url[0]) && file_exists(APPROOT . "/controllers/" . ucfirst($url[0]) . ".php")){
                $this->controller = ucfirst($url[0]);
                unset($url[0]);
            }else{
                return handleError("Controller not found. It may occurs if you haven't passed the controller or the controller doesn't exist.", 400);
            }

            // Requring the controller
            require_once APPROOT . "/controllers/" . $this->controller . ".php";
            // Initializing the controller
            $this->controller = new $this->controller();

            // Checking for method
            if(isset($url[1]) && method_exists($this->controller, $url[1])){
                $this->method = $url[1];
                unset($url[1]);
            }   

            // Checking for parameters
            $this->parameters = $url ? array_values($url) : [];

            // Call the method inside the controller with the array of parameters
            call_user_func_array([$this->controller, $this->method], $this->parameters);

        }

        public function getUrlParams(){
            // Check if the url exists
            if(isset($_GET['url'])){
                $url = rtrim($_GET['url'], "/");
                $url = filter_var($url, FILTER_SANITIZE_URL);
                return explode("/", $url); 
            }
        }

    }
    

 ?>
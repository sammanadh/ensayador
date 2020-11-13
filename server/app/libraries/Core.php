 <?php
    // It looks at the url and pulls out information to create a array and decides what to load
    class Core{

        private $currentController = "Pages";
        private $currentMethod = "index";
        private $params = [];

        public function __construct(){

            $url = $this->getParams();
            
            //Set the controller 
            if(isset($url[0]) && file_exists("../app/controllers/" . ucwords($url[0]) . ".php")){
                $this->currentController = ucwords($url[0]);
                unset($url[0]);
            }

            //import the controller
            require_once("../app/controllers/" . $this->currentController . ".php");

            //instantiate the controller
            $this->currentController = new $this->currentController();

            //look into the second part of url
            if(isset($url[1]) && method_exists($this->currentController, $url[1])){
                $this->currentMethod = $url[1];
                unset($url[1]);
            }

            //look into the third part of url for parameters
            $this->params = $url ? array_values($url) : [];
            
            //Call a callback with the array of parameters
            call_user_func_array([$this->currentController, $this->currentMethod], $this->params);

            
        }

        public function getParams(){
            if(isset($_GET['url'])){
                $url = $_GET['url'];
                $url = rtrim($url, "/");
                $url = filter_var($url, FILTER_SANITIZE_URL);
                return explode("/", $url);
            }
        }

    }

 ?>
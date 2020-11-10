<!-- 
    It looks at the url and pulls out information to create a array and decides what to load
 -->

 <?php
    /*
     *App core class
     *It creates url and loads core controllers
     *URL format: /controller/models/params
    */

    // class Core{

    //     protected $currentController = "Pages";
    //     protected $currentMethod = "index";
    //     protected $params = [];

    //     public function __construct(){
    //         $url = $this->getUrl();
            
    //         //Look in controller for first value
    //         if(isset($url) && file_exists("../app/controllers/" . ucwords($url[0]) . ".php")){
    //             //If exists set as current controller
    //             $this->currentController = ucwords($url[0]);
    //             //unset 0 index;
    //             unset($url[0]);
    //         }

    //         // Require the controller 
    //         require_once "../app/controllers/" . $this->currentController . ".php";

    //         //Instantiate controller class
    //         $this->currentController = new $this->currentController;

    //         //Check for send part of url
    //         if(isset($url[1])){
    //             //Check if the method exists in the controller
    //             if(method_exists($this->currentController, $url[1])){
    //                 $this->currentMethod = $url[1];
    //                 unset($url[1]);
    //             }
    //         }

    //         // Get params
    //         $this->params = $url ? array_values($url):[];

    //         //Call a callback with an array of params
    //         call_user_func_array([$this->currentController, $this->currentMethod], $this->params);
    //     }

    //     public function getUrl(){
    //         if(isset($_GET['url'])){
    //             $url = rtrim($_GET['url'], '/');
    //             $url = filter_var($url, FILTER_SANITIZE_URL);
    //             $url = explode('/', $url);
    //             return $url;
    //         }
    //     }

    // }

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
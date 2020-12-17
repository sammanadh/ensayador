<?php

/**
 * PDO database class to be used by models to interact with database
 * Implemented using Singleton pattern
 */
 class Database{

    private static $dbObj;

    private $dbhost;
    private $dbuser;
    private $dbpass;
    private $dbname;

    private $conn;
    private $stmt;
    private $error;

    private function __construct(){

        // Setting all the properties
        $this->dbhost = $_ENV['DB_HOST'];
        $this->dbuser = $_ENV['DB_USER'];
        $this->dbpass = $_ENV['DB_PASSWORD'];
        $this->dbname = $_ENV['DB_NAME'];

        // Set Data Source Name
        $dsn = "mysql:dbhost=" . $this->dbhost . ";dbname=" . $this->dbname;
        $options = array(
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        );

        //Create a PDO instance
        try{
            $this->conn = new PDO($dsn, $this->dbuser, $this->dbpass, $options);
        }catch(PDOException $e){
            $this->error = $e->getMessage();
            echo($this->error);
        }

    }

    public static function getDatabase(){
        if(!isset($dbObj)){
            self::$dbObj = new Database();
        }
        return self::$dbObj;
    }

    // Prepare statement with query
    public function query($sql){
        $this->stmt = $this->conn->prepare($sql);
        return $this;
    }

    // Bind values
    public function bind($param, $value, $type=null){
        if(is_null($type)){
            switch(true){
                case is_int($value):
                    $type = PDO::PARAM_INT;
                break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }

        $this->stmt->bindValue($param, $value, $type);
        return $this;
    }

    //execute the prepared statement
    public function execute(){
        return $this->stmt->execute();
    }

    // Get an array of all the objects from database
    public function fetchAll(){
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_OBJ);
    }

    // Get a single record as object
    public function single(){
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_OBJ);
    }

    // Get the row count
    public function rowCount(){
        return $this->stmt->rowCount();
    }

}

?>

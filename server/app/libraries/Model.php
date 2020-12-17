<?php

/**
 * Base class for all modals
 */
class Model{

    protected $db;
    protected $table;
    protected $requiredFields;
    protected $uniqueFields;

    public function __construct($table, $requiredFields = [], $uniqueFields = []){
        $this->db = Database::getDatabase();
        $this->table = $table;
        $this->requiredFields = $requiredFields;
        $this->uniqueFields = $uniqueFields;
    }



    /**
     * Checks if all required fields are present
     * 
     * @param string $body Body of incoming request
     * @return boolean
     */
    public function checkRequiredFields($body){
        foreach($this->requiredFields as $field){           
            if(!isset($body[$field])){ 
                handleResponse(400, "$field is required");
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if all unique fields are unique
     * 
     * @param string $body Body of incoming request
     * @return boolean
     */
    public function checkUniqueFields($body){
        foreach($this->uniqueFields as $field){
            if(isset($body[$field])){
                $this->db->query("SELECT * FROM $this->table WHERE $field=:value")
                    ->bind("value", $body[$field])
                    ->single();
                if($this->db->rowCount()){
                    handleResponse(400, "$field already exists");
                    return false;
                }
            }
        }
        return true;
    }
}

?>
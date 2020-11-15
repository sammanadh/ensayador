<?php

class Model{


    // // Returns an array of all not null fields in a database table
    // public function getNotNullFields($table){

    //     $fields = [];

    //     /*
    //     *    Title: How can I get column names from a table in SQL Server
    //     *    Author: anon
    //     *    Date: 11/14/2020
    //     *    Availability: https://stackoverflow.com/questions/1054984/how-can-i-get-column-names-from-a-table-in-sql-server
    //     *
    //     */
    //     $this->db->query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = :table AND TABLE_SCHEMA = :dbname AND IS_NULLABLE = 'NO'");
    //     $this->db->bind("table", $table);
    //     $this->db->bind("dbname", DB_NAME);

    //     $columns = $this->db->resultSet();

    //     foreach($columns as $column){
    //         array_push($fields, $column->column_name);
    //     }

    //     return $fields;
    // }


    // // Returns an array of all unique fields in a database table
    // public function getUniqueFields($table){
    //     $fields = [];
    //     $this->db->query("SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS where TABLE_NAME=:table AND CONSTRAINT_SCHEMA=:dbname AND (CONSTRAINT_TYPE='UNIQUE' OR CONSTRAINT_NAME='PRIMARY')");
    //     $this->db->bind("table", $table);   
    //     $this->db->bind("dbname", DB_NAME);

    //     $columns = $this->db->resultSet();

    //     foreach($columns as $column){
    //         array_push($fields, $column->column_name);
    //     }

    //     return $fields;
    // }

    private $db;
    private $table;

    public function __construct($db, $table){
        $this->db = $db;
        $this->table = $table;
    }



    // Check if all required fields are present
    public function checkRequiredFields($requiredFields, $body){
        foreach($requiredFields as $field){           
            if(!isset($body[$field])){
                handleResponse(400, "$field is required");
                return false;
            }
        }
        return true;
    }

    // Check if all unique fields are unique
    public function checkUniqueFields($uniqueFields, $body){
        foreach($uniqueFields as $field){
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
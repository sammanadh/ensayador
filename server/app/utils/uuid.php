<?php

    /**
     * Creates UUID
     * 
     * @return string
     */
    function generateUUID(): string{
        return uniqid (rand (),true);
    }

?>
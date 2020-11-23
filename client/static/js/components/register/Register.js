import Page from "../Page.js";
import template from "../../api/template.js";
import { register } from "../../api/auth.js";

export default class Register extends Page{

    constructor(){
        super();

        this.setTitle("Register");
        
        // Initialize the properties
        this.data = {
            first_name: "",
            last_name: "",
            user_id : "",
            email: "",
            password : "",
            confirm_password: "",
            address: "",
            contact_no : "",
            role: "",
            dob: null,
        }

        this.setTitle(this.title);
    }

    async getHtml(){
        // eval converts the string into template String so that string interpolation can be used
        return eval('`'+await template("/template/register/Register.html")+'`');
    }

    onload(){

        /*
            *    Title: Bootstrap
            *    Date: 11/6/2020
            *    Availability: https://getbootstrap.com/docs/4.0/components/forms/
            *
        */
        (function() {
            'use strict';
            window.addEventListener('load', function() {
              // Fetch all the forms we want to apply custom Bootstrap validation styles to
              var form = document.getElementById('registration_form');
              // Loop over them and prevent submission
              form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                  // Check if the passwords matches
                  if(this.data.password !== this.data.confirm_password){
                        
                  }
                  console.log(this.data);
                }
                form.classList.add('was-validated');
              }, false);
            }, false);
          })();


        document.querySelector("form").addEventListener("submit", (evt)=>{
            evt.preventDefault();

            // Check if the passwords matches
            if(this.data.password !== this.data.confirm_password){
                
            }

            console.log(this.data);
        });

        document.querySelectorAll("input").forEach(e => e.addEventListener("input", (evt)=>{
            if(evt.target.name in this.data){
                this.data[evt.target.name] = evt.target.value
            }
            })
        )
    }

}
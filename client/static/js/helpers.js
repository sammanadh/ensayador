import { navigateTo } from "./router.js";
import template from "./api/template.js";

function getToken(){
    return localStorage.getItem('token');
}

function 
setToken(token){
    localStorage.setItem("token", token);
}

function removeToken(){
    localStorage.removeItem("token");
}

function getRole(){
    return localStorage.getItem("role");
}

function setRole(role){
    localStorage.setItem("role", role);
}

function removeRole(){
    localStorage.removeItem("role");
}

/*
    *    Title: Bootstrap
    *    Date: 11/6/2020
    *    Availability: https://getbootstrap.com/docs/4.0/components/forms/
    *
*/

async function handleError(errmsg, redirectTo=null, callback=null){
    const errModalContent = eval('`' + await template("/template/shared/Error.html") + '`');

    // Creating a new model to show error
    const errModal = document.createElement("div");
    errModal.className = "modal";
    errModal.role = "dialog";
    errModal.tabIndex = "-1";
    errModal.id = "errModal";
    errModal.innerHTML = errModalContent;

    // Adding modal to the app container
    document.getElementById("app").append(errModal);
    
    // Display the modal
    $('#errModal').modal('show');

    // Event listener for when the error modal is closed
    $("#errModal").on("hidden.bs.modal", function () {
        // Run a callback if it is passed
        if(callback){
            callback();
        }

        // Redirect to another page if passed
        if(redirectTo){
            navigateTo(redirectTo);
        }
    });
}

async function displayMessage(msg, type="message", redirectTo=null, callback=null){
    
    var messageModalContent
    if(type==="confirmation"){
        messageModalContent = eval('`' + await template("/template/shared/Confirmation.html") + '`');
    }else{
        messageModalContent = eval('`' + await template("/template/shared/Message.html") + '`');
    }

    // Creating a new model to show error
    const msgModal = document.createElement("div");
    msgModal.className = "modal";
    msgModal.role = "dialog";
    msgModal.tabIndex = "-1";
    msgModal.id = "messageModal";
    msgModal.innerHTML = messageModalContent;

    // Adding modal to the app container
    document.getElementById("app").append(msgModal);
    
    // Display the modal
    $('#messageModal').modal('show');

    const actions = async ()=>{
        if(redirectTo){
            navigateTo(redirectTo);
        }
        if(callback){
            await callback();
        }
    }

    if(type==="confirmation"){       
         // Event listener for confirmation
        document.querySelector(".confirm-button").addEventListener("click", async ()=>{
            await actions();
            $('#messageModal').modal("hide");
        })
    }else{
        // Event listener for when the modal is closed
        $("#messageModal").on("hidden.bs.modal", actions);
    }
}

export { 
    getToken, 
    setToken, 
    removeToken,
    setRole, 
    getRole, 
    removeRole, 
    handleError, 
    displayMessage
};
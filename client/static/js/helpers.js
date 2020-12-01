import { navigateTo } from "./router.js";
import template from "./api/template.js";

function getToken(){
    return localStorage.getItem('token');
}

function setToken(token){
    localStorage.setItem("token", token);
}

function getRole(){
    return localStorage.getItem("role");
}

function setRole(role){
    localStorage.setToken("role", role);
}

/*
    *    Title: Bootstrap
    *    Date: 11/6/2020
    *    Availability: https://getbootstrap.com/docs/4.0/components/forms/
    *
*/
function loadFormValidation(){
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        }, false);
    });
}

async function handleError(errmsg){
    const errModalContent = eval('`' + await template("/template/shared/Error.html") + '`');

    // Creating a new model to show error
    const errModal = document.createElement("div");
    errModal.className = "modal";
    errModal.role = "dialog";
    errModal.tabIndex = "-1";
    errModal.id = "errModal";
    errModal.innerHTML = errModalContent;

    // Adding it to the app container
    document.getElementById("app").append(errModal);
    
    // Display the modal
    $('#errModal').modal('show');

    // Event listener for when the error modal is closed
    $("#errModal").on("hidden.bs.modal", function () {
        // Erase the token
        setToken("");
        // Navigate to root
        navigateTo("/");
    });
}

export { getToken, setToken, setRole, getRole, loadFormValidation, handleError };
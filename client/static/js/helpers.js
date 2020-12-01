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

export { getToken, setToken, setRole, getRole, loadFormValidation };
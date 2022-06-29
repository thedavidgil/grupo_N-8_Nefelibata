window.addEventListener("load", function(){
    const formulario = document.querySelector("form1");

    formulario.addEventListener("submit", function(e){
        
        let errores =[];

        let email = document.querySelector("#email");

        if(email.value == "") {
            errores.push("El campo nombre no puede estar vacío");
        } else if (email.value.includes('@')){
            errores.push("El formato de email es correcto")
        } else {
            errores.push("Debe de inlcuirse un formato valido para el email")
        }

        let password = document.querySelector("#password");

            if(password.value == "") {
               errores.push("La contraseña es obligatoria")
            }

            if(errores.length > 0) {
                e.preventDefault();
            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

            }
    })
});
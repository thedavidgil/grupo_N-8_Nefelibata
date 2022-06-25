//products create//

window.addEventListener('load', function() {
    let btnSubmit = document.querySelector('.boton1');
    let front = document.querySelector('#front');
    let name = document.querySelector('#name');
    let registerForm = document.querySelector('store');
    let description = document.querySelector("#description");
    let image = document.querySelector("#image")

    btnSubmit.addEventListener('click', function(e){
    e.preventDefault();

    let errores = {}
    if(name.value.length < 5){
    errores.name = "Debe contener al menos 5 caracteres"
    }
    if(Object.keys(errores).length > 5){
    erName.innerText = (errores.name) ? errores.name : "Debes completar el nombre del producto con el mínimo de caracteres";
    }
    if(name.value.length < 20){
        errores.description = 'Debe contener al menos 20 caracteres'
        }
        if(Object.keys(errores).length > 20){
        erName.innerText = (errores.name) ? errores.name : "Debes completar la descripción con el mínimo de caracteres";
        }
        if(name.value.length === "jpg", "jpeg", "png", "gif"){
            errores.name = "Debe contener los formatos jpg, jpeg, png, gif"
            }
            if(Object.keys(errores).length > 5){
            erName.innerText = (errores.name) ? errores.name : "Debes subir un avatar con alguno de estos formatos";
            }
    else {
    registerForm.btnSubmit();
    }
    })

    })

    //products Edit//

    window.addEventListener('load', function() {
        let btnSubmit = document.querySelector('.boton1');
        let frontEdit = document.querySelector('#frontEdit');
        let name = document.querySelector('#product_name');
        let registerForm = document.querySelector('edit');
        let description = document.querySelector("#description");
        let image = document.querySelector("#image")
    
        btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
    
        let errores = {}
        if(name.value.length < 5){
        errores.name = "Debe contener al menos 5 caracteres"
        }
        if(Object.keys(errores).length > 5){
        erName.innerText = (errores.name) ? errores.name : "Debes completar el nombre del producto con el mínimo de caracteres";
        }
        if(name.value.length < 20){
            errores.description = 'Debe contener al menos 20 caracteres'
            }
            if(Object.keys(errores).length > 20){
            erName.innerText = (errores.name) ? errores.name : "Debes completar la descripción con el mínimo de caracteres";
            }
            if(name.value.length === "jpg", "jpeg", "png", "gif"){
                errores.name = "Debe contener los formatos jpg, jpeg, png, gif"
                }
                if(Object.keys(errores).length > 5){
                erName.innerText = (errores.name) ? errores.name : "Debes subir un avatar con alguno de estos formatos";
                }
        else {
        registerForm.btnSubmit();
        }
        })
    
        })

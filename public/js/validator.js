//products create//
const forms = document.querySelector("control-formulario");

window.addEventListener('load', function () {
    let btnSubmit = document.querySelector('.boton1');
    let front = document.querySelector('#front');
    let name = document.querySelector('#name');
    let registerForm = document.querySelector("control-formulario");
    let description = document.querySelector("#description");
    let image = document.querySelector("#image")

    btnSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let errores = {}
        if (name.value.length < 5) {
            errores.name = "Debe contener al menos 5 caracteres"
        }
        if (Object.keys(errores).length > 5) {
            name.innerText = (errores.name) ? errores.name : "Debes completar el nombre del producto con el mínimo de caracteres";
        }
        if (description.value.length < 20) {
            errores.description = 'Debe contener al menos 20 caracteres'
        }
        if (Object.keys(errores).length > 20) {
            description.innerText = (errores.description) ? errores.description : "Debes completar la descripción con el mínimo de caracteres";
        }
        if (image.value.length === "jpg", "jpeg", "png", "gif") {
            errores.image = "Debe contener los formatos jpg, jpeg, png, gif"
        }
        if (Object.keys(errores).length > 5) {
            image.innerText = (errores.image) ? errores.image : "Debes subir un avatar con alguno de estos formatos";
        }
        else {
            registerForm.btnSubmit();
        }
    })

})

//products Edit//

window.addEventListener('load', function () {
    let btnSubmit = document.querySelector('.boton1');
    let frontEdit = document.querySelector('#frontEdit');
    let product_name = document.querySelector('#product_name');
    let registerForm = document.querySelector('edit');
    let description = document.querySelector("#description");
    let image = document.querySelector("#image")

    btnSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let errores = {}
        if (product_name.value.length < 5) {
            errores.product_name = "Debe contener al menos 5 caracteres"
        }
        if (Object.keys(errores).length > 5) {
            product_name.innerText = (errores.product_name) ? errores.product_name : "Debes completar el nombre del producto con el mínimo de caracteres";
        }
        if (description.value.length < 20) {
            errores.description = 'Debe contener al menos 20 caracteres'
        }
        if (Object.keys(errores).length > 20) {
            description.innerText = (errores.description) ? errores.description : "Debes completar la descripción con el mínimo de caracteres";
        }
        if (image.value.length === "jpg", "jpeg", "png", "gif") {
            errores.image = "Debe contener los formatos jpg, jpeg, png, gif"
        }
        if (Object.keys(errores).length > 5) {
            image.innerText = (errores.name) ? errores.image : "Debes subir un avatar con alguno de estos formatos";
        }
        else {
            registerForm.btnSubmit();
        }
    })

})

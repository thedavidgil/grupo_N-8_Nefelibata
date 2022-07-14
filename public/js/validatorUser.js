let avatar = document.getElementById('avatar');
let chosenImage = document.getElementById('chosen-image');
let imageName = document.getElementById('image-name');

avatar.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(avatar.files[0]);
    console.log(avatar.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute('src',reader.result);
    }
    imageName.textContent = avatar.files[0].name;
};

// User register
const db = require('../../database/models')

window.addEventListener('load', function(){
    let btnSubmit = document.querySelector('.button1');
    let registerForm = document.querySelector('.form1');

    btnSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let errores = {};

        let firstName = document.getElementById('firstName');
        let erFirstName = document.querySelector('.erFirstName');
        if(firstName.value = ''){
            errores.firstName = 'Tenes que escribir un nombre'
        } else if (firstName.value.lenght < 2){
            errores.firstName = 'El nombre debe contener al menos 2 caracteres'
        };

        let lastName = document.getElementById('lastName');    
        let erLastName = document.querySelector('.erLastName');
        if (lastName.value = '') {
            errores.lastName = 'Tenes que escribir un nombre';
        } else if (lastName.value.lenght < 2){
            errores.lastName = 'El nombre debe contener al menos 2 caracteres';
        };

        let email = document.getElementById('email');
        let erEmail = document.querySelector('.erEmail');
        if (email.value = '') {
            errores.email = 'Tenes que escribir un correo electrónico';
        } else if (email.value.indexOf('@') == -1) {
            errores.email = 'Tenes que escribir un correo electrónico válido';
        };

        db.User.findOne({
            where: {
              email: req.body.email
            }
        }).then(result => {
            if (result !== null) {
                errores.email = 'Este email ya está registrado';
            };
        });

        let password = document.getElementById('password');
        let erPassword = document.querySelector('.erPassword');
        if (password.value = '') {
            errores.password = 'Tenes que escribir una contraseña';
        }; //else if (password.value.match(/[0-9]/[A-Z]/[a-z]/[])){

        // let repassword = document.getElementById('repassword');
        // let erRepassword = document.querySelector('.erRepassword');
        // if (repassword.value = '') {
        //     errores.repassword = 'Tenes que reescribir la contraseña';
        // };
            
        let avatar = document.getElementById('avatar');
        let erAvatar = document.querySelector('.erAvatar');
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!avatar.value.includes(acceptedExtensions)) {
            errores.password = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;
        };

        if (Object.keys(errores).length >= 1) {
            erFirstName.innerText = (errores.firstName) ? errores.firstName : '';
            erLastName.innerText = (errores.lastName) ? errores.lastName : '';
            erEmail.innerText = (errores.email) ? errores.email : '';
            erPassword.innerText = (errores.password) ? errores.password : '';
            // erRepassword.innerText = (errores.repassword) ? errores.repassword : '';
            erAvatar.innerText = (errores.avatar) ? errores.avatar : '';
        } else {
            registerForm.submit();
        }

    });

});

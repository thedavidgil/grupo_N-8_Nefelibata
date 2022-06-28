const path = require('path');
const { body } = require('express-validator');


module.exports = [
	body('firstName')
		.notEmpty().withMessage('Tienes que escribir tu Nombre').bail()
		.isLength({ min: 2 }).withMessage("El Nombre deberá contener al menos 2 caracteres"),	
  	body('lastName')
  		.notEmpty().withMessage('Tienes que escribir tu Apellido').bail()
		.isLength({ min: 2 }).withMessage("El Apellido deberá contener al menos 2 caracteres"),
	body('email')
		.notEmpty().withMessage('Tienes que escribir tu correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un correo electronico válido'),
	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('La contraseña debe contener 8 dígitos con al menos una letra mayúscula, una minúsculas, un número y un carácter especial'),
	body('repassword')
		.notEmpty().withMessage('Tienes que reescribir la contraseña').bail()
		.equals('password'),
	body('userImage').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen de avatar');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]
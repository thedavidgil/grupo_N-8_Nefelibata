const path = require('path');
const { body } = require('express-validator');


module.exports = [
	body('firstName')
		.notEmpty().withMessage('Tenes que escribir un nombre').bail()
		.isLength({ min: 2 }).withMessage("El nombre debe contener al menos 2 caracteres"),	
  	body('lastName')
  		.notEmpty().withMessage('Tenes que escribir un apellido').bail()
		.isLength({ min: 2 }).withMessage("El apellido debe contener al menos 2 caracteres"),
	body('email')
		.notEmpty().withMessage('Tenes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Tenes que escribir un correo electrónico válido'),
	body('password')
		.notEmpty().withMessage('Tenes que escribir una contraseña').bail()
		.isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('La contraseña debe contener 8 dígitos con al menos una letra mayúscula, una minúsculas, un número y un carácter especial'),
	body('repassword')
		.notEmpty().withMessage('Tenes que reescribir la contraseña').bail()
		.equals('password'),
	body('userImage').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tenes que subir una imagen de avatar');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]
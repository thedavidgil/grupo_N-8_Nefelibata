const path = require('path');
const { body } = require('express-validator');


module.exports = [
	body('firstName').notEmpty().withMessage('Tienes que escribir tu nombre'),
  body('lastName').notEmpty().withMessage('Tienes que escribir tu apellido'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir tu correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un correo electronico válido'),
	body('password')
    .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
    .isLength({ min: 8 }).withMessage("Cantidad Minima de caracteres = 8"),
	body('userImage').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

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
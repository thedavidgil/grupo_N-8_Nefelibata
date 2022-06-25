const path = require('path');
const { body } = require('express-validator');

//**********Create products**********//
module.exports = [
	body('name')
		.notEmpty().withMessage('Tienes que escribir el Nombre del Producto').bail()
		.isLength({ min: 5 }).withMessage("El Nombre deberá contener al menos 5 caracteres"), //Sabrina
  	
	body('description')
    .notEmpty().withMessage('Describinos el producto').bail()
    .isLength({ max: 20}).withMessage("La descripción deberá contener al menos 20 caracteres"), //Sabrina

	body('image').custom((value, { req }) => {
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


const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body("Nombre")
        .notEmpty().withMessage('Tienes que escribir el nombre del producto').bail()
		.isLength({ min: 5 }).withMessage("El nombre del producto deberá contener al menos 5 caracteres"),	
    body("description")
        .isLength({ min: 20 }).withMessage("La descripción del producto deberá contener al menos 20 caracteres"),
    body('image').custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
            if (!file) {
                throw new Error('Tienes que subir una imagen del producto');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
    })
]
const path = require('path');
const { body } = require('express-validator');

module.exports = [

	body('nombre').notEmpty().withMessage('Tenes que escribir un nombre'),
	body('legajo').notEmpty().withMessage('Tenes que escribir un número de legajo'),
	body('mail')
		.notEmpty().withMessage('Tenes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
]
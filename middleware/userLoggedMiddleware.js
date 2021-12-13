//MIDDLEWARE APLICACION PARA NO MOSTRAR LAS OPCIONES SI YA INICIASTE SESION 

const poolDB = require('../database/config/db');

 async function userLoggedMiddleware(req, res, next) { 
	let sessionUserId = await req.session.userLogged
	let sessionUser = null
	res.locals.isLogged = false;

	let legajoInCookie = req.cookies.legajo; 
	let legajoUser = null;

	if(sessionUserId){
		//si hay un usuario en session (solo tengo el id) traigo de la db todos los otros datos y los almaceno en sessionUser
		sessionUser = await poolDB.query(`SELECT * FROM usuarios WHERE legajo = ${sessionUserId}`        ) 
	} else if (legajoInCookie){
		//si hay un usuario en session (solo tengo el id) traigo de la db todos los otros datos y los almaceno en cookieUser
		legajoUser = await poolDB.query(`SELECT * FROM usuarios WHERE legajo = ${legajoInCookie}`        ) 
	} 

	if(sessionUser){
		// si encontro el usuario, hago que las variables de locals contengan todos los datos del usuario para poder renderizarlos en el header
		res.locals.isLogged = sessionUser;
		res.locals.userLogged = sessionUser;
	} else if(legajoUser){
		// si encontro el usuario, hago que las variables de locals contengan todos los datos del usuario para poder renderizarlos en el header
		res.locals.isLogged = legajoUser;
		res.locals.userLogged = legajoUser;
	}

	next();
}

module.exports = userLoggedMiddleware;
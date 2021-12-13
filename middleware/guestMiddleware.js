//MIDDLEWARE PARA LAS RUTAS Y QUE NO TE DEJE VOLVER A REGISTARTE SI YA INICIASTE SESSION

function guestMiddleware (req, res, next) {
	if(req.session.userLogged) {
		res.redirect('/api/miperfil');
	} else {
		next();
	}
	
}

module.exports = guestMiddleware;


//MIDDLEWARE PARA QUE SI NO TENES SESSION TE MANDE A INICIARLA
const authMiddleware = async(req, res, next) =>{
	if(!req.session.userLogged) {
        res.render('login');
        }
}

module.exports = authMiddleware;
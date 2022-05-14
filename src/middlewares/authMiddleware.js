function authMiddleware(req, res, next) {//parecido al guestMiddleware
	if (!req.session.userLogged) {//si no tengo a nadie en session, entonces
		return res.redirect('/users/login');//que se redirija al login (o al register, es una decision)
	}
	next();//si tengo a alguien que siga a la ruta que es solamente la del profile. Lo requiere en userRoutes
}

module.exports = authMiddleware;
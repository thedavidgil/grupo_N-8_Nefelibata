function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {//pregunta, si tiene a alguien en session. Si en el req en session tengo a alguien en la userLogged, entonces ()
		return res.redirect("/users/profile");//yo quiero hacer un res.redirect del usuario que esté logueado
	}
	next();//si no tengo a nadie en session, next para que el req siga con su cadena de peticiones. Todo esto lo require en userRoutes. Esto es para el caso de los formularios. Si estas en session no podes volver a registrarte y/o loguearte...
}

module.exports = guestMiddleware;
//este es un middleware de aplicacion. Lo que hace es el usuario se muestre unicamente si está logueado y el registro y login se muestre justamente si estoy no logueado. la ruta principal esta en todas las paginas, no sirve por eso se hace el middleware de aplicacion y lo que hace es lo siguiente en linea 4
const User = require('../models/Users');//El modelo es el que nos permite hacer determinadas operaciones con la base de datos

function userLoggedMiddleware(req, res, next) {//loque me interesa es preguntar si tengo a alguien en session y si tengo a alguien en session quiero, de cierta, manera mostrar una parte de la barra de navegacion o no. Para ello linea 2
	res.locals.isLogged = false;//pregunta isLogged. Esta variable sirve o no para mostrar una parte de la barra de navegacion. Como es un middleware de aplicacion lo llama en app.js, en linea 19. La variable la pasa como una variable local, res.locals que basicamente es variables que puedo compartir a traves de todas las vistas, indistintamente del controlador. si hago res.locals en un middleware toda mi aplicacion va a conoccer de esta variable isLogged.Entonces en la barra de navegacion, en la nav del archivo navBar.ejs, hace un if en linea 16. El middleware de aplicacion setea el res.locals.isLogged para que sea posible de consumir en cualquier vista y como la navbar se ejecuta justamente en cualquier vista, pregunta el if

	let emailInCookie = req.cookies.userEmail;//si tengo a alguien en una cookie, quiero buscar a esa persona y loguearla de manera automatica. Del req quiero las cookies y quiero obtener lo que vino en el userEmail. (Como es middleware de aplicacion obtengo esto desde cualquier lugar al que entre). Intersa buscar al usuario logueado, no solo interesa el mail, para eso se trae al modelo en linea 1(la Const user)
	let userFromCookie = User.findByField('email', emailInCookie);//Es un usuario que voy a sacar de la cookie. Quiero buscar por email y le voy a pasar el email que tengo en la cookie. una vez que se recuerda al usario (en este caso es por una hora) no se puede desloguear! En el proceso de Logout hay que destruir la cookie, como? voy a user controller al logout
//si obtuve a alguien en la cookie, busque a la persona en la base de datos, si la obtuve, la paso a session
	if (userFromCookie) {//cuando es true y no false. Si tengo al usuario de la cookie, voy a querer pasar a ese usuario a session, linea 11
		req.session.userLogged = userFromCookie;//lo hace antes para que cuando se ejecute el if de la linea 14 digan ¿tengo a alguien en session? si, entonces es porque tengo a alguien logueado (linea 15) pasa por linea 16 y se loguea de manera automatica
	}//la pase por aca que es session

	if (req.session.userLogged) {
		res.locals.isLogged = true;//si en el req en session tengo al userLogged, entronces es true
		res.locals.userLogged = req.session.userLogged;//como se que tengo a alguien en session hago un res.locals.userLogged y paso lo que tengo en req.session.userLogged. Lo que se hace aca es pasar variable local para poder ser compartida entre varias paginas, es necesario que esta vista tiene algo en variables locales globales que lo hace userLogged pasando lo que hay en session a una variable local para que en la navBar se pueda hacer lo de la linea 20 y 19
	}

	next();
}

module.exports = userLoggedMiddleware;
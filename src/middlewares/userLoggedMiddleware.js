const db = require("../../database/models");

function userLoggedMiddleware (req, res, next) {
res.locals.isLogged = false; 

let emailInCookie = req.cookies.userEmail;

db.User.findOne({
    where: {
      email: emailInCookie
    }
  })
  .then(response=>{
    let userFromCookie = response;
    if( userFromCookie ) {
        req.session.userLogged = userFromCookie;
    }
    if(req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }
  })

next();
}

module.exports = userLoggedMiddleware;
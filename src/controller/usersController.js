const controller = {

  register:(req,res) => {
    res.render("./users/register")
  },

  confirmation:(req,res) => {
    res.render("./users/confirmation")
  },

  login:(req,res) =>{
    res.render("./users/login")
  },

  recovery:(req,res) => {
    res.render("./users/passwordRecovery")
  }

}

module.exports = controller;
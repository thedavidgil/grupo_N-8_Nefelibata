const controller = {

  index:(req,res) => {
    res.render("./main/home")
  },

  contact:(req,res) => {
    res.render("./main/contact")
  }

}

module.exports = controller;
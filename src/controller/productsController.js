const controller ={

  index:(req,res) =>{
    res.render("./products/products")
  },

  cart:(req,res) => {
    res.render("./products/cart")
  },

  detail:(req,res) => {
    res.render("./products/detail")
  },

  create:(req,res) =>{
    res.render("./products/create")
  },

  edit:(req,res) =>{
    res.render("./products/edit")
  }

}
module.exports = controller;
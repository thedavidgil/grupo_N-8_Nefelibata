const db = require("../../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

  home:(req,res) => {
    db.Product.findAll({
      include: [{association:"product_images"}]
    })
    .then(function(products){
		return res.render("./main/home", { products , toThousand });
    })
  },

  contact:(req,res) => {
    res.render("./main/contact")
  }

}

module.exports = controller;
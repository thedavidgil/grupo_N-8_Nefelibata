const fs = require("fs");
const path = require("path");
const db = require("../../database/models");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

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
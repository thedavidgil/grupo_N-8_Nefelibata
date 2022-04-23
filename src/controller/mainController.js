const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

  home:(req,res) => {
    const outstanding = products.filter(product => product.category == "outstanding");
		return res.render("./main/home", { outstanding , toThousand });
    },

  contact:(req,res) => {
    res.render("./main/contact")
  }

}

module.exports = controller;
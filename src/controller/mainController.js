const fs = require("fs"); //Sabrina
const path = require("path");//Sabrina

const productsFilePath = path.join(__dirname, "../dataBase/productsDataBasePrueba.json"); //Sabrina
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); //Sabrina

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //Sabrina

const controller = {

  index:(req,res) => {
    const destacados = products.filter(product => product.category == "destacados");// Sabrina filtra los productos destacados

		return res.render("./main/home", { destacados, toThousand }); //Sabrina
    //res.render("./main/home")
  },

  contact:(req,res) => {
    res.render("./main/contact")
  }

}

module.exports = controller;
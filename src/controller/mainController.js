const fs = require("fs"); //Sabrina
const path = require("path");//Sabrina

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json"); //Sabrina
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); //Sabrina

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //Sabrina

const controller = {

  home:(req,res) => {
    const outstanding = products.filter(product => product.category == "outstanding");// Sabrina filtra los productos destacados
		return res.render("./main/home", { outstanding , toThousand }); //Sabrina
    },

  contact:(req,res) => {
    res.render("./main/contact")
  }

}

module.exports = controller;
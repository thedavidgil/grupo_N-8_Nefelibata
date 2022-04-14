const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../dataBase/productsDataBasePrueba.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




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
    const id = req.params.id;
		const product = products.find(product => product.id == id);
    res.render("./products/edit",{product});
  }

}
module.exports = controller;
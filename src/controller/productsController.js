const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const db = require("../../database/models");


function readDBFiltered(){
	let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products.filter(product=>product.show);
}

function readDB(){
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

  home:(req,res) =>{
	db.Product.findAll({
    include: [{association:"product_images"}]
  })
  .then(function(products){
    return res.render("./products/products", { products, toThousand})}
  )},

  detail:(req,res) => {
    db.Product.findByPk((req.params.id), {
    include: [{association:"product_images"}]
      })
        .then(function(product){
           if(product) {
      return res.render("./products/detail", {product, toThousand})
      } else {
       return res.render("./main/error")
    }
    
 })
},


  create:(req,res) => {
    return res.render("./products/create");
    
  },

	store: (req, res) => {
    db.Product.create({
      product_name: req.body.Nombre,
      description: req.body.description,
      price: req.body.price,
      product_category_id:req.body.category,
      show_product:true,
      product_images:[{
        image: req.file?.filename ?? "default-image.png",
      }]
		},
    {
      include:  [{association:"product_images"}]
    })
    return res.redirect("/products");
	},

  edit:(req,res) =>{
    const id = req.params.id;
    let products = readDB();
		const product = products.find(product => product.id == id);
        res.render("./products/edit",{product});
  },

  update: (req, res) => {
    const id = req.params.id;
    let products = readDB();
    products = products.map(product => {
    if(product.id == id){
        product.name = req.body.name,
        product.description = req.body.description,
        product.image= req.file?.filename ?? "default-image.png",
        product.category = req.body.category,
        product.price = req.body.price
    }
    return product;
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
    return res.redirect("/products");
  },

  destroy: (req,res) => {
    const id = req.params.id;
    let products  = readDB();
    products = products.map(product => {
      if(product.id == id){
        product.show = false
      }
      return product;
    })
    fs.writeFileSync(productsFilePath, JSON.stringify(products,null,2));
    return res.redirect("/products");
  }
}


module.exports = controller;
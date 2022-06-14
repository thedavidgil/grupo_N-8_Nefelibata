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
    //return res.send(products)}
  )},

  detail:(req,res) => {
    db.Product.findByPk((req.params.id), {
    include: [{association:"product_images"}]
      })
        .then(function(product){
           if(product) {
      return res.render("./products/detail", {product, toThousand})
      //return res.send(product.product_images[0].image)
      } else {
       return res.render("./main/error")
    }
    
 })
},


  create:(req,res) => {
    return res.render("./products/create");
    
  },

	store: (req, res) => {
    let a = db.Product.create({
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
    //return res.send(a)
    return res.redirect("/products");
	},

/* SPRING 5 */
  edit:(req,res) =>{
    const id = req.params.id;
    let products = readDB();
		const product = products.find(product => product.id == id);
        res.render("./products/edit",{product});
  },

/* SPRING 5 */
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
/*
  delete: (req,res) => {
    const id = req.params.id;
    db.Product.destroy({
      where:
        {
          id: id
        }
    }).then(response => res.redirect("/products"))
  }
*/
  /* SPRING 5 */
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
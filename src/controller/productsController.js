const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

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
	const products = readDBFiltered();
  return res.render("./products/products", { products, toThousand});
  
  },

  detail:(req,res) => {
		const id = req.params.id;
		const products = readDBFiltered();
		const product = products.find(product => product.id == id);
    if(typeof product != "undefined"){
      res.render("./products/detail", { product, toThousand });
    }
    else{
      res.render("./main/error")
    }
    
  },


  create:(req,res) =>{
    return res.render("./products/create");
    
  },

	store: (req, res) => {
    let products = readDB();
		const productoNuevo = {
			id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
      name: req.body.name,
      description:req.body.description,
      image: req.file?.filename ?? "default-image.png",
      category: req.body.category,
      price:req.body.price,
      show:true
		}

		products.push(productoNuevo);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

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
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../dataBase/productsDataBasePrueba.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




const controller ={

  index:(req,res) =>{
    res.render("./products/products") //Muestra todos los productos
  },

  cart:(req,res) => {
    res.render("./products/cart")
  },

  detail:(req,res) => {
    res.render("./products/detail") //vista detalle de producto, debe mostrar todo
  },

  create:(req,res) =>{
    res.render("./products/create")
  },

	store: (req, res) => {
		const productoNuevo = {
			id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
			...req.body,
			image: req.file?.filename ?? "default-image.png"
		}

		products.push(productoNuevo);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		return res.redirect("/products"); //ejecuta una nueva ruta
	},//sabrina

  edit:(req,res) =>{
    const id = req.params.id;
		const product = products.find(product => product.id == id);
    res.render("./products/edit",{product}); //Muestra el formulario de edición (no lo edita)
  }

}

update: (req, res) => {
  const id = req.params.id;
  products = products.map(product => {
    if(product.id == id){
      product.name = req.body.name,
      product.description = req.body.description,
      product.image = req.file?.filename ?? "default-image.png",
      product.category = req.body.category,
      product.color = req.body.color,
      product.price = req.body.price
    }
    return product;
  });
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

      return res.redirect("/products");// aca se edita el producto
}, //sabrina


module.exports = controller;
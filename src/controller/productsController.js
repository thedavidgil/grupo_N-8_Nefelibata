const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../dataBase/productsDataBasePrueba.json');

function readBD(){
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products.filter(product=>product.show);
}// leer BD actualizada y solo mostrar los productos no eliminados.

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
    let products = readBD();
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
    let products = readBD();
		const product = products.find(product => product.id == id);
    res.render("./products/edit",{product}); //Muestra el formulario de edición (no lo edita)
  },

update: (req, res) => {
  const id = req.params.id;
  let products = readBD();
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
},

destroy: (req,res) =>{

  const id = req.params.id;
  let products  = readBD();
  products = products.map(product =>{
    if(product.id == id){
      product.show = false
    }
    return product;
  }) 
  fs.writeFileSync(productsFilePath, JSON.stringify(products,null,2));
  return res.redirect("/");

} 
} 


module.exports = controller;
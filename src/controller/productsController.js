const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../dataBase/productsDataBasePrueba.json');

function readBD(){
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products.filter(product=>product.show);
}// leer BD actualizada y solo mostrar los productos no eliminados.

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //Sabrina




const controller ={

  home:(req,res) =>{
    const products = readBD();
    return res.render("./products/products", { products, toThousand}); //Sabrina. Muestra todos los productos
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

		products.push(productoNuevo); //sabrina.Guarda el producto nuevo
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)) //Sabrina. Hay que escribir de nuevo el archivo con los datos nuevos. Products viaja como strin por eso es json.stringify de products

		return res.redirect("/products"); //ejecuta una nueva ruta
	},//sabrina

  edit:(req,res) =>{
    const id = req.params.id;
    let products = readBD();
		const product = products.find(product => product.id == id);
    res.render("./products/edit",{product}); //Muestra el formulario de edición (no lo edita). carga los productos, los envia al json
  },



update: (req, res) => {
  const id = req.params.id;
  let products = readBD();
  products = products.map(product => {
    if(product.id == id){
      product.name = req.body.name,
      product.description = req.body.description,
      product.image = req.file?.filename ?? "default-image.png",// valida si existe la propiedad file (?) dentro de req. Si existe pregunta por filename. Es como hacer un if. (??) es como un if ternario muy achicado. Hay que validarlo porque el usuario puede no mandar la imagen
      product.category = req.body.category,
      product.color = req.body.color,
      product.price = req.body.price
    }
    return product;
  });
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)) //el null, 2 es para que al ingresar un producto en el json se mantenga el formato

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
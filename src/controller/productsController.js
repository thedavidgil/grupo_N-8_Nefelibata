const fs = require('fs');
const path = require('path');
<<<<<<< HEAD

const productsFilePath = path.join(__dirname, "../dataBase/productsDataBasePrueba.json");

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));//Sabrina. Array de productos
=======
const productsFilePath = path.join(__dirname, '../dataBase/productsDataBasePrueba.json');

function readBD(){
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products.filter(product=>product.show);
}// leer BD actualizada y solo mostrar los productos no eliminados.
>>>>>>> f3382327af8d2fa539291aec956a8480e030e760

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //Sabrina




const controller ={

  index:(req,res) =>{
    return res.render("products", { products, toThousand}); //Sabrina. Muestra todos los productos
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
<<<<<<< HEAD
		const productoNuevo = { //Sabrina. Crea el producto nuevo
			id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1, //Sabrina. valida e ingresa el producto nuevo a lo ultimo dando un nuevo id
			...req.body,//repite las propiedades del update. los tres puntos son express operator
=======
    let products = readBD();
		const productoNuevo = {
			id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
			...req.body,
>>>>>>> f3382327af8d2fa539291aec956a8480e030e760
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



<<<<<<< HEAD
update: (req, res) => { //Sabrina. Recibe la informacion de edicion
  const id = req.params.id; //el id lo recibimos del params
  products = products.map(product => { //encontrar el producto a modificar y guardarlo en el array. El map necesita que le retornemos el producto
    if(product.id == id){ //si se cumple modifico los datos
=======
update: (req, res) => {
  const id = req.params.id;
  let products = readBD();
  products = products.map(product => {
    if(product.id == id){
>>>>>>> f3382327af8d2fa539291aec956a8480e030e760
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
<<<<<<< HEAD
}; //sabrina

=======
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
>>>>>>> f3382327af8d2fa539291aec956a8480e030e760


module.exports = controller;
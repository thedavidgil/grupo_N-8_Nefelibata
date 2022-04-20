const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

function readDBFiltered() {
	let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products.filter(product => product.show);
}

function readDB() {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Mostrar todos los productos
	index: (req, res) => {

		const products = readDBFiltered();
		return res.render("products", { products, toThousand });
	},

	// Detail - Detalle de un producto
	detail: (req, res) => {

		const id = req.params.id;
		const products = readDBFiltered();
		const product = products.find(product => product.id == id);
		return res.render("detail", { product, toThousand });
	}
/*
	// Create - Formulario para crear
	create: (req, res) => {

		return res.render("product-create-form");
	},
	
	// Create -  Método para almacenar
	store: (req, res) => {

		const products = readDB();
		const productoNuevo = {
			id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
			...req.body,
			image: req.file?.filename ?? "default-image.png"
		}

		products.push(productoNuevo);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		return res.redirect("/products")
	},

	// Update - Formulario para editar
	edit: (req, res) => {

		const id = req.params.id;
		const product = products.find(product => product.id == id);
		return res.render("product-edit-form", { product });
	},
	// Update - Método para editar
	update: (req, res) => {

		const id = req.params.id;
		const products = readDB();
		products = products.map(product => {
			if(product.id == id){
				product.name = req.body.name,
				product.price = req.body.price,
				product.discount = req.body.discount,
				product.category = req.body.category,
				product.description = req.body.description,
				product.image = req.file?.filename ?? "default-image.png"
			}
			return product;
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		return res.redirect("/products");
	},

	// Delete - Borrar un producto de DB
	destroy : (req, res) => {

		const id = req.params.id;
		let products = readDB();
		products = products = products.map(product => {
			if(product.id == id){
				product.show = false
			}
			return product;
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		return res.redirect("/products");
	}*/
};

module.exports = controller;
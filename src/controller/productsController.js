const db = require("../../database/models");
const ProductCategory = db.Product_category;
const ProductImage = db.Product_image;
const Products = db.Product;
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

  home:(req,res) =>{
	db.Product.findAll({
    include: [{association:"product_images"}]
  })
  .then(function(products){
    return res.render("./products/products", { products, toThousand})}
  )},

  create:(req,res) => {
    return res.render("./products/create");
  },

	store: (req, res) => {
    Products.create({
      product_name: req.body.name,
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
    .then(()=>{
      return res.redirect("/products");
    }) 
	},

  detail:(req,res) => {
    Products.findByPk((req.params.id), {
    include: [{association:"product_images"}]
    })
    .then(function(product){
      if(product) {
        return res.render("./products/detail", {product, toThousand})
      }
      else {
       return res.render("./main/error")
      }
    })
  },

  edit: (req, res) => {
    let promesaProducto =  Products.findByPk(req.params.id)
    let promesaCategorias = ProductCategory.findAll()
    let promesaImagenes = ProductImage.findAll({where:{product_id:req.params.id}})
    Promise.all([promesaCategorias,promesaImagenes,promesaProducto])
    .then(function ([categorias,imagenes,product]) {
        res.render("./products/edit", {categorias,imagenes,product});
      })

  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      await Products.update({
        ...req.body
      },
      {
        where: {product_id:id}
      });
      return res.redirect("/products");
    } catch (err) {
      console.error(err)
    }
  },






  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const Product = await Products.findByPk(id);
      return res.render("/delete", {Product})
    } catch (err) {
      console.error(err)
    }
  },





  destroy: async (req, res) => {
    try {
      const id = req.params.id;
      await Products.destroy({
        where:
          {
            id: id
          }        
      })
      
      return res.redirect("/products");
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = controller;
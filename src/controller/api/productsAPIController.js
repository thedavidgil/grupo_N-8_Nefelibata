const db = require('../../../database/models');

const Product = db.Product;
const Product_category = db.Product_category;
const Product_image = db.Product_image;

const controller = {
    list: (req, res) => {
        Product
        // .findAll()
        .findAll({
            include: ['product_categories', 'product_images'],
            // attributes: ["product_id", "product_name", "description"],
        })
        .then(products => {
            return res.status(200).json({
                meta: {
                    status : res.statusCode,
                    count: products.length,
                },
                data: products
            });
        })
        .catch(error => console.log(error));
    },
    detail: (req, res) => {
        Product
        .findByPk(req.params.id,
        {
            include : ['product_categories', 'product_images']
        })
        .then(product => {
            let response = {
                meta: {
                    status: 200,
                    product_image: '/api/product/:id/product_images'
                },
                data: product
            }
            return res.json(response);
        })
        .catch(error => console.log(error));
    },
    countByCategory: (req, res) =>{ 
        Categories
        .findAll()
        .then(result => {
            return res.json(result);
        })
        .catch(error => res.json(error));

},
}

module.exports = controller;
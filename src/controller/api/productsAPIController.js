const db = require('../../../database/models');

const Product = db.Product;
const Product_category = db.Product_category;
const Product_image = db.Product_image;

const controller = {
    list: (req, res) => {
        Product
        .findAll({
            include: ['product_categories', 'product_images']
        })
        .then(products => {
            let response = {
                meta: {
                    status : 200,
                    count: products.length,
                    products: [{
                        id: products.product_id,
                        name: products.product_name,
                        description: products.description,
                        relations: [
                            {
                                category: products.product_category,
                                price: products.price
                            }
                        ],
                        detail: '/api/products'
                    }]
                },
                data: data.products
            }
                return res.json(response);
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
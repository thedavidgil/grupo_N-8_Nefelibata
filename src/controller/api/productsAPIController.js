const db = require('../../../database/models');

const controller = {
    list: async (req, res) => {
        let count = await db.sequelize.query('SELECT COUNT(product_id) FROM Products;');
        let countByCategory = await db.sequelize.query('SELECT Product_category.category as "product_category", COUNT(*) as "count" FROM `Products` INNER JOIN Product_category ON Products.product_category_id = Product_category.product_category_id GROUP BY category;');
        let products = await db.Product.findAll({
                        include: ['product_categories'],
                        attributes: ["product_id", "product_name", "description", "product_categories.category"],});
        let productsTable = await db.sequelize.query('SELECT product_id, product_name, description, product_category.category FROM `products` INNER JOIN Product_category ON products.product_category_id = Product_category.product_category_id;')
        let countCategories = await db.sequelize.query('SELECT COUNT(product_category_id) FROM Product_category;');
        
        count = count[0];
        countByCategory = countByCategory[0];
        countCategories = countCategories[0];
        products.map( product => product.dataValues.detail = `http://localhost:5000/api/products/${product.dataValues.product_id}`)
        products = [...products]

        let lastest = products[products.length-1];

        let arrProducts = Object.entries(products);

        return res.status(200).json({ 
            meta: {
                status: 200
            },
            data: {
                count, 
                countByCategory, 
                products,
                productsTable,
                lastest,
                countCategories
            }
        });
    },

    detail: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id, {
            include: ['product_categories', 'product_images']});

        product = {
            ...product.dataValues,
        }

        return res.status(200).json({ 
            meta: {
                status: 200
            },
            data: {
                product
            }
        });
    }
}

module.exports = controller;
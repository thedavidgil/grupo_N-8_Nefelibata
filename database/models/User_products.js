module.exports = (sequelize, dataTypes) => {
    const alias = "User_products";

    const cols = {

        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,

        },
        product_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,

        },
    };

    let config = {
        timestamps: false,
        deletedAt: false
    };

    const User_products = sequelize.define(alias, cols, config);

    User_products.associate = function (models) {


        User_products.hasOne(models.User, {
            as: "users",
            foreignKey: "user_id"
        })

        User_products.belongsToMany(models.Product, {
            as: "products",
            through: 'user_products',
            foreignKey: 'user_id',
            otherKey: 'product_id',
            timestamps: false
        });

    }

    return User_products;
}


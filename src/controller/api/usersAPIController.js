const db = require('../../../database/models');

const usersApiController = {
    list: async (req, res) =>{
        let users = await db.User.findAll({ attributes: ["user_id", "first_name", "last_name", "email"] });
        users.map(user => user.dataValues.detail = `http://localhost:5000/api/users/${ user.dataValues.user_id }`)
        users = [...users ];

        let lastest = users[users.length-1];

        return res.status(200).json({
            meta: {
                status: 200
            },
            data: {
                users,
                lastest
            }
        });
    },

    detail: async (req, res) => {
        let users = await db.User.findAll({ include:["avatars"], attributes: ["user_id", "first_name", "last_name", "email"] });
        users = { ...users }
        return res.status(200).json({
            meta: {
                status: 200
            },
            data: {
                users
            }
        });
    }
}
module.exports = usersApiController;
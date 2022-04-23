const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

//function readBD(){
//let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
//return users.filter(users=>users.show == true);
//}// leer BD actualizada y solo mostrar usuarios activos.



const controller = {

  register:(req,res) => {
    res.render("./users/register")
  },

  create:(req,res) => {
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		const userNuevo = {
			id: users.length > 0 ? users[ users.length - 1 ].id + 1 : 1,
			...req.body,
			image: req.file?.filename ?? "default-image.png"
		}

		users.push(userNuevo); // Gabriel Guarda el usuario nuevo
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)) //Gabriel. Hay que escribir de nuevo el archivo con los datos nuevos. Users viaja como strin por eso es json.stringify de users

		return res.redirect("confirmation")

  },

  edit: (req, res) => {
    let idUser = req.params.idUser;
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    let userToEdit = users[idUser-1];
    res.render("./users/edit", {userToEdit : userToEdit}) //Muestra el formulario de edición
  },

  confirmation:(req,res) => {
    res.render("./users/confirmation")
  },

  list:(req,res) => {
    res.render("./users/usersList")
  },

  login:(req,res) =>{
    res.render("./users/login")
  },

  recovery:(req,res) => {
    res.render("./users/passwordRecovery")
  }

}

module.exports = controller;
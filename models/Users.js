// Sabrina. Este archivo es el modelo, permite toda la funcionalidad de la base de datos. Esta es su finalidad.
//METODOS DE LAS BASES DE DATOS O CRUD:
// 1. Guardar al ususario en la DB
// 2. Buscar al usuario que se quiere loguear por su email (antes del logueo)
// 3. Buscar a un usuario por si ID
// 4. Editar la información de un usuario
// 5. Eliminar a un usuario de la DB

//crear un objeto literal que va a tener métodos que se van a encargar de las características arriba mencionadas

const fs = require("fs");

const Users ={
    fileName: "./src/data/usersDataBase.json", //referencia a la base de datos con su ubicación

    obtainData: function () {//metodo para traer a todos los usuarios cuando quiero borrar, modificar, ingresar, etc
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));//return de la lectura del archivo, para eso requiere la libreria fs. La lectura la devuelve en formato de string pero debe ser convertido en array. Por eso hace uso del objeto json y el metodo parse que entrega un array(json.parse)
	},

    generateId: function () {//este es el metodo que genera el id
		let allUsers = this.findAll();//toma a todos los usuarios. Acá interesa obtener el ultimo id
		let lastUser = allUsers.pop();//para obtener al ultimo usuario
		if (lastUser) {//si es undifined dara false
			return lastUser.id + 1;//si da true quiero hacer este return. Del ultimo usuario adquiero su id * 1
		}
		return 1;//si no tengo usuarios el usuario a devolver será el 1
	},

    findAll: function () {//es un metodo findAll. Obtener todos los usuarios. Este también devuelve todos los usuarios, pero este hace mucho más sentido
		return this.obtainData();
	},

    findByPk: function (id) {//busca usuarios por id. Interesa encontrar este id determinado, entonces usa el allUsers.find
		let allUsers = this.findAll();//obtiene  a todos los usuarios de mi db
		let userFound = allUsers.find(oneUser => oneUser.id === id);//El método find recibe una función, un callback a traves del cual va a iterar todo el array, de a un usuario y que retorne aquel usuario cuyo id es igual  a este id
		return userFound;
	},

    findByField: function (field, text) {// Busca el usuario por email o cualquiera de sus campos.
		let allUsers = this.findAll();//trae a todos los usuarios
		let userFound = allUsers.find(oneUser => oneUser[field] === text);// el field puede ser el id o email tambien. Busca por campo y este que sea un texto igual al campo que busco, por eso es [field] === text.
		return userFound;
	},

    create: function(usersDataBase){//crea un usuario y lo guarda
        let allUsers = this.findAll();//me traigo a todos los usuarios
        let newUser = {//El nuevo usuario 
			id: this.generateId(),//el nuevo usuario va a tener un id
			...usersDataBase//...es el operador de propagacion o express operator. userDataBase va a ser toda la informacion que llega del objeto literal de la linea 45
		}
        allUsers.push(newUser);//se hace un push del array de la linea 45. userData que lo inserte despues del formulario de registro, etc. hay que convertirlo y volver a escribirlo dentro del archivo json
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));//este metodo escribe donde yo le indique(writeFileSync). Todos los datos se van a generar con el formulario, menos el id! este viene generado si o si por parte del modelo. null y espacio vacio mantiene el formato de la db.
        return newUser;//retorna al nuevo usuario
    },

    delete: function (id) {//eliminar usuario. Identifica al usuario por el id
		let allUsers = this.findAll();//tomamos a todos los usuarios
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);//devolver a todos los usuarios menos el que debe ser borrado. filter va a recorrer a todos los usuarios de a un usuario y que me retorne aquellos usuarios cuyo id sea distinto al solicitado
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));//este metodo escribe donde yo le indique(writeFileSync). Todos los datos se van a generar con el formulario, menos el id! este viene generado si o si por parte del modelo. null y espacio vacio mantiene el formato de la db
		return true;
	}
}

module.exports = Users;
//Inicializar Servidor
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

//habilitar carpeta publica
const publicPath = path.join(__dirname, '../', 'public');
app.use(express.static(publicPath));

//habilitar motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views");

//levantar servidor
app.listen(port, err =>{

  if(err){
    return console.log("ERROR",err);
  }
  console.log(`Servidor en línea en puerto ${port}`);

}) ;

//rutas
const homeRoutes = require("./routes/homeRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const productsRoutes =  require("./routes/productsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const confirmationRoutes =require("./routes/confirmationRoutes");
const recoveryRoutes = require("./routes/recoveryRoutes");
const detailRoutes = require("./routes/detailRoutes");
app.use('/',homeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/products', productsRoutes);
app.use('/cart',cartRoutes);
app.use('/confirmation',confirmationRoutes);
app.use('/recovery',recoveryRoutes);
app.use('/detail',detailRoutes);

<<<<<<< HEAD
=======
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './views/home.html')));
app.get('/desarrollo', (req, res) => res.sendFile(path.join(__dirname, './views/hoja_de_desarrollo.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, './views/register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, './views/login.html')));
app.get('/products', (req, res) => res.sendFile(path.join(__dirname, './views/products.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, './views/contact.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(__dirname, './views/cart.html')));
app.get('/confirmation', (req, res) => res.sendFile(path.join(__dirname, './views/confirmation.html')));
app.get('/recovery', (req, res) => res.sendFile(path.join(__dirname, './views/password_recovery.html')));
app.get('/detalle_producto', (req, res) => res.sendFile(path.join(__dirname, './views/detalle_producto.html')));
app.get('/crear_editar', (req, res) => res.sendFile(path.join(__dirname, './views/crear_editar.html')));
>>>>>>> 5e245e6f45676b149106289e3422b888effddc69

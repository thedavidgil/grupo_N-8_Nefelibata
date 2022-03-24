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


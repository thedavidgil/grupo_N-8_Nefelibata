// ************ Require's ************
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');


// ************ express() ************
const app = express();


// ************ Middlewares ************
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

//app.use((req, res, next) => {
  //res.status(404).render('not-found')
//});//sabrina


// ************ Template Engine ************
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));


// ************ Levantar servidor ************
const port = process.env.PORT || 5000;
app.listen(port, err =>{

  if(err){
    return console.log("ERROR",err);
  }
  console.log(`Servidor en línea en puerto ${port}`);

}) ;


// ************ Route System require and use() ************
const mainRouter = require("./routes/main");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");

app.use('/',mainRouter);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);





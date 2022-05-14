// ************ Require's ************
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const session = require("express-session");//Sabrina. instalado session, se requiere el mismo.
const cookies = require("cookie-parser");//descargo em modulo cookie-parser y lo requiere aca. Cookie-parser es basicamente un modulo que permite trabajar con las cookies que esto aquello que se guarda del lado del navegador (la session se guarda del lado del servidor). pero las cookies se guardan por navegador y servidor


// ************ express() ************
const app = express();


// ************ Middlewares ************
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const userLoggedMiddleware = require("./middlewares/usersLoggedMiddleware");//Sabrina. este middleware lo pasa en linea 27

app.use(session({//este es el middleware de aplicacion de session que es un objeto literal que . Se accede a todo lo que tenga en el req
	secret: "Esto es un secreto",//la propiedad secret
	resave: false,//propiedad (configuración de la session)
	saveUninitialized: false,//propiedad (configuración de la session)
}));

app.use(cookies());//el middleware de las cookies. Permite trabajar directamente en req y res con un objeto literal. se va al controlador, linea 10

app.use(userLoggedMiddleware);//se ejecuta solo cuando necesite por eso no se le pasan parametros. Este se inicia siempre despues de session por eso va en este lugar



// ************ Template Engine ************
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));


// ************ Levantar servidor ************
const port = process.env.PORT || 5000;
app.listen(port, err => {

  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Servidor en línea en puerto ${port}`);

});


// ************ Route System require and use() ************
const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const cartRouter = require("./routes/cartRouter");



app.use('/', mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);

//**********Error page**********
app.get("*", (req,res)=>{
  res.render("./main/error")
});


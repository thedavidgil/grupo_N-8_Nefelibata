// ************ Require's ************
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const session = require("express-session");
const cookies = require("cookie-parser");

// ************ express() ************
const app = express();


// ************ Middlewares ************
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookies());
app.use(session({ secret: "It's a secret",
                  resave:false,
                  saveUninitialized: false,

}));
//app.use(userLoggedMiddleware);//FALTA VALIDAR

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
const mainRouter = require("./routes/main");//OK
const usersRouter = require("./routes/users");//OK? FALTA REVISAR ALGUNAS RUTAS
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cartRouter");

app.use('/', mainRouter);//OK
app.use("/users", usersRouter);//OK? FALTA REVISAR ALGUNAS RUTAS
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

//**********Error page**********
app.get("*", (req,res)=>{
  res.render("./main/error")
});


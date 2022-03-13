const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

const publicPath = path.resolve(__dirname,"../public");
app.use(express.static(publicPath));

app.listen(port,() => console.log(`Servidor corriendo en puerto ${port}`));

app.get("/",(req,res)=>{res.sendFile(path.resolve(__dirname,"./views/home.html"))})

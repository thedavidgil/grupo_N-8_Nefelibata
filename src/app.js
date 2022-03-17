const express = require("express");
const path = require("path");

const port = 5000;

const publicPath = path.join(__dirname, '../', 'public');
const app = express();

app.use(express.static(publicPath));

app.listen(port, () => console.log(`Servidor en línea en puerto ${port}`));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/home.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, './views/register.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));
app.get('/products', (req, res) => res.sendFile(path.resolve(__dirname, './views/products.html')));
app.get('/cart', (req, res) => res.sendFile(path.resolve(__dirname, './views/cart.html')));
app.get('/confirmation', (req, res) => res.sendFile(path.resolve(__dirname, './views/confirmation.html')));
app.get('/recovery', (req, res) => res.sendFile(path.resolve(__dirname, './views/password_recovery.html')));
app.get('/detalle_producto', (req, res) => res.sendFile(path.resolve(__dirname, './views/detalle_producto.html')));
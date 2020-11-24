const express = require('express');
const bodyParser = require('body-parser');
const puerto = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const rateLimit = require("express-rate-limit");

const usuariosRutas = require('./rutas/usuarios.rutas.js');
const productosRutas = require('./rutas/productos.rutas.js');
const pedidosRutas = require('./rutas/pedidos.rutas.js');

const limiteLogin = rateLimit({
    windowMs: 6 * 60 * 10000,
    max: 10
});


app.use("/v1/ingreso/", limiteLogin); 


usuariosRutas(app);
productosRutas(app);
pedidosRutas(app);

app.listen(puerto, () => {
    console.clear();
    console.log(`Servidor Inicializado en el puerto :  ${puerto}`)
});

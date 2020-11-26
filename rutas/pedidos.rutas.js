const pedidosServicios = require('../servicios/pedidos.servicios.js');
const usuariosServicios = require('../servicios/usuarios.servicios.js');
const {mostrarPedidos, crearPedido, validarDatos,
       editarPedido ,eliminarPedido} = require('../middlewares/pedidos.middleware.js');
const {enviaToken} = require('../middlewares/usuarios.middleware.js');

module.exports = (app) => {

    app.get("/v1/pedidos/",enviaToken, mostrarPedidos, async (req, res) => {

        console.log("peticion GET a : /v1/pedidos/ ");       

    });

    app.post("/v1/pedidos/", enviaToken, validarDatos, crearPedido, async (req, res) => {

        console.log("peticion POST a : /v1/pedidos/ ");

    });

    app.put("/v1/pedidos/",enviaToken, editarPedido, async (req, res) => {

        console.log("peticion PUT a : /v1/pedidos/ ");
      
    });

    app.delete("/v1/pedidos/",enviaToken, eliminarPedido, async (req, res) => {

        console.log("peticion DELETE a : /v1/pedidos/ ");

    });

}
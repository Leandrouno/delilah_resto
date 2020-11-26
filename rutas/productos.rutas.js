const productosServicios = require('../servicios/productos.servicios.js');
const { validarDatos, validarExistencia, validarDatosEditar,
     mostrarProductos, crearProducto ,editarProducto, eliminarProducto } = require('../middlewares/productos.middleware.js');
const { esAdmin } = require('../middlewares/usuarios.middleware.js');


module.exports = (app) => {

    app.get("/v1/productos/", mostrarProductos, async (req, res) => {

        console.log("peticion GET a : /v1/productos/ ");

    });

    app.post("/v1/productos/", validarDatos, validarExistencia, esAdmin, crearProducto, async (req, res) => {

        console.log("peticion POST a : /v1/productos/ ");

    });


    app.put("/v1/productos/", esAdmin,validarDatosEditar, editarProducto, async (req, res) => {

        console.log("peticion PUT a : /v1/productos/ ");

    });

    app.delete("/v1/productos/", validarDatos, esAdmin, eliminarProducto, async (req, res) => {

        console.log("peticion DELETE a : /v1/productos/ ");

    });


}
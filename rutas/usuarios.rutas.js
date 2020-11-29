const usuariosServicios = require('../servicios/usuarios.servicios.js');
const { validarDatos, validarExistencia, esAdmin, muestraUsuarios,
    crearUsuario, editarUsuario, eliminarUsuario, login, enviaToken} = require('../middlewares/usuarios.middleware.js');

module.exports = (app) => {

    app.get("/v1/usuarios/", enviaToken, muestraUsuarios, async (req, res) => {

        console.log("peticion GET a : /v1/usuarios/ ");

    });

    app.post("/v1/usuarios/", validarDatos, validarExistencia, crearUsuario, async (req, res) => {

        console.log("peticion POST a : /v1/usuarios/ ");

    });

    app.put("/v1/usuarios/", validarDatos, esAdmin, editarUsuario, async (req, res) => {

        console.log("peticion PUT a : /v1/usuarios/ ");

    });

    app.delete("/v1/usuarios/", esAdmin, eliminarUsuario, async (req, res) => {

        console.log("peticion DELETE a : /v1/usuarios/ ");


    });

    app.post("/v1/ingreso/", login, async (req, res) => {

        console.log("Usuario Quiere Ingresar : /v1/ingreso/ ");

    });

}
const usuariosServicios = require('../servicios/usuarios.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");

async function muestraUsuarios(req, res, next) {

    try {

        const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);
        const usuario = consultaUsuario.map(({ id, usuario, nombre, apellido }) => { return { id, usuario, nombre, apellido } });

        if (consultaUsuario.length > 0) { res.status(200).json(usuario); }

        else { res.status(404).json("El usuario no existe"); }

    } catch (error) { res.status(500).json({ Error: error.message }); }


}

async function login (req, res, next) {

    const { usuario, contrasena } = req.body;    
    
    if (!usuario || !contrasena) {

        res.status(404).json({
            error: `Datos Incompletos !`
        });

    } else{

    const usuBus = await usuariosServicios.buscarUsuario(req.body);

	if ( usuBus && usuario == usuBus[0].usuario && contrasena == usuBus[0].contrasena ) {

        console.log("Enviando Token");
       
            const token = jwt.sign({
                admin: usuBus[0].admin,
                nombre: usuBus[0].nombre,
                apellido: usuBus[0].apellido
            },firma);
    
            res.status(200).json({
                   mensaje: 'Autenticación correcta',
                   token: token });

	} else {
		res.status(401).json({ error: "Usuario o Contrasena incorrecta" });
	}

    }
}

async function crearUsuario(req, res, next) {

    const crearUsuario = await usuariosServicios.crearUsuario(req.body);

    if (crearUsuario.length > 0) {
        res.status(201).json({
            mensaje: `Usuario ${req.body.usuario} creado correctamente ! `
        });
    }

    else { res.status(400).json({ mensaje: "Error al Crear Usuario" }); }


}

async function editarUsuario(req, res, next) {

    console.log("Validando Si existe el Usuario");

    const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

    if (consultaUsuario.length > 0) {

        const editarUsuario = await usuariosServicios.editarUsuario(req.body);

        if (editarUsuario.length > 0) {
            res.status(201).json({
                mensaje: `Usuario ${req.body.usuario} editado correctamente ! `
            });
        }

    }

    else { res.status(400).json({ mensaje: "Error al Editar Usuario" }); }

}

async function eliminarUsuario(req, res, next) {


    console.log("Validando Si existe el Usuario");

    const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

    if (consultaUsuario.length > 0) {

        const eliminarUsuario = await usuariosServicios.eliminarUsuario(req.body);

        res.status(201).json({
            mensaje: `Usuario ${req.body.usuario} eliminado correctamente ! `
        });


    }

    else { res.status(400).json({ mensaje: "Error al Eliminar Usuario" }); }


}

function validarDatos(req, res, next) {

    console.log("Validando Datos Completos del Usuario");

    const { usuario, nombre, apellido, email, contrasena, telefono, domicilio } = req.body;

    if (!usuario || !nombre || !apellido || !email || !contrasena || !telefono || !domicilio) {

        res.status(400).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}


async function validarExistencia(req, res, next) {

    const usuariosServicios = require('../servicios/usuarios.servicios.js');

    console.log("Validando Usuario");

    const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

    console.log("Usuario encontrado : ", consultaUsuario);

    if (consultaUsuario.length > 0) { res.status(409).json(`El usuario ${req.body.usuario} ya existe en la base de datos`); }

    else { next(); }

}


function esAdmin(req, res, next) {

    const { jwt, firma } = require("../configuracion/configuracion.js");

    console.log("Validando si el usuario es Admin");

    const token = req.headers.authorization;

    if (!token) {

        res.status(401).json({ Error: "Token Invalido" });


    } else {

        const verificar = jwt.verify(token, firma)

        if (verificar.admin == 1) { next(); }
        else { res.status(401).json({ Error: "Token Invalido" }); }

    }


}

function enviaToken(req, res, next) {

    console.log("Revisando Token");

    const token = req.headers.authorization;

    if (!token) {

        res.status(401).json({ Error: "Token Invalido" });

    } else {

        next();

    }

}

module.exports = {
    validarDatos, validarExistencia, esAdmin,
    enviaToken, muestraUsuarios, crearUsuario,
    editarUsuario, eliminarUsuario, login
};

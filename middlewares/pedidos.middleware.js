const pedidosServicios = require('../servicios/pedidos.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");

async function mostrarPedidos(req, res, next) {

    console.log("Validando El tipo de Usuario");

    const token = req.headers.authorization;

    const verificar = jwt.verify(token, firma)

    if (verificar.admin == 1) {

            const pedidos = await pedidosServicios.mostrarPedidos(req.body);

            res.status(200).json(pedidos);

        }
        else {

            const pedidos = await pedidosServicios.buscarPedidoPorUsuario(verificar.id);

            res.status(200).json(pedidos);
        }



}

function validarDatos(req, res, next) {

    console.log("Validando Datos del Pedido");

    const {total, id_usuario, productos} = req.body;

    if (!total || !id_usuario || !productos) {

        res.status(400).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}

async function existePedido(req, res, next) {

    console.log("Validando Existencia del Pedido");

    const id_pedido = req.body.id_pedido

    const existe = await pedidosServicios.existenciaPedido(id_pedido);
console.log("existe :" ,existe.length)
    if (existe.length == 0) {

        res.status(400).json({
            error: `El Pedido No existe!`
        });

    } else {

        next();

    }

}

async function crearPedido(req, res, next) {


    const crearPedido = await pedidosServicios.crearPedido(req.body);
    
    if (crearPedido.length > 0) {

        const detallePedido = await pedidosServicios.detallePedido(req.body ,crearPedido[0]);

        if (detallePedido.length > 0) {

            res.status(201).json({
                mensaje: `Pedido creado correctamente ! `
            });
            
        }
    
        else { res.status(400).json({ mensaje: "Error al Crear Pedido" }); }

    }

    else { res.status(400).json({ mensaje: "Error al Crear Pedido" }); }

}

async function editarPedido(req, res, next) {

    console.log("Validando Datos para editar Pedido");

    const {estado, id_pedido} = req.body;

    if (!estado || !id_pedido) {

        res.status(400).json({ error: `Datos Incompletos !` });

    } else {

     const editarPedido = await pedidosServicios.editarPedido(req.body);
    
    if (editarPedido.length > 0) {

            res.status(201).json({ mensaje: `Pedido editado correctamente ! `});            
 
    }

    else { res.status(400).json({ mensaje: "Error al Editar Pedido" }); }

    }

}

async function eliminarPedido(req, res, next) {

    console.log("Validando Datos para eliminar Pedido");

    const id_pedido = req.body.id_pedido;

    if (!id_pedido) {

        res.status(400).json({ error: `Datos Incompletos !` });

    } else {

     const eliminarPedido = await pedidosServicios.eliminarPedido(req.body);


    res.status(201).json({ mensaje: `Pedido Eliminado correctamente ! `});            


    }

}

module.exports = { mostrarPedidos, validarDatos, crearPedido , existePedido, editarPedido, eliminarPedido};
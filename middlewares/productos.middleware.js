function validarDatos(req, res, next) {

    console.log("Validando Datos del Producto");

    const { nombre, descripcion, precio, imagen } = req.body;

    if (!nombre || !descripcion || !precio || !imagen) {

        res.status(404).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}

function validarDatosEditar(req, res, next) {

    console.log("Validando Datos para editar Producto");

    const { id, nombre, descripcion, precio, imagen } = req.body;

    if (!id ||!nombre || !descripcion || !precio || !imagen) {

        res.status(404).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}

async function validarExistencia(req, res, next) {

    const productosServicios = require('../servicios/productos.servicios.js');

    console.log("Validando Producto");

    const consultaProducto = await productosServicios.buscarProducto(req.body);

    console.log("Producto encontrado : ", consultaProducto);

    if (consultaProducto.length > 0) { res.status(409).json(`El Producto ${req.body.nombre} ya existe en la base de datos`); }

    else { next(); }

}

async function mostrarProductos(req, res, next) {

    try {

        const consultaProductos = await productosServicios.buscarProducto(req.body);

        if (consultaProductos.length > 0) { res.status(200).json(consultaProductos); }

        else { res.status(404).json("El producto no Existe"); }

    } catch (error) { res.status(500).json({ Error: error.message }); }

}

async function crearProducto(req, res, next) {


    const crearProducto = await productosServicios.crearProducto(req.body);

    if (crearProducto.length > 0) {
        res.status(201).json({
            mensaje: `Producto ${req.body.nombre} creado correctamente ! `
        });
    }

    else { res.status(400).json({ mensaje: "Error al Crear Producto" }); }

}

async function editarProducto(req, res, next) {

    console.log("Validando Producto");

    const consultaProducto = await productosServicios.buscarProductoPorId(req.body);

    if (consultaProducto.length > 0) {

        const editarProducto = await productosServicios.editarProducto(req.body);

        if (editarProducto.length > 0) {
            res.status(201).json({
                mensaje: `Producto ${req.body.nombre} editado correctamente ! `
            });
        }

    }

    else { res.status(400).json({ mensaje: "Error al Editar Producto" }); }

}

async function eliminarProducto(req, res, next) {

    console.log("Validando Producto");

    const consultaProducto = await productosServicios.buscarProductoPorId(req.body);

    if (consultaProducto.length > 0) {

        const eliminarProducto = await productosServicios.eliminarProducto(req.body);

        res.status(201).json({
            mensaje: `Producto ${req.body.nombre} eliminado correctamente ! `
        });

    }

    else { res.status(400).json({ mensaje: "Error al Eliminar Producto" }); }


}



module.exports = { validarDatos, validarExistencia, validarDatosEditar,
     mostrarProductos, crearProducto, editarProducto, eliminarProducto };
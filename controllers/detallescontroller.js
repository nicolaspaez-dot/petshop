import DetallePedido from '../models/detallespedidos.js';

// Controlador para obtener todos los detalles de pedido
export const obtenerTodos = async (req, res) => {
    try {
        const detalles = await DetallePedido.findAll();
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles de pedido', error });
    }
};

// Controlador para obtener un detalle de pedido por ID
export const obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetallePedido.findByPk(id);
        if (detalle) {
            res.json(detalle);
        } else {
            res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el detalle de pedido', error });
    }
};

// Controlador para crear un nuevo detalle de pedido
export const crear = async (req, res) => {
    const { id_pedido, id_producto, cantidad } = req.body;
    try {
        const nuevoDetalle = await DetallePedido.create({ id_pedido, id_producto, cantidad });
        res.status(201).json(nuevoDetalle);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el detalle de pedido', error });
    }
};

// Controlador para actualizar un detalle de pedido
export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_producto, cantidad } = req.body;
    try {
        const detalle = await DetallePedido.findByPk(id);
        if (detalle) {
            await detalle.update({ id_pedido, id_producto, cantidad });
            res.json(detalle);
        } else {
            res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el detalle de pedido', error });
    }
};

// Controlador para eliminar un detalle de pedido
export const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetallePedido.findByPk(id);
        if (detalle) {
            await detalle.destroy();
            res.json({ message: 'Detalle de pedido eliminado' });
        } else {
            res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el detalle de pedido', error });
    }
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };

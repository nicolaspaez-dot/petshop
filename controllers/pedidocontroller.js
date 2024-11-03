import Pedido from '../models/pedido.js';

// Controlador para obtener todos los pedidos
export const obtenerTodos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
};

// Controlador para obtener un pedido por ID
export const obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el pedido', error });
    }
};

// Controlador para crear un nuevo pedido
export const crear = async (req, res) => {
    const { id_usuario, fecha_pedido } = req.body;
    try {
        const nuevoPedido = await Pedido.create({ id_usuario, fecha_pedido });
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pedido', error });
    }
};

// Controlador para actualizar un pedido
export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, fecha_pedido } = req.body;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            await pedido.update({ id_usuario, fecha_pedido });
            res.json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pedido', error });
    }
};

// Controlador para eliminar un pedido
export const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            await pedido.destroy();
            res.json({ message: 'Pedido eliminado' });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pedido', error });
    }
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
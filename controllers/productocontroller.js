
import Producto from '../models/producto.js';

// Controlador para obtener todos los productos
export const obtenerTodos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Controlador para obtener un producto por ID
export const obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Controlador para crear un nuevo producto
export const crear = async (req, res) => {
    const { nombre, precio, id_categoria, id_animal } = req.body;
    try {
        const nuevoProducto = await Producto.create({ nombre, precio, id_categoria, id_animal });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Controlador para actualizar un producto
export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, id_categoria, id_animal } = req.body;
    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            await producto.update({ nombre, precio, id_categoria, id_animal });
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Controlador para eliminar un producto
export const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            await producto.destroy();
            res.json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };

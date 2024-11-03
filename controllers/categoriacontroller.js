import Categoria from '../models/categoria.js';

// Controlador para obtener todas las categorías
export const obtenerTodas = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías', error });
    }
};

// Controlador para obtener una categoría por ID
export const obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByPk(id);
        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoría', error });
    }
};

// Controlador para crear una nueva categoría
export const crear = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevaCategoria = await Categoria.create({ nombre });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error });
    }
};

// Controlador para actualizar una categoría
export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const categoria = await Categoria.findByPk(id);
        if (categoria) {
            await categoria.update({ nombre });
            res.json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
};

// Controlador para eliminar una categoría
export const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByPk(id);
        if (categoria) {
            await categoria.destroy();
            res.json({ message: 'Categoría eliminada' });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
};

export default { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };
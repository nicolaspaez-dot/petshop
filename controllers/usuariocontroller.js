import Usuario from '../models/usuario.js';

// Controlador para obtener todos los usuarios
export const obtenerTodos = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para obtener un usuario por ID
export const obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Controlador para crear un nuevo usuario
export const crear = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const nuevoUsuario = await Usuario.create({ nombre, email, password });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// Controlador para actualizar un usuario
export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            await usuario.update({ nombre, email, password });
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Controlador para eliminar un usuario
export const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            await usuario.destroy();
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
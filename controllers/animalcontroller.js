import Animal from '../models/animal.js';

// Controlador para obtener todos los animales
export const obtenerTodos = async (req, res) => {
    try {
        const animales = await Animal.findAll();
        res.json(animales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los animales', error });
    }
};

// Controlador para obtener un animal por ID
export const obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.findByPk(id);
        if (animal) {
            res.json(animal);
        } else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el animal', error });
    }
};

// Controlador para crear un nuevo animal
export const crear = async (req, res) => {
    const { tipo } = req.body;
    try {
        const nuevoAnimal = await Animal.create({ tipo });
        res.status(201).json(nuevoAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el animal', error });
    }
};

// Controlador para actualizar un animal
export const actualizar = async (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;
    try {
        const animal = await Animal.findByPk(id);
        if (animal) {
            await animal.update({ tipo });
            res.json(animal);
        } else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el animal', error });
    }
};

// Controlador para eliminar un animal
export const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.findByPk(id);
        if (animal) {
            await animal.destroy();
            res.json({ message: 'Animal eliminado' });
        } else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el animal', error });
    }
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
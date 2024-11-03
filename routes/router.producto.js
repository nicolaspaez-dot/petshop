import express from 'express';
import productosController from '../controllers/productocontroller.js';
import categoria from '../models/categoria.js';
import animal from '../models/animal.js';

const router = express.Router();

// Ruta para obtener todos los productos
// GET /productos
router.get('/', productosController.obtenerTodos);

// Ruta para obtener un producto por ID
// GET /productos/:id
router.get('/:id', productosController.obtenerPorId);

// Ruta para crear un nuevo producto
// POST /productos
router.post('/', productosController.crear);

// Ruta para actualizar un producto existente
// PUT /productos/:id
router.put('/:id', productosController.actualizar);

// Ruta para eliminar un producto
// DELETE /productos/:id
router.delete('/:id', productosController.eliminar);

//ruta para obtener todos los productos con sus relaciones con las tablas

router.get('/', async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [
                { model: Categoria, attributes: ['nombre'] }, // Incluye la categoría
                { model: Animal, attributes: ['tipo'] }        // Incluye el tipo de animal
            ]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});

export default router;
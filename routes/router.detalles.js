import express from 'express';
import { obtenerTodos, obtenerPorId, crear, actualizar, eliminar } from '../controllers/detallescontroller.js';

const router = express.Router();

router.get('/', obtenerTodos);
router.get('/:id', obtenerPorId);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

//ruta para obtener todos los detalles de pedido con sus relaciones con las tablas
router.get('/', async (req, res) => {
    try {
        const detalles = await DetallePedido.findAll({
            include: [
                { model: Pedido, attributes: ['id_usuario'] }, // Incluye el id_usuario del pedido
                { model: Producto, attributes: ['nombre'] }, // Incluye el nombre del producto
            ]
        });
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles de pedido', error });
    }
});

export default router;


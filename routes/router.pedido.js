import express from 'express';
import { obtenerTodos, obtenerPorId, crear, actualizar, eliminar } from '../controllers/pedidocontroller.js';

const router = express.Router();

router.get('/', obtenerTodos);
router.get('/:id', obtenerPorId);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);    

//ruta para obtener todos los pedidos con sus relaciones con las tablas
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                { model: Usuario, attributes: ['nombre'] }, // Incluye la nombre del usuario
            ]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
});

export default router;


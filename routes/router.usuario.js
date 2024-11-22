import express from 'express';
import { obtenerTodos, obtenerPorId, crear, actualizar, eliminar, iniciarSesion, eliminarTodos, generarRecuperacion, cambiarContrasena } from '../controllers/usuariocontroller.js';

const router = express.Router();

router.get('/', obtenerTodos);
router.get('/:id', obtenerPorId);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);
router.post('/iniciar-sesion', iniciarSesion);
router.delete('/', eliminarTodos)
router.post('/recuperar', generarRecuperacion);
router.post('/cambiar-contrasena', cambiarContrasena);

export default router;
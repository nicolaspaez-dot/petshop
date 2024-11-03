// app.js
import express from 'express';
import sequelize from './config/db.js'; // Ruta ajustada para tu proyecto

// Importamos los modelos para que Sequelize los reconozca
import './models/animal.js';
import './models/categoria.js';
import './models/detallespedidos.js';
import './models/pedido.js';
import './models/producto.js';
import './models/usuario.js';

import productosRoutes from './routes/router.producto.js';
import categoriasRoutes from './routes/router.categoria.js';
import animalesRoutes from './routes/router.animal.js';
import usuariosRoutes from './routes/router.usuario.js';
import pedidosRoutes from './routes/router.pedido.js';
import detallesRoutes from './routes/router.detalles.js';




const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Verificar la conexión a la base de datos y sincronizar modelos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito');
        return sequelize.sync(); // Sincroniza los modelos sin reiniciar las tablas
    })
    .then(() => {
        console.log('Modelos sincronizados');
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos o sincronizar modelos:', err);
    });

// Ruta base
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

// Otras configuraciones de rutas o middlewares aquí...

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Rutas de la API para productos
app.use('/productos', productosRoutes); // Asigna las rutas de productos a la URL base /productos

// Rutas de la API para categorias
app.use('/categorias', categoriasRoutes); // Asigna las rutas de categorias a la URL base /categorias

// Rutas de la API para animales
app.use('/animales', animalesRoutes); // Asigna las rutas de animales a la URL base /animales

// Rutas de la API para usuarios
app.use('/usuarios', usuariosRoutes); // Asigna las rutas de usuarios a la URL base /usuarios

// Rutas de la API para pedidos
app.use('/pedidos', pedidosRoutes); // Asigna las rutas de pedidos a la URL base /pedidos

// Rutas de la API para detalles de pedidos
app.use('/detalles', detallesRoutes); // Asigna las rutas de detalles de pedidos a la URL base /detalles


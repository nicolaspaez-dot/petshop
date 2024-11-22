// app.js
import express from 'express';
import sequelize from './config/db.js'; // Ruta ajustada para tu proyecto
import cors from 'cors';
import nodemailer from 'nodemailer'; // Importamos Nodemailer para enviar correos

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

import 'dotenv/config';


const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({
    origin: '*', // Reemplaza con el dominio del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir cookies o tokens si es necesario
}));

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

// Configuración de Nodemailer para enviar correos
const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambia si usas otro servicio de correo
    auth: {
        user: 'tuemail@gmail.com', // Tu correo
        pass: 'tucontraseña', // Tu contraseña o App Password
    },
});

// Ruta para manejar la recuperación de contraseñas
app.post('/recover-password', async (req, res) => {
    const { email } = req.body; // Capturamos el email desde el body de la solicitud

    try {
        // Enviamos el correo de recuperación
        await transporter.sendMail({
            from: '"Soporte" <tuemail@gmail.com>', // Dirección del remitente
            to: email, // Dirección del destinatario
            subject: 'Recuperación de contraseña', // Asunto del correo
            text: 'Haz clic en el siguiente enlace para recuperar tu contraseña: http://example.com/reset-password', // Contenido del correo
        });

        res.status(200).send('Correo de recuperación enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
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

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



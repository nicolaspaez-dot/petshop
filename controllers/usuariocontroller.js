import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import 'dotenv/config'; // Asegura que cargamos las variables de entorno

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
        const passwordEncriptado = await bcrypt.hash(password, 10); // Encripta la contraseña
        const nuevoUsuario = await Usuario.create({ nombre, email, password: passwordEncriptado });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// Controlador para iniciar sesión
export const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const esValido = await bcrypt.compare(password, usuario.password);

        if (!esValido) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || 'secreto_para_el_token', // Usa variable de entorno para mayor seguridad
            { expiresIn: '1h' }
        );

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
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

// Controlador para eliminar todos los usuarios
export const eliminarTodos = async (req, res) => {
    try {
        const usuariosEliminados = await Usuario.destroy({
            truncate: true,
        });

        res.json({ message: `Se eliminaron ${usuariosEliminados} usuarios.` });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar todos los usuarios', error });
    }
};

// Controlador para generar recuperación de contraseña
export const generarRecuperacion = async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar si el email existe en la base de datos
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Correo no registrado' });
        }

        // Generar token único y establecer fecha de expiración
        const token = uuidv4();
        const expiration = new Date(Date.now() + 3600000); // Expira en 1 hora

        // Guardar el token y su expiración en la base de datos
        usuario.resetToken = token;
        usuario.resetTokenExpiration = expiration;
        await usuario.save();

        // Configuración de Nodemailer con variables de entorno
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, // Host desde .env
            port: process.env.SMTP_PORT, // Puerto desde .env (587 en este caso)
            secure: false, // STARTTLS (necesario para 587)
            auth: {
                user: process.env.EMAIL_USER, // Usuario del .env
                pass: process.env.EMAIL_PASS, // Contraseña de aplicación del .env
            },
            tls: { rejectUnauthorized: false }, // Evita problemas con certificados
        });

        // Enviar el email con el token
        await transporter.sendMail({
            from: `"Soporte" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Recuperación de contraseña',
            html:  `<p>Hola, ${usuario.nombre}. Aquí está tu enlace de recuperación:</p>
                    <a href="http://localhost:5173/nueva-contraseña/${token}">Recuperar contraseña</a>
                    <p>Este enlace expirará en 1 hora.</p>`,

        });

        res.json({ message: 'Correo de recuperación enviado' });
    } catch (error) {
        console.error('Error al generar recuperación:', error);
        res.status(500).json({ message: 'Error al generar recuperación', error });
    }
};

// Cambiar contraseña en el backend
export const cambiarContrasena = async (req, res) => {
    console.log('Body recibido:', req.body); // Verifica qué está llegando

    // Extraer campos del request
    const { token, nuevaContrasena } = req.body; // Cambié el nombre para evitar problemas con la "ñ"

    // Validar que los campos estén presentes
    if (!token || !nuevaContrasena) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        // Buscar el usuario por el token y verificar que no haya expirado
        const usuario = await Usuario.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: { [Op.gt]: new Date() }, // Verificar que no esté expirado
            },
        });

        // Si no se encuentra el usuario o el token es inválido
        if (!usuario) {
            console.log('Token inválido o expirado');
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        // Encriptar la nueva contraseña
        const passwordEncriptado = await bcrypt.hash(nuevaContrasena, 10);

        // Actualizar el usuario
        usuario.password = passwordEncriptado;
        usuario.resetToken = null;
        usuario.resetTokenExpiration = null;
        await usuario.save();

        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        res.status(500).json({ message: 'Error al cambiar la contraseña', error });
    }
};

export default {
    obtenerTodos,
    obtenerPorId,
    crear,
    iniciarSesion,
    actualizar,
    eliminar,
    eliminarTodos,
    generarRecuperacion,
    cambiarContrasena,
};

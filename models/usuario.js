import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Campo para el token de recuperación
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true, // Solo lo usa si hay un proceso de recuperación
    },
    // Campo para la fecha de expiración del token
    resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'usuario',
    timestamps: false,
});

export default Usuario;

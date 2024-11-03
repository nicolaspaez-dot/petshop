// Importamos los tipos de datos de Sequelize
import { DataTypes } from 'sequelize';
// Importamos la conexión a la base de datos
import sequelize from '../config/db.js';

// Definimos el modelo de la tabla 'Usuario'
const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Clave primaria
        autoIncrement: true // Se incrementa automáticamente
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false // Campo obligatorio
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // No se pueden repetir los emails
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario', // Nombre de la tabla en la base de datos
    timestamps: false // No queremos las columnas 'createdAt' y 'updatedAt'
});

// Exportamos el modelo para usarlo en otros archivos
export default Usuario;


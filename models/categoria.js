import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Definimos el modelo de la tabla 'Categoria'
const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categoria',
    timestamps: false
});

export default Categoria;

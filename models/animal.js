import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Definimos el modelo de la tabla 'Animal'
const Animal = sequelize.define('Animal', {
    id_animal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'animal',
    timestamps: false
});

export default Animal;

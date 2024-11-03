import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Categoria from './categoria.js'; // Importamos el modelo relacionado
import Animal from './animal.js'; // Importamos el modelo relacionado

// Definimos el modelo de la tabla 'Producto'
const Producto = sequelize.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2), // Precio con 2 decimales
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id_categoria'
        }
    },
    id_animal: {
        type: DataTypes.INTEGER,
        references: {
            model: Animal,
            key: 'id_animal'
        }
    }
}, {
    tableName: 'producto',
    timestamps: false
});

// Definimos las relaciones entre las tablas
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' }); // Un producto pertenece a una categoría
Producto.belongsTo(Animal, { foreignKey: 'id_animal' }); // Un producto pertenece a un tipo de animal

export default Producto;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './usuario.js'; // Importamos el modelo relacionado

// Definimos el modelo de la tabla 'Pedido'
const Pedido = sequelize.define('Pedido', {
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario, // Relación con el modelo 'Usuario'
            key: 'id_usuario' // Campo relacionado
        }
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        allowNull: false // Campo obligatorio
    }
}, {
    tableName: 'pedido',
    timestamps: false
});

// Definimos las relaciones entre las tablas
Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario' }); // Un pedido pertenece a un usuario
Usuario.hasMany(Pedido, { foreignKey: 'id_usuario' }); // Un usuario puede tener varios pedidos

export default Pedido;

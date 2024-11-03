import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Pedido from './pedido.js'; // Importamos el modelo relacionado
import Producto from './producto.js'; // Importamos el modelo relacionado

// Definimos el modelo de la tabla 'DetallePedido'
const DetallePedido = sequelize.define('DetallePedido', {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        references: {
            model: Pedido,
            key: 'id_pedido'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id_producto'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false // Campo obligatorio
    }
}, {
    tableName: 'detalle_pedido',
    timestamps: false
});

// Definimos las relaciones entre las tablas
DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' }); // Un detalle de pedido pertenece a un pedido
DetallePedido.belongsTo(Producto, { foreignKey: 'id_producto' }); // Un detalle de pedido pertenece a un producto
Pedido.hasMany(DetallePedido, { foreignKey: 'id_pedido' }); // Un pedido puede tener muchos detalles

export default DetallePedido;
